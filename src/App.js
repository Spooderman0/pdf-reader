import React, { useState } from 'react';
import 'tailwindcss/tailwind.css';
import './App.css';
import Modal from './Components/Modal'; // Asegúrate de importar tu archivo CSS aquí

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="flex flex-col h-screen">
      <header className="flex justify-between items-center p-4 border-b-2">
        <div className="text-2xl font-bold">PDF Analyst</div>
        <div>
          <a href="#how-to" className="text-sm font-medium text-gray-700 px-4 hover:text-blue-500 transition duration-300 ease-in-out">¿Cómo se usa?</a>
          <a href="#login" className="text-sm font-medium text-gray-700 px-4 hover:text-blue-500 transition duration-300 ease-in-out">Login</a>
        </div>
      </header>
      <div className="flex flex-grow">
        <div className="w-1/4 background-cover left-side-image" /> {/* Imagen izquierda */}
        <main className="w-1/2 flex flex-col items-center justify-center z-10">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-gray-800">PDF Analyst</h1>
            <p className="text-xl text-gray-600 mt-4">Analiza PDFs para tus investigaciones</p>
            <button 
              onClick={openModal}
              className={`mt-8 py-2 px-4 rounded ${isModalOpen ? 'bg-gray-500 text-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700 text-white'}`}
              disabled={isModalOpen}
            >
              Cargar PDF
            </button>
            <p className="text-gray-500 mt-4">o arrastra un archivo</p>
          </div>
        </main>
        <div className="w-1/4 background-cover right-side-image" /> {/* Imagen derecha más pequeña */}
      </div>

      {/* Modal para cargar documentos */}
      <Modal isOpen={isModalOpen} close={closeModal} />
    </div>
  );
}

export default App;
