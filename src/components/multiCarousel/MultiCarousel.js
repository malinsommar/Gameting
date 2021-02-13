import React from "react"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import './multiCarousel.css'

const MultiCarousel = ({items, title, subtitle}) => {

    const settings = {
      dots: true,
      arrows: true,
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 3,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    }
  

    const getItems = () => {
      return items.map((item, index) => {
        return item
    })
    }

    return (
      <div id="slider">
        <div id="sliderBig">
        <h1 id="multicarouselTitle">{title}</h1>
        <h2 id="multicarouselSubTitle">{subtitle}</h2>
        <Slider {...settings}>{getItems()}</Slider>
        </div>
      </div>
    )
}

export default MultiCarousel