import React , {useState, useContext} from 'react'
import {useAuth} from '../shared/global/provider/UserProvider'
import {useHistory} from 'react-router-dom'
import './signInView.css'

export const SignUpView = () => {
    const [mail, setMail] = useState()
    const [password, setPassword] = useState()
    const [controlPassword, setControlPassword] = useState("");
    const [error, setError] = useState()
    const [loading, setLoading] = useState()
    const history = useHistory()
    const {signUp} = useAuth()

  async function signUpUser(e) {
    e.preventDefault()

    if (password !== controlPassword) {
      return setError("Passwords do not match")
    }
    try {
      setError("")
      setLoading(true)
      signUp(mail, password)
      history.push("/newAccount")
    } catch {
      setError("Failed to create an account")
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

    const signUpBox = () => {
        return(
            <div className="logInDiv">
            <h2>Sign up</h2>

                <form onSubmit={signUpUser}>
                    <p>Mail: </p>
                    <input
                    type='text'
                    onChange={event => setMail(event.target.value)}
                    />
                    <p>Password: </p>
                    <input
                    type='password'
                    onChange={event => setPassword(event.target.value)}
                    />
                    <p>Comfirm password: </p>
                    <input
                    type='password'
                    onChange={event => setControlPassword(event.target.value)}
                    /> <br />
                    <input
                    className="logInButton"
                    type='submit'
                    />
                </form>
                <p className="clickable" onClick={() => history.push("/signIn")}>Already have an account? Sign in!</p>
            </div>
        )
    }

    return(
        <div className="logInPage">
            <div className="signInLeftDiv">
            {findYourPlayerTwoBox()}
            {thePeachToYourMarioBox()}
            </div>
            {signUpBox()}
        </div>
    )
}