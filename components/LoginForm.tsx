import React from "react";
import { useState } from "react";
import NavBar from "./NavBar";
// use the new firebase auth api
import { auth } from "../utils/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const attemptLogin = async () => {
    if (email == "" || password == "") {
      alert("Please fill out all fields");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      const code = "" + error
      if (code.includes("auth/user-not-found")) {
        alert("No user found with that email");
      } else if (code.includes("auth/wrong-password")) {
        alert("Incorrect password");
      } else if (code.includes("auth/invalid-email")) {
        alert("Invalid email");
      } else {
        alert("Unknown error");
      }
    }
  };

  return (
    <div>
      <div className="mt-12 px-4 w-72 m-auto">
        <input
          type="text"
          className="w-full h-10 px-2 focus:outline-none bg-gray-100 rounded-lg"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="w-full h-10 my-2 px-2 focus:outline-none bg-gray-100 rounded-lg"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="w-full px-6 py-2 bg-black text-white transition ease-in-out duration-150 hover:opacity-70 rounded-lg"
          onClick={(e) => attemptLogin()}
        >
          Log in
        </button>
      </div>
    </div>
  );
}

export default Login;
