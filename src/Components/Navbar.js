import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../Images/pdf_analyzer_logo2.png';
import { CgMenu } from 'react-icons/cg';
import { IoMdClose } from 'react-icons/io';

const Navbar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setMenuOpen(!isMenuOpen);

  const handleLogout = async () => {
    try {
      const response = await fetch('https://frida-backend.onrender.com/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Necesario si estás usando cookies para la autenticación
      });

      if (response.status === 200) {
        // Aquí puedes también limpiar cualquier estado en el cliente, como tokens de autenticación o datos de sesión
        // Ejemplo: localStorage.removeItem('userToken');

        navigate('/'); // Asegúrate de redirigir al usuario a la página de login o a la página principal
      } else {
        const data = await response.json();
        console.error('Cierre de sesión fallido:', data.message); // Asegúrate de ajustar esto según la respuesta de tu backend
      }
    } catch (error) {
      console.error('Error al cerrar sesión', error);
    }
  }


  return (
    <>
      <nav className="bg-black text-white py-4 px-6 flex justify-between items-center" style={{height: "10dvh"}}>
        <div className="flex items-center space-x-4">
          <CgMenu className="text-3xl cursor-pointer" onClick={toggleMenu} />
          <img src={logo} alt="PDF Analyst Logo" className="h-10" />
          <Link to="/" className='hover:text-gray-300'>
            <span className="font-bold text-xl">PDF Analyst</span>
          </Link>
        </div>
        
        <div className="flex items-center space-x-4">
          <Link to="/SignUp" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Registrarse
          </Link>
          <button onClick={handleLogout} className="bg-black-500 text-white font-bold py-2 px-4 rounded">
            Cerrar sesión
          </button>
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
          <Link to="/history" className="block px-4 py-2 hover:bg-gray-200 text-lg">Historial</Link>
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
