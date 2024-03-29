const prismic = require("@prismicio/client");

const sm = require("./sm.json");

/**
 * @returns {import('next').NextConfig}
 */
module.exports = async () => {
  const client = prismic.createClient(sm.apiEndpoint);

  const repository = await client.getRepository();
  const locales = repository.languages.map((lang) => lang.id);

  return {
    i18n: {
      // These are all the locales you want to support in
      // your application
      locales,
      // This is the default locale you want to be used when visiting
      // a non-locale prefixed path e.g. `/hello`
      defaultLocale: locales[0],
    },
    swcMinify: false,
    images: {
      loader: "imgix",
      path: "",
    },
    redirects() {
      return [
        {
          source: '/nl',
          destination: '/nl-nl',
          permanent: true,
        },
        {
          source: '/en',
          destination: '/en-gb',
          permanent: true,
        },
        {
          source: '/398_20844214963161620171.html',
          destination: '/zh-cn',
          permanent: true,
        },
        {
          source: '/disclaimer.html',
          destination: '/page/disclaimer',
          permanent: true,
        },
        // recent
        {
          source: '/53_recent.html',
          destination: '/recent',
          permanent: true,
        },
    ]
  },
  };
  
};