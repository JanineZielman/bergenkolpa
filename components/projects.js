import React, {useEffect, useState} from 'react';
import { useRouter } from 'next/router';
import { RichText } from 'prismic-reactjs'
import LazyLoad from 'react-lazyload';
import Slick from "react-slick";
import Image from 'next/image'
import { linkResolver } from '../prismicConfiguration'


const Projects = ({projects, tags, themes, lang}) => {
	const router = useRouter();

	const [selectedItems, setSelectedItems] = useState([]);
	const [selectedId, setSelectedId] = useState();

	useEffect(() => {
    setSelectedItems(document.getElementsByClassName("selected"));
		if(window.location.hash) {
			const id = window.location.hash.replace('#','');
			router.push('#'+id);
			setTimeout(() => {
				router.push('#'+id);
				document.getElementById(id).classList.add('selected');
			}, 1000);
			setSelectedId(id)
		} 
  }, []);

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

	const RemoveClass = (e) => {
		const id = selectedItems[0].id;
		selectedItems[0].classList.remove("selected");
		router.push('#'+id);
		setTimeout(() => {
			router.push('#'+id);
		}, 500);
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

  return(
		<section className="projects" id="projects">
			{projects.map((item,i) => {
				return(
					<LazyLoad height={600} offset={600} className="project-wrapper">
						<div key={`project${i}`} className={`project-item ${item.data.background ? item.data.background : '' } ${item.data['cover-image']?.url ? '' : 'cover-text'} ${item.data['aspect-ratio']}`} id={item.uid}>
							<div className="title" onClick={AddClass}>{item.data.title ? item.data.title : <span>&nbsp;</span> }</div>
							<img className='close' onClick={RemoveClass} src="/cross.svg"/>
							<div className="tags">
								{item.data.categories?.map((item,i) => (
									<a key={`category${i}`} href={'/' + lang + '/' + item.category + '#projects'}>
										{tags.map((tag, i) => (
											<>
												{tag.uid == item.category &&
													decodeURIComponent(tag.slugs[0].replace('-', ' '))
												}
											</>
										))}
									</a>
								))}
								{item.data.themes?.map((item,i) => (
									<a key={`theme${i}`} href={'/'  + lang +  '/theme/' + item.theme + '#projects'}>
										{themes.map((theme, i) => (
											<>
												{theme.uid == item.theme &&
													decodeURIComponent(theme.slugs[0].replace('-', ' '))
												}
											</>
										))}
									</a>
								))}
							</div>
							<div className={`flex`} onClick={AddClass} >
									<div className="cover">
										{item.data['cover-image'].url && 
											<div className={`img-effect`}>
												{item.data['aspect-ratio'] == null && 
													<Image 
														src={item.data['cover-image'].url} 
														alt={item.data['cover-image'].alt}
														width={'1520'}
														height={'1080'}
													/>
												}
												{item.data['aspect-ratio'] == 'Main' && 
													<Image 
														src={item.data['cover-image'].url} 
														alt={item.data['cover-image'].alt}
														width={'1520'}
														height={'1080'}
													/>
												}
												{item.data['aspect-ratio'] == 'Landscape' &&
													<Image 
														src={item.data['cover-image'].landscape ? item.data['cover-image'].landscape.url : item.data['cover-image'].url} 
														alt={item.data['cover-image'].alt}
														width={'1920'}
														height={'1080'}
													/>
												}
												{item.data['aspect-ratio'] == 'Square' &&
													<Image 
														src={item.data['cover-image'].square ? item.data['cover-image'].square.url : item.data['cover-image'].url } 
														alt={item.data['cover-image'].alt}
														width={'1080'}
														height={'1080'}
													/>
												}
												{item.data['aspect-ratio'] == 'Portrait' &&
													<Image 
														src={item.data['cover-image'].portrait ? item.data['cover-image'].portrait.url : item.data['cover-image'].url} 
														alt={item.data['cover-image'].alt}
														width={'1080'}
														height={'1920'}
													/>
												}
												{item.data['aspect-ratio'] == 'Narrow' &&
													<Image 
														src={item.data['cover-image'].narrow ? item.data['cover-image'].narrow.url : item.data['cover-image'].url} 
														alt={item.data['cover-image'].alt}
														width={'1080'}
														height={'1920'}
													/>
												}
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
									<RichText render={item.data['caption']} linkResolver={linkResolver} />
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
																		<>
																			{item['aspect-ratio'] == null &&
																				<Image 
																					src={item.image.url}
																					alt={item.image.alt}
																					width={'1520'}
																					height={'1080'} 
																				/>
																			}
																			{item['aspect-ratio'] == 'Main' &&
																				<Image 
																					src={item.image.url}
																					alt={item.image.alt}
																					width={'1520'}
																					height={'1080'} 
																				/>
																			}
																			{item['aspect-ratio'] == 'Landscape' &&
																				<Image 
																					src={item.image.landscape ? item.image.landscape.url : item.image.url}
																					alt={item.image.alt}
																					width={'1920'}
																					height={'1080'} 
																				/>
																			}
																			{item['aspect-ratio'] == 'Square' &&
																				<Image 
																					src={item.image.square ? item.image.square.url : item.image.url} 
																					alt={item.image.alt}
																					width={'1080'}
																					height={'1080'}
																				/>
																			}
																			{item['aspect-ratio'] == 'Portrait' &&
																				<Image 
																					src={item.image.portrait ? item.image.portrait.url : item.image.url} 
																					alt={item.image.alt}
																					width={'763'}
																					height={'1080'}
																				/>
																			}
																			{item['aspect-ratio'] == 'Narrow' &&
																				<Image 
																					src={item.image.narrow ? item.image.narrow.url : item.image.url} 
																					alt={item.image.alt}
																					width={'610'}
																					height={'1080'}
																				/>
																			}
																		</>
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
														<div key={`image-item${i}`} className={`image ${item['aspect-ratio']}`}>
															{item['aspect-ratio'] == null &&	
																<Image 
																		src={item.image.url} 
																		alt={item.image.alt}
																		width={'1520'}
																		height={'1080'}
																/>
															}
															{item['aspect-ratio'] == 'Main' &&	
																<Image 
																		src={item.image.url} 
																		alt={item.image.alt}
																		width={'1520'}
																		height={'1080'}
																/>
															}
															{item['aspect-ratio'] == 'Landscape' &&	
																<Image 
																		src={item.image.landscape ? item.image.landscape.url : item.image.url} 
																		alt={item.image.alt}
																		width={'1920'}
																		height={'1080'}
																/>
															}
															{item['aspect-ratio'] == 'Square' &&	
																<Image 
																		src={item.image.square ? item.image.square.url : item.image.square} 
																		alt={item.image.alt}
																		width={'1080'}
																		height={'1080'}
																/>
															}
															{item['aspect-ratio'] == 'Portrait' &&	
																<Image 
																		src={item.image.portrait ? item.image.portrait.url : item.image.url} 
																		alt={item.image.alt}
																		width={'763'}
																		height={'1080'}
																/>
															}
															{item['aspect-ratio'] == 'Narrow' &&	
																<Image 
																		src={item.image.narrow ? item.image.narrow.url : item.image.url} 
																		alt={item.image.alt}
																		width={'610'}
																		height={'1080'}
																/>
															}
														</div>
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
						
					</div>
					</LazyLoad>
				)
			})}
		</section>
  )
  
}

export default Projects;
