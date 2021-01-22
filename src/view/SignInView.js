import React , {useState, useContext} from 'react'
import TextField from '../components/textFields/textField'
import PasswordField from '../components/textFields/passwordField'
import {useAuth} from '../shared/global/provider/UserProvider'
import {useHistory} from 'react-router-dom'
import './signInView.css'

export const SignInView = () => {
    const [mail, setName] = useState()
    const [password, setPassword] = useState()
    const [error, setError] = useState()
    const [loading, setLoading] = useState()
    const history = useHistory()
    const {signIn} = useAuth()

  async function login(e) {
    e.preventDefault()

    try {
        setError("")
        setLoading(true)
        signIn(mail, password)
        history.push("/home")
      } catch {
        setError("Failed to log in")
      }
      setLoading(false)
  }

    const findYourPlayerTwoBox = () => {
        return(
            <div className="findYourPlayerTwoDiv">
                <h2 className="findYourPlayerTwoText">Find your plater two</h2>
            </div>
        )
    }

    const thePeachToYourMarioBox = () => {
        return(
            <div className="theMarioToYourPeachDiv">
                <p className="theMarioToYourPeachText">The <span className="blueText">Mario</span> to your <span className="pinkText">Peach</span></p>
            </div>
        )
    }

    const logInBox = () => {
        return(
            <div>
                <form onSubmit={login}>
                    <input
                    type='text'
                    onChange={event => setName(event.target.value)}
                    />
                    <input
                    type='password'
                    onChange={event => setPassword(event.target.value)}
                    />
                    <input
                    type='submit'
                    />
                </form>
            </div>
           /* <div className="logInDiv">
                <h2>Sign in</h2>
                <TextField type="standard-basic" text="Mail" onChange={event => setName(event.target.value)}/>
                <div className="logInPas">
                    <TextField type="standard-basic" text="Password" onChange={event => setPassword(event.target.value)}/>
                </div>
                <button className="logInButton" onClick={() => login()}>Log in</button>
                <p>Dont have an account? Sign up!</p>
                <p>Problems logging in?</p>
            </div>*/
        )
    }

    return(
        <div className="logInPage">
            <div className="signInLeftDiv">
            {findYourPlayerTwoBox()}
            {thePeachToYourMarioBox()}
            </div>
            {logInBox()}
        </div>
    )
}