// import { Client } from "../utils/prismicHelpers";
import { createClient } from '../prismicConfiguration'
import { queryRepeatableDocuments } from '../utils/queries';
import SliceZone from "next-slicezone";

import * as Slices from "../slices";
const resolver = ({ sliceName }) => Slices[sliceName];

import Layout from "../components/layout"

const Page = (props) => {
  const {doc, menu} = props
  console.log(doc)
  return(
   <Layout altLangs={doc.alternate_languages} menu={menu} lang={doc.lang}>
     {doc.data.title}
   </Layout>
    // <SliceZone slices={props.slices} resolver={resolver} />
  )
}

export async function getStaticProps({ params, locale }) {
  const client = createClient();

  const page = await client.getByUID("project", params.uid, { lang: locale });
  const menu = await client.getSingle("menu");

  return {
    props: {
      menu: menu.data,
      doc: page,
    },
  };
}

export async function getStaticPaths() {
  const client = createClient();

  const documents = await client.getAllByType("project", { lang: "*" });

  return {
    paths: documents.map((doc) => {
      return { params: { uid: doc.uid }, locale: doc.lang };
    }),
    fallback: false,
  };
}

export default Page;
