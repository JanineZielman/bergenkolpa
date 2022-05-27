import Link from "next/link"
import Image from "next/image"
import LanguageSwitcher from "./language"
import React, {useState} from 'react';
import { RichText } from 'prismic-reactjs'
import Collapsible from 'react-collapsible';

import Menu from './menu';

const Layout = ({children, altLangs, menu, lang, footer, global}) => {
  return(
		<section className="main-container">
			<div className="menu">
				<div className="logo">
					<Link href="/">
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
									<div className="dropdown">
										<Collapsible trigger={item.primary.label}>
											{item.items.map((sub, i) => {
												return(
													<Link key={`menulink_${i}`} href={'/'+sub.subLink.slug+'#projects'}>
														<a>{sub.subLabel}</a>
													</Link>
												)
											})}
										</Collapsible>
									</div>
								:
									<Link href={'/'+item.primary.link.uid+'#projects'}>
										<a>{item.primary.label}</a>
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
							<a key={`social${i}`} className="social-link" href={item.link}>
								{item.social == 'facebook' &&
									<img src="/fb.svg"/>
								}
								{item.social == 'twitter' &&
									<img src="/twitter.svg"/>
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
