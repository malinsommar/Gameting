import React from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import {useAuth} from '../shared/global/provider/UserProvider'
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
import {ResetPasswordView} from '../view/ForgotPasswordView'
import {NewAccountView} from '../view/NewAccountView'

export const Routing = (props) => {

    const {currentUser} = useAuth()

    const blockRouteIfAuthenticated = (navigateToView) => {
        return currentUser ? HomeView : navigateToView
    }

    const blockRouteIfNotAuthenticated = (navigateToView) => {
        return !currentUser ? SignInView : navigateToView
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
                    <Route exact path={RoutingPath.newAccountView} component={blockRouteIfNotAuthenticated(NewAccountView)}/>
                    <Route exact path={RoutingPath.forgotPassword} component={blockRouteIfAuthenticated(ResetPasswordView)}/>
                    <Route component={blockRouteIfAuthenticated(SignInView)}/>
                </Switch>
            </Router>
        </div>
    )
}