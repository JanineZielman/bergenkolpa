import { useEffect, useState } from 'react';

export default function UnusedAssetsPage() {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchAssets() {
      try {
        const res = await fetch('/api/unused-assets');
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        setAssets(data.unused || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchAssets();
  }, []);

  const downloadAllImages = async () => {
    for (const asset of assets) {
      try {
        const response = await fetch(asset.url);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = asset.name || 'download';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      } catch (error) {
        console.error(`Failed to download ${asset.name}`, error);
      }
    }
  };

  if (loading) return <p>Loading unused assets...</p>;
  if (error) return <p>Error: {error}</p>;

  if (assets.length === 0) return <p>No unused assets found!</p>;

  return (
    <div style={{ padding: 20 }}>
      <h1>Unused Assets ({assets.length})</h1>
      <button
        onClick={downloadAllImages}
        style={{
          marginBottom: 20,
          padding: '10px 16px',
          backgroundColor: '#0070f3',
          color: '#fff',
          border: 'none',
          borderRadius: 5,
          cursor: 'pointer',
        }}
      >
        Download All Images
      </button>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill,minmax(200px,1fr))',
          gap: 16,
        }}
      >
        {assets.map((asset) => (
          <div
            key={asset.url}
            style={{
              border: '1px solid #ddd',
              borderRadius: 8,
              padding: 10,
              textAlign: 'center',
            }}
          >
            <img
              src={asset.url}
              alt={asset.name}
              style={{ width: '100%', height: 'auto', borderRadius: 4 }}
              loading="lazy"
            />
            <p
              style={{
                fontSize: 14,
                marginTop: 8,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
              title={asset.name}
            >
              {asset.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
