import { createClient } from '../../prismicConfiguration'
import { RichText } from 'prismic-reactjs'
import Moment from 'moment';
import Layout from "../../components/layout"
import Head from 'next/head'

const Recent = (props) => {
  const {doc, menu, footer, news, global} = props
  return(
		<>
      <Head>
        <title>{global.title + ' | Recent'}</title>
        <meta name="description" content={RichText.asText(news[0].data.text)} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={global.title + ' | Recent'} />
        <meta property="og:description" content={RichText.asText(news[0].data.text)} />
        <meta property="og:image" content={news[0].data.image.url} />
      </Head>
			<Layout altLangs={doc.alternate_languages} menu={menu} lang={doc.lang} footer={footer} global={global}>
				<div className="recent">
					<h2>Recent</h2>
					<div className="content">
						{news.map((item,i) => {
							return(
								<div key={`news${i}`} className='news-item'>
									<div className='date'>
										{Moment(item.data.date).format('D MMM y')}
									</div>
									<div className='wrapper'>
										<img src={item.data.image.url}/>
										<RichText render={item.data.text} />
									</div>
								</div>
							)
						})}
					</div>
				</div>
			</Layout>
		</>
  )
  
}

export async function getStaticProps({ locale, previewData }) {
  const client = createClient({ previewData })

  const page = await client.getSingle("recent", { lang: locale });
  const menu = await client.getSingle("menu", { lang: locale });
  const footer = await client.getSingle("footer");
	const news = await client.getAllByType('news-item', { 
		lang: locale,
		orderings: {
			field: 'my.news-item.date',
			direction: 'desc',
		},
	});
	const global = await client.getSingle("global");

  return {
    props: {
      menu: menu.data,
      doc: page,
      footer: footer,
			news: news,
			global: global.data,
    },
  };
}

export default Recent;
