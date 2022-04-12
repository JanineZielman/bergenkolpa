import React from 'react'
import { RichText } from 'prismic-reactjs'
import Slick from "react-slick";

const Slider = ({ slice }) => {
  console.log(slice)
  const settings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 500,
    // slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true,
    autoplay: true,
    autoplaySpeed: 4000,
  };
  return(
   <Slick {...settings}>
      {slice.items.map((item, i) => {
        return(
          <div className='slide-item'>
            <div className={`title ${item.position} ${item.color}`}>
              {item.title}
            </div>
            <div className='image'>
              <img src={item.image.url}/>
            </div>
            <div className='description'>
              <RichText render={item.description} />
            </div>
          </div>
        )
      })}
    </Slick>
  )
}

export default Slider