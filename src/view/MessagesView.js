import React, {useState} from 'react'
import './messageView.css'

export const MessagesView = () => {

    const [currentChat, setCurrentChat] = useState(0)

    const partners = [
        {
            img: "https://thispersondoesnotexist.com/image",
            name: "Lisa"
        },
        {
            img: "https://thispersondoesnotexist.com/image",
            name: "Johanna"
        },
        {
            img: "https://thispersondoesnotexist.com/image",
            name: "Andrea"
        },
        {
            img: "https://thispersondoesnotexist.com/image",
            name: "Sarah"
        },
    ]

    const matchMessageChoice = () => {
        return(
            <div style={{display: "flex"}}>
                <div>
                    {partners.map((item, index) => {
                        return(
                            <li onClick={() => setCurrentChat(index)} key={index} className="matchMessageChoices"><img src={item.img} alt="Partner message choice" /><p>{item.name}</p></li>
                        )
                    })}
                </div>
                <div className="verticalLine"></div>
            </div>
        )
    }

    const chosenMatchMessage = () => {
        return(
            <div>
                <h1>{partners[currentChat].name}</h1>
            </div>
        )
    }

    return(
        <div style={{display: "flex"}}>
            {matchMessageChoice()}
            {chosenMatchMessage()}
        </div>
    )
}