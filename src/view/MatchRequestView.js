import React from 'react'
import MultiCarousel from '../components/multiCarousel/MultiCarousel'
import MatchRequests from '../components/matchRequest/MatchRequest'
import './matchRequestView.css'

export const MatchRequestView = () => {

    const tempRequests = [
        {
            name: "Anna",
            age: 23,
            image: "https://thispersondoesnotexist.com/image",
          },
          {
            name: "Johanna",
            age: 22,
            image: "https://thispersondoesnotexist.com/image",
          },
          {
            name: "Lisa",
            age: 28,
            image: "https://thispersondoesnotexist.com/image",
          },
          {
            name: "Andrea",
            age: 25,
            image: "https://thispersondoesnotexist.com/image",
          },
    ]

    const subTitle = `Looks like you have ${tempRequests.length} requests`

    const getMatchRequests = () => {
        return tempRequests.map((item, index) => {
            return <MatchRequests name={item.name} age={item.age} image={item.image} /> 
        })
    }

    return(
        <div>
            <MultiCarousel items={getMatchRequests()} title="Your requests" subtitle={subTitle} />
        </div>
    )
}