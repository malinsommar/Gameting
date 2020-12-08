import React from 'react'
import './matchRequest.css'

const MatchRequest = ({image, name, age, profile}) => {
    return (
        <div>
            <div className="matchRequestImageBox">
                <img className="matchRequestImage" alt="Match request" src={image}/>
                <button className="matchRequestButton profile">View profile</button>
            </div>
            <h2>{name}, {age}</h2>
            <button className="matchRequestButton accept">Accept</button>
            <button className="matchRequestButton decline">Decline</button>
        </div>
    )
}

export default MatchRequest