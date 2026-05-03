import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Call } from '../types';
import Layout from '../components/Layout';

const Dashboard: React.FC = () => {
  const [calls, setCalls] = useState<Call[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCalls = async () => {
      try {
        const response = await axios.get('/api/calls');
        setCalls(response.data);
      } catch (err) {
        setError('Failed to fetch network calls.');
      } finally {
        setLoading(false);
      }
    };

    fetchCalls();
  }, []);

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-screen">
          <p className="text-lg">Loading network calls...</p>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-screen">
          <p className="text-lg text-red-500">{error}</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Network Calls Overview</h1>
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">ID</th>
              <th className="py-2 px-4 border-b">Payload</th>
              <th className="py-2 px-4 border-b">Response</th>
              <th className="py-2 px-4 border-b">Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {calls.map((call) => (
              <tr key={call.id}>
                <td className="py-2 px-4 border-b">{call.id}</td>
                <td className="py-2 px-4 border-b">{JSON.stringify(call.payload)}</td>
                <td className="py-2 px-4 border-b">{JSON.stringify(call.response)}</td>
                <td className="py-2 px-4 border-b">{new Date(call.timestamp).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default Dashboard;