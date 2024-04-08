import React, { useState } from 'react';
import 'tailwindcss/tailwind.css';
import Navbar from '../Components/Navbar';
import { Link } from "react-router-dom";
import terminosRelacionadosImg from '../Images/TerminosRelacionados.png'
import nubePalabrasImg from '../Images/NubePalabras.png'
import frecuenciaPalabrasImg from '../Images/FrecuenciaPalabras.png'

export const  PDFAnalysisTerminos = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true); 
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <div className="bg-white w-full flex flex-row" style={{ height: '90vh' }}>

        <div className="basis-2/5 px-5 py-3">
            <div style={{ height: '15dvh' }}>
                <h4 className="mb-4 text-4xl font-bold">Algoritmos: análisis, diseño e implementación</h4>
                
            </div>
            <div className='flex flex-col justify-between' style={{height: "70dvh"}}>
                <div className="card px-3 py-2 bg-gray-100 border-0 shadow-md" style={{height: "33dvh"}}>
                    <h6 className='font-medium'>Términos relacionados</h6>
                    <div className="flex mt-1 justify-center">
                        <img className='h-auto' style={{height: "25dvh"}} src={terminosRelacionadosImg} alt='terminos'/>
                    </div>
                </div>
                <div className="card px-3 py-2 bg-gray-100 border-0 shadow-md" style={{height: "33dvh"}}>
                    <h6 className='font-medium'>Nube de palabras</h6>
                    <div className="flex mt-1 justify-center">
                        <img className='h-auto' style={{height: "25dvh"}} src={nubePalabrasImg} alt='terminos'/>
                    </div>
                </div>


            </div>
        </div>

        <div className="basis-3/5 flex flex-col py-3 px-3">
        <div className="container w-full flex justify-between px-0 items-center" style={{height: "15dvh"}}>
            <Link to="/pdf-analysis-indice"><button className="bg-gray-100 focus:outline-none font-medium rounded-3xl px-5 py-2.5 me-2 mb-2">ÍNDICE</button></Link>
            <Link to="/pdf-analysis-terminos"><button className="bg-gray-100 focus:outline-none font-medium rounded-3xl px-5 py-2.5 me-2 mb-2">TÉRMINOS</button></Link>
            <Link to="#"><button className="bg-gray-100 focus:outline-none font-medium rounded-3xl px-5 py-2.5 me-2 mb-2">FIGURAS</button></Link>
            <Link to="#"><button className="bg-gray-100 focus:outline-none font-medium rounded-3xl px-5 py-2.5 me-2 mb-2">FRIDA</button></Link>
        </div>

        <div className="flex flex-col justify-between" style={{height: "70dvh"}}>
                <div className="card px-3 py-2 bg-gray-100 border-0 shadow-md" style={{height: "33dvh"}}>
                    <h6 className='font-medium'>Hechos y definiciones</h6>
                    <p><b>a. Impacto en el Diagnóstico:</b><br/>Examiner cómo los algoritmos de aprendizaje profundo pueden 
                    mejorar la detección temprana de enfermedades.</p>
                    <p><b>b. Ética y Privacidad:</b><br/> Analizar las preocupaciones éticas relacionadas con la utilización de datos
                    médicos sensibles.</p>
                </div>
                <div className="card px-3 py-2 bg-gray-100 border-0 shadow-md" style={{height: "33dvh"}}>
                    <h6 className='font-medium'>Frecuencia de términos</h6>
                    <div className="flex mt-1 justify-center">
                        <img className='h-auto' style={{height: "25dvh"}} src={frecuenciaPalabrasImg} alt='terminos'/>
                    </div>
                </div>
        </div>

        </div>

        </div>
    </div>
  );
}

export default PDFAnalysisTerminos;