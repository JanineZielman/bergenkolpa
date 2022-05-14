import React, { useState, useEffect } from 'react';
import Link from "next/link"
import { RichText } from 'prismic-reactjs'
import { LazyLoadImage } from 'react-lazy-load-image-component';

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
								<div className="img-effect">
									<LazyLoadImage
										alt={item.data['cover-image'].alt}
										height={item.data['cover-image'].dimensions.height}
										src={item.data['cover-image'].url}
										width={item.data['cover-image'].dimensions.width} 
									/>
								</div>
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
