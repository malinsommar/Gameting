import React, {useEffect, useContext} from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import {UserContext} from '../shared/global/provider/UserProvider'
import RoutingPath from './RoutingPath'

import {HomeView} from '../view/HomeView'
import {ContactView} from '../view/ContactView'
import {MatchRequestView} from '../view/MatchRequestView'
import {MatchView} from '../view/MatchView'
import {MessagesView} from '../view/MessagesView'
import {ProfileView} from '../view/ProfileView'
import {SettingsView} from '../view/SettingsView'
import {SignInView} from '../view/SignInView'
import {SignUpView} from '../view/SignUpView'

export const Routing = (props) => {

    const [authenticatedUser, setAuthenticatedUser] = useContext(UserContext);

    const blockRouteIfAuthenticated = (navigateToView) => {
        return authenticatedUser ? HomeView : navigateToView
    }

    const blockRouteIfNotAuthenticated = (navigateToView) => {
        return !authenticatedUser ? SignInView: navigateToView
    }

    useEffect(() => {
        checkIfUserIfAuthenticated()
    }, [])
    

    const checkIfUserIfAuthenticated = () => {
        setAuthenticatedUser(localStorage.getItem("name"))
    }

    return(
        <div>
            <Router>
                {props.children}
                <Switch>    
                    <Route exact path={RoutingPath.homeView} component={blockRouteIfNotAuthenticated(HomeView)}/>
                    <Route exact path={RoutingPath.contactView} component={ContactView}/>
                    <Route exact path={RoutingPath.matchRequestView} component={blockRouteIfNotAuthenticated(MatchRequestView)}/>
                    <Route exact path={RoutingPath.matchView} component={blockRouteIfNotAuthenticated(MatchView)}/>
                    <Route exact path={RoutingPath.messagesView} component={blockRouteIfNotAuthenticated(MessagesView)}/>
                    <Route exact path={RoutingPath.profileView} component={blockRouteIfNotAuthenticated(ProfileView)}/>
                    <Route exact path={RoutingPath.settingsView} component={blockRouteIfNotAuthenticated(SettingsView)}/>
                    <Route exact path={RoutingPath.signUpView} component={blockRouteIfAuthenticated(SignUpView)}/>
                    <Route component={blockRouteIfAuthenticated(SignInView)}/>
                </Switch>
            </Router>
        </div>
    )
}