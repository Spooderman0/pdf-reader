import React, { useState, useEffect } from 'react';
import 'tailwindcss/tailwind.css';
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom'



export const  AnalysisButtons = ({setCurrentSection}) => {

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
        <div className="container w-full flex justify-between px-0 items-center" style={{height: "15dvh"}}>
            {/* <Link to="/pdf-analysis-indice"><button className="bg-gray-100 focus:outline-none font-medium rounded-3xl px-5 py-2.5 me-2 mb-2">ÍNDICE</button></Link> */}
                <button 
                onClick={() => setCurrentSection("indice")} 
                className="bg-gray-100 focus:outline-none font-medium rounded-3xl px-5 py-2.5 me-2 mb-2"
                >
                    ÍNDICE
                </button>
            
            {/* <Link 
                to={{
                    pathname: "/pdf-analysis-terminos",
                    state: { fileText: fileText } // Aquí pasas el fileText al estado del enlace
                }}
            >
                <button className="bg-gray-100 focus:outline-none font-medium rounded-3xl px-5 py-2.5 me-2 mb-2">
                    TÉRMINOS
                </button>
            </Link> */}

                <button 
                className="bg-gray-100 focus:outline-none font-medium rounded-3xl px-5 py-2.5 me-2 mb-2"
                onClick={() => setCurrentSection("terminos")} 
                >
                    TÉRMINOS
                </button>
            <Link to="#"><button className="bg-gray-100 focus:outline-none font-medium rounded-3xl px-5 py-2.5 me-2 mb-2">FIGURAS</button></Link>
            <Link to="#"><button className="bg-gray-100 focus:outline-none font-medium rounded-3xl px-5 py-2.5 me-2 mb-2">FRIDA</button></Link>
            {/* <Link to="/pdf-analysis-indice"><button className="bg-gray-100 focus:outline-none font-medium rounded-3xl px-5 py-2.5 me-2 mb-2">ÍNDICE</button></Link>
            <Link 
                to={{
                    pathname: "/pdf-analysis-terminos",
                    state: { fileText: fileText } // Aquí pasas el fileText al estado del enlace
                }}
            >
                <button className="bg-gray-100 focus:outline-none font-medium rounded-3xl px-5 py-2.5 me-2 mb-2">
                    TÉRMINOS
                </button>
            </Link>
            <Link to="#"><button className="bg-gray-100 focus:outline-none font-medium rounded-3xl px-5 py-2.5 me-2 mb-2">FIGURAS</button></Link>
            <Link to="#"><button className="bg-gray-100 focus:outline-none font-medium rounded-3xl px-5 py-2.5 me-2 mb-2">FRIDA</button></Link> */}
        </div>
  );
}

export default AnalysisButtons;