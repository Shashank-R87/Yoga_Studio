// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyATHn9E9QhuZp3JgoIfZz8KS9C2HnNIoN8",
  authDomain: "yoga-studio-ecd57.firebaseapp.com",
  projectId: "yoga-studio-ecd57",
  storageBucket: "yoga-studio-ecd57.appspot.com",
  messagingSenderId: "799119249741",
  appId: "1:799119249741:web:8e2f7de9f63f99b6826704",
  measurementId: "G-G0BCE19X1S"
};

// Initialize Firebase

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// export const analytics = getAnalytics(app);