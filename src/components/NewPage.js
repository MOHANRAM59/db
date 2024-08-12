import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css'; // Ensure Tailwind CSS is imported

const API_KEY = '01640b31da2aa46daf7df88783a58f3c'; // Replace with your TMDb API key

const NewPage = () => {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        // Fetch popular movies
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
        );
        const allMovies = response.data.results;
        
        // Filter movies added in the last 5 months
        const currentDate = new Date();
        const fiveMonthsAgo = new Date(currentDate.setMonth(currentDate.getMonth() - 5));
        
        const filteredMovies = allMovies.filter((movie) => {
          const releaseDate = new Date(movie.release_date);
          return releaseDate >= fiveMonthsAgo;
        });
        
        setMovies(filteredMovies);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchMovies();
  }, []);

  const handleCardClick = (id) => {
    navigate(`/movie/${id}`); // Navigate to the MovieDetailPage
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
        </div>
      </nav>

      <div className="pt-16">
        <div className="bg-gray-800 text-center py-8">
          <h1 className="text-5xl font-extrabold text-white">Newly Added Movies</h1>
          <p className="text-xl mt-4 text-gray-400">Discover movies added in the last 5 months</p>
        </div>

        <div className="container mx-auto my-10">
          <div className="flex flex-wrap -mx-4">
            {movies.length > 0 ? (
              movies.map((movie) => (
                <div
                  className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-4 mb-8"
                  key={movie.id}
                  onClick={() => handleCardClick(movie.id)}
                >
                  <div className="relative bg-gray-800 rounded-lg shadow-lg overflow-hidden cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-105">
                    <img
                      className="w-full h-64 object-cover"
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title}
                    />
                    <div className="absolute inset-0 bg-black opacity-0 hover:opacity-50 transition-opacity duration-300"></div>
                    <div className="absolute bottom-0 left-0 p-4">
                      <h3 className="text-white text-lg font-semibold">{movie.title}</h3>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-400">No new movies found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewPage;
