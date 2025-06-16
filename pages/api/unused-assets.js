import axios from 'axios';

const PRISMIC_REPO = 'bergenkolpa';
const PRISMIC_TOKEN = process.env.PRISMIC_TOKEN

const fetchAllAssets = async () => {
  const assets = [];
  let cursor = null;
  let hasMore = true;

  while (hasMore) {
    const res = await axios.get('https://asset-api.prismic.io/assets', {
      params: cursor ? { cursor } : {},
      headers: {
        Authorization: `Token ${PRISMIC_TOKEN}`,
        repository: PRISMIC_REPO,
      },
    });

    const data = res.data;

    if (!data?.items) {
      console.error('Unexpected Asset API response:', data);
      throw new Error('Failed to fetch assets. Check token or repository header.');
    }

    assets.push(...data.items);

    hasMore = !!data.cursor;
    cursor = data.cursor;
  }

  return assets;
};

const fetchAllDocuments = async () => {
  // STEP 1: Get the master ref
  const apiURL = `https://${PRISMIC_REPO}.cdn.prismic.io/api/v2`;
  const apiRes = await axios.get(apiURL, {
    headers: {
      Authorization: `Token ${PRISMIC_TOKEN}`,
    },
  });

  const ref = apiRes.data.refs.find(r => r.id === 'master')?.ref;
  if (!ref) throw new Error('Master ref not found');

  // STEP 2: Use the ref in document requests
  const documents = [];
  let nextPage = `${apiURL}/documents/search?pageSize=100&ref=${ref}`;

  while (nextPage) {
    const res = await axios.get(nextPage, {
      headers: {
        Authorization: `Token ${PRISMIC_TOKEN}`,
      },
    });

    documents.push(...res.data.results);
    nextPage = res.data.next_page;
    if (nextPage) nextPage += `&ref=${ref}`; // Ensure ref stays in pagination
  }

  return documents;
};

const extractUsedAssetUrls = (documents) => {
  const urls = new Set();

  const recurse = (obj) => {
    if (typeof obj === 'object' && obj !== null) {
      for (const key in obj) {
        const val = obj[key];

        if (typeof val === 'string' && val.includes('images.prismic.io')) {
          // Strip query params
          const baseUrl = val.split('?')[0];
          urls.add(baseUrl);
        } else {
          recurse(val);
        }
      }
    }
  };

  documents.forEach(doc => recurse(doc));
  return urls;
};


export default async function handler(req, res) {
  try {
    const [assets, documents] = await Promise.all([
      fetchAllAssets(),
      fetchAllDocuments(),
    ]);

    const usedUrls = extractUsedAssetUrls(documents);
    console.log('used', usedUrls)

    const normalizeUrl = (url) => url.split('?')[0];

    const unusedAssets = assets.filter(asset => asset.extension !== 'pdf').filter(asset => !usedUrls.has(normalizeUrl(asset.url)));

    res.status(200).json({
      totalAssets: assets.length,
      usedAssets: usedUrls.size,
      unusedAssets: unusedAssets.length,
      unused: unusedAssets.map(asset => ({
        name: asset.filename,
        url: asset.url,
        lastUpdated: asset.last_modified,
      })),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching assets or documents' });
  }
}
