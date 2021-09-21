/* eslint-disable */
import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { ExampleStateInterface } from './state';
import {
  getAuth,
  createUserWithEmailAndPassword,
  firebase_db,
  set,
  get,
  ref,
  signInWithEmailAndPassword,
  child,
  update,
  onChildAdded,
  onChildChanged,
  onAuthStateChanged
} from "boot/firebase";

const actions: ActionTree<ExampleStateInterface, StateInterface> = {
  registerUser ({ dispatch }, payload) {
    createUserWithEmailAndPassword(getAuth(), payload.email, payload.password).then((userCredential) => {
      const user_id = userCredential.user.uid;
      set(ref(firebase_db, 'users/' + user_id), {
        name: payload.name,
        email: payload.email,
        online: true
      })
    }).catch(error => {
      console.log(error.messsage)
    })
  },
  loginUser ({ commit }, payload) {
    if (payload.email){
      signInWithEmailAndPassword(getAuth(), payload.email, payload.password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });
    }

  },
  logoutUser() {
    const firebase_auth = getAuth();
    firebase_auth.signOut()
  },
  handleAuthUser({commit, dispatch, state}, router){
    const ref_DB = ref(firebase_db)
    onAuthStateChanged(getAuth(), (user) => {
      if (user) {
        get(child(ref_DB, 'users/' + user.uid)).then((snapshot) => {
          if (snapshot.exists()) {
            console.log('auth')

            commit('setUserDetails', {
              name: snapshot.val().name,
              email: snapshot.val().email,
              user_id: user.uid
            })
            console.log('ile razy')
            dispatch('firebaseUpdateUser', {
              user_id: user.uid,
              updates: {
                online: true
              }
            })
            dispatch('firebaseGetUsers')
            router.push('/')
          }
        }).catch((error) => {
          console.error(error);
          }
        )
      }
      else {
        dispatch('firebaseUpdateUser', {
          user_id: state.user_details.user_id,
          updates: {
            online: false
          }
        })
        commit('setUserDetails', {})
        commit('clearUsers', [])
        commit('clearMessages', [])
        router.push('/auth')
      }
    })
  },
  firebaseUpdateUser({}, payload){
    if (payload.user_id){
      update(ref(firebase_db, 'users/' + payload.user_id), payload.updates)
    }
  },
  firebaseGetUsers({commit}){
    const db_ref = ref(firebase_db, 'users');

    onChildAdded(db_ref, (data) => {
      let user_id = data.key
      let user_details = data.val()
      commit('addUser', {
        user_id,
        user_details
      })
    });
    onChildChanged(db_ref, (data) => {
      let user_id = data.key
      let user_details = data.val()
      commit('updateUser', {
        user_id,
        user_details
      })
    });
  },
  firebaseFetchMessages({ state, commit }, another_user_id){
    let user_id = state.user_details.user_id
    const db_ref = ref(firebase_db, 'chats/' + user_id + '/' + another_user_id);
    onChildAdded(db_ref, (data) => {
      let message_id = data.key
      let message_detail = data.val()
      commit('addMessage', {
        message_id,
        message_detail
      })
    });
  }
};

export default actions;
