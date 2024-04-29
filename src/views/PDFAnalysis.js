import React, { useState, useEffect } from 'react';
import 'tailwindcss/tailwind.css';
import { useNavigate, useParams } from "react-router-dom";
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
  const { docId } = useParams();
  const [docData, setDocData] = useState({});
  const [analysisData, setAnalysisData] = useState({});


  useEffect(() => {
    // console.log('Current section:', currentSection)
    // console.log(docId)
    if(docId){
      getDocData(docId);
      getAnalysisData(docId)
    }
  
  }, [currentSection, docId]);


  const getAnalysisData = async (docId) => {
    
    try {
      const uploadResponse = await fetch(`https://frida-backend.onrender.com/U1/analysis/${docId}`, {
        method: 'GET',
        headers: {
          "Access-Control-Allow-Origin": "*"
        }
      });

      const uploadData = await uploadResponse.json();
      // console.log(uploadData);
      setAnalysisData({...uploadData});

    } catch (error) {
      console.error('Failed to get document data:', error);
    }
  };


  const getDocData = async (docId) => {
    
    try {
      const uploadResponse = await fetch(`https://frida-backend.onrender.com/U1/main_info/${docId}`, {
        method: 'GET',
        headers: {
          "Access-Control-Allow-Origin": "*"
        }
      });

      const uploadData = await uploadResponse.json();
      // console.log(uploadData);
      setDocData({...uploadData});
    } catch (error) {
      console.error('Failed to get document data:', error);
    }
  };

  // console.log(analysisData.Abstract)
  // console.log(docData.Storage_URL)

  return (
    <div className="bg-white w-full flex flex-row" style={{ height: '90vh' }}>
          <div className="basis-2/5 flex flex-col py-3 px-3">
            <div style={{ height: '15dvh' }}>
                <h4 className="mb-4 text-4xl font-bold">Algoritmos: análisis, diseño e implementación</h4>
            </div>
            {/* Cambiar componentes izquierda dependiendo de la seccion  */}
            {currentSection === "indice" && <Portada docURL = {docData.Storage_URL}/>}
            {currentSection === "terminos" && <SeccionTerminosIzquierda docID ={docId}/>}
        </div>
        <div className="basis-3/5 flex flex-col py-3 px-3">
            <AnalysisButtons 
              setCurrentSection={setCurrentSection}
            />
            {/* Cambiar componentes derecha dependiendo de la seccion  */}
            {currentSection === "indice" && <Summary summary={analysisData.Abstract}/>}
            {currentSection === "terminos" && <SeccionTerminosDerecha/>}
        </div>
    </div>
  );
}

export default PDFAnalysisIndice;