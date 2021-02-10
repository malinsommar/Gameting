import React from 'react'
import './matchRequest.css'

const MatchRequest = ({image, name, profileOnClick, acceptOnClick, declineOnClick}) => {
    return (
        <div>
            <div className="matchRequestImageBox">
                <img className="matchRequestImage" alt="Match request" src={image}/>
                <button onClick={profileOnClick} className="matchRequestButton profile">View profile</button>
            </div>
            <h2>{name}</h2>
            <button onClick={acceptOnClick} className="matchRequestButton accept">Accept</button>
            <button onClick={declineOnClick} className="matchRequestButton decline">Decline</button>
        </div>
    )
}

export default MatchRequest