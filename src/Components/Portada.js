import React, { useState, useEffect } from 'react';
import 'tailwindcss/tailwind.css';
import portadaLibro from '../Images/PortadaLibro.png'
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom'

export const  Portada = ({docURL}) => {

  const navigate = useNavigate()
  const handleOpenPopup = () => navigate('/vistapreliminar', { state: {docURL } })

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