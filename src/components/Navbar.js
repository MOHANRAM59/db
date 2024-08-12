import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaFilter } from 'react-icons/fa'; // Import filter icon from react-icons

const Navbar = ({ searchQuery, setSearchQuery, handleSearch, setShowFilterMenu, showFilterMenu, handleFilterChange }) => {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate('/profile');
  };

  return (
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
  );
};

export default Navbar;
