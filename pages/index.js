// import { Client } from "../utils/prismicHelpers";
import { createClient } from '../prismicConfiguration'
import SliceZone from "next-slicezone";
import * as Slices from "../slices";
const resolver = ({ sliceName }) => Slices[sliceName];

import Layout from "../components/layout"
import Projects from "../components/projects"

const Page = (props) => {
  const {doc, menu, projects, slices, footer} = props
  return(
    <Layout altLangs={doc.alternate_languages} menu={menu} lang={doc.lang} footer={footer}>
      <SliceZone slices={props.slices} resolver={resolver} />
      <Projects projects={projects}/>
    </Layout>
  )
  
}

export async function getStaticProps({ locale, previewData }) {
  const client = createClient({ previewData })

  const page = await client.getByUID("homepage", "home", { lang: locale });
  const menu = await client.getSingle("menu", { lang: locale });
  const footer = await client.getSingle("footer");
  const projects = await client.getAllByType('project', { 
    lang: locale,
    orderings: {
			field: 'my.project.date',
			direction: 'desc',
		},
  });

  return {
    props: {
      menu: menu.data,
      doc: page,
      footer: footer,
      slices: page.data.slices,
      projects: projects
    },
  };
}

export default Page;
