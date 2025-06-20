import React from 'react'
import { RichText } from 'prismic-reactjs'
import Slick from "react-slick";
import Image from 'next/image'

const Slider = ({ slice }) => {
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
          let document_url = `/${item.link.lang}/${item.link.uid}`
          let link_url;
          let blank = '';
          if(item.link.link_type == 'Document'){
            if(item.theme == true){
              link_url = theme_url;
            } else {
              link_url = document_url;
            }
          } else {
            link_url = `${item.link.url}`
            blank = "_blank"
          }
          return(
            <div key={`slider-item${i}`} className='slide-item'>
              <a className="title-image" href={link_url ? link_url : '#'} target={blank}>
                <div className={`title ${item.position} ${item.color}`}>
                  {item.title}
                </div>
                <div className='image slide-img'>
                  <Image 
                    src={item.image.url}
                    alt={item.image.alt ? item.image.alt : `van Bergen Kolpa - ${item.title}`}
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