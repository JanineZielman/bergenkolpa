import React, {useEffect, useState} from 'react';
import { useRouter } from 'next/router';
import { RichText } from 'prismic-reactjs'
import LazyLoad from 'react-lazyload';
import Slick from "react-slick";
import Image from 'next/image'


const Projects = ({projects, tags, themes}) => {
	const router = useRouter();

	const [selectedItems, setSelectedItems] = useState([]);

	useEffect(() => {
    setSelectedItems(document.getElementsByClassName("selected"));
		if (selectedItems.length > 1){
			selectedItems[0].classList.remove("selected");
		}
  });

  const AddClass = (e) => {
		const id = e.currentTarget.parentElement.id;
		e.currentTarget.parentElement.classList.add('selected');
		router.push('#'+id);
		setTimeout(() => {
			router.push('#'+id);
		}, 1000);
   };

	const RemoveClass = (e) => {
		const id = selectedItems[0].id;
		selectedItems[0].classList.remove("selected");
		router.push('#'+id);
		setTimeout(() => {
			router.push('#'+id);
		}, 1000);
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
					<div key={`project${i}`} className={`project-item ${item.data.themes[0].theme} ${item.data['cover-image'].url ? '' : 'cover-text'}`} id={item.uid}>
						<div className="title" onClick={AddClass}>{item.data.title}</div>
						<img className='close' onClick={RemoveClass} src="/cross.svg"/>
						<div className="tags">
							{item.data.categories?.map((item,i) => (
								<a key={`category${i}`} href={item.category + '#projects'}>
									{tags.map((tag, i) => (
										<>
											{tag.uid == item.category &&
												tag.slugs[0].replace('-', ' ')
											}
										</>
									))}
								</a>
							))}
							{item.data.themes?.map((item,i) => (
								<a key={`theme${i}`} href={'theme/' + item.theme + '#projects'}>
									{themes.map((theme, i) => (
										<>
											{theme.uid == item.theme &&
												theme.slugs[0].replace('-', ' ')
											}
										</>
									))}
								</a>
							))}
						</div>
						<div className={`flex`} onClick={AddClass} >
							<LazyLoad height={600} offset={600}>
								<div className="cover">
									{item.data['cover-image'].url && 
										<div className={`img-effect ${item.data['aspect-ratio'] ? item.data['aspect-ratio'] : 'Landscape'}`}>
											{item.data['aspect-ratio'] != 'Portrait' && item.data['aspect-ratio'] != 'Square' &&
												<Image 
													src={item.data['cover-image'].url} 
													width={item.data['cover-image'].dimensions.width}
													height={item.data['cover-image'].dimensions.height} 
													placeholder="blur"
													blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNcOmNGPQAGFQJWi2m7QQAAAABJRU5ErkJggg=="
													alt={item.data['cover-image'].alt}
												/>
											}
											{item.data['aspect-ratio'] == 'Portrait' &&
												<Image 
													src={item.data['cover-image'].portrait.url} 
													width={item.data['cover-image'].portrait.dimensions.width}
													height={item.data['cover-image'].portrait.dimensions.height} 
													placeholder="blur"
													blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNcOmNGPQAGFQJWi2m7QQAAAABJRU5ErkJggg=="
													alt={item.data['cover-image'].alt}
												/>
											}
											{item.data['aspect-ratio'] == 'Square' &&
												<Image 
													src={item.data['cover-image'].square.url} 
													width={item.data['cover-image'].square.dimensions.width}
													height={item.data['cover-image'].square.dimensions.height} 
													placeholder="blur"
													blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNcOmNGPQAGFQJWi2m7QQAAAABJRU5ErkJggg=="
													alt={item.data['cover-image'].alt}
												/>
											}
										</div>
										
									}
									{item.data['cover-text'][0] &&
										<h2 className="img-effect"><RichText render={item.data['cover-text']} /></h2>
									}
								</div>
							</LazyLoad>
							<div className="description">
								<RichText render={item.data['description']} />
							</div>
						</div>
						{item.data.caption[0] && 
							<div className="caption">
								<div>Caption</div>
								<RichText render={item.data['caption']} />
							</div>
						}
						<div className="extra-info">
							{item.data.slices.map((slice,i) => {
								console.log(slice)
								return(
									<>
									{slice.slice_type == 'images' && 
										<div key={`image-slider${i}`} className="images" id={'images'+i}>
											<Slick {...settings}>
													{slice.items.map((item,i) => {
														return(
															<div key={`slide-item${i}`} className='slide-item'>
																{item.image.url && 
																	<Image 
																		src={item.image.url}
																		width={item.image.dimensions.width}
																		height={item.image.dimensions.height} 
																	/>
																}
															</div>
														)
													})}
											</Slick>
										</div>
									}
									{slice.slice_type == 'info' && 
										<div className="info" id={'info'+i}>
											{slice.items.map((item,i) => {
												return(
													<div key={`info${i}`}>
														<RichText render={item.text} />
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
				)
			})}
		</section>
  )
  
}

export default Projects;
