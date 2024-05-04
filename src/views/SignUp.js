import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Importa Link de react-router-dom
import pdfAnalyzerLogo from '../Images/pdf_analyzer_logo.png';
import { BACKEND_LINK } from '../utils/constants';


const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const navigate = useNavigate();
  const [showError, setShowError] = useState(false);

  const handleSignUp = async (e) => {
    try {
      e.preventDefault(); 

      // const response = await fetch (`https://frida-backend.onrender.com/adduser`, {
      const response = await fetch (`${BACKEND_LINK}/adduser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, pwd }),
      });

      if (response.status === 200) {
        navigate('/');
      } else {
        const data = await response.json()
        console.error('Inicio de sesión fallido:', data.error);
        setShowError(true);
      }
    }
    catch (error) {
      setShowError(true);
      console.error('Error en LogIn', error);
    }
  }

  return (
    <div>
      {/* Agrega el componente Navbar */}
      <div className="flex min-h-full flex-1 flex-col justify-center" style={{height: "90dvh"}}>
      {/* Contenido de la vista SignUp */}
        <div class="container mx-auto bg-gray-100  rounded-[12px] shadow-lg px-5 lg:w-[600px] lg:h-[700px] overflow-auto" style={{ boxSizing: 'border-box', height: "85dvh", width: "50dvw" }}>
          
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <img
                className="mx-auto h-28 w-auto"
                //Logo
                src={pdfAnalyzerLogo}
                alt="Your Company"
              />
              <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Crear cuenta
              </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form className="space-y-6" onSubmit={handleSignUp}>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                    Nombre de usuario
                  </label>
                  <div className="mt-2">
                    <input
                      id="username"
                      name="username"
                      type="text"
                      autoComplete="username"
                      required
                      placeholder='Arturo Méndez'
                      value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="block w-full rounded-md border-0 px-3 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

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
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Contraseña
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={pwd}
                    onChange={(e) => setPwd(e.target.value)}
                    placeholder='************'
                    className="block w-full rounded-md border-0 px-3 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
             
                </div>
              </div>

                <div>

                  { showError && (
                    <p class="text-sm font-semibold text-red-600 mb-2 text-right">
                    Error al crear cuenta!!
                  </p>
                  )}
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Registrarse
                  </button>
                </div>
              </form>

              <p className="my-5 text-center text-sm text-gray-500">
                Ya tienes cuenta?
                <Link to="/" className=" ml-2 font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                  Iniciar sesión
                </Link>
              </p>
            </div>

          </div>

        </div>  
        
    </div>
  );
};

export default SignUp;
