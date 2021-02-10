import React, {useState, useEffect} from 'react'
import RoutingPath from '../routes/RoutingPath'
import { useHistory } from 'react-router-dom'
import {useAuth} from '../shared/global/provider/UserProvider'
import firebase from 'firebase/app'
import './homeView.css'
import 'firebase/firestore'

export const HomeView = () => {
    const history = useHistory()
    const {currentUser} = useAuth()
    const [name, setName] = useState()
    const [matchRequests, setMatchRequests] = useState()
    const time = new Date().getHours()

    const firestore = firebase.firestore()
    const userRef = firestore.collection('users').doc(currentUser.uid)

    useEffect(() => {
        userRef.get().then(function(doc) {
            setName(doc.data().name)
            setMatchRequests(doc.data().matchRequests.length)
        })
    }, [])

    const getTimeOfDay = () => {
        if(time >= 5 && time < 12) {
            return "Good morning "
        }   
        else if(time >= 12 && time < 17) {
            return "Good afternoon "
        }
        else return "Good evening "
        
    }

    return(
        <div className="homePage">
            <div className="homeLeftSection">
                <h1>{getTimeOfDay()} <span className="darkPurpleText">{name}</span></h1>
                <div className="homeNewNotiflications">
                    <p onClick={() => history.push(RoutingPath.messagesView)} className="navigation" id="firstCell">0 new messages</p>
                    <p onClick={() => history.push(RoutingPath.matchRequestView)} className="navigation" id="firstCell">{matchRequests} new match request</p>
                </div>
            </div>

            <div className="homeRightSection">
                <p>"The right man in the wrong place can make all the <br/>difference in the world."</p>
                <p>- G-man, Half-life 2</p>
            </div>
        </div>
    )
}