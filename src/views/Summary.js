import React, { useState, useEffect } from 'react';
import 'tailwindcss/tailwind.css';
import portadaLibro from '../Images/PortadaLibro.png'
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom'
import Portada from '../Components/Portada';
import AnalysisButtons from '../Components/AnalysisButtons';

const ShowVistaPreliminar = ({url, onClose}) => {
    return (
        <div className="popup-overlay" onClick={onClose}>
          <div className="popup">
            <iframe src={url} frameborder="0" allowfullscreen></iframe>
          </div>
        </div>
      );
}


export const  Summary = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const location = useLocation();
  const [fileText, setFileText] = useState('');
  const [fileUrl, setFileUrl] = useState('');
  const navigate = useNavigate()

  const handleOpenPopup = () => navigate('/vistapreliminar', { state: {fileUrl } })


  useEffect(() => {
    console.log('Location state:', location.state)
    if(location.state) {
        setFileText(location.state.fileText)
        setFileUrl(location.state.fileUrl)
    }
  }, [location, location.state]);
  //console.log('Estoy en la vista de Summary y este es')

  return (
        <div className="flex flex-col justify-between" style={{height: "70dvh"}}>
            <div className="card bg-gray-100 p-3 border-0 shadow-md overflow-auto" style={{width: "60dvw", height: "40dvh"}}>
                <h5 className="mb-4 text-2xl font-bold">Resumen</h5>
                <p style={{ whiteSpace: 'pre-wrap' }}>{fileText}</p>
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
  );
}

export default Summary;