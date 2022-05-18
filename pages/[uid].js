// import { Client } from "../utils/prismicHelpers";
import { createClient } from '../prismicConfiguration'
import { queryRepeatableDocuments } from '../utils/queries';
import SliceZone from "next-slicezone";

import * as Slices from "../slices";
const resolver = ({ sliceName }) => Slices[sliceName];

import Layout from "../components/layout"
import Projects from "../components/projects"


const Page = (props) => {
  const {doc, menu, projects, homepage, params, footer} = props
  console.log(doc)
  
  return(
    <Layout altLangs={doc.alternate_languages} menu={menu} lang={doc.lang} footer={footer}>
      <SliceZone slices={props.homepage} resolver={resolver} />
      <Projects projects={projects}/>
    </Layout>
  )
}

export async function getStaticProps({ params, locale, previewData }) {
  const client = createClient({ previewData })
  const prismic = require("@prismicio/client");

  const homepage = await client.getByUID("homepage", "home", { lang: locale });
  const page = await client.getByUID("tag", params.uid, { lang: locale });
  const menu = await client.getSingle("menu");
  const footer = await client.getSingle("footer");
  // const projects = await client.getAllByType('project' );

  const projects = await client.getAllByType('project', {
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
      params: params.uid
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
