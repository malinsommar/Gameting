import React , {useState, useContext} from 'react'
import {UserContext, UserProvider} from '../shared/global/provider/UserProvider'
import {useHistory} from 'react-router-dom'

export const SignInView = () => {
    const history = useHistory()
    const [name, setName] = useState()
    const [password, setPassword] = useState()
    const [authenticatedUser, setAuthenticatedUser] = useContext(UserContext);

    const login = () => {
        setAuthenticatedUser(name);
        localStorage.setItem("name", name)
        history.push('/')
    }

    return(
        <div>
            <span>Name: </span><input onChange={event => setName(event.target.value)} /> <br/>
            <span>Password: </span><input type="password" onChange={event => setPassword(event.target.value)} /> <br/>
            <button onClick={() => login()}>Logga in</button>
        </div>
    )
}