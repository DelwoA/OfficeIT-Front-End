import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Search } from "lucide-react";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearchClick = () => {
    navigate("/products?focus=search");
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-100 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <img
                src="/logo.jpeg"
                alt="Office IT Logo"
                className="h-14 md:h-16"
              />
            </Link>
          </div>
          <nav className="hidden md:flex items-center space-x-9">
            <Link
              to="/"
              className="text-gray-800 hover:text-purple-700 font-medium"
            >
              Home
            </Link>
            <Link
              to="/products"
              className="text-gray-800 hover:text-purple-700 font-medium"
            >
              Products
            </Link>
            <Link
              to="/about"
              className="text-gray-800 hover:text-purple-700 font-medium"
            >
              About
            </Link>
          </nav>
          {/* TODO: Implement proper routing to contact page */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={handleSearchClick}
              className="p-2 text-gray-800 hover:text-purple-700 hover:bg-purple-50 rounded-md transition-colors duration-200"
              title="Search products"
            >
              <Search className="h-5 w-5" />
            </button>
            <Link
              to="#"
              className="px-4 py-2 rounded-md bg-gradient-to-r from-purple-700 to-pink-500 text-white font-medium hover:opacity-90 transition-opacity"
            >
              Contact Us
            </Link>
          </div>
          <div className="md:hidden">
            <button
              type="button"
              className="text-gray-800 hover:text-purple-700 transition-colors duration-200"
              onClick={() => setIsOpen(!isOpen)}
            >
              <div className="relative w-6 h-6">
                <Menu
                  className={`absolute h-6 w-6 transition-all duration-300 ${
                    isOpen ? "rotate-90 opacity-0" : "rotate-0 opacity-100"
                  }`}
                />
                <X
                  className={`absolute h-6 w-6 transition-all duration-300 ${
                    isOpen ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </div>
      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-md">
          <Link
            to="/"
            className="block px-3 py-2 rounded-md text-gray-800 hover:bg-purple-50 transition-colors duration-200"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/products"
            className="block px-3 py-2 rounded-md text-gray-800 hover:bg-purple-50 transition-colors duration-200"
            onClick={() => setIsOpen(false)}
          >
            Products
          </Link>
          <Link
            to="/about"
            className="block px-3 py-2 rounded-md text-gray-800 hover:bg-purple-50 transition-colors duration-200"
            onClick={() => setIsOpen(false)}
          >
            About
          </Link>
          <button
            onClick={() => {
              handleSearchClick();
              setIsOpen(false);
            }}
            className="w-full text-left flex items-center gap-2 px-3 py-2 rounded-md text-gray-800 hover:bg-purple-50 transition-colors duration-200"
          >
            <Search className="h-4 w-4" />
            Search Products
          </button>
          <Link
            to="/contact"
            className="block px-3 py-2 rounded-md bg-gradient-to-r from-purple-700 to-pink-500 text-white hover:opacity-90 transition-opacity duration-200"
            onClick={() => setIsOpen(false)}
          >
            Browse Products
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navigation;
