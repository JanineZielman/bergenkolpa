import Link from "next/link"
import LanguageSwitcher from "./language"

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
					{menu.menu_links.map((item, i) => {
						return(
							<div className="menu-item">
								<Link href={'/'+item.link.uid}>
									<a>{item.label[0].text}</a>
								</Link>
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
