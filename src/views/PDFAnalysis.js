import React, { useState, useEffect } from 'react';
import 'tailwindcss/tailwind.css';
import portadaLibro from '../Images/PortadaLibro.png'
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom'
import Portada from '../Components/Portada';
import AnalysisButtons from '../Components/AnalysisButtons';
import Summary from './Summary';
import SeccionTerminosIzquierda from '../Components/SeccionTerminosIzquierda';
import SeccionTerminosDerecha from '../Components/SeccionTerminosDerecha';

const ShowVistaPreliminar = ({url, onClose}) => {
    return (
        <div className="popup-overlay" onClick={onClose}>
          <div className="popup">
            <iframe src={url} frameborder="0" allowfullscreen></iframe>
          </div>
        </div>
      );
}


export const  PDFAnalysisIndice = () => {
  const [currentSection, setCurrentSection] = useState("indice");

  const location = useLocation();
  const [fileText, setFileText] = useState('');
  const [fileUrl, setFileUrl] = useState('');
  const navigate = useNavigate()

  const handleOpenPopup = () => navigate('/vistapreliminar', { state: {fileUrl } })


  useEffect(() => {
    console.log('Current section:', currentSection)
  
  }, [currentSection]);

  useEffect(() => {
    console.log('Location state:', location.state)
    if(location.state) {
        setFileText(location.state.fileText)
        setFileUrl(location.state.fileUrl)
    }
  }, [location, location.state]);
  //console.log('Estoy en la vista de PDFAnalysisIndice y este es')

  return (
    <div className="bg-white w-full flex flex-row" style={{ height: '90vh' }}>
          <div className="basis-2/5 flex flex-col py-3 px-3">
            <div style={{ height: '15dvh' }}>
                <h4 className="mb-4 text-4xl font-bold">Algoritmos: análisis, diseño e implementación</h4>
            </div>
            {/* Cambiar componentes izquierda dependiendo de la seccion  */}
            {currentSection === "indice" && <Portada/>}
            {currentSection === "terminos" && <SeccionTerminosIzquierda/>}
        </div>
        <div className="basis-3/5 flex flex-col py-3 px-3">
            <AnalysisButtons 
              setCurrentSection={setCurrentSection}
            />
            {/* Cambiar componentes derecha dependiendo de la seccion  */}
            {currentSection === "indice" && <Summary/>}
            {currentSection === "terminos" && <SeccionTerminosDerecha/>}
        </div>
    </div>
  );
}

export default PDFAnalysisIndice;
