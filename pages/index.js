// import { Client } from "../utils/prismicHelpers";
import { createClient } from '../prismicConfiguration'
import SliceZone from "next-slicezone";
import * as Slices from "../slices";
const resolver = ({ sliceName }) => Slices[sliceName];

import Layout from "../components/layout"

const Page = (props) => {
  const {doc, menu} = props
  console.log(props)
  return(
    <Layout altLangs={doc.alternate_languages} menu={menu} lang={doc.lang}>
      <SliceZone slices={props.slices} resolver={resolver} />
    </Layout>
  )
  
}

export async function getStaticProps({ locale }) {
  const client = createClient();

  const page = await client.getByUID("homepage", "home", { lang: locale });
  const menu = await client.getSingle("menu");

  return {
    props: {
      menu: menu.data,
      doc: page,
      slices: page.data.slices
    },
  };
}

export default Page;
