import { createClient } from '../../prismicConfiguration'
import { RichText } from 'prismic-reactjs'
import Moment from 'moment';
import Layout from "../../components/layout"

const Recent = (props) => {
  const {doc, menu, footer, news, global} = props
  return(
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
