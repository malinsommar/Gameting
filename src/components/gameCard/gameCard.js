import React from 'react'
import './gameCard.css'

const GameCard = ({image, video, name, button, onClick, disabled}) => {
    
    return(
        <div className="gameCard">
            <img src={image} alt={name}/>
            <div>
                <h1>{name}</h1>
                <button disabled={disabled} onClick={onClick}>{button}</button>
            </div>
        </div>
    )
}

export default GameCard