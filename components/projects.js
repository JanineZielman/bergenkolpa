import Link from "next/link"
import { RichText } from 'prismic-reactjs'

const Projects = ({projects}) => {
	console.log(projects)
  return(
		<section className="projects">
			{projects.map((item,i) => {
				return(
					<div className="project-item">
						<div className="title">{item.data.title}</div>
						<div className="cover">
							{item.data['cover-image'].url && 
								<img src={item.data['cover-image'].url}/>
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
