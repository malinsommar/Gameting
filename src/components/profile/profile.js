import React, {useContext} from 'react'
import { UserContext } from '../../shared/global/provider/UserProvider'
import './profile.css'
import {useHistory} from 'react-router-dom'
import RoutingPath from '../../routes/RoutingPath'

export const Profile = () => {
    const history = useHistory()
    const [authenticatedUser, setAuthenticatedUser] = useContext(UserContext);

    const logout = () => {
        localStorage.removeItem('name')
        setAuthenticatedUser(false)
        history.push(RoutingPath.signInView)
    }

    return(
        <div className="profileWrapper">
            <img alt="your profile" className="profileImage" src={"https://thispersondoesnotexist.com/image"}/>
            <div className="profileDropDown">
                <a onClick={() => history.push(RoutingPath.profileView)}>My profile</a>
                <a onClick={() => history.push(RoutingPath.settingsView)}>Settings</a>
                <a onClick={() => history.push(RoutingPath.messagesView)}>Messages</a>
                <a onClick={() => history.push(RoutingPath.matchRequestView)}>Match requests</a>
                <hr className="profileHr"/>
                <a onClick={() => logout()}>Log out</a>
            </div>
        </div>
    )
}