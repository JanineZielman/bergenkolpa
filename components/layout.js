import Link from "next/link"
import LanguageSwitcher from "./language"
import React, {useState} from 'react';
import { RichText } from 'prismic-reactjs'
import Collapsible from 'react-collapsible';
import { useRouter } from 'next/router';

import Menu from './menu';

const Layout = ({children, altLangs, menu, lang, footer, global}) => {
	const router = useRouter();

	function dropdownToggle(e){
		let tag = e.target.parentElement.className.replaceAll(' ', '').replace('menu-item', '').replace('active', '');
		router.push('/'+lang+'/'+tag+'#projects')

		if (document.getElementsByClassName('show-dropdown').length > 1){
			document.getElementsByClassName('show-dropdown')[0]?.classList.remove("show-dropdown");
		}
		e.target.parentElement.parentElement.classList.toggle('show-dropdown');
	}

  return(
		<section className="main-container">
			<div className="menu">
				<div className="logo">
					<Link href="/" locale={lang}>
						<a>
							<img src="/logo.svg"/>
						</a>
					</Link>
				</div>
				<div className="menu-items" id="menu-items">
					{menu.slices.map((item, i) => {
						return(
							<div key={`menuitem${i}`} className="menu-item">
								{item.items.length > 1 ?
									<>
										<a onClick={dropdownToggle} className={`${router.asPath == '/'+item.primary.link.uid+'#projects' || router.asPath == '/'+item.primary.link.uid ? "active" : ""} ${item.primary.link.uid}`}>
											<span>{item.primary.label}</span>
										</a>
										<div className="dropdown" id="dropdown">
											{item.items.map((sub, i) => {
												return(
													<a key={`menulink_${i}`} href={'/' + lang + '/' + item.primary.link.uid + '/' + sub.subLink.uid+'#projects'} className={router.asPath == '/theme/'+sub.subLink.uid+'#projects' || router.asPath == '/theme/'+sub.subLink.uid ? "active" : ""}>
														<span>{sub.subLabel}</span>
													</a>
												)
											})}
										</div>
									</>
								:										
									<Link href={'/'+item.primary.link.uid+'#projects'} locale={lang}>
										<a className={router.asPath == '/'+item.primary.link.uid+'#projects' || router.asPath == '/'+item.primary.link.uid ? "active" : ""}>
											<span>{item.primary.label}</span>
										</a>
									</Link>
								}
							
							</div>
						)
					})}
				</div>
				<LanguageSwitcher altLangs={altLangs} lang={lang}/>
				<Menu menu={menu} altLangs={altLangs} lang={lang}/>
			</div>
			{children}
			<footer>
				<div className="content">
					{footer.data.slices.map((item, i) => {
						return(
							<div key={`footer${i}`} className="column-wrapper">
								{item.items.map((content, i) => {
									return(
										<div key={`column${i}`} className="column">
											<RichText render={content.text} />
										</div>
									)
								})}
							</div>
						)
					})}
				</div>
				<div className="socials">
					{global.slices[0].items.map((item, i) => {
						return(
							<a key={`social${i}`} className="social-link" target="_blank" href={item.link.url}>
								{item.social == 'facebook' &&
									<img src="/fb.svg"/>
								}
								{item.social == 'linkedin' &&
									<img src="/li.svg"/>
								}
								{item.social == 'instagram' &&
									<img src="/insta.svg"/>
								}
							</a>
						)
					})}
				</div>
			</footer>
		</section>
  )
  
}

export default Layout;
