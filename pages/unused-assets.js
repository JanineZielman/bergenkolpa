import { useEffect, useState } from 'react';

export default function UnusedAssetsPage() {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [deletingAll, setDeletingAll] = useState(false);

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

  const deleteAllImages = async () => {
    if (!window.confirm('Are you sure you want to delete all unused images?')) return;

    setDeletingAll(true);
    try {
      const assetIds = assets.map((asset) => asset.id);
      const res = await fetch('/api/unused-assets', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ assetIds }),
      });

      if (!res.ok) throw new Error('Failed to delete assets');
      setAssets([]);
    } catch (err) {
      alert(`Error deleting assets: ${err.message}`);
    } finally {
      setDeletingAll(false);
    }
  };

  const deleteAsset = async (id) => {
    if (!window.confirm('Delete this image?')) return;

    setDeletingId(id);
    try {
      const res = await fetch('/api/unused-assets', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ assetIds: [id] }),
      });

      if (!res.ok) throw new Error('Failed to delete asset');

      setAssets((prev) => prev.filter((asset) => asset.id !== id));
    } catch (err) {
      alert(`Error deleting asset: ${err.message}`);
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) return <p>Loading unused assets...</p>;
  if (error) return <p>Error: {error}</p>;
  if (assets.length === 0) return <p>No unused assets found!</p>;

  return (
    <div style={{ padding: 20 }}>
      <h1>Unused Assets ({assets.length})</h1>
      <div style={{ marginBottom: 20 }}>
        <button
          onClick={downloadAllImages}
          style={{
            padding: '10px 16px',
            marginRight: 10,
            backgroundColor: '#0070f3',
            color: '#fff',
            border: 'none',
            borderRadius: 5,
            cursor: 'pointer',
          }}
        >
          Download All Images
        </button>
        {/* <button
          onClick={deleteAllImages}
          disabled={deletingAll}
          style={{
            padding: '10px 16px',
            backgroundColor: deletingAll ? '#999' : '#e00',
            color: '#fff',
            border: 'none',
            borderRadius: 5,
            cursor: deletingAll ? 'not-allowed' : 'pointer',
          }}
        >
          {deletingAll ? 'Deleting...' : 'Delete All Images'}
        </button> */}
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill,minmax(200px,1fr))',
          gap: 16,
        }}
      >
        {assets.map((asset) => (
          <div
            key={asset.id}
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
            {/* <button
              onClick={() => deleteAsset(asset.id)}
              disabled={deletingId === asset.id}
              style={{
                marginTop: 10,
                padding: '6px 12px',
                backgroundColor: '#e00',
                color: '#fff',
                border: 'none',
                borderRadius: 4,
                cursor: deletingId === asset.id ? 'not-allowed' : 'pointer',
                fontSize: 12,
              }}
            >
              {deletingId === asset.id ? 'Deleting...' : 'Delete'}
            </button> */}
          </div>
        ))}
      </div>
    </div>
  );
}
