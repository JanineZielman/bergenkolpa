// import { Client } from "../utils/prismicHelpers";
import { createClient } from '../prismicConfiguration'
import { queryRepeatableDocuments } from '../utils/queries';
import SliceZone from "next-slicezone";

import * as Slices from "../slices";
const resolver = ({ sliceName }) => Slices[sliceName];

import Layout from "../components/layout"
import Projects from "../components/projects"


const Page = (props) => {
  const {doc, menu, projects, homepage, footer, global} = props
  
  return(
    <Layout altLangs={doc.alternate_languages} menu={menu} lang={doc.lang} footer={footer} global={global}>
      <SliceZone slices={homepage} resolver={resolver} />
      <Projects projects={projects}/>
    </Layout>
  )
}

export async function getStaticProps({ params, locale, previewData }) {
  const client = createClient({ previewData })
  const prismic = require("@prismicio/client");

  const global = await client.getSingle("global");
  const homepage = await client.getByUID("homepage", "home", { lang: locale });
  const page = await client.getByUID("tag", params.uid, { lang: locale });
  const menu = await client.getSingle("menu", { lang: locale });
  const footer = await client.getSingle("footer");

  const projects = await client.getAllByType('project', {
    lang: locale,
    orderings: {
			field: 'my.project.date',
			direction: 'desc',
		},
    predicates: [
      prismic.predicate.at(
        'my.project.categories.category',
        params.uid
      ),
    ],
  })

  return {
    props: {
      homepage: homepage.data.slices,
      menu: menu.data,
      footer: footer,
      doc: page,
      projects: projects,
      global: global.data,
    },
  };
}

export async function getStaticPaths({previewData}) {
  const client = createClient({ previewData })

  const documents = await client.getAllByType("tag", { lang: "*" });

  return {
    paths: documents.map((doc) => {
      return { params: { uid: doc.uid }, locale: doc.lang };
    }),
    fallback: false,
  };
}

export default Page;
