import emailjs from "@emailjs/browser";
// import "bootstrap/dist/css/bootstrap.css";
import React, { useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
// import "font-awesome/css/font-awesome.min.css";
 
const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const form = useRef();
  const sendEmail = (e) => {
    e.preventDefault();
 
    emailjs
      .sendForm("service_hi5y9jx", "template_h4zjpe3", form.current, {
        publicKey: "qCrURLp911ujWG8Rq",
      })
      .then(
        () => {
          console.log("SUCCESS!");
          setName("");
          setEmail("");
          setMessage("");
        },
        (error) => {
          console.log("FAILED...", error.text);
        }
      );
  };
 
  return (
    <>
      {/* <div className="main-container">
        <div>
          <h2>Contact US</h2>
          <form ref={form} onSubmit={sendEmail} action="">
            <input
              type="text"
              placeholder="Full Name"
              name="user_name"
              required
            />
            <input
              type="email"
              placeholder="Email"
              name="user_email"
              required
            />
            <textarea name="message" cols="30" rows="10"></textarea>
            <button type="submit">Send Message</button>
          </form>
        </div>
        <div></div>
      </div> */}
 
     
      <div className="container" style={{width:"500px",marginTop:"20px"}}>
        <div className="row">
          <div className="col">
            <div className="card">
              <div className="card-header bg-info text-white">
                <i className="fa fa-envelope"></i> CONTACT US.
              </div>
              <div className="card-body">
                <form ref={form} onSubmit={sendEmail}>
                  <div className="form-group">
                    <label htmlFor="name"></label>
                    <input
                      type="text"
                      name="user_name"
                      className="form-control"
                      id="name"
                      //   aria-describedby="emailHelp"
                      placeholder="Enter name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email"></label>
                    <input
                      type="email"
                      name="user_email"
                      className="form-control"
                      id="email"
                      //   aria-describedby="emailHelp"
                      placeholder="Enter email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="message"></label>
                    <textarea
                      className="form-control"
                      id="message"
                      name="message"
                      rows="6"
                      placeholder="Enter message"
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    ></textarea>
                  </div>
                  <div className="mx-auto">
                    <button
                      type="submit"
                      className="btn btn-info text-right m-4"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
 
export default Contact;