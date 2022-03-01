import { Client } from "../utils/prismicHelpers";
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
export async function getStaticProps() {

  const doc = await Client().getByUID("page", "home") || {}

  return {
    props: {
      // slices: doc.data.slices
    }
  }
}

export default Page;
