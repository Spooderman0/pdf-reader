import React, { useState, useEffect } from 'react';
import 'tailwindcss/tailwind.css';
import Navbar from '../Components/Navbar';
import portadaLibro from '../Images/PortadaLibro.png'
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom'


export const  PDFAnalysisIndice = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const location = useLocation();
  const [fileText, setFileText] = useState('');
  const [fileUrl, setFileUrl] = useState('');


  useEffect(() => {
    console.log('Location state:', location.state)
    if(location.state) {
        setFileText(location.state.fileText)
        setFileUrl(location.state.fileUrl)
    }
  }, [location, location.state]);
  //console.log('Estoy en la vista de PDFAnalysisIndice y este es')

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <div className="bg-white w-full flex flex-row" style={{ height: '90vh' }}>

        <div className="basis-2/5 px-5 py-3">
        <div style={{ height: '15dvh' }}>
            <h4 className="mb-4 text-4xl font-bold">Algoritmos: análisis, diseño e implementación</h4>
            
        </div>
        <div className="card p-3 bg-gray-100 border-0 shadow-md" style={{height: "70dvh"}}>
            <h6>Vista preliminar</h6>
            <div className="p-4 flex justify-center">
            <img className="" style={{ height: '55vh' }} src={portadaLibro} alt="Portada" />
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
            <div className="card bg-gray-100 p-3 border-0 shadow-md">
            <h5 className="mb-4 text-2xl font-bold">Resumen</h5>
            <pre> Texto: {fileText} </pre>
            <p> URL del archivo: {fileUrl} </p>
            

                <div className="flex justify-end">
                    <button className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg px-5 py-2.5">Capítulos</button>
                </div>
            </div>

            <div className="container flex justify-between p-0">
            <div className="card bg-gray-100 text-center flex justify-center items-center shadow-md" style={{ width: '25dvw', height: "10dvh" }}>
                <h5 className='font-medium'>2022</h5>
            </div>
            <div className="card bg-gray-100 text-center flex items-center justify-center p-1 shadow-md" style={{ width: '25dvw', height: "10dvh" }}>
                <h5 className='font-medium'>Luis Humberto González Guerra</h5>
            </div>
            </div>

            <div className="card bg-gray-100 p-3 border-0 shadow-md">
            <h5 className="mb-4 text-2xl font-bold">Referencia</h5>
            <p>González, D. (2018, 24 enero). Metodología Proceso unificado (UP) - blog Yunbit Software.</p>
            </div>
        </div>

        </div>

        </div>
    </div>
  );
}

export default PDFAnalysisIndice;