import { createClient } from '../../prismicConfiguration'
import SliceZone from "next-slicezone";
import * as Slices from "../../slices";
import { RichText } from 'prismic-reactjs'
// const resolver = ({ sliceName }) => Slices[sliceName];

import Layout from "../../components/layout"

const Bureau = (props) => {
  const {doc, menu, content, footer} = props
  return(
    <Layout altLangs={doc.alternate_languages} menu={menu} lang={doc.lang} footer={footer}>
      <div className="bureau">
        <div className="intro">
          <h2>Introduction</h2>
          <div className="content">
            <RichText render={content.intro} />
          </div>
        </div>
        <div className="contact">
          <h2>Contact</h2>
          <div className="content">
            <RichText render={content.contact} />
          </div>
        </div>
     
      {/* <SliceZone slices={props.slices} resolver={resolver} /> */}
      </div>
    </Layout>
  )
  
}

export async function getStaticProps({ locale, previewData }) {
  const client = createClient({ previewData })

  const page = await client.getSingle("bureau", { lang: locale });
  const menu = await client.getSingle("menu");
  const footer = await client.getSingle("footer");

  return {
    props: {
      menu: menu.data,
      doc: page,
      footer: footer,
      content: page.data,
      // slices: page.data,
    },
  };
}

export default Bureau;
