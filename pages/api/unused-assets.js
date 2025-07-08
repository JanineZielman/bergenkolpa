import axios from 'axios';

const PRISMIC_REPO = 'bergenkolpa';
const PRISMIC_TOKEN = process.env.PRISMIC_TOKEN;

// ----------------------
// Utility: Fetch All Assets from Prismic
// ----------------------
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

// ----------------------
// Utility: Fetch All Documents to find used assets
// ----------------------
const fetchAllDocuments = async () => {
  const apiURL = `https://${PRISMIC_REPO}.cdn.prismic.io/api/v2`;

  // Step 1: Get the master ref + languages
  const apiRes = await axios.get(apiURL, {
    headers: {
      Authorization: `Token ${PRISMIC_TOKEN}`,
    },
  });

  const ref = apiRes.data.refs.find(r => r.id === 'master')?.ref;
  const languages = apiRes.data.languages?.map(lang => lang.id) || ['en-us'];

  if (!ref) throw new Error('Master ref not found');

  // Step 2: Fetch documents for each language
  const allDocuments = [];

  for (const lang of languages) {
    let nextPage = `${apiURL}/documents/search?pageSize=100&ref=${ref}&lang=${lang}`;

    while (nextPage) {
      const res = await axios.get(nextPage, {
        headers: {
          Authorization: `Token ${PRISMIC_TOKEN}`,
        },
      });

      allDocuments.push(...res.data.results);
      nextPage = res.data.next_page;
      if (nextPage) nextPage += `&ref=${ref}`;
    }
  }

  return allDocuments;
};


// ----------------------
// Utility: Extract Used Asset URLs from documents
// ----------------------
const extractUsedAssetUrls = (documents) => {
  const urls = new Set();

  const recurse = (obj) => {
    if (typeof obj === 'object' && obj !== null) {
      for (const key in obj) {
        const val = obj[key];

        if (typeof val === 'string' && val.includes('images.prismic.io')) {
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

// ----------------------
// API Route Handler
// ----------------------
export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const [assets, documents] = await Promise.all([
        fetchAllAssets(),
        fetchAllDocuments(),
      ]);

      const usedUrls = extractUsedAssetUrls(documents);
      const normalizeUrl = (url) => url.split('?')[0];

      const unusedAssets = assets
        .filter(asset => asset.extension !== 'pdf')
        .filter(asset => !usedUrls.has(normalizeUrl(asset.url)));

      res.status(200).json({
        totalAssets: assets.length,
        usedAssets: usedUrls.size,
        unusedAssets: unusedAssets.length,
        unused: unusedAssets.map(asset => ({
          id: asset.id,
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

  else if (req.method === 'DELETE') {
    try {
      const { assetIds } = req.body;

      if (!Array.isArray(assetIds) || assetIds.length === 0) {
        return res.status(400).json({ error: 'Missing asset IDs' });
      }

      const deletePromises = assetIds.map((id) =>
        axios.delete(`https://asset-api.prismic.io/assets/${id}`, {
          headers: {
            Authorization: `Token ${PRISMIC_TOKEN}`,
            repository: PRISMIC_REPO,
          },
        })
      );

      await Promise.all(deletePromises);

      res.status(200).json({ success: true, deleted: assetIds.length });
    } catch (error) {
      console.error('Delete error:', error?.response?.data || error.message);
      res.status(500).json({ error: 'Failed to delete assets' });
    }
  }

  else {
    res.setHeader('Allow', ['GET', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
