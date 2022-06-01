import { createClient, linkResolver } from '../../prismicConfiguration'
import React, {useEffect, useState} from 'react';
import { useRouter } from 'next/router';
import { RichText } from 'prismic-reactjs'
import Layout from "../../components/layout"
import Head from 'next/head'

const Bureau = (props) => {
  const {doc, menu, content, footer, global} = props

  const router = useRouter();

	const [selectedItems, setSelectedItems] = useState([]);
	const [selectedId, setSelectedId] = useState();

	useEffect(() => {
    setSelectedItems(document.getElementsByClassName("selected"));
		if(window.location.hash && window.location.hash != '#projects') {
			const id = window.location.hash.replace('#','');
			router.push('#'+id);
			setTimeout(() => {
				router.push('#'+id);
				document.getElementById(id).classList.add('selected');
			}, 1000);
			setSelectedId(id)
		} 
  }, []);

  const AddClass = (e) => {
		document.getElementById(selectedId)?.classList.remove("selected");
		
		const id = e.currentTarget.parentElement.parentElement.id;
		e.currentTarget.parentElement.parentElement.classList.add('selected');
		router.push('#'+id);
		setTimeout(() => {
			router.push('#'+id);
		}, 1000);
		setSelectedId(id)
   };

  const AddClass2 = (e) => {
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
    <>
      <Head>
        <title>{global.title}</title>
        <meta name="description" content={RichText.asText(global.description)} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={global.title} />
        <meta property="og:description" content={RichText.asText(global.description)} />
        <meta property="og:image" content={global.image.url} />
      </Head>
      <Layout altLangs={doc.alternate_languages} menu={menu} lang={doc.lang} footer={footer} global={global}>
        <div className="bureau">
          <div className="intro">
            <h2>Introduction</h2>
            <div className="content">
              <RichText render={content.intro} linkResolver={linkResolver}/>
            </div>
          </div>
          <div className="contact">
            <h2>Contact</h2>
            <div className="content">
              <RichText render={content.contact} linkResolver={linkResolver}/>
            </div>
          </div>
          {content.slices.map((slice,i) => {
            return(
              <div key={`bureau-items${i}`} className="section">
                <h2>{slice.primary.title}</h2>
                <RichText render={slice.primary.text} linkResolver={linkResolver}/>
                <div className='flex'>
                  {slice.items.map((item,j) => {
                    console.log(item.info[0])
                    return(
                      <div className='flex-item' id={item.text.replace(' ', '_')}>
                        <h3 onClick={item.info[0] && AddClass2} className={item.info[0] && 'clickable'}>{item.text}</h3>
                        <img className='close' onClick={RemoveClass} src="/cross.svg"/>
                        <div className='content-wrapper'>
                          <img onClick={item.info[0] && AddClass} src={item.image.url} className={item.info[0] && 'clickable'}/>
                          {item.info[0] &&
                            <div className='info-text'>
                              <RichText render={item.info} linkResolver={linkResolver}/>
                            </div>
                          }
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}

        </div>
      </Layout>
    </>
  )
  
}

export async function getStaticProps({ locale, previewData }) {
  const client = createClient({ previewData })

  const global = await client.getSingle("global");
  const page = await client.getSingle("bureau", { lang: locale });
  const menu = await client.getSingle("menu", { lang: locale });
  const footer = await client.getSingle("footer");

  return {
    props: {
      menu: menu.data,
      doc: page,
      footer: footer,
      content: page.data,
      global: global.data,
    },
  };
}

export default Bureau;
