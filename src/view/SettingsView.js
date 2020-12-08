import React, { useState } from 'react'
import TextField from '../components/textFields/textField'
import SelectField from '../components/textFields/selectFields'
import PasswordField from '../components/textFields/passwordField'

export const SettingsView = () => {

    const [view, setView] = useState(0)
    const [partnerSex, setPartnerSex] = useState("")
    const [partnerMinAge, setPartnerMinAge] = useState("")
    const [partnerMaxAge, setPartnerMaxAge] = useState("")
    const [aboutYouText, setAboutYouText] = useState("")
    const [password, setPassword] = useState("")
    const [controllPassword, setControllPassword] = useState("")
    const [search, setSearch] = useState("")

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
                <button onClick={() => setView(0)}>Partner settings</button>
                <button onClick={() => setView(1)}>Account settings</button>
                <button onClick={() => setView(2)}>Favorite games</button>
                <hr />
            </div>
        )
    }

    const partnerSettingsView = () => {
        return (
            <div>
                <div>
                    <TextField type="standard-basic" text="Min age" onChange={event => setPartnerMinAge(event.target.value)}/>
                    <TextField type="standard-basic" text="Max age" onChange={event => setPartnerMaxAge(event.target.value)}/>
                    <SelectField /*onChange={event => setSex(event.target.value)}*/ />  
                </div>
            </div>
        )
    }

    const accountSettingsView = () => {
        return (
            <div>
                <PasswordField text="Password" /> 
                <PasswordField text="Repeat password" /> 
                <h2>The scary button</h2>
                <p>Dont press this button unless you are truly sure you want to delete your account.</p>
                <button>Delete account</button>
            </div>
        )
    }

    const favoriteGamesView = () => {
        return (
            <div>
                <div>
                    <h2>Your games</h2>
                </div>
                <div>
                    <h2>Add new games</h2>
                    <TextField type="standard-basic" text="Search" onChange={event => setSearch(event.target.value)}/>
                    <h2>Trending games</h2>
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