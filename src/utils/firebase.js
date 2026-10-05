// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC68yQglxiN_RcoBEWJPf95sdMkBiVR1LQ",
  authDomain: "netflixgpt-nauti.firebaseapp.com",
  projectId: "netflixgpt-nauti",
  storageBucket: "netflixgpt-nauti.firebasestorage.app",
  messagingSenderId: "810860396826",
  appId: "1:810860396826:web:24e7495939b02d9030aca3",
  measurementId: "G-MRZ1BFKFM1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
getAnalytics(app);

export const auth = getAuth();
