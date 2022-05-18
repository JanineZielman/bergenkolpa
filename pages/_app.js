import "../styles/globals.scss";
import "../styles/slider.scss";
import "../styles/projects.scss";
import "../styles/bureau.scss";
import "../styles/mobile.scss";

import { PrismicProvider } from '@prismicio/react'
import { PrismicPreview } from '@prismicio/next'
import {linkResolver} from '../prismicConfiguration'

function MyApp({ Component, pageProps }) {
  return (
  // <Component {...pageProps} />
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
  )
};

export default MyApp;
