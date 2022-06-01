import { createClient } from '../../prismicConfiguration'
import React, {useEffect, useState} from 'react';
import SliceZone from "next-slicezone";
import Head from 'next/head'
import { RichText } from 'prismic-reactjs'

import * as Slices from "../../slices";
const resolver = ({ sliceName }) => Slices[sliceName];
import Layout from "../../components/layout"
import Projects from "../../components/projects"



const Page = (props) => {
  const {doc, menu, projects, homepage, footer, global, tags, themes} = props

  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [image, setImage] = useState(null);

  useEffect(() => {
    if(window.location.hash) {
      if(window.location.hash != '#projects') {
        let id = window.location.hash.replace('#','');
        let project = projects.filter(project => project.uid == id);
        setTitle(project[0].data.title)
        setDescription(project[0].data.description)
        setImage(project[0].data['cover-image'].url)
      }
    } 
  });

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
        <SliceZone slices={homepage} resolver={resolver} />
        <Projects projects={projects} tags={tags} themes={themes} lang={doc.lang}/>
      </Layout>
    </>
  )
}

export async function getStaticProps({ params, locale, previewData }) {
  const client = createClient({ previewData })
  const prismic = require("@prismicio/client");

  const global = await client.getSingle("global");
  const homepage = await client.getByUID("homepage", "home", { lang: locale });
  const page = await client.getByUID("tag", 'onderzoek', { lang: locale });
  const menu = await client.getSingle("menu", { lang: locale });
  const footer = await client.getSingle("footer");
  const tags = await client.getAllByType("tag", { lang: locale });
  const themes = await client.getAllByType("theme", { lang: locale });

  const projects = await client.getAllByType('project', {
    lang: locale,
    orderings: {
			field: 'my.project.date',
			direction: 'desc',
		},
    predicates: [
      prismic.predicate.at(
        'my.project.categories.category',
        'onderzoek'
      ),
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
      footer: footer,
      doc: page,
      projects: projects,
      global: global.data,
      tags: tags,
      themes: themes,
    },
  };
}

export async function getStaticPaths({previewData}) {
  const client = createClient({ previewData })

  const documents = await client.getAllByType("theme", { lang: "*" });

  return {
    paths: documents.map((doc) => {
      return { params: { uid: doc.uid }, locale: doc.lang };
    }),
    fallback: false,
  };
}

export default Page;
