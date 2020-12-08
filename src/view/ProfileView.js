import React, { useState } from 'react'
import MultiCarousel from '../components/multiCarousel/MultiCarousel'
import ImageGrid from '../components/imageGrid/ImageGrid'
import './profileView.css'


export const ProfileView = () => {

    const [view, setView] = useState(0)

    const tempGames = [
        {
            name: "World of warcraft",
            image: "https://www.slashgear.com/wp-content/uploads/2019/09/World-of-Warcraft-classic-onyxia.jpg",
        },
        {
            name: "The witcher 3",
            image: "https://image.api.playstation.com/vulcan/img/rnd/202009/2913/TQKAd8U6hnIFQIIcz6qnFh8C.png",
        },
        {
            name: "Overwatch",
            image: "https://upload.wikimedia.org/wikipedia/en/5/51/Overwatch_cover_art.jpg",
        },
    ]

    const images = ["https://thispersondoesnotexist.com/image", "https://thispersondoesnotexist.com/image", "https://thispersondoesnotexist.com/image", "https://thispersondoesnotexist.com/image", "https://thispersondoesnotexist.com/image", "https://thispersondoesnotexist.com/image"]

    const getGames = () => {
        return tempGames.map((game, index) => {
            return (
                <div>
                    <p>{game.name}</p>
                </div>
            )
        })
    }

    const nameDiv = () => {
        return (
            <div className="profileNameDiv">
                <h1 className="profileName" >Kalle Andersson</h1>
            </div>
        )
    }
    
    const aboutYouBox = () => {
        return(
            <div className="profileAboutImageBox">
                <div className="profileImageDiv">
                    <img className="profileBigImage" alt="profile" src="https://thispersondoesnotexist.com/image"/>
                    <button className="profileRequestButton">Send match request</button>
                </div>
                <div className="profileAboutMeDiv">
                    <div className="profileAboutMeInnerDiv">
                        <h3 className="profileAboutMeTitle">About me</h3>
                        <p className="profileAboutMeText">When im not raiding in wow (which is pretty much every day) i like to hang out with my friends
                        and play tennis, im a huge fan of traveling aswell, i hope that i'll get the chance to visit
                        Japan someday. </p>
                    </div>
                 </div>
            </div>
        )
    }

    const statsBox = () => {
        return(
            <div className="profileStatBox">
               <h1>Stats</h1>
               <p>Birthday</p>
               <p>Gender</p>
               <p>Looking for</p>
               <p>Favorite game</p>
            </div>
        )
    }

    const getView = () => {
        if(view === 0) {
            return(
                <div className="profileImages">
                    <ImageGrid images={images}/>
                </div>
            )
        } else return(
            <div className="profileGameCarousel">
                <MultiCarousel items={getGames()} />
            </div>
        )
    }

    const imagesOrGamesBox = () => {
        return(
            <div className="imageOrGameDiv">
                <button onClick={() => setView(0)}>Images</button>
                <button onClick={() => setView(1)}>Games</button>
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