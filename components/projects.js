import React, {useEffect, useState} from 'react';
import { useRouter } from 'next/router';
import LazyLoad from 'react-lazyload';
import Content from './content'


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
				document.getElementById(id)?.classList.add('selected');
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

  return(
		<section className="projects" id="projects">
			{projects.map((item,i) => {
				return(
					<>
					{item &&
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
								<Content item={item}/>
							</div>
						</LazyLoad>
					 }
					</>
				)
			})}
		</section>
  )
  
}

export default Projects;
