// import smConfig from "./sm.json";

// if (!smConfig.apiEndpoint) {
//   console.warn("Looks like Slice Machine hasn't been bootstraped already.\nCheck the `Getting Started` section of the README file :)");
// }

// export const apiEndpoint = smConfig.apiEndpoint;

// // -- Access Token if the repository is not public
// // Generate a token in your dashboard and configure it here if your repository is private
// export const accessToken = "";

// // -- Link resolution rules
// // Manages the url links to internal Prismic documents
// export const linkResolver = (doc) => {
//   if (doc.type === "page") {
//     return `/${doc.uid}`;
//   }
//   return "/";
// };

// export const Router = {
//   routes: [{"type":"page","path":"/:uid"}],
// };

import * as prismic from '@prismicio/client'
import sm from './sm.json'

export const endpoint = sm.apiEndpoint
export const repositoryName = prismic.getRepositoryName(endpoint)

// Update the Link Resolver to match your project's route structure
export function linkResolver(doc) {
  switch (doc.type) {
    case 'home':
      return '/'
    case 'project':
      return `/${doc.uid}`
    default:
      return null
  }
}

// This factory function allows smooth preview setup
export function createClient(config = {}) {
  const client = prismic.createClient(endpoint, {
    ...config,
  })

  return client
}
