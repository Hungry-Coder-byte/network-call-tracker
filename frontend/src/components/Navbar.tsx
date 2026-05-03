import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Navbar: React.FC = () => {
  const { user, loading, error } = useAuth();

  if (loading) {
    return <div className="flex justify-center items-center h-16">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-16 text-red-500">{error}</div>;
  }

  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between">
        <Link to="/" className="text-white text-lg font-bold">Network Call Tracker</Link>
        <div className="flex space-x-4">
          <Link to="/settings" className="text-white">Settings</Link>
          {user ? (
            <span className="text-white">Welcome, {user.username}</span>
          ) : (
            <Link to="/login" className="text-white">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;