import React, { useState } from 'react'
import * as emailjs from "emailjs-com";
import TextField from '../components/textFields/textField'
import ContactText from '../data/contactForm.json'
import './contactView.css'

export const ContactView = () => {

    const [submitMessage, setSubmitMessage] = useState("");
    const [mail, setMail] = useState("");
    const [name, setName] = useState("");

    const handleSubmit = (evt) => {
        evt.preventDefault();
        if (mail === "") {
          setSubmitMessage(ContactText.contactFormMailError);
        } else if (name === "") {
          setSubmitMessage(ContactText.contactFormNameError);
        } else {
          emailjs
            .sendForm(
              ContactText.emailJsServiceKey,
              ContactText.emailJsTemplateKey,
              evt.target,
              ContactText.emailJsUserKey
            )
            .then((res) => {
              setSubmitMessage(ContactText.contactFormSuccess);
            })
            .catch((err) => {
              console.error("Something went wrong", err);
              setSubmitMessage(
                ContactText.contactFormError
              );
            });
          evt.target.reset();
          setMail("");
          setName("");
        }
      };

    return(
        <div className="contactDiv">
            <div className="contactTextDiv">
                <h1>Get in touch</h1>
                <p>We are open for any suggestions <br /> or just to have a chat!</p>
            </div>
            <div className="contactFormDiv">
                <form onSubmit={handleSubmit}>
                    <TextField type="standard-basic" text="Name" onChange={event => setName(event.target.value)}/>
                    <TextField type="standard-basic" text="Mail" onChange={event => setName(event.target.value)}/>
                    <TextField type="standard-multiline-flexible" multiline="multiline" rows="7" text="Message" onChange={event => setSubmitMessage(event.target.value)}/>
                    <input className="submitButton" type="submit" value="Send" />
                </form>
            </div>
        </div>
    )
}