import { createClient, linkResolver } from '../../prismicConfiguration'
import React, {useEffect, useState} from 'react';
import SliceZone from "next-slicezone";
import Head from 'next/head'
import { RichText } from 'prismic-reactjs'

import * as Slices from "../../slices";
const resolver = ({ sliceName }) => Slices[sliceName];

import Layout from "../../components/layout"
import Projects from "../../components/projects"


const Theme = (props) => {
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
        <meta name="keywords" content={RichText.asText(global.keywords)} />
        <meta name="copyright" content={global.copyright} />
        <meta name="DC.CONTRIBUTORS" content={global.contributors}></meta>
        <meta name="DC.SUBJECT" content={RichText.asText(global.keywords)}></meta>
        <meta name="DC.DESCRIPTION" content={RichText.asText(description ? description : global.description)} />
        <meta name="DC.RIGHTS" content={global.copyright} />
        <meta name="DC.LANGUAGE" content={doc.lang.slice(0,2)} />
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

  const homepage = await client.getByUID("homepage", "home", { lang: locale });
  const page = await client.getByUID("theme", params.uid, { lang: locale });
  const menu = await client.getSingle("menu", { lang: locale });
	const footer = await client.getSingle("footer");
  const global = await client.getSingle("global");
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

export default Theme;
