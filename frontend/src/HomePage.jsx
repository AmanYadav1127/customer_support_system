import { useState, useEffect } from 'react';

export default function HomePage() {
  const [healthData, setHealthData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8080/api/health', {
      credentials: 'include',
    })
      .then(res => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then(data => {
        setHealthData(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex items-center justify-center min-h-[80vh] bg-transparent">
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      
      {healthData && (
        <div className="bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 w-[450px] border border-gray-100/50">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-900">Customer Support System</h2>
          
          <div className="flex flex-col">
            <div className="flex justify-between items-center py-3 border-b border-gray-100">
              <span className="text-gray-500">Status</span>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                <span className="font-bold text-green-600 text-sm">{healthData.status}</span>
              </div>
            </div>

            <div className="flex justify-between items-center py-3 border-b border-gray-100">
              <span className="text-gray-500">Service</span>
              <span className="text-gray-800 text-sm">{healthData.service}</span>
            </div>

            <div className="flex justify-between items-center py-3 border-b border-gray-100">
              <span className="text-gray-500">Version</span>
              <span className="text-gray-800 text-sm">{healthData.version}</span>
            </div>

            <div className="flex justify-between items-center py-3 border-b border-gray-100">
              <span className="text-gray-500">Timestamp</span>
              <span className="text-gray-600 text-xs font-mono">{healthData.timestamp}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
