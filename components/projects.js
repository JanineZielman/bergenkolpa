import React, {useEffect, useState} from 'react';
import { useRouter } from 'next/router';
import LazyLoad from 'react-lazyload';
import Content from './content';
import { RichText } from 'prismic-reactjs';
import { linkResolver } from '../prismicConfiguration';
import CoverImage from './coverImage';


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
		const oldID = selectedItems[0]?.id;
		document.getElementById(oldID)?.classList.remove("selected");
		// document.getElementById(selectedId)?.classList.remove("selected");
		
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

	const GoToClass = (e) => {
		const oldID = selectedItems[0]?.id;
		// document.getElementById(selectedId)?.classList.remove("selected");
		document.getElementById(oldID)?.classList.remove("selected");
		
		const id = e.currentTarget.id.replace('-link', '')
		const type = e.currentTarget.className.split(" ")[1]
		if (id) {
			if (type == 'theme'){
				router.push('/' + lang + '/theme/'+id+'#projects');
			}
			if (type == 'tag'){
				router.push('/' + lang + '/'+id+'#projects');
			}
			if (type == 'news-item') {
				router.push('/' + lang + '/recent/#'+id);
			}
			if (type == 'bureau'){
				router.push('/' + lang + '/bureau');
			}
			if (type == 'project') {
				const element = document.getElementById(id)
				element.classList.add('selected');
				router.push('#'+id);
				setTimeout(() => {
					router.push('#'+id);
				}, 1000);
				setSelectedId(id)
			}
		}
	}

  return(
		<section className="projects" id="projects">
			{projects.map((item,i) => {
				return(
					<>
					{item &&
						<LazyLoad height={600} offset={600} className="project-wrapper">
							<div key={`project${i}`} className={`project-item ${item.data.background ? item.data.background : '' } ${item.data.pattern ? item.data.pattern : '' } ${item.data['cover-image']?.url ? '' : 'cover-text'} ${item.data['aspect-ratio']}`} id={item.uid}>
								<div className='blob' style={{'--top': (Math.floor(Math.random() * 60)) + 'vh','--left': (Math.floor(Math.random() * 80)) + 'vw' }} />
								<div className='blob2' style={{'--top': (Math.floor(Math.random() * 50)) + 30 + 'vh','--left': (Math.floor(Math.random() * 80)) + 'vw' }}/>
								<div className='blob3' style={{'--top': (Math.floor(Math.random() * 50)) + 50 + 'vh','--left': (Math.floor(Math.random() * 80)) + 'vw' }}/>
								<div className='blob4' style={{'--top': (Math.floor(Math.random() * 80)) + 'vh','--left': (Math.floor(Math.random() * 80)) + 'vw' }}/>
								<div className="title" onClick={item.data['link-to-project'].uid ? null : AddClass}>{item.data.title ? item.data.title : <span>&nbsp;</span> }</div>
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
								{item.data['link-to-project'].uid ? 
									<a className={`flex ${item.data['link-to-project'].type}`} id={`${item.data['link-to-project'].uid}-link`} onClick={GoToClass} >
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
									</a>
								:
									<>
										<div className={`flex`} onClick={AddClass}>
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
										<Content item={item}/>
									</>
								}
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
