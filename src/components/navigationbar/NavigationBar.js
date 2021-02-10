import React from 'react'
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

    const displayMatchIfAuthenticated = () => {
        
        if(currentUser) {
            return <span onClick={() => history.push(RoutingPath.matchView)} className="navigation" id="firstCell">Match</span>
        }  
    }

    return(
        <div className="navigationBarWrapper">
            <img onClick={() => history.push(RoutingPath.homeView)} className="logotype" src={Logotype} alt="logo" />
            {displayMatchIfAuthenticated()}
            <span onClick={() => history.push(RoutingPath.contactView)} className="navigation" id="lastCell">Contact</span>
            {displayUserIfAuthenticated()}
        </div>
    )
}