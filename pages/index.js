import { createClient } from '../prismicConfiguration'
import React, {useEffect, useState} from 'react';
import SliceZone from "next-slicezone";
import * as Slices from "../slices";
import { RichText } from 'prismic-reactjs'
import Head from 'next/head'
const resolver = ({ sliceName }) => Slices[sliceName];

import Layout from "../components/layout"
import Projects from "../components/projects"

const Page = (props) => {
  const {doc, menu, projectsOrder, allProjects, slices, footer, global, tags, themes} = props

  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [image, setImage] = useState(null);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    if(window.location.hash) {
      if(window.location.hash != '#projects') {
        let id = window.location.hash.replace('#','');
        let project = projects.filter(project => project.uid == id);
        setTitle(project[0]?.data.title)
        setDescription(project[0]?.data.description)
        setImage(project[0]?.data['cover-image'].url)
      }
    } 
  });


  useEffect(() => {
    const unique = (value, index, self) => {
      return self.indexOf(value) === index
    }

    let projectsList = [];
    for (let i = 0; i < projectsOrder.length; i++) {
      projectsList.push(projectsOrder[i].project.uid);
    }

    let sort = projectsList.map((i) => allProjects.find((o) => o.uid === i));

    for (let j = 0; j < allProjects.length; j++) {
      sort.push(allProjects[j]);
    }

    setProjects(sort.filter(unique))
  }, []);

  return(
    <>
    <Head>
      <title>{title ? title : global.title}</title>
      <meta name="description" content={RichText.asText(description ? description : global.description)} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title ? title : global.title} />
      <meta property="og:description" content={RichText.asText(description ? description : global.description)} />
      <meta property="og:image" content={image ? image : global.image.url} />
    </Head>
    <Layout altLangs={doc.alternate_languages} menu={menu} lang={doc.lang} footer={footer} global={global}>
      <SliceZone slices={slices} resolver={resolver} />
      <Projects projects={projects} tags={tags} themes={themes} lang={doc.lang}/>
    </Layout>
    </>
  )
  
}

export async function getStaticProps({ locale, previewData }) {
  const client = createClient({ previewData })

  const global = await client.getSingle("global");
  const page = await client.getByUID("homepage", "home", { lang: locale });
  const menu = await client.getSingle("menu", { lang: locale });
  const footer = await client.getSingle("footer");
  const allProjects = await client.getAllByType('project', { 
    lang: locale,
    orderings: {
			field: 'my.project.date',
			direction: 'desc',
		},
  });

  const projectsOrder= await client.getSingle('order', { 
    lang: locale
  });

  const tags = await client.getAllByType("tag", { lang: locale });
  const themes = await client.getAllByType("theme", { lang: locale });

  return {
    props: {
      menu: menu.data,
      doc: page,
      footer: footer,
      slices: page.data.slices,
      allProjects: allProjects,
      projectsOrder: projectsOrder.data.projects,
      global: global.data,
      tags: tags,
      themes: themes,
    },
  };
}

export default Page;
