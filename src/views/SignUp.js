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
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async (e) => {
    try {
      setIsLoading(true);
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
        setIsLoading(false);
      }
    }
    catch (error) {
      setShowError(true);
      setIsLoading(false);
      console.error('Error en LogIn', error);
    }
  }

  return (
    <div>
      {/* Agrega el componente Navbar */}
      <div className="flex min-h-full flex-1 flex-col justify-center" style={{height: "70dvh"}}>
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
                  {isLoading ? (
                  <div role="status">
                    <svg aria-hidden="true" class="inline w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                    </svg>
                  </div>
                ) : (
                  <p> Registrarse</p>
                )}
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
