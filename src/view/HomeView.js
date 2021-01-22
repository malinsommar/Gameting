import React from 'react'
import { useHistory } from 'react-router-dom'
import RoutingPath from '../routes/RoutingPath'
import './homeView.css'

export const HomeView = () => {
    const history = useHistory();

    return(
        <div className="homePage">
            <div className="homeLeftSection">
                <h1>Good morning <span className="darkPurpleText">Kalle</span></h1>
                <div className="homeNewNotiflications">
                    <p onClick={() => history.push(RoutingPath.messagesView)} className="navigation" id="firstCell">2 new messages</p>
                    <p onClick={() => history.push(RoutingPath.matchRequestView)} className="navigation" id="firstCell">4 new match request</p>
                </div>
            </div>

            <div className="homeRightSection">
                <p>" Gaming quote bla bla blablbl balb labla bl a <br/>
                blabla bal bla"</p>
                <p>-Karaktär, spel</p>
            </div>
        </div>
    )
}