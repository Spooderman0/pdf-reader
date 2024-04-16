import React from 'react';
import logo from '../Images/pdf_analyzer_logo.png';
import { IoMdRefresh, IoMdHelpCircle, IoMdPerson } from 'react-icons/io';
import { Link } from "react-router-dom";


const Navbar = () => {
    return (
      <nav className="bg-black text-white py-4 px-6 flex justify-between items-center">
        {/* Lado izquierdo con el logo y nombre */}
        <div className="flex items-center space-x-4">
          {/* Asumiendo que importaste tu logo */}
          <img src={logo} alt="PDF Analyst Logo" className="h-10" />
          <Link to="/">
            <button className='hover:text-gray-300'>
            <span className="font-bold text-xl">PDF Analyst</span>
            </button>
          </Link>
          
          
        </div>
  
        {/* Lado derecho con los botones */}
        <div className="flex items-center space-x-4">
          <button className="hover:text-gray-300">
            <IoMdRefresh className="text-lg" />
          </button>
          <button className="hover:text-gray-300">
            <IoMdHelpCircle className="text-lg" />
          </button>
          <Link to="/settings">
            <button className="hover:text-gray-300">
            <IoMdPerson className="text-lg" />
            </button>
          </Link>
          <Link to="/chatbot">
            <button className="hover:text-gray-300">
              {/* <IoMdPerson className="text-lg" /> */}
              Chatbot
            </button>
          </Link>
        </div>
      </nav>
    );
  };
  
  export default Navbar;