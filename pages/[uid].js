import { Client } from "../utils/prismicHelpers";
import { queryRepeatableDocuments } from '../utils/queries';
import SliceZone from "next-slicezone";

import * as Slices from "../slices";
const resolver = ({ sliceName }) => Slices[sliceName];

const Page = (props) => {
  return(
    <></>
    // <SliceZone slices={props.slices} resolver={resolver} />
  )
}
  

// Fetch content from prismic
export async function getStaticProps({ params }) {

  const doc = await Client().getByUID("page", params.uid) || {}

  return {
    props: {
      // slices: doc.data.slices
    }
  }
}

export async function getStaticPaths() {
  const documents = await queryRepeatableDocuments((doc) => doc.type === 'page')
  return {
    paths: documents.map(doc => `/${doc.uid}`),
    fallback: true,
  }
}

export default Page;
