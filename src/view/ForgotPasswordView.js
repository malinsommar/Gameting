import React, {useState} from 'react'
import {useAuth} from '../shared/global/provider/UserProvider'
import {useHistory} from 'react-router-dom'
import "./forgotPasswordView.css"

export const ResetPasswordView = () => {
    const {sendPasswordResetMail} = useAuth()
    const history = useHistory()
    const [mail, setMail] = useState()
    const [view, setView] = useState(0)

    const submitMail = () => {
        sendPasswordResetMail(mail)
        setView(1)
    }

    const getView = () => {
        if(view === 0){
            return (
                <div style={{textAlign: "center", backgroundColor: "#aa9bff", borderRadius: "50%", width: "30vw", height: "30vw", margin: "0 auto", marginTop: "10vh"}} className="forgotPasswordPage">
                    <h1 style={{fontSize: "3.5vw", position: "relative", top: "10vh"}}>Recover password</h1>
                    <p style={{fontSize: "2vw", position: "relative", top: "12vh"}}>Please enter your mail </p>
                    <input
                        style={{position: "relative", top: "12vh"}}
                        type='text'
                        onChange={event => setMail(event.target.value)}
                    /> <br />
                    <button style={{position: "relative", top: "13vh"}} onClick={() => submitMail()}>Send</button>
                </div>
            )
        } else if(view === 1) {
             return (
                <div style={{textAlign: "center", backgroundColor: "#aa9bff", borderRadius: "50%", width: "30vw", height: "30vw", margin: "0 auto", marginTop: "10vh"}} className="forgotPasswordPage">
                    <h1 style={{fontSize: "3.5vw", position: "relative", top: "10vh"}}>Recover password</h1>
                    <p style={{fontSize: "1.6vw", position: "relative", top: "12vh"}}>A recovery mail has been sent to:<br/> {mail}</p>
                    <button style={{position: "relative", top: "13vh"}} onClick={() => history.push("/signIn")}>Return to login</button>
                </div>
            )
        }
    }

    return(
        <div className="forgotPassword">
         {getView()}
        </div>
    )
}