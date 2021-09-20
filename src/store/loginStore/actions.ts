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
  update
} from "boot/firebase";

const actions: ActionTree<ExampleStateInterface, StateInterface> = {
  registerUser ({}, payload) {
    const firebase_auth = getAuth();
    createUserWithEmailAndPassword(firebase_auth, payload.email, payload.password).then((userCredential) => {
      const user_id = userCredential.user.uid;
      set(ref(firebase_db, 'users/' + user_id), {
        name: payload.name,
        email: payload.email,
        online: true
      })
      console.log(user_id)
    }).catch(error => {
      console.log(error.messsage)
    })
  },
  loginUser ({}, payload) {
    const firebase_auth = getAuth();
    signInWithEmailAndPassword(firebase_auth, payload.email, payload.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  },
  logoutUser() {
    const firebase_auth = getAuth();
    firebase_auth.signOut()
  },
  handleAuthUser({commit, dispatch, state}, router){
    const firebase_auth = getAuth();
    const ref_DB = ref(firebase_db)
    firebase_auth.onAuthStateChanged(user => {
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
        router.push('/auth')
      }
    })
  },
  firebaseUpdateUser({}, payload){
    update(ref(firebase_db, 'users/' + payload.user_id), payload.updates)
  }
};

export default actions;
