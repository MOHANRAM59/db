import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css'; // Ensure Tailwind CSS is imported

const API_KEY = '01640b31da2aa46daf7df88783a58f3c'; // Replace with your TMDb API key

const GenrePage = () => {
  const { genreId, genreName } = useParams();
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&language=en-US&page=1`);
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
  }, [genreId]);

  const handleCardClick = (id) => {
    navigate(`/movie/${id}`); // Navigate to the MovieDetailPage
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen pt-20">
      <div className="container mx-auto my-10">
        <h1 className="text-4xl text-center mb-8 text-yellow-400">{genreName} Movies</h1>
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
  );
};

export default GenrePage;
