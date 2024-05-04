import React, { useState } from 'react';

const ForgotPasswordModal = ({ showModal, closeModal }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!email) {
      setError('Please include a valid email address.');
      return;
    }
    setError(''); // Clear any existing errors
    // Here you would add your API call for password reset
    console.log('Submitting email for password reset:', email);
    // Simulate API call response
    setTimeout(() => {
      closeModal(); // Close modal on successful operation
    }, 1000);
  };

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="fixed inset-0 bg-black bg-opacity-10" aria-hidden="true" onClick={closeModal}></div>
          <div className="absolute bg-white w-full max-w-md mx-auto p-8 rounded-xl shadow-lg">
            <div className="text-center">
              <h1 className="text-2xl font-bold">Forgot password?</h1>
            </div>
            <form onSubmit={handleSubmit} className="mt-5">
              <label htmlFor="email" className="block text-sm font-bold mb-2">Email address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 shadow-sm"
                required
              />
              {error && <p className="text-xs text-red-600 mt-2">{error}</p>}
              <button type="submit" className="mt-4 py-3 w-full rounded-md bg-blue-500 text-white hover:bg-blue-600 transition-all text-sm">Reset password</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ForgotPasswordModal;
