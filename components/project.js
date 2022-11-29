import Link from 'next/link';
import Content from './content';
import { RichText } from 'prismic-reactjs';
import { linkResolver } from '../prismicConfiguration';
import CoverImage from './coverImage';

const ProjectPage = ({item, tags, themes, lang}) => {
  return(
		<section className="projects" id="projects">
			<div className="project-wrapper">
				<div className={`project-item selected ${item.data.background ? item.data.background : '' } ${item.data.pattern ? item.data.pattern : '' } ${item.data['cover-image']?.url ? '' : 'cover-text'} ${item.data['aspect-ratio']}`} id={item.uid}>
					<div className="title">{item.data.title ? item.data.title : <span>&nbsp;</span> }</div>
					<Link href={`/#projects`}><img className='close' src="/cross.svg"/></Link>
					<div className="tags">
						{item.data.categories?.map((item,i) => (
							<a href={'/' + lang + '/' + item.category + '#projects'} key={`tag-${i}`}>
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
							<a href={'/'  + lang +  '/theme/' + item.theme + '#projects'} key={`theme-${i}`}>
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
						<a className={`flex ${item.data['link-to-project'].type}`} id={`${item.data['link-to-project'].uid}-link`}>
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
							<div className={`flex`}>
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
			</div>
		</section>
  )
  
}

export default ProjectPage;
