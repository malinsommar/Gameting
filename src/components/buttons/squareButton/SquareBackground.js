import React from 'react'
import './squareButton.css'

const SquareButton = ({text, onClick, id}) => {
    
    return(
        <div className="squareButton" id={id}>
            <svg>
                <rect />
                Sorry, your browser does not support inline SVG.  
            </svg>            
            <span onClick={onClick}>{text}</span>
        </div>
    )
}

export default SquareButton