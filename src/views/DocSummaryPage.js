import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BACKEND_LINK } from '../utils/constants';
import { useNavigate, Link } from "react-router-dom";


const DocSummaryPage = () => {
  const [docs, setDocs] = useState([]);
  const [selectedDocData, setSelectedDocData] = useState(null);
  const navigate = useNavigate();

  //const userId = 'U1';
  //const baseUrl = 'https://frida-backend.onrender.com';

  /*useEffect(() => {
    async function fetchDocs() {
      try {
        const response = await axios.get(`${baseUrl}/${userId}/docs`);
        if (response.data) {
          setDocs(response.data);
          console.log("Documentos obtenidos:", response.data);
        } else {
          console.log("No se recibieron datos de la API.");
        }
      } catch (error) {
        console.error('Error al obtener documentos:', error);
      }
    }
    fetchDocs();
  }, [userId, baseUrl]);*/

  useEffect(() => {
    getAnalysisData()
  }, []);

  const getAnalysisData = async () => {
    
    try {
      // const uploadResponse = await fetch(`https://frida-backend.onrender.com/U1/analysis/${docId}`, {
      const uploadResponse = await fetch(`${BACKEND_LINK}/user_id/docs`, {
        method: 'GET',
        headers: {
          "Access-Control-Allow-Origin": "*"
        },
        credentials:'include',
      });

      const uploadData = await uploadResponse.json();
      console.log(uploadData);
      setDocs(uploadData);

    } catch (error) {
      console.error('Failed to get document data:', error);
    }
  };

  const handleVerAnalisis = (doc_id) => {
    navigate(`../main/pdf-analysis/${doc_id}`)
  };

  const handleSelectDoc = (index) => {
    const doc = docs[index];
    if (doc) {
      setSelectedDocData(doc);
    } else {
      console.error("Documento no válido:", doc);
      setSelectedDocData(null);
    }
  };
  

  return (
    <div className="flex h-screen bg-gray-100" style={{height: "90dvh"}}>
      <div className="w-1/4 bg-white p-5 overflow-auto">
        <h2 className="text-xl font-semibold mb-5 text-center">Historial</h2>
        <ul>
          {docs.map((doc, index) => (
            <li key={index} className="p-2 hover:bg-gray-200 cursor-pointer" onClick={() => handleSelectDoc(index)}>
              {doc.Title || 'Documento sin título'}
            </li>
          ))}
        </ul>
      </div>
      <div className="w-3/4 p-5">

      {selectedDocData ? (
        <>
          <button 
            onClick={() => handleVerAnalisis(selectedDocData.id)}
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 my-2 px-4 rounded">
            Ver análisis
          </button>
          <iframe
            src={selectedDocData["Storage_URL"]}
            //src={'https://storage.googleapis.com/pruebaapi-43fcf.appspot.com/ranas%20prueba.pdf'}
            title="Document Preview"
            width="100%"
            height="600"
            style={{ border: 'none' }}
            ></iframe>
        </>
        ) : (
          <p className="text-center text-gray-500">Selecciona un documento para ver su vista previa.</p>
        )}
        
      </div>
    </div>
  );
};

export default DocSummaryPage;
