import Link from "next/link"
import { useRouter } from 'next/router';
import { RichText } from 'prismic-reactjs'
import LazyLoad from 'react-lazyload';
import Slick from "react-slick";


const Projects = ({projects}) => {
	console.log(projects)
	const router = useRouter();
  const ToggleClass = (e) => {
		const id = e.currentTarget.parentElement.id;
		e.currentTarget.parentElement.classList.toggle('selected');
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
    // fade: true,
    lazyLoad: true,
    // variableWidth: true,
    autoplay: true,
    autoplaySpeed: 4000,
  };

  return(
		<section className="projects" id="projects">
			{projects.map((item,i) => {
				return(
					<div className="project-item" id={item.uid}>
						<div className="title" onClick={ToggleClass}>{item.data.title}</div>
						<div className="flex">
							<div className="cover">
								{item.data['cover-image'].url && 
									<LazyLoad height={600}>
										<div className="img-effect">
											<img src={item.data['cover-image'].url} alt={item.data['cover-image'].alt}/>
										</div>
									</LazyLoad>
								}
								{item.data['cover-text'] &&
									<h2><RichText render={item.data['cover-text']} /></h2>
								}
							</div>
							<div className="description">
								<RichText render={item.data['description']} />
							</div>
						</div>
						{item.data['caption'] && 
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
										<div className="images">
											<Slick {...settings}>
													{slice.items.map((item,i) => {
														return(
															<div className='slide-item'>
																<img src={item.image.url}/>
															</div>
														)
													})}
											</Slick>
										</div>
									}
									{slice.slice_type == 'info' && 
										<div className="info">
											{slice.items.map((item,i) => {
												return(
													<div>
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
