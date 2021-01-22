import React, { useState, useEffect } from 'react'
import games from '../data/games.json'
import {useAuth} from '../shared/global/provider/UserProvider'
import SquareButton from '../components/buttons/squareButton/SquareBackground'
import SaveSettingsButton from '../components/buttons/saveSettings/SaveSettings'
import TextField from '../components/textFields/textField'
import SelectField from '../components/textFields/selectFields'
import PasswordField from '../components/textFields/passwordField'
import GameCard from '../components/gameCard/gameCard'
import './settingsView.css'
import { fi } from 'date-fns/locale'

export const SettingsView = () => {

    const [view, setView] = useState(0)
    const [partnerSex, setPartnerSex] = useState("")
    const [partnerMinAge, setPartnerMinAge] = useState("")
    const [partnerMaxAge, setPartnerMaxAge] = useState("")
    const [password, setPassword] = useState("")
    const [currentPassword, setCurrentPassword] = useState("")
    const [controlPassword, setControlPassword] = useState("")
    const [search, setSearch] = useState("")

    const [error, setError] = useState()
    const [loading, setLoading] = useState()
    const [addedGames, setAddedGames] = useState([2,5,7])
    const [notAddedGames, setNotAddedGames] = useState(games.games)

    const {updatePassword, deleteAccount} = useAuth()

    async function changePassword(e) {
        e.preventDefault()

        if (password !== currentPassword) {
            return setError("Current password is incorrect")
          }

        if (password !== controlPassword) {
            return setError("Passwords do not match")
          }
          
        try {
            setError("")
            setLoading(true)
            updatePassword(password)
          } catch {
            setError("Failed to update password")
          }
          setLoading(false)
      }

   /* useEffect(() => {
        Axios.get("https://api.rawg.io/api/games?key=c457e24025af43f4bde3c84f917e67c1",{method: "head" ,mode: "no-cors"})
        .then((response) => setData(response.data))
        .catch((error) => console.log(error))
        console.log(data);
    })
*/
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

    const partnerSettingsView = () => {
        return (
            <div>
                <div className="settingsPartnerDiv">
                    <h1>Partner requirements</h1>
                    <TextField type="standard-basic" text="Min age" onChange={event => setPartnerMinAge(event.target.value)}/>
                    <TextField type="standard-basic" text="Max age" onChange={event => setPartnerMaxAge(event.target.value)}/>
                    <SelectField /*onChange={event => setSex(event.target.value)}*/ />  
                    <SaveSettingsButton id="partnerSettingsSaveButton" text="Save" />
                </div>
            </div>
        )
    }

    const accountSettingsView = () => {
        return (
            <div style={{display:"flex", marginTop: "50px"}}>
                <div className="settingsChangePasswordDiv">
                    <h1>Chage password</h1>
                    <PasswordField text="Current password" /> 
                    <PasswordField text="New password" /> 
                    <PasswordField text="Repeat new password" /> 
                    <SaveSettingsButton id="changePasswordButton" text="Save"/> 
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
    }
    //setAddedGames(addedGames.sort((a, b) => (games.games[a].name > games.games[b].name) ? 1 : -1))


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
                    onClick={ () => addGameToList(game)} 
                />
        )})
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
                    onClick={() => setAddedGames(addedGames.filter(item => item !== game))}
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