import { createClient, linkResolver } from '../../prismicConfiguration'
import { RichText } from 'prismic-reactjs'
import Layout from "../../components/layout"
import ProjectPage from '../../components/project'
import Head from 'next/head'

const Project = (props) => {
  const {doc, menu, footer, global, tags, themes} = props
  return(
    <>
			<Head>
				<title>{doc.data.title}</title>
				{doc.data.description && <meta name="description" content={RichText.asText(doc.data.description)} />}
				<meta name="keywords" content={RichText.asText(global.keywords)} />
				<meta name="copyright" content={global.copyright} />
				<meta name="DC.CONTRIBUTORS" content={global.contributors}></meta>
				<meta name="DC.SUBJECT" content={RichText.asText(global.keywords)}></meta>
				{doc.data.description &&  <meta name="DC.DESCRIPTION" content={RichText.asText(doc.data.description)} />}
				<meta name="DC.RIGHTS" content={global.copyright} />
				<meta name="DC.LANGUAGE" content={doc.lang.slice(0,2)} />
				<meta property="og:type" content="website" />
				<meta property="og:title" content={doc.data.title} />
				{doc.data.description && <meta property="og:description" content={RichText.asText(doc.data.description)} />}
				{doc.data['cover-image']?.url && <meta property="og:image" content={doc.data['cover-image'].url} />}
    	</Head>
      <Layout altLangs={doc.alternate_languages} menu={menu} lang={doc.lang} footer={footer} global={global}>
				<ProjectPage item={doc} tags={tags} themes={themes} lang={doc.lang}/>
      </Layout>
    </>
  )
}

export async function getStaticProps({ params, locale, previewData }) {
  const client = createClient({ previewData })

  const global = await client.getSingle("global");
  const page = await client.getByUID("project", params.uid, { lang: locale });
  const menu = await client.getSingle("menu", { lang: locale });
  const footer = await client.getSingle("footer");

	const tags = await client.getAllByType("tag", { lang: locale });
  const themes = await client.getAllByType("theme", { lang: locale });


  return {
    props: {
      menu: menu.data,
      footer: footer,
      doc: page,
      global: global.data,
			tags: tags,
      themes: themes,
    },
  };
}

export async function getStaticPaths({previewData}) {
  const client = createClient({ previewData })

  const documents = await client.getAllByType("project", { lang: "*" });

  return {
    paths: documents.map((doc) => {
      return { params: { uid: doc.uid }, locale: doc.lang };
    }),
    fallback: false,
  };
}

export default Project;
