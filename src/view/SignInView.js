import React , {useState, useContext} from 'react'
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
            <div className="logInDiv">
            <h2>Sign in</h2>
                <form onSubmit={login}>
                    <p>Mail: </p>
                    <input
                        className="inputField"
                        type='text'
                        onChange={event => setName(event.target.value)}
                    />
                    <p>Password: </p>
                    <input
                        className="inputField"
                        type='password'
                        onChange={event => setPassword(event.target.value)}
                    /> <br />
                    <input
                        className="logInButton"
                        type='submit'
                        value="Login"
                    />
                </form>
                <p className="clickable" onClick={() => history.push("/signUp")}>Dont have an account? Sign up!</p>
                <p className="clickable" onClick={() => history.push("/resetPassword")}>Forgot your password?</p>
            </div>
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