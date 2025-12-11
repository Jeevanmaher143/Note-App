import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="w-full bg-white border-b-2 border-purple-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo/Brand */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center shadow-md">
              <span className="text-white text-xl font-bold">📝</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              PasteApp
            </span>
          </div>

          {/* Navigation Links */}
          <div className="flex gap-2">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `px-6 py-2 rounded-lg font-medium transition-all duration-200
                ${isActive 
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md" 
                  : "text-gray-700 hover:bg-purple-50 hover:text-purple-600"}`
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/pastes"
              className={({ isActive }) =>
                `px-6 py-2 rounded-lg font-medium transition-all duration-200
                ${isActive 
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md" 
                  : "text-gray-700 hover:bg-purple-50 hover:text-purple-600"}`
              }
            >
              Pastes
            </NavLink>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;