import Link from "next/link"
import Image from "next/image"
import LanguageSwitcher from "./language"
import React, {useState} from 'react';
import { RichText } from 'prismic-reactjs'
import Collapsible from 'react-collapsible';
import Modal from 'react-modal';

const Menu = ({children, altLangs, menu, lang, footer}) => {
	const [modalIsOpen, setIsOpen] = useState(false);

	const customStyles = {
		content: {
			top: '75px',
			left: '0',
			width: '100vw',
			height: 'calc(100vh - 75px)',
			zIndex: '9999999!important',
			backgroundColor: 'white',
			position: 'fixed',
			border: 'none',
			borderTop: '1px solid black',
			borderRadius: '0',
		},
	};

  function openModal() {
		if (modalIsOpen === false){
			setIsOpen(true);
		} else{
			setIsOpen(false);
		}
  }

  // function closeModal() {
  //   setIsOpen(false);
  // }
  return(
		<div className="mobile-menu">
			<div onClick={openModal} className={`hamburger ${modalIsOpen}`}> </div>
				<Modal
					isOpen={modalIsOpen}
					style={customStyles}
				>
					<div className="modal-content" onClick={openModal}>
						<div className="menu-items">
							{menu.slices.map((item, i) => {
								return(
									<div key={`menuitem${i}`} className="menu-item">
										{item.items.length > 1 ?
											<div className="dropdown">
												<Collapsible trigger={item.primary.label}>
													{item.items.map((sub, i) => {
														return(
															<Link key={`menulink${i}`} href={'/'+sub.subLink.slug+'#projects'}>
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
					</div>
				</Modal>
		</div>
  )
  
}

export default Menu;
