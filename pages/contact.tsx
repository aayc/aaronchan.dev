import NavBar from "../components/NavBar";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

export default function Contact() {
  const [name, setName] = React.useState("");
  const [contact, setContact] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [subject, setSubject] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = () => {
    setLoading(true);

    if (
      name.length === 0 ||
      contact.length === 0 ||
      message.length === 0 ||
      subject.length === 0
    ) {
      alert("Please fill out all forms");
      setLoading(false);
      return;
    }

    fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        contact: contact,
        message: message,
        subject: subject,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        if (data.success) {
          alert(
            `Thanks for your message ${name}!  I'll get back to you as soon as possible.`
          );
          setName("");
          setContact("");
          setMessage("");
          setSubject("");
        } else {
          alert(
            "Uh oh, something went wrong with sending your message.  Please try again later."
          );
        }
      });
  };

  return (
    <div>
      <div className="m-auto max-w-7xl">
        <NavBar></NavBar>

        <div className="mt-12">
          <div className="mt-12 px-6 md:px-0 md:max-w-112 m-auto flex flex-col items-center">
            <h2>Contact Me</h2>
            <br />
            <br />
            <input
              className="block rounded-lg bg-gray-100 p-3 w-full md:max-w-112"
              type="text"
              value={name}
              disabled={loading}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Name"
            />
            <br />
            <input
              className="block rounded-lg bg-gray-100 p-3 w-full"
              type="text"
              value={contact}
              disabled={loading}
              onChange={(e) => setContact(e.target.value)}
              placeholder="Your Email or Phone Number"
            />
            <br />
            <input
              className="block rounded-lg bg-gray-100 p-3 w-full"
              type="text"
              value={subject}
              disabled={loading}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Subject"
            />
            <br />
            <textarea
              className="block rounded-lg bg-gray-100 p-3 w-full"
              value={message}
              disabled={loading}
              onChange={(e) => setMessage(e.target.value)}
              rows={10}
              placeholder="Message"
            />
            <br />
            <div className="w-full flex justify-end">
              <button
                className="transition duration-100 ease-in bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-lg"
                disabled={loading}
                onClick={handleSubmit}
              >
                {"Send" + (loading ? "ing..." : "")}{" "}
                <FontAwesomeIcon icon={faPaperPlane}></FontAwesomeIcon>
              </button>
            </div>
            <br />
          </div>
        </div>
      </div>
    </div>
  );
}
