import React from 'react';

const NotFoundPage = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold">404</h1>
        <p className="text-2xl mt-4">Page Not Found</p>
        <a href="/" className="text-red-600 text-xl mt-4 underline">
          Go Back Home
        </a>
      </div>
    </div>
  );
};

export default NotFoundPage;
