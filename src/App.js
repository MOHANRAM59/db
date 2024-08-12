import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import SearchPage from './components/SearchPage';
import Login from './components/Login';
import Signup from './components/Signup';
import UserProfile from './components/UserProfile';
import MovieDetailPage from './components/MovieDetailPage';
import PopularPage from './components/PopularPage';
import NotFoundPage from './components/NotFoundPage';
import NewPage from './components/NewPage';
import GenrePage from './components/GenrePage';
import WishlistPage from './components/WishlistPage';
import AboutPage from './components/AboutPage';  // Import the AboutPage component
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AboutPage />} />  {/* Set AboutPage as the initial page */}
        <Route path="/home" element={<HomePage />} />  {/* Optionally, move HomePage to "/home" */}
        <Route path="/search" element={<SearchPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/movie/:id" element={<MovieDetailPage />} />
        <Route path="/popular" element={<PopularPage />} />
        <Route path="/new" element={<NewPage />} />
        <Route path="/genre/:genreId/:genreName" element={<GenrePage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
