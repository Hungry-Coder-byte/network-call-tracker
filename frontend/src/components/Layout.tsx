import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading: authLoading, error: authError } = useAuth();

  if (authLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (authError) {
    return <div className="flex justify-center items-center h-screen text-red-500">{authError}</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="bg-blue-600 p-4">
        <div className="container mx-auto flex justify-between">
          <Link to="/" className="text-white text-lg font-bold">Network Call Tracker</Link>
          <div>
            <Link to="/dashboard" className="text-white mx-4">Dashboard</Link>
            <Link to="/settings" className="text-white mx-4">Settings</Link>
            {user ? (
              <span className="text-white">Welcome, {user.username}</span>
            ) : (
              <Link to="/login" className="text-white mx-4">Login</Link>
            )}
          </div>
        </div>
      </nav>
      <main className="flex-grow container mx-auto p-4">
        {children}
      </main>
    </div>
  );
};

export default Layout;