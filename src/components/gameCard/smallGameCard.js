import React from 'react'
import './gameCard.css'

const GameCard = ({image, name}) => {
    
    return(
        <div className="smallGameCard">
            <img src={image} alt={name}/>
            <div>
                <h1>{name}</h1>
            </div>
        </div>
    )
}

export default GameCard