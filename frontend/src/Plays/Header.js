import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-custom-dark-red/95 text-vanilla p-6 flex justify-between items-center font-poppins">
      <h1 className="text-2xl pl-40">RolePlay</h1>
      <nav>
        <ul className="flex items-center space-x-12 text-2xl pr-24">
          <li>
            <Link to="/" className="hover:underline">Home</Link>
          </li>
          <li>
            <Link to="/your-plays" className="hover:underline">Your Plays</Link>
          </li>
          <li className="bg-vanilla rounded-md text-custom-dark-red px-5 py-1.5">
            <Link to="/add-play" className="hover:underline">Add Play</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
