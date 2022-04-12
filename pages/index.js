// import { Client } from "../utils/prismicHelpers";
import { createClient } from '../prismicConfiguration'
import SliceZone from "next-slicezone";
import * as Slices from "../slices";
const resolver = ({ sliceName }) => Slices[sliceName];

import Layout from "../components/layout"

const Page = (props) => {
  const {doc, menu} = props
  console.log('doc', doc)
  return(
    <Layout altLangs={doc.alternate_languages} menu={menu} lang={doc.lang}>

    </Layout>
    // <SliceZone slices={props.slices} resolver={resolver} />
  )
  
}

// // Fetch content from prismic
// export async function getStaticProps({params}) {
//   const client = createClient()
//   // const { uid, lang } = params
  
//   const doc = await client.getByUID("page", "home", 'nl-nl') || {}
//   const menu = await client.getSingle("menu") || {}

//   return {
//     props: {
//       content: doc.data,
//       menu: menu.data
//       // slices: doc.data.slices
//     }
//   }
// }

export async function getStaticProps({ locale }) {
  const client = createClient();

  const page = await client.getByUID("page", "home", { lang: locale });
  const menu = await client.getSingle("menu");

  return {
    props: {
      menu: menu.data,
      doc: page,
    },
  };
}

export default Page;
