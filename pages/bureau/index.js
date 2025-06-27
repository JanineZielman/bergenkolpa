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
				document.getElementById(id)?.classList.add('selected');
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
        <meta name="keywords" content={RichText.asText(global.keywords)} />
        <meta name="copyright" content={global.copyright} />
        <meta name="DC.CONTRIBUTORS" content={global.contributors}></meta>
        <meta name="DC.SUBJECT" content={RichText.asText(global.keywords)}></meta>
        <meta name="DC.DESCRIPTION" content={RichText.asText(global.description)} />
        <meta name="DC.RIGHTS" content={global.copyright} />
        <meta name="DC.LANGUAGE" content={doc.lang.slice(0,2)} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={global.title} />
        <meta property="og:description" content={RichText.asText(global.description)} />
        <meta property="og:image" content={global.image.url} />
      </Head>
      <Layout altLangs={doc.alternate_languages} menu={menu} lang={doc.lang} footer={footer} global={global}>
        <div className="bureau">
          <div className="intro" id={doc.lang == 'en-gb' ? 'Intro' : doc.lang == 'nl-nl' ? 'Introductie' : ''}>
            <h2>Introduction</h2>
            <div className="content">
              <RichText render={content.intro} linkResolver={linkResolver}/>
            </div>
          </div>
          {content.slices.map((slice,i) => {
            console.log(slice)
            return(
              <div key={`bureau-items${i}`} className={`section ${slice.primary.size}`} id={slice.primary.uid}>
                {slice.primary.title && <h2>{slice.primary.title}</h2> }
                {slice.primary.text && 
                  <div className={`text-wrap ${slice.primary.columns ? 'columns' : ''}`}>
                    <RichText render={slice.primary.text} linkResolver={linkResolver}/>
                  </div>
                }
                <div className='flex '>
                  {slice.slice_type == 'image_text' &&
                    slice.items.map((item,j) => {
                      return(
                        <div className='flex-item' id={item.text?.replace(' ', '_')}>
                          {item.text &&
                            <h3 onClick={item.info[0] && AddClass2} className={item.info[0] && 'clickable'}>{item.text}</h3>
                          }
                          <img className='close' onClick={RemoveClass} src="/cross.svg"/>
                          <div className='content-wrapper'>
                            {item.image.url && <img onClick={item.info[0] && AddClass} src={item.image.url} alt={item.image.alt ? item.image.alt : `van Bergen Kolpa - ${item.text}`} className={item.info[0] && 'clickable'}/>}
                            {item.info[0] &&
                              <div className='info-text'>
                                <RichText render={item.info} linkResolver={linkResolver}/>
                              </div>
                            }
                          </div>
                        </div>
                      )
                    })
                  }
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
