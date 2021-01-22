import React, {useContext} from 'react'
import './NavigationBar.css'
import Logotype from '../../shared/images/gameLogotype.svg'
import { useHistory } from 'react-router-dom'
import {useAuth} from '../../shared/global/provider/UserProvider'
import {Profile} from '../profile/profile'
import RoutingPath from '../../routes/RoutingPath'

export const NavigationBar = () => {
    const history = useHistory();
    const {currentUser} = useAuth()

    const displayUserIfAuthenticated = () => {
        return (currentUser) 
        ? <div className="profileNavigation"><Profile /></div>
        : <span onClick={() => history.push(RoutingPath.signUpView)} className="navigation" id="signInNavigation">Sign Up</span>
    }

    return(
        <div className="navigationBarWrapper">
            <img onClick={() => history.push(RoutingPath.homeView)} className="logotype" src={Logotype} alt="logo" />
            <span onClick={() => history.push(RoutingPath.matchView)} className="navigation" id="firstCell">Match</span>
            <span onClick={() => history.push(RoutingPath.contactView)} className="navigation" id="lastCell">Contact us</span>
            {displayUserIfAuthenticated()}
        </div>
    )
}