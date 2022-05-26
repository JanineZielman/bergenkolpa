import React from 'react'
import { RichText } from 'prismic-reactjs'
import Slick from "react-slick";

const Slider = ({ slice }) => {
  var slugify = require('slugify')
  const settings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    lazyLoad: false,
    autoplay: true,
    autoplaySpeed: 5000,
    centerMode: true,
  };
  return(
   <Slick {...settings} className="main-slider">
      {slice.items.map((item, i) => {
        return(
          <div key={`slider-item${i}`} className='slide-item'>
            <a className="title-image" href={`/theme/${slugify(item.title, {
              replacement: '-', 
              lower: true,
            })}#projects`}>
              <div className={`title ${item.position} ${item.color}`}>
                {item.title}
              </div>
              <div className='image slide-img'>
                <img src={item.image.url}/>
              </div>
            </a>
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