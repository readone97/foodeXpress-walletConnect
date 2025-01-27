import { MenuIcon, XIcon } from '@heroicons/react/outline';
import React, { useContext, useState } from 'react';

import { ShoppingCartIcon } from '@heroicons/react/outline';
import { Link } from 'react-router-dom';
import { StoreContext } from '../Context/StoreContext';

const Navbar = () => {
  const { cartItemCount } = useContext(StoreContext);

  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="fixed top-0 left-0 w-full flex flex-col text-white z-50 transition-all duration-300">
      {/* Background with blur and overlay */}
      <div
        className="absolute inset-0 bg-no-repeat bg-cover"
        style={{
          backgroundImage: "url('/imageBg.jpg')",
          filter: 'brightness(0.9)',
        }}
      />
      {/* Additional overlay for better contrast */}
      <div className="absolute inset-0 bg-white/10 backdrop-blur-md" />

      {/* Content - now wrapped in relative container for z-index */}
      <div className="relative z-10">
        <div className="container mx-auto flex justify-between items-center p-5">
          <a
            href="/"
            className="text-2xl font-bold transition-transform duration-300 hover:scale-105"
          >
            FoodieXpress
          </a>

          {/** desktop links */}
          <div className="hidden md:flex space-x-9">
            <Link
              to="/#"
              className="transition-all duration-300 hover:border-b-2 border-solid border-customYellow transform hover:-translate-y-1"
            >
              Home
            </Link>
            <a
              href="/#menu"
              className="transition-all duration-300 hover:border-b-2 border-solid border-customYellow transform hover:-translate-y-1"
            >
              Menu
            </a>
            <Link
              to="#"
              className="transition-all duration-300 hover:border-b-2 border-solid border-customYellow transform hover:-translate-y-1"
            >
              Contact Us
            </Link>

            <div className="relative group">
              <Link
                to="/cart"
                className="transition-all duration-300 hover:border-b-2 border-solid border-customYellow transform hover:-translate-y-1"
              >
                <ShoppingCartIcon className="w-6 h-6 text-white transition-transform duration-300 group-hover:scale-110" />
              </Link>
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-2 transform transition-all duration-300 animate-pulse">
                  {cartItemCount}
                </span>
              )}
            </div>
          </div>
          <div className="hidden md:flex space-x-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-1 hover:bg-white/30 transition-colors duration-300">
              <appkit-button />
            </div>
          </div>

          {/** hamburger icon */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="transition-transform duration-300 hover:scale-110"
            >
              {isOpen ? (
                <XIcon className="h-6 w-6 transform rotate-0 transition-transform duration-300" />
              ) : (
                <MenuIcon className="h-6 w-6 transform transition-transform duration-300" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu - add relative z-10 */}
        <div
          className={`md:hidden flex flex-col space-y-4 overflow-hidden transition-all duration-300 relative z-10 ${
            isOpen ? 'max-h-screen opacity-100 p-5' : 'max-h-0 opacity-0'
          }`}
        >
          <Link
            to="/#"
            className="transition-colors duration-300 hover:bg-white/10 px-4 py-2 rounded-lg"
          >
            Home
          </Link>
          <Link
            to="/#menu"
            className="transition-colors duration-300 hover:bg-white/10 px-4 py-2 rounded-lg"
          >
            Menu
          </Link>
          <div className="relative">
            <Link
              to="/cart"
              className="transition-colors duration-300 hover:bg-white/10 px-4 py-2 rounded-lg flex items-center"
            >
              <ShoppingCartIcon className="w-6 h-6 mr-2" />
              Cart
              {cartItemCount > 0 && (
                <span className="ml-2 bg-red-600 text-white text-xs rounded-full px-2 animate-pulse">
                  {cartItemCount}
                </span>
              )}
            </Link>
          </div>
          <Link
            to="#"
            className="transition-colors duration-300 hover:bg-white/10 px-4 py-2 rounded-lg"
          >
            Contact Us
          </Link>
          <div className="pt-4">
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-1 hover:bg-white/30 transition-colors duration-300">
              <appkit-button />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
