import { createClient } from '../../prismicConfiguration'
import SliceZone from "next-slicezone";

import * as Slices from "../../slices";
const resolver = ({ sliceName }) => Slices[sliceName];

import Layout from "../../components/layout"
import Projects from "../../components/projects"


const Theme = (props) => {
  const {doc, menu, projects, homepage, params, footer} = props

  return(
   <Layout altLangs={doc.alternate_languages} menu={menu} lang={doc.lang} footer={footer}>
    <SliceZone slices={props.homepage} resolver={resolver} />
    <Projects projects={projects}/>
   </Layout>
  )
}

export async function getStaticProps({ params, locale }) {
  const client = createClient();
  const prismic = require("@prismicio/client");

  const homepage = await client.getByUID("homepage", "home", { lang: locale });
  const page = await client.getByUID("theme", params.uid, { lang: locale });
  const menu = await client.getSingle("menu");
	const footer = await client.getSingle("footer");
  // const projects = await client.getAllByType('project' );

  const projects = await client.getAllByType('project', {
    predicates: [
      prismic.predicate.at(
        'my.project.themes.theme',
        params.uid
      ),
    ],
  })

  return {
    props: {
      homepage: homepage.data.slices,
      menu: menu.data,
      doc: page,
			footer: footer,
      projects: projects,
      params: params.uid
    },
  };
}

export async function getStaticPaths() {
  const client = createClient();

  const documents = await client.getAllByType("theme", { lang: "*" });

  return {
    paths: documents.map((doc) => {
      return { params: { uid: doc.uid }, locale: doc.lang };
    }),
    fallback: false,
  };
}

export default Theme;
