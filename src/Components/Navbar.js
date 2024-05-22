import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../Images/pdf_analyzer_logo2.png';
import { FaUser, FaCog, FaHistory } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { BACKEND_LINK } from '../utils/constants';
import { MdInfo } from 'react-icons/md';

const Navbar = () => {
  const [isProfileMenuOpen, setProfileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const navbarHeight = "10vh"; // Define the height of the navbar

  const handleLogout = async () => {
    try {
      const response = await fetch(`${BACKEND_LINK}/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (response.status === 200) {
        navigate('/');
      } else {
        const data = await response.json();
        console.error('Cierre de sesión fallido:', data.message);
      }
    } catch (error) {
      console.error('Error al cerrar sesión', error);
    }
  };

  const toggleProfileMenu = () => {
    setProfileMenuOpen(!isProfileMenuOpen);
  };

  return (
    <>
      <nav className="bg-black text-white py-4 px-6 flex justify-between items-center fixed top-0 left-0 right-0 z-50" style={{ height: navbarHeight }}>
        <div className="flex items-center space-x-4">
          <img src={logo} alt="PDF Analyst Logo" className="h-10" />
          <Link to="/" className='hover:text-gray-300'>
            <span className="font-bold text-xl">PDF Analyst</span>
          </Link>
        </div>
        
        <div className="flex items-center space-x-4">
                
          <Link to="/main" className="hover:text-gray-300">
            <IoMdAdd className="text-2xl" />
          </Link>

          <Link to="/about" className="hover:text-gray-300">
            <MdInfo className="text-2xl" />
          </Link>
          <Link to="/history" className="hover:text-gray-300">
            <FaHistory className="text-2xl" />
          </Link>
          
          <div className="relative">
            <button onClick={toggleProfileMenu} className="hover:text-gray-300">
              <FaUser className="text-2xl" />
            </button>
            {isProfileMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                <Link
                  to="/settings"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setProfileMenuOpen(false)}
                >
                  Ir al perfil
                </Link>
                <button
                  onClick={() => {
                    setProfileMenuOpen(false);
                    handleLogout();
                  }}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Cerrar sesión
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
      <div style={{ marginTop: navbarHeight }}>
        {/* Aquí irá el contenido de tu página */}
      </div>
    </>
  );
};

export default Navbar;
