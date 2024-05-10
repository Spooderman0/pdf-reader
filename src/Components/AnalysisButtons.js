import React, { useState, useEffect } from 'react';
import 'tailwindcss/tailwind.css';



export const  AnalysisButtons = ({setCurrentSection}) => {

  return (
        <div className="container w-full flex justify-between px-0 items-center" style={{height: "15dvh"}}>
            <button 
                onClick={() => setCurrentSection("indice")} 
                className="bg-gray-100 focus:outline-none font-medium rounded-3xl px-5 py-2.5 me-2 mb-2"
                >
                    ANÁLISIS
            </button>
            <button 
                className="bg-gray-100 focus:outline-none font-medium rounded-3xl px-5 py-2.5 me-2 mb-2"
                onClick={() => setCurrentSection("terminos")} 
                >
                    TÉRMINOS
            </button>
            <button 
                className="bg-gray-100 focus:outline-none font-medium rounded-3xl px-5 py-2.5 me-2 mb-2"
                onClick={() => setCurrentSection("figuras")} 
                >
                    FIGURAS
            </button>
            <button 
                className="bg-gray-100 focus:outline-none font-medium rounded-3xl px-5 py-2.5 me-2 mb-2"
                onClick={() => setCurrentSection("frida")} 
                >
                    FRIDA
            </button>
        </div>
  );
}

export default AnalysisButtons;