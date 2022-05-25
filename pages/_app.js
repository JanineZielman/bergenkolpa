import "../styles/globals.scss";
import "../styles/slider.scss";
import "../styles/projects.scss";
import "../styles/bureau.scss";
import "../styles/mobile.scss";

import { PrismicProvider } from '@prismicio/react'
import { PrismicPreview } from '@prismicio/next'
import {linkResolver} from '../prismicConfiguration'
import Head from 'next/head'


function MyApp({ Component, pageProps }) {
  return (
    <>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
    </Head>
   <PrismicProvider
      linkResolver={linkResolver}
      internalLinkComponent={({ href, children, ...props }) => (
        <Link href={href}>
          <a {...props}>
            {children}
          </a>
        </Link>
      )}
    >
      <PrismicPreview repositoryName={'bergenkolpa'}>
        <Component {...pageProps} />
      </PrismicPreview>
    </PrismicProvider>
    </>
  )
};

export default MyApp;
