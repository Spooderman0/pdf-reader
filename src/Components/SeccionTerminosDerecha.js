import React, { useState, useEffect } from 'react';
import 'tailwindcss/tailwind.css';
import { Link, useLocation } from "react-router-dom";
import frecuenciaPalabrasImg from '../Images/FrecuenciaPalabras.png'
import { ArrowUpRightIcon } from '@heroicons/react/24/outline';

export const  SeccionTerminosDerecha = () => {

    const location = useLocation();


  return (
        <div className="flex flex-col justify-between" style={{height: "70dvh"}}>
                <div className="card px-3 py-2 bg-gray-100 border-0 shadow-md" style={{height: "33dvh"}}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                </svg>

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
  );
}

export default SeccionTerminosDerecha;