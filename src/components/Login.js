import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css'; // Ensure Tailwind CSS is imported

const Login = () => {
  const [email, setEmail] = useState('mohanram5pn@gmail.com'); // Default email
  const [password, setPassword] = useState('7010185785'); // Default password
  const [error, setError] = useState(''); // Error state
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError(''); // Clear any previous error
    // Simulate authentication
    if (email === 'mohanram5pn@gmail.com' && password === '7010185785') {
      alert('Logged in successfully');
      navigate('/profile'); // Redirect to UserProfile page
    } else {
      setError('Invalid email or password'); // Set error message
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <nav className="bg-black p-4 shadow-md">
        <div className="container mx-auto flex items-center justify-between">
          <a className="text-red-600 text-3xl font-bold tracking-wide" href="#">MovieDB</a>
          <div className="flex-grow flex items-center justify-center space-x-8">
            <a className="text-white hover:text-gray-400 transition duration-300" href="#">Home</a>
            <a className="text-white hover:text-gray-400 transition duration-300" href="#">Popular</a>
            <a className="text-white hover:text-gray-400 transition duration-300" href="#">New</a>
            <a className="text-white hover:text-gray-400 transition duration-300" href="#">List</a>
          </div>
          <form className="flex items-center">
            <input
              className="bg-gray-800 text-white px-4 py-2 rounded-none border-2 border-gray-700 focus:border-red-600 outline-none"
              type="search"
              placeholder="Search for movies"
              aria-label="Search"
            />
            <button
              className="bg-red-600 text-white px-4 py-2 rounded-none ml-2 hover:bg-red-700 transition duration-300"
              type="submit"
            >
              Search
            </button>
            <div className="ml-4">
              <i
                className="fas fa-user-circle text-white text-2xl cursor-pointer hover:text-gray-400"
              ></i>
            </div>
          </form>
        </div>
      </nav>

      <div className="container mx-auto my-10">
        <div className="bg-gray-800 p-8 rounded-lg shadow-md">
          <h2 className="text-4xl font-extrabold mb-8 text-center">Login</h2>
          <form onSubmit={handleLogin} className="flex flex-col space-y-4">
            {error && <p className="text-red-600 mb-4 text-center">{error}</p>}
            <input
              className="bg-gray-800 text-white px-4 py-2 rounded-none border-2 border-gray-700 focus:border-red-600 outline-none"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />
            <input
              className="bg-gray-800 text-white px-4 py-2 rounded-none border-2 border-gray-700 focus:border-red-600 outline-none"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
            <button
              className="bg-red-600 text-white px-4 py-2 rounded-none hover:bg-red-700 transition duration-300"
              type="submit"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
