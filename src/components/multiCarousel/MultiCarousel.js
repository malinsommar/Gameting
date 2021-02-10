import React from "react"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import './multiCarousel.css'

const MultiCarousel = ({items, title, subtitle}) => {

    const settings = {
      dots: false,
      arrows: true,
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: false,
      cssEase: "linear",
    };

    const getItems = () => {
      return items.map((item, index) => {
        return item
    })
    }

    return (
      <div>
        <div id="sliderBig">
        <h1 id="multicarouselTitle">{title}</h1>
        <h2 id="multicarouselSubTitle">{subtitle}</h2>
        <Slider {...settings}>{getItems()}</Slider>
        </div>
      </div>
    )
}

export default MultiCarousel