import React from 'react'
import OutlinedHeart from '@material-ui/icons/FavoriteBorderOutlined'
import FilledHeart from '@material-ui/icons/FavoriteOutlined'
import DeleteIcon from '@material-ui/icons/Delete'
import './gameCard.css'

const GameCard = ({image, name, button, onClick, disabled, isFavorite, onOutlinedHeartClick, onFilledHeartClick}) => {
    
    const getHeart = () => {
        return isFavorite ? <button className="heartButton" onClick={onFilledHeartClick}><FilledHeart /></button> : <button className="heartButton" onClick={onOutlinedHeartClick}><OutlinedHeart/></button>
        
    }

    const addOrDelete = () => {
        if(button === "Delete") {
            return <DeleteIcon /> 
        } else return button
    }

    return(
        <div className="gameCard">
            <img src={image} alt={name}/>
            <div>
                <h1>{name}</h1>
                <div>
                    <button disabled={disabled} onClick={onClick}>{addOrDelete()}</button>
                    {onOutlinedHeartClick === undefined ? null : getHeart() }
                    
                </div>
            </div>
        </div>
    )
}

export default GameCard
