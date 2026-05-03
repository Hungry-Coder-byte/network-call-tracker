import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Call } from '../types';
import Layout from '../components/Layout';

const CallDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [callDetails, setCallDetails] = useState<Call | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCallDetails = async () => {
      try {
        const response = await axios.get(`/api/calls/${id}`);
        setCallDetails(response.data);
      } catch (err) {
        setError('Failed to fetch call details.');
      } finally {
        setLoading(false);
      }
    };

    fetchCallDetails();
  }, [id]);

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-screen">
          <p className="text-lg">Loading...</p>
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
        <h1 className="text-2xl font-bold mb-4">Call Details</h1>
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-xl font-semibold">Payload</h2>
          <pre className="bg-gray-100 p-2 rounded">{JSON.stringify(callDetails?.payload, null, 2)}</pre>
          <h2 className="text-xl font-semibold mt-4">Response</h2>
          <pre className="bg-gray-100 p-2 rounded">{JSON.stringify(callDetails?.response, null, 2)}</pre>
        </div>
      </div>
    </Layout>
  );
};

export default CallDetails;