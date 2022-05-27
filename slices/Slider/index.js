import React from 'react'
import { RichText } from 'prismic-reactjs'
import Slick from "react-slick";
import Image from 'next/image'

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
  };
  return(
   <Slick {...settings} className="main-slider">
      {slice.items.map((item, i) => {
        let theme_url = `/theme/${slugify(item.title, {replacement: '-', lower: true,})}#projects`
        return(
          <div key={`slider-item${i}`} className='slide-item'>
            <a className="title-image" href={item.link.uid ? item.link.uid : theme_url}>
              <div className={`title ${item.position} ${item.color}`}>
                {item.title}
              </div>
              <div className='image slide-img'>
                <Image 
                  src={item.image.url}
                  layout="fill"
                  objectFit='cover'
                  className={`${item['horizontal-crop']} ${item['vertical-crop']}`}/>
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