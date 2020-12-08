import React, { useState } from 'react'
import TextField from '../components/textFields/textField'

export const ContactView = () => {

    const [name, setName] = useState("")
    const [mail, SetMail] = useState("")
    const [message, setMessage] = useState("")

    return(
        <div>
            <div>
                <h1>Get in touch</h1>
                <p>We are open for any suggestions or just to have a chat</p>
            </div>
            <div>
                <TextField type="standard-basic" text="Name" onChange={event => setName(event.target.value)}/>
                <TextField type="standard-basic" text="Mail" onChange={event => setName(event.target.value)}/>
                <TextField type="standard-multiline-flexible" multiline="multiline" rows="7" text="Message" onChange={event => setMessage(event.target.value)}/>
            </div>
        </div>
    )
}