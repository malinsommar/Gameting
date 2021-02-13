import React, {useEffect, useState} from 'react'
import MatchProfileCard from '../components/matchProfileCard/MatchProfileCard'
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

export const MatchView = () => {

    const firestore = firebase.firestore()
    const [users, setUsers] = useState([])
    const [usersSameFavoriteGame, setUsersSameFavoriteGame] = useState([])
    const currentUserData = []
    const [overview, setOverview] = useState(0)
    const [view, setView] = useState(0)
    const [chosenProfile, setChosenProfile] = useState()
    const [chosenProfileMatchRequests, setChosenProfileMatchRequests] = useState()
    const {currentUser} = useAuth()

    useEffect(() => {
        firestore.collection('users').doc(currentUser.uid).get().then(function(doc) {
            currentUserData.push(doc.data())
        })
        firestore.collection("users").get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                //This checks if the users match, checking both users sex and age.
                if(currentUser.uid !== doc.data().userId && currentUserData[0].searchMinAge <= doc.data().age && currentUserData[0].searchMaxAge >= doc.data().age && doc.data().searchMinAge <= currentUserData[0].age && doc.data().searchMaxAge >= currentUserData[0].age){
                    if(currentUserData[0].searchSex === doc.data().sex || currentUserData[0].searchSex === "Both"){
                        if(doc.data().searchSex === currentUserData[0].sex || doc.data().searchSex === "Both") {
                            setUsers(users => [...users, doc.data()])

                            if(currentUserData[0].favoriteGame === doc.data().favoriteGame && currentUserData[0].favoriteGame !== ""){
                                setUsersSameFavoriteGame(usersSameFavoriteGame => [...usersSameFavoriteGame, doc.data()])
                            }
                        }
                    }
                }
            })
        })
    }, [])

    const updateRequestFirestore = (list) => {

        return firestore.collection('users').doc(chosenProfile.userId).update({
            matchRequests: list
        })
        .then(function() {
            console.log("Document successfully updated!")
        })
        .catch(function(error) {
            console.error("Error updating document: ", error);
        });
    }

    const getOverview = () => {
        if(overview === 0) {
            return(
                <div className="matchPageView">
                    <h1>Browse</h1>
                    {printOutUsers(0)}
                    <h1>Same favorite game</h1>
                    {printOutUsers(1)}
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
        setChosenProfileMatchRequests(user.matchRequests)
        setOverview(1)
    }

    const printOutUsers = (mode) => {
        if(mode === 0) {
            return users.map((item, index) => {
                return <MatchProfileCard key={index} name={item.name} image={item.profileImage} id={item.userId} onClick={() => changeToProfileView(item)} />
            })
        }
        if(mode === 1) {
            return usersSameFavoriteGame.map((item, index) => {
                return <MatchProfileCard key={index} name={item.name} image={item.profileImage} id={item.userId} onClick={() => changeToProfileView(item)} />
            })
        }
    }

    // -- Profile page stuff --

    const nameDiv = () => {
        return (
            <div className="profileNameDiv">
                <h1 className="profileName">{chosenProfile.name + " " + chosenProfile.lastName}</h1>
            </div>
        )
    }

    const getUpdateRequests = (request) => {
        const updateList = chosenProfile.matchRequests
        updateList.push(request)
        return updateList
    }

    const onSendMatchRequest = () => {
        updateRequestFirestore(getUpdateRequests(currentUser.uid))
        setChosenProfileMatchRequests(getUpdateRequests(currentUser.uid))
    }

    const disableIfRequestSent = () => {
        let disabled = false
        chosenProfileMatchRequests.map((item) => {
            if(item === currentUser.uid) {
                disabled = true
            }
        })
        return disabled
    }
    
    const aboutYouBox = () => {
        return(
            <div className="profileAboutImageBox">
                <div className="profileImageDiv">
                    <img className="profileBigImage" alt="profile" src={chosenProfile.profileImage}/>
                    <button disabled={disableIfRequestSent()} onClick={() => onSendMatchRequest()} className="profileRequestButton">Send match request</button>
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