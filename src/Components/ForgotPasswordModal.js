import React from 'react';

const ForgotPasswordModal = ({ showModal, closeModal }) => {
  return (
    <>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Fondo oscuro */}
          <div className="fixed inset-0 bg-black bg-opacity-10 transition-opacity" aria-hidden="true" onClick={closeModal}></div>
          {/* Contenido del modal */}
          <div className="absolute bg-white w-full max-w-md mx-auto p-8 rounded-xl shadow-lg">
            <div className=" bg-white rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700">
              <div className="p-4 sm:p-7">
                <div className="text-center">
                  <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">Forgot password?</h1>
                </div>

                <div className="mt-5">
                  <form>
                    <div className="grid gap-y-4">
                      <div>
                        <label htmlFor="email" className="block text-sm font-bold ml-1 mb-2 dark:text-white">Email address</label>
                        <div className="relative">
                          <input type="email" id="email" name="email" className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm" required aria-describedby="email-error" />
                        </div>
                        <p className="hidden text-xs text-red-600 mt-2" id="email-error">Please include a valid email address so we can get back to you</p>
                      </div>
                      <button type="submit" className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800">Reset password</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            
          </div>
        </div>
      )}
    </>
  );
};

export default ForgotPasswordModal;
