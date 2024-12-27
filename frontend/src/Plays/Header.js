import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-red-200 text-black p-6 flex justify-between items-center font-poppins">
      <h1 className="text-2xl pl-40">RolePlay</h1>
      <nav>
        <ul className="flex space-x-12 text-2xl pr-20">
          <li>
            <Link to="/" className="hover:underline">Home</Link>
          </li>
          <li>
            <Link to="/your-plays" className="hover:underline">Your Plays</Link>
          </li>
          <li>
            <Link to="/add-play" className="hover:underline">Add Play</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
