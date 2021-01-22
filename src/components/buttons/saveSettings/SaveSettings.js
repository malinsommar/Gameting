import React from 'react'
import './saveSettings.css'

const SquareButton = ({text, onClick, id}) => {
    
    return(
        <div className="saveSettingsButton" id={id}>       
            <button onClick={onClick}>{text}</button>
        </div>
    )
}

export default SquareButton