import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css'; // Ensure Tailwind CSS is imported
import { FaFilter } from 'react-icons/fa';

const API_KEY = '01640b31da2aa46daf7df88783a58f3c'; // Replace with your TMDb API key

const SearchPage = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('query');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`);
        setGenres(response.data.genres);
      } catch (err) {
        setError('An error occurred while fetching genres.');
      }
    };

    fetchGenres();
  }, []);

  useEffect(() => {
    if (query) {
      const fetchMovies = async () => {
        try {
          const genreQuery = selectedGenres.length ? `&with_genres=${selectedGenres.join(',')}` : '';
          const response = await axios.get(`https://api.themoviedb.org/3/search/movie?query=${query}${genreQuery}&api_key=${API_KEY}`);
          if (response.data.results) {
            setMovies(response.data.results);
            setError(null);
          } else {
            setMovies([]);
            setError('No results found.');
          }
        } catch (err) {
          setError('An error occurred while fetching data.');
        }
      };

      fetchMovies();
    }
  }, [query, selectedGenres]);

  const handleProfileClick = () => {
    navigate('/profile');
  };

  const handleCardClick = (id) => {
    navigate(`/movie/${id}`); // Navigate to the MovieDetailPage
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${searchQuery.trim()}`);
    }
  };

  const handleGenreChange = (genreId) => {
    setSelectedGenres((prevSelectedGenres) =>
      prevSelectedGenres.includes(genreId)
        ? prevSelectedGenres.filter((id) => id !== genreId)
        : [...prevSelectedGenres, genreId]
    );
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <nav className="bg-black p-4 shadow-md fixed top-0 left-0 w-full z-50">
        <div className="container mx-auto flex items-center justify-between">
          <a className="text-red-600 text-3xl font-bold tracking-wide" href="#">MovieDB</a>
          <div className="flex-grow flex items-center justify-center space-x-8">
            <a className="text-white hover:text-gray-400 transition duration-300" href="/">Home</a>
            <a className="text-white hover:text-gray-400 transition duration-300" href="#">Popular</a>
            <a className="text-white hover:text-gray-400 transition duration-300" href="#">New</a>
            <a className="text-white hover:text-gray-400 transition duration-300" href="#">List</a>
          </div>
          <form className="flex items-center" onSubmit={handleSearchSubmit}>
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
            <button
              className="ml-4 text-white hover:text-gray-400 transition duration-300"
              onClick={() => setShowFilters(!showFilters)}
            >
              <FaFilter size={24} />
            </button>
            <div className="ml-4">
              <i
                className="fas fa-user-circle text-white text-4xl cursor-pointer hover:text-gray-400"
                onClick={handleProfileClick}
              ></i>
            </div>
          </form>
        </div>
      </nav>

      {showFilters && (
        <div className="bg-black p-4">
          <div className="container mx-auto">
            <div className="flex flex-wrap gap-4">
              {genres.map((genre) => (
                <label key={genre.id} className="flex items-center text-white">
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={selectedGenres.includes(genre.id)}
                    onChange={() => handleGenreChange(genre.id)}
                  />
                  {genre.name}
                </label>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="pt-20"> {/* Add padding to account for fixed navbar */}
        <div className="container mx-auto my-10">
          {error && <p className="text-red-500 text-center">{error}</p>}
          <div className="flex flex-wrap justify-center">
            {movies.length ? (
              movies.map((movie) => (
                <div
                  key={movie.id}
                  className="w-48 h-80 m-2 bg-gray-800 rounded-lg overflow-hidden cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-105"
                  onClick={() => handleCardClick(movie.id)}
                >
                  <img
                    className="w-full h-full object-cover"
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                  />
                </div>
              ))
            ) : (
              <p className="text-center text-xl text-gray-700">No results found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
