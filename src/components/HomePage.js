import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css'; // Ensure Tailwind CSS is imported
import { FaFilter, FaRegBookmark, FaBookmark } from 'react-icons/fa'; // Import bookmark icons from react-icons

const API_KEY = '01640b31da2aa46daf7df88783a58f3c'; // Replace with your TMDb API key

const genreIds = {
  New: 0, // This will be handled separately
  Action: 28,
  Comedy: 35,
  Drama: 18,
  Horror: 27,
  Romance: 10749,
  'Sci-Fi': 878,
};

const HomePage = () => {
  const [moviesByGenre, setMoviesByGenre] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState(''); // State for filter
  const [showFilterMenu, setShowFilterMenu] = useState(false); // State for showing/hiding filter menu
  const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem('favorites')) || {}); // State for favorite movies
  const sliderRefs = useRef({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const genreRequests = Object.keys(genreIds).map((genre) => {
          let url = '';
          if (genre === 'New') {
            // Fetch now playing movies
            url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`;
          } else {
            // Fetch movies by genre with additional filter if applied
            url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${genreIds[genre]}&language=en-US&page=1${filter}`;
          }
          return axios.get(url);
        });

        const responses = await Promise.all(genreRequests);
        const moviesData = responses.reduce((acc, response, index) => {
          const genre = Object.keys(genreIds)[index];
          acc[genre] = response.data.results ? response.data.results.slice(0, 15) : []; // Limit to 15 movies
          return acc;
        }, {});
        setMoviesByGenre(moviesData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchMovies();
  }, [filter]); // Re-fetch movies when filter changes

  const scrollSlider = (genre, direction) => {
    const slider = sliderRefs.current[genre];
    const scrollAmount = 200;
    if (direction === 'left') {
      slider.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else if (direction === 'right') {
      slider.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?query=${searchQuery}`);
  };

  const handleCardClick = (id) => {
    navigate(`/movie/${id}`); // Navigate to the MovieDetailPage
  };

  const handleProfileClick = () => {
    navigate('/profile');
  };

  const handleFilterChange = (timePeriod) => {
    setFilter(`&primary_release_date.gte=${getDateForFilter(timePeriod)}`);
    setShowFilterMenu(false); // Hide filter menu after selection
  };

  const getDateForFilter = (timePeriod) => {
    const now = new Date();
    let pastDate = new Date();
    switch (timePeriod) {
      case '1m':
        pastDate.setMonth(now.getMonth() - 1);
        break;
      case '2m':
        pastDate.setMonth(now.getMonth() - 2);
        break;
      case '3m':
        pastDate.setMonth(now.getMonth() - 3);
        break;
      case '1y':
        pastDate.setFullYear(now.getFullYear() - 1);
        break;
      case '2y':
        pastDate.setFullYear(now.getFullYear() - 2);
        break;
      case '3y':
        pastDate.setFullYear(now.getFullYear() - 3);
        break;
      default:
        pastDate = now; // Default to now if no valid period
    }
    return pastDate.toISOString().split('T')[0]; // Return in YYYY-MM-DD format
  };

  const handleFavoriteToggle = (movie, genre) => {
    setFavorites((prevFavorites) => {
      const newFavorites = { ...prevFavorites };
      if (newFavorites[genre]?.some((favMovie) => favMovie.id === movie.id)) {
        newFavorites[genre] = newFavorites[genre].filter((favMovie) => favMovie.id !== movie.id);
      } else {
        if (!newFavorites[genre]) {
          newFavorites[genre] = [];
        }
        newFavorites[genre].push(movie);
      }
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
      return newFavorites;
    });
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
            <a className="text-white hover:text-gray-400 transition duration-300" href="/wishlist">
              Wishlist
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
            <div className="ml-4 relative">
              <FaFilter
                className="text-white text-3xl cursor-pointer hover:text-gray-400"
                onClick={() => setShowFilterMenu(!showFilterMenu)}
              />
              {showFilterMenu && (
                <div className="absolute right-0 mt-2 bg-gray-800 text-white rounded-lg shadow-lg w-48">
                  <div className="p-2">
                    <p className="text-yellow-400 font-bold">Filter by Release Date</p>
                    <button
                      className="block w-full text-left px-4 py-2 hover:bg-gray-700"
                      onClick={() => handleFilterChange('1m')}
                    >
                      Last 1 Month
                    </button>
                    <button
                      className="block w-full text-left px-4 py-2 hover:bg-gray-700"
                      onClick={() => handleFilterChange('2m')}
                    >
                      Last 2 Months
                    </button>
                    <button
                      className="block w-full text-left px-4 py-2 hover:bg-gray-700"
                      onClick={() => handleFilterChange('3m')}
                    >
                      Last 3 Months
                    </button>
                    <button
                      className="block w-full text-left px-4 py-2 hover:bg-gray-700"
                      onClick={() => handleFilterChange('1y')}
                    >
                      Last 1 Year
                    </button>
                    <button
                      className="block w-full text-left px-4 py-2 hover:bg-gray-700"
                      onClick={() => handleFilterChange('2y')}
                    >
                      Last 2 Years
                    </button>
                    <button
                      className="block w-full text-left px-4 py-2 hover:bg-gray-700"
                      onClick={() => handleFilterChange('3y')}
                    >
                      Last 3 Years
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div className="ml-4">
              <i
                className="fas fa-user-circle text-white text-4xl cursor-pointer hover:text-gray-400"
                onClick={handleProfileClick}
              ></i>
            </div>
          </form>
        </div>
      </nav>

      <div className="pt-20">
        <div className="bg-gray-800 text-center py-8">
          <h1 className="text-5xl font-extrabold text-white">Discover Movies & TV Shows</h1>
          <p className="text-xl mt-4 text-gray-400">Find your favorite movies and TV shows easily</p>
        </div>

        <div className="container mx-auto my-10">
          {Object.keys(genreIds).map((genre) => (
            <div key={genre} className="relative mb-12">
              <h2 className="text-3xl mb-4 text-yellow-400">
                {genre === 'New' ? (
                  <Link to="/new" className="hover:text-yellow-500 transition duration-300">{genre}</Link>
                ) : (
                  <Link to={`/genre/${genreIds[genre]}/${genre}`} className="hover:text-yellow-500 transition duration-300">{genre}</Link>
                )}
              </h2>
              <div
                className="flex overflow-x-auto space-x-4 pb-4"
                ref={(el) => (sliderRefs.current[genre] = el)}
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }} // Hide scrollbar for Firefox and IE
              >
                <style>
                  {`
                    .flex::-webkit-scrollbar {
                      display: none; /* Hide scrollbar for Chrome, Safari, and Opera */
                    }
                  `}
                </style>
                {moviesByGenre[genre]?.map((movie) => (
                  <div
                    className="flex-shrink-0 w-48 h-80 cursor-pointer relative"
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
                      className={`absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center ${favorites[genre]?.some((favMovie) => favMovie.id === movie.id) ? 'bg-green-500' : 'bg-gray-700'}`}
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent the card click event from firing
                        handleFavoriteToggle(movie, genre);
                      }}
                    >
                      {favorites[genre]?.some((favMovie) => favMovie.id === movie.id) ? (
                        <FaBookmark className="w-5 h-5 text-white" />
                      ) : (
                        <FaRegBookmark className="w-5 h-5 text-white" />
                      )}
                    </button>
                  </div>
                ))}
              </div>
              <button
                className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-800 text-white w-10 h-10 rounded-full flex items-center justify-center"
                onClick={() => scrollSlider(genre, 'left')}
              >
                &lt;
              </button>
              <button
                className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-800 text-white w-10 h-10 rounded-full flex items-center justify-center"
                onClick={() => scrollSlider(genre, 'right')}
              >
                &gt;
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
