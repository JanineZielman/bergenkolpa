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
    speed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    lazyLoad: false,
    autoplay: true,
    autoplaySpeed: 6000,
  };

  const AddClass = (e) => {
    e.currentTarget.classList.add("active-animation")
  };
  return(
    <div onClick={AddClass}>
      <Slick {...settings} className="main-slider">
        {slice.items.map((item, i) => {
          let theme_url = `/${item.link.lang}/theme/${item.link.uid}#projects`
          return(
            <div key={`slider-item${i}`} className='slide-item'>
              <a className="title-image" href={item.theme == true ? theme_url : '/'+ item.link.uid}>
                <div className={`title ${item.position} ${item.color}`}>
                  {item.title}
                </div>
                <div className='image slide-img'>
                  <Image 
                    src={item.image.url}
                    width={'1920'}
                    height={'1080'}
                    priority={true}
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
    </div>
  )
}

export default Slider