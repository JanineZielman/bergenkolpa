import { createClient } from '../../prismicConfiguration'
import { RichText } from 'prismic-reactjs'
import Layout from "../../components/layout"
import Head from 'next/head'

const Bureau = (props) => {
  const {doc, menu, content, footer, global} = props
  return(
    <>
      <Head>
        <title>{global.title}</title>
        <meta name="description" content={RichText.asText(global.description)} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={global.title} />
        <meta property="og:description" content={RichText.asText(global.description)} />
        <meta property="og:image" content={global.image.url} />
      </Head>
      <Layout altLangs={doc.alternate_languages} menu={menu} lang={doc.lang} footer={footer} global={global}>
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
          {content.slices.map((slice,i) => {
            return(
              <div key={`bureau-items${i}`} className="section">
                <h2>{slice.primary.title}</h2>
                <RichText render={slice.primary.text} />
                <div className='flex'>
                  {slice.items.map((item,i) => {
                    return(
                      <div className='flex-item'>
                        <h3>{item.text}</h3>
                        <img src={item.image.url}/>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}

        </div>
      </Layout>
    </>
  )
  
}

export async function getStaticProps({ locale, previewData }) {
  const client = createClient({ previewData })

  const global = await client.getSingle("global");
  const page = await client.getSingle("bureau", { lang: locale });
  const menu = await client.getSingle("menu", { lang: locale });
  const footer = await client.getSingle("footer");

  return {
    props: {
      menu: menu.data,
      doc: page,
      footer: footer,
      content: page.data,
      global: global.data,
    },
  };
}

export default Bureau;
