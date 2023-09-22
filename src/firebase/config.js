// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore/lite'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAHh3BrB-fGeNmR2fRJFy8OUeVzBnz4XlY",
  authDomain: "react-udemy-38952.firebaseapp.com",
  projectId: "react-udemy-38952",
  storageBucket: "react-udemy-38952.appspot.com",
  messagingSenderId: "326155061437",
  appId: "1:326155061437:web:9920977e6eaadca2a34fd4"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp)
export const firebaseDB = getFirestore(firebaseApp)