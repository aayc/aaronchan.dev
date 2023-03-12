import React from "react";
import { useState } from "react";
import LoginForm from "../../components/LoginForm";
import { auth } from "../../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import moment from "moment";

function Admin() {
  return (
    <div className="mt-12">
      <div className="text-center text-2xl">
        {moment().format("MMMM Do, YYYY")}
      </div>
      <div>Did you do 20 push ups?</div>
    </div>
  );
}

function AdminHome() {
  const [user, loading, error] = useAuthState(auth);
  const widget = () => {
    if (loading) {
      return <div>Loading...</div>;
    } else if (user) {
      return Admin();
    } else if (error) {
      return <div>Error: {error.message}</div>;
    } else {
      return <LoginForm></LoginForm>;
    }
  };

  return (
    <div>
      <div className="m-auto max-w-7xl">{widget()}</div>
    </div>
  );
}

export default AdminHome;
