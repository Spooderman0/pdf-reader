import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../Images/pdf_analyzer_logo2.png';
import { CgMenu } from 'react-icons/cg';
import { IoMdClose } from 'react-icons/io';

const Navbar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!isMenuOpen);

  return (
    <>
      <nav className="bg-black text-white py-4 px-6 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <CgMenu className="text-3xl cursor-pointer" onClick={toggleMenu} />
          <img src={logo} alt="PDF Analyst Logo" className="h-10" />
          <Link to="/" className='hover:text-gray-300'>
            <span className="font-bold text-xl">PDF Analyst</span>
          </Link>
        </div>
        
        <div className="flex items-center space-x-4">
          <Link to="/login" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Login
          </Link>
          <Link to="/logout" className="bg-black-500 text-white font-bold py-2 px-4 rounded">
            Logout
          </Link>
        </div>
      </nav>

      {/* Menú lateral que se despliega */}
      <div className={`fixed inset-y-0 left-0 transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} w-64 z-30 bg-white shadow-lg transition duration-300 ease-in-out`}>
        <div className="bg-black text-white p-4 flex justify-end">
          <IoMdClose className="text-2xl cursor-pointer" onClick={toggleMenu} />
        </div>
        <nav className="text-center text-black p-4">
          <Link to="/settings" className="block px-4 py-2 hover:bg-gray-200 text-lg">Configuración</Link>
          <Link to="/about" className="block px-4 py-2 hover:bg-gray-200 text-lg">Acerca de</Link>
          <Link to="/" className="block px-4 py-2 hover:bg-gray-200 text-lg">Nuevo documento</Link>
          {/* Agrega aquí más enlaces según sea necesario */}
        </nav>
      </div>

      {/* Overlay que aparece cuando el menú está abierto */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-20" onClick={toggleMenu}></div>
      )}
    </>
  );
};

export default Navbar;
