import Link from "next/link"
import LanguageSwitcher from "./language"
import React from 'react';
import Collapsible from 'react-collapsible';

const Layout = ({children, altLangs, menu, lang}) => {
	console.log('menu', menu)
  return(
		<section className="main-container">
			<div className="menu">
				<div className="logo">
					<Link href="/">
						<a>
							<h1>
								van<br/>
								Bergen Kolpa<br/>
								Architecten
							</h1>
						</a>
					</Link>
				</div>
				<div className="menu-items">
					{menu.slices.map((item, i) => {
						return(
							<div className="menu-item">
								{item.items.length > 1 ?
									<div className="dropdown">
										<Collapsible trigger={item.primary.label}>
											{item.items.map((sub, i) => {
												return(
													<Link href={'/'+sub.subLink.slug+'#projects'}>
														<a>{sub.subLabel}</a>
													</Link>
												)
											})}
										</Collapsible>
									</div>
								:
									<Link href={'/'+item.primary.link.uid}>
										<a>{item.primary.label}</a>
									</Link>
								}
							
							</div>
						)
					})}
				</div>
				<LanguageSwitcher altLangs={altLangs} lang={lang}/>
			</div>
			{children}
		</section>
  )
  
}

export default Layout;
