import Link from "next/link"
import { RichText } from 'prismic-reactjs'
import LazyLoad from 'react-lazyload';

const Projects = ({projects}) => {
	console.log(projects)
  return(
		<section className="projects" id="projects">
			{projects.map((item,i) => {
				return(
					<div className="project-item">
						<div className="title">{item.data.title}</div>
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
					</div>
				)
			})}
		</section>
  )
  
}

export default Projects;
