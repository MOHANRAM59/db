import React from 'react';
import { useNavigate } from 'react-router-dom';

const AboutPage = () => {
  const navigate = useNavigate();  // Initialize the navigate function

  const handleStartClick = () => {
    navigate('/home');  // Redirect to the Home page
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex items-center justify-center">
      <div className="max-w-2xl text-center p-8 bg-gray-800 rounded-lg shadow-md">
        <h1 className="text-4xl font-bold mb-4 text-red-600">About MovieDB</h1>
        <p className="text-xl text-gray-300 mb-4">
          MovieDB is your go-to source for discovering and managing your favorite movies and TV shows. 
          With an extensive database of titles, you can explore the latest releases, find classics, and keep track of what you love.
        </p>
        <p className="text-xl text-gray-300 mb-4">
          Our platform allows you to create a personalized watchlist, mark your favorites, and stay updated with the newest trends in the film industry. 
          Whether you're into action, drama, comedy, or sci-fi, MovieDB has something for everyone.
        </p>
        <p className="text-xl text-gray-300 mb-4">
          Built using the latest technologies, MovieDB offers a seamless and engaging experience. 
          We are committed to helping movie enthusiasts connect with the content they enjoy the most.
        </p>
        <p className="text-xl text-gray-300 mb-8">
          Explore. Discover. Enjoy.
        </p>
        <button
          onClick={handleStartClick}  // This triggers the redirect to HomePage
          className="bg-red-600 text-white px-6 py-3 rounded-full text-xl font-semibold hover:bg-red-700 transition duration-300"
        >
          Start Exploring
        </button>
      </div>
    </div>
  );
};

export default AboutPage;
