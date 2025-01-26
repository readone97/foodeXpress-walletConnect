// src/components/Navbar.js

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
    <nav
      className="absolute top-0 left-0 w-full flex justify-between text-white items-center p-5 bg-opacity-50 backdrop-blur-lg z-50"
      style={{
        backgroundImage: "url('/Vector.png')",
      }}
    >
      <div className="container mx-auto flex justify-between items-center">
        <a href="" className="text-2xl font-bold">
          FoodieXpress
        </a>

        {/** desktop links */}
        <div className="hidden md:flex space-x-9">
          <Link
            to="/#"
            className="hover:border-b-2 border-solid border-customYellow"
          >
            Home{' '}
          </Link>

          <a
            href="/#menu"
            className="hover:border-b-2 border-solid border-customYellow"
          >
            Menu
          </a>
          <Link
            to="#"
            className="hover:border-b-2 border-solid border-customYellow"
          >
            Contact Us
          </Link>

          <div className="relative">
            <Link
              to="/cart"
              className="hover:border-b-2 border-solid border-customYellow"
            >
              <ShoppingCartIcon className="w-6 h-6 text-white" />{' '}
            </Link>
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-2">
                {cartItemCount}
              </span>
            )}
          </div>
        </div>
        <div className="hidden md:flex space-x-6">
          <appkit-button />
        </div>

        {/** hamburger icon for links */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu}>
            {isOpen ? (
              <XIcon className="h-12 w-6" />
            ) : (
              <MenuIcon className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/** mobile menu */}

      {isOpen && (
        <div className="md:hidden flex flex-col space-x-9">
          <a
            href="#"
            className="hover:border-b-2 border-solid border-customYellow w-6 h-6 text-white"
          >
            Home{' '}
          </a>
          <a
            href="#"
            className="hover:border-b-2 border-solid border-customYellow w-6 h-6 text-white"
          >
            Menu
          </a>
          <Link
            to="/cart"
            className="hover:border-b-2 border-solid border-customYellow w-6 h-6 text-white"
          >
            <ShoppingCartIcon />{' '}
          </Link>
          <a
            href="#"
            className="hover:border-b-2 border-solid border-customYellow w-6 h-6 text-white"
          >
            Contact Us
          </a>
          <div className="md:hidden flex flex-col space-x-6">
            <appkit-button />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
