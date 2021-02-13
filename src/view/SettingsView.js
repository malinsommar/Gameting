import React, { useState, useEffect } from 'react'
import games from '../data/games.json'
import SquareButton from '../components/buttons/squareButton/SquareBackground'
import {useAuth} from '../shared/global/provider/UserProvider'
import GameCard from '../components/gameCard/gameCard'
import './settingsView.css'

import firebase from 'firebase/app'
import 'firebase/firestore'
const firestore = firebase.firestore()

export const SettingsView = () => {

    const [view, setView] = useState(0)
    const [partnerSex, setPartnerSex] = useState("")
    const [partnerMinAge, setPartnerMinAge] = useState("")
    const [partnerMaxAge, setPartnerMaxAge] = useState("")
    const [password, setPassword] = useState("")
    const [currentPassword, setCurrentPassword] = useState("")
    const [controlPassword, setControlPassword] = useState("")
    const [search, setSearch] = useState("")
    const [currentMinAge, setCurrentMinAge] = useState("")
    const [currentMaxAge, setCurrentMaxAge] = useState("")
    const [currentPartnerSex, setCurrentPartnerSex] = useState("")
    const [favoriteGame, setFavoriteGame] = useState("")

    const [error, setError] = useState()
    const [loading, setLoading] = useState()
    const [addedGames, setAddedGames] = useState()
    const [notAddedGames, setNotAddedGames] = useState(games.games)

    const {updatePassword, deleteAccount, currentUser} = useAuth()
    
    const userRef = firestore.collection('users').doc(currentUser.uid)

    useEffect(() => {
        userRef.get().then(function(doc) {
            setAddedGames(doc.data().games)
            setCurrentMinAge(doc.data().searchMinAge)
            setCurrentMaxAge(doc.data().searchMaxAge)
            setCurrentPartnerSex(doc.data().searchSex)
            setFavoriteGame(doc.data().favoriteGame)
        })
    }, [])
    
    const selectView = () => {
        if(view === 0){
            return partnerSettingsView()
        }
        else if(view === 1){
            return accountSettingsView()
        }
        else if(view === 2){
            return favoriteGamesView()
        }
    }

    const chooseViewBar = () => {
        return(
            <div>
                <div className="settingsButtonsDiv">
                    <SquareButton onClick={() => setView(0)} text="Partner" id="partnerSettingsButton" />
                    <SquareButton onClick={() => setView(1)} text="Account" id="accountSettingsButton" />
                    <SquareButton onClick={() => setView(2)} text="Games" id="favoriteGamesSettingsButton" />
                </div>
                <hr className="settingsHr"/>
            </div>
        )
    }

    // --------  Partner settings  --------

    const updatePartnerData = (e) => {
        e.preventDefault()

        return userRef.update({
            searchMinAge: partnerMinAge,
            searchMaxAge: partnerMaxAge,
            searchSex: partnerSex
        })
        .then(function() {
            alert("Document successfully updated!")
            setPartnerMinAge("")
            setPartnerMaxAge("")
            partnerSex("")
        })
        .catch(function(error) {
            console.error("Error updating document: ", error);
        });
    }

    const partnerSettingsView = () => {
        return (
            <div>
                <div className="settingsPartnerDiv">
                    <h1>Partner requirements</h1>
                    <form onSubmit={updatePartnerData}>
                        <h3>Age: </h3>
                        <label>Min </label>
                        <input
                            type='number'
                            min="15"
                            max="100"
                            text="MinAge"
                            value={currentMinAge}
                            onChange={event => setPartnerMinAge(event.target.value)}
                        />
                        <label> Max </label>
                        <input
                            type='number'
                            min="15"
                            max="100"
                            value={currentMaxAge}
                            text="MaxAge"
                            onChange={event => setPartnerMaxAge(event.target.value)}
                        />
                        <br /><br/>
                        <h3>Sex: </h3>
                        <input type="radio" value="Female" name="gender" onChange={event => setPartnerSex(event.target.value)} /> Female <br/>
                        <input type="radio" value="Male" name="gender" onChange={event => setPartnerSex(event.target.value)} /> Male <br/>
                        <input type="radio" value="Both" name="gender" onChange={event => setPartnerSex(event.target.value)} /> Both
                        <br />
                        <input
                            id="partnerSettingsSaveButton"
                            type='submit'
                        />
                    </form>
                </div>
            </div>
        )
    }

    // --------  Account  --------

    const accountSettingsView = () => {
        return (
            <div style={{display:"flex", marginTop: "50px"}}>
                <div className="settingsChangePasswordDiv">
                    <h1>Change password</h1>
                    <form onSubmit={changePassword}>
                        <p>Current password</p>
                        <input
                            type='password'
                            onChange={event => setCurrentPassword(event.target.value)}
                        />
                        <br />
                        <p>New password</p>
                        <input
                            type='password'
                            onChange={event => setPassword(event.target.value)}
                        />
                        <br />
                        <p>Repeat new password</p>
                        <input
                            type='password'
                            onChange={event => setControlPassword(event.target.value)}
                        />
                        <br />
                        <input
                            id="changePasswordButton"
                            type='submit'
                        />
                    </form>
                </div>
                <div className="settingsScaryButtonDiv">
                    <div className="scaryButtonText">
                        <h2>The scary button</h2>
                        <p>Dont press this button unless <br /> you are truly sure you want to<br /> delete your account.</p>
                    </div>
                    <button onClick={() => deleteAccount()}>Delete account</button>
                </div>
            </div>
        )
    }

    async function changePassword(e) {
        e.preventDefault()

        /*if (currentUser.password !== currentPassword) {
            return setError("Current password is incorrect")
          }*/

        if (password !== controlPassword) {
            alert("Passwords do not match")
          } else {
            try {
                setError("")
                setLoading(true)
                updatePassword(password)
            } catch {
                setError("Failed to update password")
            }
            setLoading(false) 
        }
    }

    // -------- Game settings --------

    
    const updateFavoriteGameDataBase = (game) => {

        return userRef.update({
            favoriteGame: game
        })
        .then(function() {
            console.log("Document successfully updated!")
        })
        .catch(function(error) {
            console.error("Error updating document: ", error);
        });
    }

    const updateGamesFirestore = (list) => {
        userRef.update({
            games: list
        })
        .then(function() {
            console.log("Document successfully updated!")
        })
        .catch(function(error) {
            console.error("Error updating document: ", error)
        })
    }

    const addButton = (game) => {
        let foundGame = false

        addedGames.map((item) => {
            if(games.games[item].name === game.name) {
                foundGame = true
            }
        })
        if(foundGame){
            return "Added"
        } else return "Add"
    }

    const disableButton = (game) => {
        let foundGame = false

        addedGames.map((item) => {
            if(games.games[item].name === game.name) {
                foundGame = true
            }
        })    

        if(foundGame){
            return true
        } else return false
    }

    const addGameToList = (game) => {
        games.games.map((item, index) => {
            if(game.name === item.name){
                setAddedGames(addedGames => [...addedGames, index])
            }
        })
        //updateGamesFirestore()
    }

    /*
 const getUpdateListAdd = (game) => {
        const updateList = []

        games.games.map((item, index) => {
            if(game.name === item.name){
                updateList.push(index)
            }
        })

        return updateList
    }

    const addGameToList = (game) => {
        const tempList = [addedGames]
        tempList.push(getUpdateListAdd(game))
        updateGamesFirestore(tempList)
        setAddedGames(tempList)
    }
    */

    const getUpdateList = (game) => {
        const updateList = addedGames.filter(item => item !== game)
        return updateList
    }

    const deleteGame = (game) => {
        updateGamesFirestore(getUpdateList(game))
        setAddedGames(getUpdateList(game))
    }

    const getNotAddedGameCards = () => {
        const sortedList = notAddedGames.sort((a, b) => (a.name > b.name) ? 1 : -1)
        return sortedList.map((game, index) => {
            return (
                <GameCard 
                    key={index} 
                    name={game.name} 
                    button={addButton(game)} 
                    disabled={disableButton(game)}
                    image={game.background_image} 
                    onClick={() => addGameToList(game)} 
                    isFavorite={game.name === favoriteGame ? true : false}
                />
        )})
    }

    const onClickHeart = (heart, game) => {
        if(heart === 0) {
            setFavoriteGame("")
            updateFavoriteGameDataBase("")

        } else if(heart === 1) {
            setFavoriteGame(game)
            updateFavoriteGameDataBase(game)        
        }
    }

    const getAddedGameCards = () => {
        const sortedList = addedGames.sort((a, b) => (a.name > b.name) ? 1 : -1)
        return sortedList.map((game) => {
            return ( 
                <GameCard 
                    key={game} 
                    name={games.games[game].name} 
                    button="Delete" 
                    image={games.games[game].background_image} 
                    onClick={() => deleteGame(game)}
                    isFavorite={games.games[game].name === favoriteGame ? true : false}
                    onFilledHeartClick={() => onClickHeart(0, games.games[game].name)}
                    onOutlinedHeartClick={() => onClickHeart(1, games.games[game].name)}
                />
        )})
    }

    const onSearchGames = (e) => {
        e.preventDefault()
        if (e) {
          const searchWord = e.target.elements.input.value.trim().toLowerCase();
          setNotAddedGames(filterSearch(searchWord));
        }
      };

    const filterSearch = (searchWord) => 
        games.games.filter((game) => {
            if(game.name.toLowerCase().includes(searchWord)) {
                return game
            }
        })

    const favoriteGamesView = () => {
        return (
            <div style={{marginTop: "30px"}}>
                <div className="settingsYourGamesDiv">
                    <h2>Your games</h2>
                    <div style={{display:"inline-block", overflow:"overlay", height:"640px"}}>
                        {getAddedGameCards()}
                    </div>
                    <button className="saveGamesButton" onClick={() => updateGamesFirestore(addedGames)}>Save</button>
                </div>
                <div className="settingsAddGamesDiv">
                    <h2>Add new games</h2>
                    <form onSubmit={onSearchGames}>
                        <input name="input" className="box" type="textfield"></input>
                        <button id="seachButton">Search</button>
                    </form>
                    <div style={{display:"inline-block", overflow:"overlay", height:"640px"}}>
                        {getNotAddedGameCards()}
                    </div>
                </div>
            </div>
        )
    }

    return(
        <div>
            {chooseViewBar()}
            {selectView()}
        </div>
    )
}