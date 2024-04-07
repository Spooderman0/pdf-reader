import React, { useState } from 'react';
import 'tailwindcss/tailwind.css';
import Modal from '../Components/Modal';
import leftImage from '../Images/undraw_Online_articles_re_yrkj.png'; 
import Navbar from '../Components/Navbar';

export const  UploadPDF = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true); 
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <div className="flex flex-grow">
        <div className="w-4/5 flex flex-col items-center justify-center p-8 space-y-4"> {/* Ajuste para mover a la izquierda */}
          <img src={leftImage} alt="Online articles" className="max-w-sm" />
          <h1 className="text-3xl font-bold text-center">Analiza PDFs para tus investigaciones</h1>
        </div>
        <div className="w-3/5 flex flex-col justify-center items-start pl-10 pr-32 space-y-6"> {/* Ajuste para los botones */}
          <button 
            onClick={openModal}
            className="bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-blue-700 transition duration-300" // bordes redondos
          >
            Cargar Archivo
          </button>
          <button 
            onClick={openModal}
            className="bg-white text-blue-600 px-6 py-3 rounded-full shadow-lg border border-blue-600 hover:bg-blue-100 transition duration-300" // bordes redondos
          >
            Carga Rápida
          </button>
          <p className="text-gray-500">o arrastra un archivo</p>
        </div>
      </div>
      <Modal isOpen={isModalOpen} close={closeModal} />
    </div>
  );
}

export default UploadPDF;