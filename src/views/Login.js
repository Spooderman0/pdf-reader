// LogIn.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import pdfAnalyzerLogo from '../Images/pdf_analyzer_logo.png'
import ForgotPasswordModal from "../Components/ForgotPasswordModal"
import { BACKEND_LINK } from '../utils/constants';

const LogIn = () => {
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [showModal, setShowModal] = useState(false); // Estado para controlar la visibilidad del modal
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogIn = async (e) => {
    try {
      setIsLoading(true);
      setLoginError(false);
      e.preventDefault();

      const response = await fetch (`${BACKEND_LINK}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials:'include',
        body: JSON.stringify({ email, pwd }),
        credentials: 'include'
      });

      //console.log(response)
      const r = await response.json();
      console.log(r)

      if (response.status === 200) {
        navigate('/main');
      } else {
        const data = await response.json()
        console.error('Inicio de sesión fallido:', data.error);
        setLoginError(true);
        setIsLoading(false);
      }
    }
    catch (error) {
      console.error('Error en LogIn', error);
      setLoginError(true);
      setIsLoading(false);
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
      <div className="flex flex-1 flex-col justify-center" style={{height: "90dvh"}}>
        <div className="container mx-auto px-5 bg-gray-100 rounded-[12px] shadow-lg " style={{ boxSizing: 'border-box', height: "85dvh", width: "50dvw" }}>
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              className="mx-auto h-28 w-auto"
              src={pdfAnalyzerLogo}
              alt="Your Company"
            />
            <h2 className=" text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Inicio de sesión
            </h2>
          </div>
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={handleLogIn}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  E-mail
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
                    placeholder='email@domain.com'
                    className="block w-full rounded-md border-0 px-3 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Contraseña
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
                      Olvidaste tu contraseña?
                    </a>
                  </div>
                </div>
              </div>
              <div>
                {loginError && (
                  <p class="text-sm font-semibold text-red-600 mb-2 text-right">
                    Email o contraseña incorrectos!!
                  </p>

                )}

                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                {isLoading ? (
                  <div role="status">
                    <svg aria-hidden="true" class="inline w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                    </svg>
                  </div>
                ) : (
                  <p>Iniciar sesión</p>
                )}
                </button>
              </div>
            </form>
            <p className="mt-10 text-center text-sm text-gray-500">
              No tienes cuenta?{' '}
              <Link to="/signup" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                Crear cuenta
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
