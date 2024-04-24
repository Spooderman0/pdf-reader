import React, { useState, useEffect } from 'react';
import 'tailwindcss/tailwind.css';
import portadaLibro from '../Images/PortadaLibro.png'
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom'
export const  Portada = () => {

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

  return (
    <div className="card p-3 bg-gray-100 border-0 shadow-md" style={{height: "70dvh"}}>
        <h6 className="mb-4 text-2xl font-bold">Vista preliminar</h6>
        <div className="p-4 flex justify-center">
        <img
            onClick={handleOpenPopup}
            className="cursor-pointer"
            style={{ height: '55vh' }}
            src={portadaLibro}
            alt="Portada"
            />
        </div>
    </div>
  );
}

export default Portada;