import React, { useState, useEffect} from 'react'
import {useAuth} from '../shared/global/provider/UserProvider'
import firebase from 'firebase/app'
import SquareButton from '../components/buttons/squareButton/SquareBackground'
import SmallGameCard from '../components/gameCard/smallGameCard'
import PhotoGallery from '../components/imageGrid/PhotoGallery'
import ImageGrid from '../components/imageGrid/ImageGrid'
import BirthDayIcon from '@material-ui/icons/CakeOutlined'
import SaveIcon from '@material-ui/icons/Save'
import HeartIcon from '@material-ui/icons/FavoriteBorderOutlined'
import GenderIcon from '@material-ui/icons/WcOutlined'
import GamesIcon from '@material-ui/icons/SportsEsportsOutlined'
import gamesJson from '../data/games.json'
import './profileView.css'
import 'firebase/firestore'

const firestore = firebase.firestore()

export const ProfileView = () => {
    const [view, setView] = useState(0)
    const {currentUser} = useAuth()
    const [name, setName] = useState()
    const [lastName, setLastName] = useState()
    const [sex, setSex] = useState()
    const [age, setAge] = useState()
    const [searchSex, setSearchSex] = useState()
    const [favoriteGame, setFavoriteGame] = useState()
    const [games, setGames] = useState([])
    const [aboutMeText, setAboutMeText] = useState()
    const [profileImage, setProfileImage] = useState()
    const [images, setImages] = useState([])
    const [editMode, setEditMode] = useState(0)
    const [editAboutMeText, setEditAboutMeText] = useState()

    const userRef = firestore.collection('users').doc(currentUser.uid)
    
    useEffect(() => {
        userRef.get().then(function(doc) {
            setName(doc.data().name)
            setLastName(doc.data().lastName)
            setSex(doc.data().sex)
            setAge(doc.data().age)
            setSearchSex(doc.data().searchSex)
            doc.data().favoriteGame === "" ? setFavoriteGame("???") : setFavoriteGame(doc.data().favoriteGame)
            setGames(doc.data().games)
            setAboutMeText(doc.data().aboutMeText)
            setEditAboutMeText(doc.data().aboutMeText)
            setProfileImage(doc.data().profileImage)
            setImages(doc.data().images)
        })
    }, [])
    
    const toggleEditMode = () => {
        if(editMode === 0) {
            setEditMode(1)
        } else setEditMode(0)
    }

    const onSaveAboutMeText = () => {
        userRef.update({
            aboutMeText: editAboutMeText
        })
    }

    const nameDiv = () => {
        return (
            <div className="profileNameDiv">
                <h1 className="profileName">{name + " " + lastName}</h1>
            </div>
        )
    }

    const checkIfProfileImage = () => {
        if(profileImage === "") {
            return "https://www.cellmark.co.uk/media/1526/anonymous-avatar-icon-25.jpg"
        } else return profileImage
    }
    
    const aboutYouBox = () => {
        return(
            <div className="profileAboutImageBox">
                <div className="profileImageDiv">
                    <img className="profileBigImage" alt="profile" src={checkIfProfileImage()}/>
                    <button onClick={() => toggleEditMode()} className="profileRequestButton">{editMode === 1 ? "Exit edit mode" : "Edit profile"}</button>
                </div>
                <div className="profileAboutMeDiv">
                    <div className="profileAboutMeInnerDiv">
                        <h3 className="profileAboutMeTitle">About me</h3>
                        {editMode === 1 
                        ? <div className="aboutMeEditDiv">
                            <textarea onChange={event => setEditAboutMeText(event.target.value)} type="text" value={editAboutMeText}  />
                            <button onClick={() => onSaveAboutMeText()}>Save</button>
                        </div> 
                        : <p className="profileAboutMeText">{aboutMeText}</p>}
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
                    <li><BirthDayIcon className="profileStatsIcon" />{age} y/o</li>
                    <li><GenderIcon className="profileStatsIcon" />{sex}</li>
                    <li><HeartIcon className="profileStatsIcon" />{searchSex}</li>
                    <li style={{fontSize: "16px"}}><GamesIcon className="profileStatsIcon" />{favoriteGame}</li>
                </ul>
            </div>
        )
    }

    const getView = () => {
        if(view === 0) {
            return(
                <div className="profileImages">
                    <ImageGrid images={images}/>
                    <PhotoGallery images={images} className="galleryButton" />
                </div>
            )
        } else return(
            <div className="profileGames">
                {getAddedGames()}
            </div>
        )
    }

    const getAddedGames = () => {
       return games.map((game, index) => {
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
            {nameDiv()}
            <div className="profilePageDiv">
                {aboutYouBox()}
                {statsBox()}
                {imagesOrGamesBox()}
            </div>
        </div>
    )
}