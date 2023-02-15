import { createClient, linkResolver } from '../../prismicConfiguration'
import React, {useEffect, useState} from 'react';
import { useRouter } from 'next/router';
import Moment from 'moment';
import 'moment/locale/nl'
import Head from 'next/head'
import { RichText } from 'prismic-reactjs'
import ImageSize from '../../components/imageSize';
import SliceZone from "next-slicezone";


import * as Slices from "../../slices";
const resolver = ({ sliceName }) => Slices[sliceName];
import Layout from "../../components/layout"



const News = (props) => {
  const {doc, menu, footer, news, global, locale} = props;

  console.log(doc)

	useEffect(() => {
		if (locale.slice(0,2) == 'zh') {
			 Moment.locale('en')
		} else {
			Moment.locale(locale.slice(0,2))
		}
  }, []);

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
        <title>{global.title + ' | Recent'}</title>
        <meta name="description" content={RichText.asText(news[0]?.data.text)} />
				<meta name="keywords" content={RichText.asText(global.keywords)} />
				<meta name="copyright" content={global.copyright} />
				<meta name="DC.CONTRIBUTORS" content={global.contributors}></meta>
				<meta name="DC.SUBJECT" content={RichText.asText(global.keywords)}></meta>
				<meta name="DC.DESCRIPTION" content={RichText.asText(news[0]?.data.text)} />
				<meta name="DC.RIGHTS" content={global.copyright} />
				<meta name="DC.LANGUAGE" content={doc.lang.slice(0,2)} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={global.title + ' | Recent'} />
        <meta property="og:description" content={RichText.asText(news[0]?.data.text)} />
        <meta property="og:image" content={news[0]?.data.image.url} />
      </Head>
			<Layout altLangs={doc.alternate_languages} menu={menu} lang={doc.lang} footer={footer} global={global}>
				<div className="recent">
					<h2>Recent</h2>
					<div className='intro-text'>
						{doc.data.slices.map((item, i) => (
							item.items.map((text, j) => {
								return(
									<RichText render={text.text}/>
								)
							})
						))}
					</div>
					<div className="content">
						{news.map((item,i) => {
							return(
								<div key={`news${i}`} className='news-item' id={item.uid?.replace(' ', '_')}>
									<div className='date'>
										{Moment(item.data.date).format('D MMM y')}
									</div>
									<div onClick={item.data.slices[0] && AddClass2} className={`wrapper ${item.data.slices[0] && 'clickable'}`}>
										{item.data.image.url ?
											<>
												<img src={item.data.image.url}/>
												<RichText render={item.data.text} linkResolver={linkResolver} />
											</>
										:
											<div className='big'>
												<RichText render={item.data.text} linkResolver={linkResolver} />
											</div>
										}
									</div>
									{item.data.slices[0] &&
										<div className='wrap'>
											<img className='close' onClick={RemoveClass} src="/cross.svg"/>
											{item.data.slices.map((slice, i) => {
												return(
													<>
														{slice.slice_type == 'embed' &&
															<div className='video' dangerouslySetInnerHTML={{ __html: slice.primary.embed.html }} />
														}
														{slice.items.map((item, i) => {
															return(
																<>
																	{item['aspect-ratio'] &&
																		<div className='extra-content'>
																			{item.image?.url &&
																				<div className='image'>
																					<ImageSize item={item}/>
																				</div>
																			}
																			{item.text && item.text[0]?.text &&
																				<RichText render={item.text} linkResolver={linkResolver} />
																			}
																			{item.quote && item.quote[0]?.text &&
																				<div className="caption">
																					<div></div>
																					<RichText render={item.quote} linkResolver={linkResolver} />
																				</div>
																			}
																		</div>
																	}
																</>
															)
														})}
													</>
												)
											})}
										</div>
									}
								</div>
							)
						})}
					</div>
				</div>
			</Layout>
		</>
  )
}

export async function getStaticProps({ params, locale, previewData }) {
  const client = createClient({ previewData })
  const prismic = require("@prismicio/client");

  const global = await client.getSingle("global");
  const homepage = await client.getByUID("homepage", "home", { lang: locale });
  const menu = await client.getSingle("menu", { lang: locale });
  const footer = await client.getSingle("footer");
	const page = await client.getByUID("news-tag", params.uid, { lang: locale });

  const news = await client.getAllByType('news-item', {
    lang: locale,
    orderings: {
			field: 'my.news-item.date',
			direction: 'desc',
		},
    predicates: [
      prismic.predicate.at(
        'my.news-item.category',
        params.uid
      )
    ],
  })

  return {
    props: {
      homepage: homepage.data.slices,
      menu: menu.data,
      footer: footer,
      doc: page,
      news: news,
      global: global.data,
			locale: locale,
    },
  };
}

export async function getStaticPaths({previewData}) {
  const client = createClient({ previewData })

  const documents = await client.getAllByType("news-tag", { lang: "*" });

  return {
    paths: documents.map((doc) => {
      return { params: { uid: doc.uid }, locale: doc.lang };
    }),
    fallback: false,
  };
}

export default News;
