// LogIn.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import pdfAnalyzerLogo from '@Images/pdf_analyzer_logo.png';
import ForgotPasswordModal from "../Components/ForgotPasswordModal"

const LogIn = () => {
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [showModal, setShowModal] = useState(false); // Estado para controlar la visibilidad del modal
  const navigate = useNavigate();

  const handleLogIn = async (e) => {
    try {
      e.preventDefault();

      const response = await fetch ('https://frida-backend.onrender.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, pwd }),
      });

      if (response.status === 200) {
        navigate('/main');
      } else {
        const data = await response.json()
        console.error('Inicio de sesión fallido:', data.error);
      }
    }
    catch (error) {
      console.error('Error en LogIn', error);
    }
  }

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="container mx-auto bg-gray-100 rounded-[12px] shadow-lg p-8 lg:w-[600px] lg:h-[590px]" style={{ boxSizing: 'border-box' }}>
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              className="mx-auto h-28 w-auto"
              src={pdfAnalyzerLogo}
              alt="Your Company"
            />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Login
            </h2>
          </div>
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={handleLogIn}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='ahhhhh@tec.mx'
                    className="block w-full rounded-md border-0 px-3 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={pwd}
                    onChange={(e) => setPwd(e.target.value)}
                    placeholder='**********'
                    className="block w-full rounded-md border-0 px-3 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <div className="text-sm">
                    {/* Agregar evento de clic al enlace "Forgot password?" */}
                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500" onClick={openModal}>
                      Forgot password?
                    </a>
                  </div>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Login
                </button>
              </div>
            </form>
            <p className="mt-10 text-center text-sm text-gray-500">
              No tienes cuenta?{' '}
              <Link to="/signup" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                SignUp
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Modal */}
      <ForgotPasswordModal showModal={showModal} closeModal={closeModal} />
    </div>
  );
};

export default LogIn;
