import React, { useState, useEffect } from 'react';
import 'tailwindcss/tailwind.css';
import portadaLibro from '../Images/PortadaLibro.png'
import { Link, useNavigate, useParams } from "react-router-dom";
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
  const [keywords, setKeywords] = useState([]);
  const [docID, setDocID] = useState('');
  const navigate = useNavigate()
  const { docId } = useParams();
  const [docData, setDocData] = useState({});

  const handleOpenPopup = () => navigate('/vistapreliminar', { state: {fileUrl } })


  useEffect(() => {
    console.log('Current section:', currentSection)
    console.log(docId)
    if(docId){
      getDocData(docId);
    }
  
  }, [currentSection, docID]);

  useEffect(() => {
    // console.log('Location state:', location.state)
    if(location.state) {
        setFileText(location.state.fileText)
        setFileUrl(location.state.fileUrl)
        setKeywords(location.state.keywords)
        setDocID(location.state.docID)
    }
  }, [location, location.state]);
  //console.log('Estoy en la vista de PDFAnalysisIndice y este es')
  // console.log('Estoy en la vista de PDFAnalysisIndice y el docid es', docID)

  const handleOnClick = () => {
   navigate('main/pdf-analysis-terminos', { state: { docID: docID } })
  }

  const getDocData = async (docId) => {


    try {
      // const uploadResponse = await fetch('https://frida-backend.onrender.com/U1/upload_file2', {
        // console.log("+=======docId: ", docId)
      const uploadResponse = await fetch(`http://127.0.0.1:5000/U1/${docId}`, {
        method: 'GET',
        headers: {
          "Access-Control-Allow-Origin": "*"
        }
      });

      const uploadData = await uploadResponse.json();
      // console.log(uploadData);
      setDocData({...uploadData});
      // console.log(docData);

    } catch (error) {
      console.error('Failed to get document data:', error);
    }

  };

  return (
    <div className="bg-white w-full flex flex-row" style={{ height: '90vh' }}>
          <div className="basis-2/5 flex flex-col py-3 px-3">
            <div style={{ height: '15dvh' }}>
                <h4 className="mb-4 text-4xl font-bold">Algoritmos: análisis, diseño e implementación</h4>
            </div>
            {/* Cambiar componentes izquierda dependiendo de la seccion  */}
            {currentSection === "indice" && <Portada/>}
            {currentSection === "terminos" && <SeccionTerminosIzquierda docID ={docID}/>}
        </div>
        <div className="basis-3/5 flex flex-col py-3 px-3">
            <AnalysisButtons 
              setCurrentSection={setCurrentSection}
            />
            {/* Cambiar componentes derecha dependiendo de la seccion  */}
            {currentSection === "indice" && <Summary summary={docData.Summary}/>}
            {currentSection === "terminos" && <SeccionTerminosDerecha/>}
        </div>
    </div>
  );
}

export default PDFAnalysisIndice;