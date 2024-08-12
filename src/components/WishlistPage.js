import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaRegBookmark, FaBookmark } from 'react-icons/fa';

const WishlistPage = () => {
  const favorites = JSON.parse(localStorage.getItem('favorites')) || {};
  const navigate = useNavigate();

  // Flatten the favorites into a single array
  const allFavorites = Object.values(favorites).flat();

  const handleCardClick = (id) => {
    navigate(`/movie/${id}`); // Navigate to the MovieDetailPage
  };

  const handleFavoriteToggle = (movie) => {
    // Determine which genre the movie belongs to in the favorites
    const genre = Object.keys(favorites).find((key) =>
      favorites[key].some((favMovie) => favMovie.id === movie.id)
    );

    if (genre) {
      const newFavorites = { ...favorites };
      newFavorites[genre] = newFavorites[genre].filter((favMovie) => favMovie.id !== movie.id);
      if (newFavorites[genre].length === 0) {
        delete newFavorites[genre];
      }
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
      // Optionally refresh the page to reflect changes
      window.location.reload(); 
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <nav className="bg-black p-4 shadow-md fixed top-0 left-0 w-full z-50">
        <div className="container mx-auto flex items-center justify-between">
          <Link className="text-red-600 text-3xl font-bold tracking-wide" to="/">
            MovieDB
          </Link>
          <div className="flex-grow flex items-center justify-center space-x-8">
            <Link className="text-white hover:text-gray-400 transition duration-300" to="/">
              Home
            </Link>
            <Link className="text-white hover:text-gray-400 transition duration-300" to="/popular">
              Popular
            </Link>
            <Link className="text-white hover:text-gray-400 transition duration-300" to="/new">
              New
            </Link>
            <Link className="text-white hover:text-gray-400 transition duration-300" to="/wishlist">
              Wishlist
            </Link>
          </div>
        </div>
      </nav>

      <div className="pt-20">
        <div className="bg-gray-800 text-center py-8">
          <h1 className="text-5xl font-extrabold text-white">Your Wishlist</h1>
        </div>

        <div className="container mx-auto my-10">
          {allFavorites.length === 0 ? (
            <p className="text-center text-gray-400 text-xl">Your wishlist is empty.</p>
          ) : (
            <div className="flex flex-wrap space-x-4 pb-4">
              {allFavorites.map((movie) => (
                <div
                  className="flex-shrink-0 w-48 h-80 cursor-pointer relative mb-4"
                  key={movie.id}
                  onClick={() => handleCardClick(movie.id)}
                >
                  <div className="relative bg-gray-800 rounded-none shadow-lg h-full overflow-hidden transition-transform duration-300 ease-in-out transform hover:scale-105">
                    <img
                      className="w-full h-full object-cover"
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title}
                    />
                    <div className="absolute inset-0 bg-black opacity-0 hover:opacity-50 transition-opacity duration-300"></div>
                  </div>
                  <button
                    className="absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center bg-green-500"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent the card click event from firing
                      handleFavoriteToggle(movie); // Pass the movie object
                    }}
                  >
                    <FaBookmark className="w-5 h-5 text-white" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WishlistPage;
