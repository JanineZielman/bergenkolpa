import { createClient } from '../prismicConfiguration'
import SliceZone from "next-slicezone";
import * as Slices from "../slices";
const resolver = ({ sliceName }) => Slices[sliceName];

import Layout from "../components/layout"
import Projects from "../components/projects"

const Page = (props) => {
  const {doc, menu, projects, slices, footer, global, tags, themes} = props
  return(
    <Layout altLangs={doc.alternate_languages} menu={menu} lang={doc.lang} footer={footer} global={global}>
      <SliceZone slices={slices} resolver={resolver} />
      <Projects projects={projects} tags={tags} themes={themes}/>
    </Layout>
  )
  
}

export async function getStaticProps({ locale, previewData }) {
  const client = createClient({ previewData })

  const global = await client.getSingle("global");
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
  const tags = await client.getAllByType("tag", { lang: locale });
  const themes = await client.getAllByType("theme", { lang: locale });

  return {
    props: {
      menu: menu.data,
      doc: page,
      footer: footer,
      slices: page.data.slices,
      projects: projects,
      global: global.data,
      tags: tags,
      themes: themes,
    },
  };
}

export default Page;
