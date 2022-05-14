import React from 'react'
import { RichText } from 'prismic-reactjs'
import Slick from "react-slick";

const Slider = ({ slice }) => {
  var slugify = require('slugify')
  const settings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    // fade: true,
    lazyLoad: true,
    // variableWidth: true,
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
            <div className='image img-effect'>
              <a href={`/theme/${slugify(item.title, {
                replacement: '_', 
                lower: true,      // convert to lower case, defaults to `false`
              })}`}>
                <img src={item.image.url}/>
              </a>
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