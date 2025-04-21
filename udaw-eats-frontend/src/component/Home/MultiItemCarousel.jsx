import React from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import { topMeal } from './TopMeal';
import { CarouselItem } from './CarouselItem';

export const MultiItemCarousel = () => {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1500,
        arrows: false
      };
  return (
    <div >
        <Slider {...settings}>
            {topMeal.map((item) => (
                <CarouselItem image={item.image} title={item.title}/>
            ))}
        </Slider>
    </div>
  )
}
