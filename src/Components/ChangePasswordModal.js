import { Fragment, useRef, useState} from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { BACKEND_LINK } from '../utils/constants';

export default function ChangePasswordModal({ open, setOpen }) {
  const [email, setEmail] = useState('');
  const cancelButtonRef = useRef(null);

  const handleChangePassword = async() => {
    try {
      console.log('el email que se va a mandar es:', email)
      const response = await fetch(`${BACKEND_LINK}/sendpasswordresetemail`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({email}),
      });

      console.log('Estado de la respuesta (try):', response.status);

      if(response.status === 200)
        {
          console.log('yupiyei')
        }

      if (!response.ok) {
        // Maneja errores HTTP
        const errorResponse = await response.json();
        console.log('Error en la respuesta (sigue en el try):', errorResponse);
        throw new Error(errorResponse.error || 'Error al enviar el correo de restablecimiento de contraseña');
      }
  
      const result = await response.json();
      console.log('result (dentro del try)', result);
      alert('Correo de restablecimiento de contraseña enviado correctamente (try)');

    }
    catch (error) {
      console.error('Error al reset password (catch):', error);
      alert('Error al mandar correo de reset (catch) '+ error.message);
    }
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 overflow-y-auto" initialFocus={cancelButtonRef} onClose={() => setOpen(false)}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="flex items-center justify-center min-h-screen">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="bg-white p-8 rounded-lg shadow-xl transform transition-all sm:max-w-lg sm:w-full">
            {/*<div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">*/}
              <div className="mb-6">
                <h1 className="text-xl font-semibold mb-2">Change Password</h1>
                <p className="text-sm text-gray-600">Enter your email address below to receive a password reset link.</p>
              </div>
              <form id="changePasswordForm" className="space-y-6">
                <div>
                  <label htmlFor="email" className="text-sm font-medium text-gray-700 block mb-2">Email *</label>
                  <input id="email"name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-input block w-full border border-gray-300 rounded-md shadow-sm" required />
                </div>
                <div className="flex justify-end">
                  <button onClick={handleChangePassword} type="submit" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300">Send Reset Link</button>
                </div>
              </form>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
