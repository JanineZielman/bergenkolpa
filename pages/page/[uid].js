import { createClient, linkResolver } from '../../prismicConfiguration'
import { RichText } from 'prismic-reactjs'
import Layout from "../../components/layout"

const Page = (props) => {
  const {doc, menu, footer, global} = props
  return(
    <>
      <Layout altLangs={doc.alternate_languages} menu={menu} lang={doc.lang} footer={footer} global={global}>
				<div className='default-page'>
					<h1>{doc.data.title}</h1>
					{doc.data.slices.map((slice, i) => {
						return(
							<>
							{slice.items.map((item, i) => {
								return(
									<RichText render={item.text} linkResolver={linkResolver}/>
								)
							})}
							</>
						)
					})}
				</div>
      </Layout>
    </>
  )
}

export async function getStaticProps({ params, locale, previewData }) {
  const client = createClient({ previewData })

  const global = await client.getSingle("global");
  const page = await client.getByUID("page", params.uid, { lang: locale });
  const menu = await client.getSingle("menu", { lang: locale });
  const footer = await client.getSingle("footer");


  return {
    props: {
      menu: menu.data,
      footer: footer,
      doc: page,
      global: global.data,
    },
  };
}

export async function getStaticPaths({previewData}) {
  const client = createClient({ previewData })

  const documents = await client.getAllByType("page", { lang: "*" });

  return {
    paths: documents.map((doc) => {
      return { params: { uid: doc.uid }, locale: doc.lang };
    }),
    fallback: false,
  };
}

export default Page;
