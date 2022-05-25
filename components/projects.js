import React, {useEffect, useState} from 'react';
import { useRouter } from 'next/router';
import { RichText } from 'prismic-reactjs'
import LazyLoad from 'react-lazyload';
import Slick from "react-slick";


const Projects = ({projects}) => {
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
								<a key={`category${i}`} href={item.category + '#projects'}>{item.category}</a>
							))}
							{item.data.themes?.map((item,i) => (
								<a key={`theme${i}`} href={'theme/' + item.theme + '#projects'}>{item.theme?.replace('-', ' ')}</a>
							))}
						</div>
						<div className={`flex`} onClick={AddClass} >
							<LazyLoad height={600} offset={600}>
								<div className="cover">
									{item.data['cover-image'].url && 
										<div className="img-effect">
											<img src={item.data['cover-image'].url} alt={item.data['cover-image'].alt}/>
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
								return(
									<>
									{slice.slice_type == 'images' && 
										<div key={`image-slider${i}`} className="images" id={'images'+i}>
											<Slick {...settings}>
													{slice.items.map((item,i) => {
														return(
															<div key={`slide-item${i}`} className='slide-item'>
																<img src={item.image.url}/>
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
