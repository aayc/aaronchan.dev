// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, set, get } from "firebase/database";

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
const database = getDatabase(app);

function dbSet(loc: string, value: any): Promise<void> {
    return set(ref(database, loc), value);
}

async function dbGet(loc: string): Promise<any | null> {
    try {
        const snapshot = await get(ref(database, loc))
        if (snapshot.exists()) {
            return snapshot.val();
        } else {
            return null;
        }
    } catch (error) {
        console.error(error);
        return null
    }
}

export { auth, database, dbGet, dbSet};