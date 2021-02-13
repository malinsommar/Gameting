import React, {useEffect, useRef, useState} from 'react'
import MatchRequests from '../components/matchRequest/MatchRequest'
import SquareButton from '../components/buttons/squareButton/SquareBackground'
import SmallGameCard from '../components/gameCard/smallGameCard'
import PhotoGallery from '../components/imageGrid/PhotoGallery'
import ImageGrid from '../components/imageGrid/ImageGrid'
import BirthDayIcon from '@material-ui/icons/CakeOutlined'
import HeartIcon from '@material-ui/icons/FavoriteBorderOutlined'
import GenderIcon from '@material-ui/icons/WcOutlined'
import GamesIcon from '@material-ui/icons/SportsEsportsOutlined'
import gamesJson from '../data/games.json'
import {useAuth} from '../shared/global/provider/UserProvider'
import firebase from 'firebase/app'
import 'firebase/firestore'
import './profileView.css'
import './matchRequestView.css'

export const MatchRequestView = () => {

    const firestore = firebase.firestore()
    const [overview, setOverview] = useState(0)
    const [view, setView] = useState(0)
    const [chosenProfile, setChosenProfile] = useState()
    const [users, setUsers] = useState([])
    const {currentUser} = useAuth()
    
   useEffect(() => {
        firestore.collection('users').doc(currentUser.uid).get().then(function(doc) {

            doc.data().matchRequests.map((item, index) => {
                firestore.collection('users').doc(item).get().then(function(doc2) {
                    setUsers(users => [...users, doc2.data()])
                })
            })
        })
    }, [])

    const getOverview = () => {
        if(overview === 0) {
            return(
                <div className="matchPageView">
                <h1>Match requests</h1>
                {users > 0 ? <p>Looks like someone would like to get to know you! </p> : <p>Doesn't look like you have any requests atm.. </p>}
                <div className="matchRequestDiv">
                    {getMatchRequests()}
                </div>
                </div>
            )
        } else return(
            <div>
                <button onClick={() => setOverview(0)}>Back</button>
                {nameDiv()}
                <div className="profilePageDiv">
                    {aboutYouBox()}
                    {statsBox()}
                    {imagesOrGamesBox()}
                </div>
            </div>
        )
    }

    const changeToProfileView = (user) => {
        setChosenProfile(user)
        setOverview(1)
    }

    const getMatchRequests = () => {
        return users.map((item, index) => {
            return <MatchRequests key={index} name={item.name} image={item.profileImage} profileOnClick={() => changeToProfileView(item)} acceptOnClick={() => console.log("Accepted "+ item.name)} declineOnClick={() => console.log("Declined "+ item.name)} /> 
        })
    }

    // -- Profile page stuff --

    const nameDiv = () => {
        return (
            <div className="profileNameDiv">
                <h1 className="profileName">{chosenProfile.name + " " + chosenProfile.lastName}</h1>
            </div>
        )
    }
    
    const aboutYouBox = () => {
        return(
            <div className="profileAboutImageBox">
                <div className="profileImageDiv">
                    <img className="profileBigImage" alt="profile" src={chosenProfile.profileImage}/>
                    <button className="profileRequestButton">Send match request</button>
                </div>
                <div className="profileAboutMeDiv">
                    <div className="profileAboutMeInnerDiv">
                        <h3 className="profileAboutMeTitle">About me</h3>
                        <p className="profileAboutMeText">{chosenProfile.aboutMeText}</p>
                    </div>
                 </div>
            </div>
        )
    }

    const statsBox = () => {
        return(
            <div className="profileStatBox">
                <h1>Stats</h1>
                <ul className="profileStatList">
                    <li><BirthDayIcon className="profileStatsIcon" />{chosenProfile.age} y/o</li>
                    <li><GenderIcon className="profileStatsIcon" />{chosenProfile.sex}</li>
                    <li><HeartIcon className="profileStatsIcon" />{chosenProfile.searchSex}</li>
                    <li style={{fontSize: "16px"}}><GamesIcon className="profileStatsIcon" />{chosenProfile.favoriteGame}</li>
                </ul>
            </div>
        )
    }

    const getView = () => {
        if(view === 0) {
            return(
                <div className="profileImages">
                    <ImageGrid images={chosenProfile.images}/>
                    <PhotoGallery images={chosenProfile.images} className="galleryButton" />
                </div>
            )
        } else return(
            <div className="profileGames">
                {getAddedGames()}
            </div>
        )
    }

    const getAddedGames = () => {
       return chosenProfile.games.map((game, index) => {
            return <SmallGameCard key={index} name={gamesJson.games[game].name} image={gamesJson.games[game].background_image} />
        })
    }

    const imagesOrGamesBox = () => {

        return(
            <div className="imageOrGameDiv">
                <div className="imageOrGameDivButtons">
                    <SquareButton onClick={() => setView(0)} text="Images" id="imageOrGameDivButtonImages" />
                    <SquareButton onClick={() => setView(1)} text="Games" id="imageOrGameDivButtonGames" />
                </div>
                <hr />
                {getView()}
            </div>
        )
    }

    return(
        <div>
            {getOverview()}
        </div>
    )
}
