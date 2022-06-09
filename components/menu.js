import Link from "next/link"
import Image from "next/image"
import LanguageSwitcher from "./language"
import React, {useState} from 'react';
import { RichText } from 'prismic-reactjs'
import Collapsible from 'react-collapsible';
import Modal from 'react-modal';
import { useRouter } from 'next/router';

const Menu = ({altLangs, menu, lang}) => {
	const router = useRouter();
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
						<div className="menu-items" id="menu-items">
							{menu.slices.map((item, i) => {
								return(
									<div key={`menuitem${i}`} className={`menu-item ${router.asPath.includes(item.primary.link.uid) ? "active" : ""}`} id={`menuitem${i}`}>
										{item.items.length > 1 ?
											<>
												<a href={'/' + lang + '/' + item.primary.link.uid + '#projects'} className={`${router.asPath == '/'+item.primary.link.uid+'#projects' || router.asPath == '/'+item.primary.link.uid ? "active" : ""} ${item.primary.link.uid}`}>
													<span>{item.primary.label}</span>
												</a>
												<div className="dropdown" id="dropdown">
													{item.items.map((sub, i) => {
														return(
															<a key={`menulink_${i}`} href={sub.subLink.uid ? '/' + lang + '/' + item.primary.link.uid + '/' + sub.subLink.uid  +'#projects' : '#' + sub.subLabel} className={router.asPath.includes(sub.subLink.uid) ? "active" : ""}>
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
					</div>
				</Modal>
		</div>
  )
  
}

export default Menu;
