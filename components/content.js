import React, {useEffect, useState} from 'react';
import { useRouter } from 'next/router';
import { RichText } from 'prismic-reactjs'
import Slick from "react-slick";
import Image from 'next/image'
import { linkResolver } from '../prismicConfiguration'
import ImageSize from './imageSize';
import CoverImage from './coverImage';


const Content = ({item}) => {
	const router = useRouter();

	const [selectedId, setSelectedId] = useState();

  const AddClass = (e) => {
		document.getElementById(selectedId)?.classList.remove("selected");
		
		const id = e.currentTarget.parentElement.id;
		e.currentTarget.parentElement.classList.add('selected');
		router.push('#'+id);
		setTimeout(() => {
			router.push('#'+id);
		}, 1000);
		setSelectedId(id)
   };

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
			<div className={`flex`} onClick={AddClass} >
					<div className="cover">
						{item.data['cover-image'].url && 
							<div className={`img-effect`}>
								<CoverImage item={item}/>
							</div>
						}
						{item.data['cover-text'][0] &&
							<h2 className={`img-effect`}>
								<RichText render={item.data['cover-text']} linkResolver={linkResolver} />
							</h2>
						}
					</div>

				<div className="description">
					<RichText render={item.data['description']} linkResolver={linkResolver}/>
				</div>
			</div>
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
										{slice.items.map((item,i) => {
											return(
												<div key={`slide-item${i}`} className='slide-item'>
													{item.image.url && 
														<ImageSize item={item}/>
													}
												</div>
											)
										})}
								</Slick>
							</div>
						}
						{slice.slice_type == 'image' && 
							<>
								{slice.items.map((item,i) => {
									return(
										<>
											{item.image.url && 
												<>
												{item['big-image'] == true ?	
													<div className='big-image'>
														{item.image?.url && 
															<ImageSize item={item}/>
														}
													</div>
												:
													<div key={`image-item${i}`} className={`image ${item['aspect-ratio']}`}>
														{item.image?.url && 
															<ImageSize item={item}/>
														}
													</div>
												}
												</>
											}
											{item.text[0] && 
												<div className="info" id={'info-image'+i}>
													<RichText render={item.text} linkResolver={linkResolver}/>
												</div>
											}
											{item.quote[0] && 
												<div className="caption">
													<div></div>
													<RichText render={item.quote} linkResolver={linkResolver} />
												</div>
											}
											{item.embed.html && 
												<div className='video' dangerouslySetInnerHTML={{ __html: item.embed.html }} />
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
