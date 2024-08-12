import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css'; // Ensure Tailwind CSS is imported
import { FaTag, FaEdit } from 'react-icons/fa'; // Import the tag and edit icons

const mockFavorites = [
  { id: '1', title: 'Inception' },
  { id: '2', title: 'The Matrix' },
  // Add more mock favorites here
];

const mockWatchlist = [
  { id: '3', title: 'Interstellar' },
  { id: '4', title: 'The Dark Knight' },
  // Add more mock watchlist items here
];

const UserProfile = () => {
  const [favorites, setFavorites] = useState(mockFavorites);
  const [watchlist, setWatchlist] = useState(mockWatchlist);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  // Mock remove functions
  const removeFromFavorites = (movieId) => {
    setFavorites(favorites.filter(movie => movie.id !== movieId));
  };

  const removeFromWatchlist = (movieId) => {
    setWatchlist(watchlist.filter(movie => movie.id !== movieId));
  };

  // Handle back navigation to home page
  const handleBackClick = () => {
    navigate('/'); // Navigate to the home page
  };

  // Handle logout
  const handleLogout = () => {
    // Clear user authentication data (this is a mock implementation)
    // For real apps, clear tokens from local storage or handle other logout logic
    localStorage.removeItem('user'); // Example: remove user data from local storage
    navigate('/login'); // Redirect to login page after logout
  };

  // Handle wishlist click
  const handleWishlistClick = () => {
    navigate('/wishlist'); // Redirect to wishlist page (ensure this route exists)
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <nav className="bg-black p-4 shadow-md fixed top-0 left-0 w-full z-50">
        <div className="container mx-auto flex items-center justify-between">
          <a className="text-red-600 text-3xl font-bold tracking-wide" href="#">MovieDB</a>
          <div className="ml-4">
            <i
              className="fas fa-user-circle text-white text-4xl cursor-pointer hover:text-gray-400"
              onClick={() => navigate('/profile')}
            ></i>
          </div>
        </div>
      </nav>
      <div className="pt-16"> {/* Add padding to account for fixed navbar */}
        <div className="container mx-auto my-10">
          <div className="flex flex-wrap gap-4 mb-8">
            <button
              className="bg-gray-700 text-white px-4 py-2 rounded"
              onClick={handleBackClick}
            >
              Back to Home
            </button>
            <button
              className="bg-yellow-500 text-black px-4 py-2 rounded flex items-center"
              onClick={handleWishlistClick}
            >
              <FaTag className="text-black mr-2" />
              Wishlist
            </button>
            <button
              className="bg-red-600 text-white px-4 py-2 rounded"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
          <div className="bg-gray-800 p-8 rounded-lg shadow-md mb-8">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-4xl font-extrabold mb-2">Mohan ram</h2>
                <p className="text-gray-400">mohanram@example.com</p>
              </div>
              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300 flex items-center">
                <FaEdit className="mr-2" />
                Edit Profile
              </button>
            </div>
            <p className="text-lg mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            <div className="flex space-x-4">
              <div className="bg-gray-700 p-4 rounded-lg text-center">
                <p className="text-xl font-bold">12</p>
                <p>Favorites</p>
              </div>
              <div className="bg-gray-700 p-4 rounded-lg text-center">
                <p className="text-xl font-bold">8</p>
                <p>Watchlist</p>
              </div>
              <div className="bg-gray-700 p-4 rounded-lg text-center">
                <p className="text-xl font-bold">24</p>
                <p>Reviews</p>
              </div>
            </div>
          </div>
          <div className="bg-gray-800 p-8 rounded-lg shadow-md mb-8">
            <h3 className="text-3xl mb-4 text-yellow-400">Favorites</h3>
            <ul>
              {favorites.length ? (
                favorites.map(movie => (
                  <li key={movie.id} className="mb-4 flex justify-between items-center">
                    <span>{movie.title}</span>
                    <button
                      className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-300"
                      onClick={() => removeFromFavorites(movie.id)}
                    >
                      Remove
                    </button>
                  </li>
                ))
              ) : (
                <p>No favorites found</p>
              )}
            </ul>
          </div>
          <div className="bg-gray-800 p-8 rounded-lg shadow-md">
            <h3 className="text-3xl mb-4 text-yellow-400">Watchlist</h3>
            <ul>
              {watchlist.length ? (
                watchlist.map(movie => (
                  <li key={movie.id} className="mb-4 flex justify-between items-center">
                    <span>{movie.title}</span>
                    <button
                      className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-300"
                      onClick={() => removeFromWatchlist(movie.id)}
                    >
                      Remove
                    </button>
                  </li>
                ))
              ) : (
                <p>No watchlist items found</p>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
