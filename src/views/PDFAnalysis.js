import React, { useState, useEffect } from 'react';
import 'tailwindcss/tailwind.css';
import { useNavigate, useParams } from "react-router-dom";
import { useLocation } from 'react-router-dom'
import AnalysisButtons from '../Components/AnalysisButtons';
import { Portada, Summary } from '../Components/SeccionIndice';
import { SeccionTerminosIzquierda, SeccionTerminosDerecha } from '../Components/SeccionTerminos';
import ChatBox from '../Components/ChatBox';
import ConversationHistory from '../Components/ConversationHistory';
import { BACKEND_LINK } from '../utils/constants';


export const  PDFAnalysis = () => {
  const [currentSection, setCurrentSection] = useState("indice");
  const { docId } = useParams();
  const [docData, setDocData] = useState({});
  const [analysisData, setAnalysisData] = useState({});
  const [wordCloudData, setWordCloudData] = useState([]);


  useEffect(() => {
    // console.log('Current section:', currentSection)
    // console.log(docId)
    if(docId){
      getDocData(docId);
      getAnalysisData(docId)
      getWordCloudData(docId)
    }
  
  }, [currentSection, docId]);


  const getAnalysisData = async (docId) => {
    
    try {
      // const uploadResponse = await fetch(`https://frida-backend.onrender.com/U1/analysis/${docId}`, {
      const uploadResponse = await fetch(`${BACKEND_LINK}/U1/analysis/${docId}`, {
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
      const uploadResponse = await fetch(`${BACKEND_LINK}/U1/main_info/${docId}`, {
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

  const getWordCloudData = async (docId) => {
    
    try {
      const uploadResponse = await fetch(`${BACKEND_LINK}/U1/keyterms/${docId}`, {
        method: 'GET',
        headers: {
          "Access-Control-Allow-Origin": "*"
        }
      });

      const data = await uploadResponse.json();
      const terminosArray = Object.entries(data.terms).map(([text, value]) => ({ text, value }));
      setWordCloudData(terminosArray);
    } catch (error) {
      console.error('Failed to get document data:', error);
    }
  };

  //console.log(docData.Storage_URL)

  return (
    <div className="bg-white w-full flex flex-row" style={{ height: '90vh' }}>
      {currentSection === "frida" ? (
            <div style={{ overflowY: 'hidden' }}> {/* Aquí establecemos overflowY: hidden para ocultar el scroll vertical */}

            <ChatBox onMessageSent={(message) => console.log(message)} docId={docId} /> 
            <ConversationHistory />
          </div>
        ) : (
        <>
          <div className="basis-2/5 flex flex-col py-3 px-3">
            <div style={{ height: '15dvh' }}>
                <h4 className="mb-4 text-4xl font-bold">Algoritmos: análisis, diseño e implementación</h4>
            </div>
            {/* Cambiar componentes izquierda dependiendo de la seccion  */}
            {currentSection === "indice" && <Portada docURL = {docData.Storage_URL}/>}
            {currentSection === "terminos" && <SeccionTerminosIzquierda wordCloudData ={wordCloudData}/>}
          </div>
          <div className="basis-3/5 flex flex-col py-3 px-3">
            <AnalysisButtons 
              setCurrentSection={setCurrentSection}
            />
            {/* Cambiar componentes derecha dependiendo de la seccion  */}
            {currentSection === "indice" && <Summary summary={analysisData.Abstract}/>}
            {currentSection === "terminos" && <SeccionTerminosDerecha wordCloudData ={wordCloudData}/>}
          </div>
        </>
      )}


    </div>
  );
}

export default PDFAnalysis;
