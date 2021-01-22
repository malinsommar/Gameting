import React, {useContext} from 'react'
import {useAuth} from '../../shared/global/provider/UserProvider'
import './profile.css'
import {useHistory} from 'react-router-dom'
import RoutingPath from '../../routes/RoutingPath'
import ProfileIcon from '@material-ui/icons/AccountCircleOutlined'
import SettingsIcon from '@material-ui/icons/SettingsOutlined'
import MessageIcon from '@material-ui/icons/ForumOutlined'
import MatchIcon from '@material-ui/icons/FavoriteBorderOutlined'
import LogOutIcon from '@material-ui/icons/ExitToAppOutlined'

export const Profile = () => {
    const history = useHistory()
    const {signOut} = useAuth()

    const logout = () => {
        signOut()
        history.push(RoutingPath.signInView)
    }

    return(
        <div className="profileWrapper">
            <img alt="your profile" className="profileImage" src={"https://thispersondoesnotexist.com/image"}/>
            <div className="profileDropDown">
                <ul>
                    <li onClick={() => history.push(RoutingPath.profileView)}><ProfileIcon className="profileDropDownIcon" />My profile</li>
                    <li onClick={() => history.push(RoutingPath.settingsView)}><SettingsIcon className="profileDropDownIcon" />Settings</li>
                    <li onClick={() => history.push(RoutingPath.messagesView)}><MessageIcon className="profileDropDownIcon" />Messages</li>
                    <li onClick={() => history.push(RoutingPath.matchRequestView)}><MatchIcon className="profileDropDownIcon" />Match requests</li>
                    <hr className="profileHr"/>
                    <li onClick={() => logout()}><LogOutIcon className="profileDropDownIcon" />Log out</li>
                </ul>
            </div>
        </div>
    )
}