import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css'; // Ensure Tailwind CSS is imported
import { FaStar, FaShareAlt } from 'react-icons/fa';

const API_KEY = '01640b31da2aa46daf7df88783a58f3c'; // Replace with your TMDb API key

const MovieDetailPage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&append_to_response=videos`
        );
        setMovie(response.data);

        // Find the trailer key
        const trailer = response.data.videos.results.find(
          (video) => video.type === 'Trailer' && video.site === 'YouTube'
        );
        setTrailerKey(trailer ? trailer.key : null);
        setError(null);
      } catch (err) {
        setError('An error occurred while fetching data.');
      }
    };

    fetchMovieDetails();
  }, [id]);

  const handleBackClick = () => {
    navigate(-1); // Go back to the previous page
  };

  const handleShareClick = () => {
    if (navigator.share) {
      navigator.share({
        title: movie.title,
        text: 'Check out this movie on MovieDB!',
        url: window.location.href,
      })
      .then(() => console.log('Successful share'))
      .catch((error) => console.log('Error sharing', error));
    } else {
      alert('Share feature is not supported in your browser.');
    }
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating / 2);
    const halfStar = rating % 2 >= 1;
    return (
      <div className="flex items-center">
        {[...Array(fullStars)].map((_, i) => (
          <FaStar key={i} className="text-yellow-400" />
        ))}
        {halfStar && (
          <FaStar
            className="text-yellow-400"
            style={{ clipPath: 'inset(0 50% 0 0)' }}
          />
        )}
        {[...Array(5 - fullStars - (halfStar ? 1 : 0))].map((_, i) => (
          <FaStar key={i + fullStars} className="text-gray-500" />
        ))}
      </div>
    );
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <nav className="bg-black p-4 shadow-md fixed top-0 left-0 w-full z-50">
        <div className="container mx-auto flex items-center justify-between">
          <a className="text-red-600 text-3xl font-bold tracking-wide" href="#">
            MovieDB
          </a>
          <div className="ml-4">
            <button
              className="bg-gray-700 text-white px-4 py-2 rounded"
              onClick={handleBackClick}
            >
              Back
            </button>
          </div>
        </div>
      </nav>

      <div className="pt-20 container mx-auto my-10 px-4 lg:px-0">
        {error && <p className="text-red-500 text-center">{error}</p>}
        {movie ? (
          <div className="flex flex-col lg:flex-row items-start">
            {/* Poster */}
            <div className="w-full lg:w-1/3 lg:mr-8 mb-8 lg:mb-0">
              <img
                className="w-full h-auto rounded-lg shadow-lg"
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
            </div>

            {/* Movie Information */}
            <div className="w-full lg:w-2/3">
              <h1 className="text-4xl font-bold mb-4 text-white">{movie.title}</h1>
              <div className="mt-6">
                {trailerKey ? (
                  <div>
                    <h2 className="text-2xl font-bold mb-4 text-yellow-400">Trailer</h2>
                    <iframe
                      width="100%"
                      height="315"
                      src={`https://www.youtube.com/embed/${trailerKey}`}
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                ) : (
                  <p className="text-lg">
                    <span className="font-semibold text-yellow-400">Trailer:</span> No trailer
                    available
                  </p>
                )}
              </div>

              <div className="mt-6">
                <div className="flex items-center mb-4">
                  <span className="flex items-center text-yellow-400 text-xl">
                    {renderStars(movie.vote_average)}
                  </span>
                  <span className="ml-2 text-xl text-white">
                    ({movie.vote_count} votes)
                  </span>
                  <button onClick={handleShareClick} className="ml-4 text-xl text-white bg-gray-700 px-2 py-1 rounded">
                    <FaShareAlt />
                  </button>
                </div>
              </div>

              <div className="mt-6">
                <p className="text-lg mb-4">
                  <span className="font-semibold text-yellow-400">Overview:</span>{' '}
                  {movie.overview}
                </p>
              </div>

              {/* Additional Information */}
              <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Genre Box */}
                <div className="text-lg">
                  <span className="font-semibold text-yellow-400">Genres:</span>
                  <div className="flex flex-wrap gap-4 mt-2">
                    {movie.genres.map((genre) => (
                      <div
                        key={genre.id}
                        className="p-2 border border-gray-300 rounded-xl bg-gray-800 text-center text-sm text-white-400"
                      >
                        {genre.name}
                      </div>
                    ))}
                  </div>
                </div>
                <p className="text-lg">
                  <span className="font-semibold text-yellow-400">Release Date:</span>{' '}
                  {movie.release_date}
                </p>
                <p className="text-lg">
                  <span className="font-semibold text-yellow-400">Language:</span>{' '}
                  {movie.original_language.toUpperCase()}
                </p>
                <p className="text-lg">
                  <span className="font-semibold text-yellow-400">Runtime:</span>{' '}
                  {movie.runtime} minutes
                </p>
                <p className="text-lg">
                  <span className="font-semibold text-yellow-400">Budget:</span>${' '}
                  {movie.budget.toLocaleString()}
                </p>
                <p className="text-lg">
                  <span className="font-semibold text-yellow-400">Revenue:</span>${' '}
                  {movie.revenue.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-center text-xl text-gray-700">Loading...</p>
        )}
      </div>
    </div>
  );
};

export default MovieDetailPage;
