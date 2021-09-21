/* eslint-disable */
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { getDatabase, ref, set, get, child, update, onChildAdded, onChildChanged } from 'firebase/database';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCeCewpFRiF-l5PBqpEgV-S3bFqS0PQsho',
  authDomain: 'chateria-83af9.firebaseapp.com',
  projectId: 'chateria-83af9',
  storageBucket: 'chateria-83af9.appspot.com',
  messagingSenderId: '937165146217',
  appId: '1:937165146217:web:a6d966b9d3ffe9134a7af8',
  databaseURL: 'https://chateria-83af9-default-rtdb.europe-west1.firebasedatabase.app/'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
let firebase_db = getDatabase();

export {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  firebase_db,
  ref,
  set,
  get,
  child,
  update,
  onChildAdded,
  onChildChanged,
  signInWithEmailAndPassword
}
