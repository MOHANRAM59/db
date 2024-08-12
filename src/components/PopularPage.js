import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css'; // Ensure Tailwind CSS is imported
import { FaFilter } from 'react-icons/fa'; // Import filter icon from react-icons

const API_KEY = '01640b31da2aa46daf7df88783a58f3c'; // Replace with your TMDb API key

const PopularPage = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilterMenu, setShowFilterMenu] = useState(false); // State for showing/hiding filter menu
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        const url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`;
        const response = await axios.get(url);
        setPopularMovies(response.data.results ? response.data.results.slice(0, 20) : []); // Limit to 20 movies
      } catch (error) {
        console.error('Error fetching popular movies:', error);
      }
    };

    fetchPopularMovies();
  }, []);

  const handleCardClick = (id) => {
    navigate(`/movie/${id}`); // Navigate to the MovieDetailPage
  };

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?query=${searchQuery}`);
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <nav className="bg-black p-4 shadow-md fixed top-0 left-0 w-full z-50">
        <div className="container mx-auto flex items-center justify-between">
          <a className="text-red-600 text-3xl font-bold tracking-wide" href="#">
            MovieDB
          </a>
          <div className="flex-grow flex items-center justify-center space-x-8">
            <a className="text-white hover:text-gray-400 transition duration-300" href="/">
              Home
            </a>
            <a className="text-white hover:text-gray-400 transition duration-300" href="/popular">
              Popular
            </a>
            <a className="text-white hover:text-gray-400 transition duration-300" href="/new">
              New
            </a>
            <a className="text-white hover:text-gray-400 transition duration-300" href="/list">
              List
            </a>
          </div>
          <form className="flex items-center" onSubmit={handleSearch}>
            <input
              className="bg-gray-800 text-white px-4 py-2 rounded-none border-2 border-gray-700 focus:border-blue-500 outline-none transition-all duration-300"
              type="search"
              placeholder="Search for movies"
              aria-label="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              className="bg-red-600 text-white px-4 py-2 rounded-none ml-2 hover:bg-red-700 transition duration-300"
              type="submit"
            >
              Search
            </button>
            <div className="ml-4">
              <i
                className="fas fa-user-circle text-white text-4xl cursor-pointer hover:text-gray-400"
                onClick={() => navigate('/profile')}
              ></i>
            </div>
          </form>
        </div>
      </nav>
      <div className="container mx-auto my-10 pt-20">
        <h1 className="text-5xl font-extrabold text-white text-center">Top Rated Movies</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-8">
          {popularMovies.map((movie) => (
            <div
              className="relative bg-gray-800 rounded-none shadow-lg h-full overflow-hidden transition-transform duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
              key={movie.id}
              onClick={() => handleCardClick(movie.id)}
            >
              <img
                className="w-full h-full object-cover"
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
              <div className="absolute inset-0 bg-black opacity-0 hover:opacity-50 transition-opacity duration-300"></div>
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white p-2 text-center">
                <p className="text-sm font-bold">{movie.title}</p>
                <p className="text-xs">Rating: {movie.vote_average}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopularPage;
