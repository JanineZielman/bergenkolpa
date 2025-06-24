import React, {useEffect, useState} from 'react';
import { RichText } from 'prismic-reactjs'
import Slick from "react-slick";
import { linkResolver } from '../prismicConfiguration'
import ImageSize from './imageSize';

const Content = ({item}) => {
	
	const settings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
		variableWidth: true,
    lazyLoad: false,
    autoplay: true,
    autoplaySpeed: 4000,
  };

	useEffect(() => {
    let newCap = item.data.caption[0]?.text.replace('"', '“').replace('"', '”');
		item.data.caption[0]?.text = newCap
  });


  return(
		<>				
			{item.data.caption[0] && 
				<div className="caption">
					<div></div>
					<RichText render={item.data.caption} linkResolver={linkResolver} />
				</div>
			}
			<div className="extra-info">
				{item.data.slices.map((slice,i) => {
					return(
						<>
						{slice.slice_type == 'embed' &&
							<div className='video' dangerouslySetInnerHTML={{ __html: slice.primary.embed.html }} />
						}
						{slice.slice_type == 'images' && 
							<div key={`image-slider${i}`} className="images" id={'images'+i}>
								<Slick {...settings}>
										{slice.items.map((slice_item,i) => {
											return(
												<div key={`slide-item${i}`} className='slide-item'>
													{slice_item.image.url && 
														<ImageSize item={slice_item} parent={item}/>
													}
												</div>
											)
										})}
								</Slick>
							</div>
						}
						{slice.slice_type == 'image' && 
							<>
								{slice.items.map((slice_item,i) => {
									return(
										<>
											{slice_item.image.url && 
												<>
												{slice_item['big-image'] == true ?	
													<div className='big-image'>
														{slice_item.image?.url && 
															<ImageSize item={slice_item} parent={item}/>
														}
													</div>
												:
													<div key={`image-item${i}`} className={`image ${slice_item['aspect-ratio']}`}>
														{slice_item.image?.url && 
															<ImageSize item={slice_item} parent={item}/>
														}
													</div>
												}
												</>
											}
											{slice_item.text[0] && 
												<div className="info" id={'info-image'+i}>
													<RichText render={slice_item.text} linkResolver={linkResolver}/>
												</div>
											}
											{slice_item.quote[0] && 
												<div className="caption">
													<div></div>
													<RichText render={slice_item.quote} linkResolver={linkResolver} />
												</div>
											}
											{slice_item.embed.html && 
												<div className='video' dangerouslySetInnerHTML={{ __html: slice_item.embed.html }} />
											}
										</>
									)
								})}
							</>
						}
						{slice.slice_type == 'info' && 
							<div className="info" id={'info'+i}>
								{slice.items.map((item,i) => {
									return(
										<div key={`info-item${i}`}>
											<RichText render={item.text} linkResolver={linkResolver}/>
										</div>
									)
								})}
							</div>
						}
						</>
					)
				})}
			</div>
							
		</>
  )
  
}

export default Content;
