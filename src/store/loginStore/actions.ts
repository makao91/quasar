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
  onAuthStateChanged,
  push
} from "boot/firebase";

 let message_ref


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

            commit('setUserDetails', {
              name: snapshot.val().name,
              email: snapshot.val().email,
              user_id: user.uid
            })
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
    message_ref = ref(firebase_db, 'chats/' + user_id + '/' + another_user_id);

    onChildAdded(message_ref, (data) => {
      let message_id = data.key
      let message_detail = data.val()
      commit('addMessage', {
        message_id,
        message_detail
      })
    });
  },
  firebaseStopFetchMessages({ commit }) {
    if (message_ref){
      message_ref.off()
      commit('clearMessages', [])
    }
  },
  firebaseSendMessage({ state }, payload) {
    const db_ref = ref(firebase_db, 'chats/' + state.user_details.user_id + '/' + payload.other_user_id);
    push(db_ref, payload.message)

    payload.message.from = 'them';
    const db_ref_othe_user = ref(firebase_db, 'chats/' + payload.other_user_id + '/' + state.user_details.user_id);
    push(db_ref_othe_user, payload.message)
  }
};

export default actions;
