// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAqQ5qtkKZgmmiAMAjSrploL00imcAimrM",
  authDomain: "aaronchanweb.firebaseapp.com",
  databaseURL: "https://aaronchanweb-default-rtdb.firebaseio.com",
  projectId: "aaronchanweb",
  storageBucket: "aaronchanweb.appspot.com",
  messagingSenderId: "68299727063",
  appId: "1:68299727063:web:8e76f9e1affd6282501092"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };