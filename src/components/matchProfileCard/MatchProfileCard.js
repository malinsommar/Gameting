import React from 'react'
import './matchProfileCard.css'

const MatchProfileCard = ({image, name, onClick}) => {
    
    return(
        <div className="matchProfileCard">
            <img src={image} alt={name}/>
            <div>
                <h1>{name}</h1>
                <button onClick={onClick}>View profile</button>
            </div>
        </div>
    )
}

export default MatchProfileCard