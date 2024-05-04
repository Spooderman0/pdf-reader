import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BACKEND_LINK } from '../utils/constants';

const DocSummaryPage = () => {
  const [docs, setDocs] = useState([]);
  const [selectedDocURL, setSelectedDocURL] = useState(null);
  const baseUrl = 'https://frida-backend.onrender.com';



  useEffect(() => {
    async function fetchDocs() {
      try {
        const response = await fetch(`${BACKEND_LINK}/user_id/docs`, {
          method: 'GET',
          headers: {
            "Access-Control-Allow-Origin": "*"
          },
          credentials: 'include'
        });
        const data = await response.json();
  
        if (data.docs) {
          setDocs(data.docs);
        } else {
          console.error('No se encontraron documentos:', data.error);
        }
      } catch (error) {
        console.error('Error al obtener documentos:', error);
      }
    }
    
    fetchDocs(); // Call fetchDocs function inside the useEffect
  }, []); // Empty dependency array to run once on mount
  

  const handleSelectDoc = (index) => {
    const doc = docs[index];
    if (doc && doc.Storage_URL) {
      setSelectedDocURL(doc.Storage_URL);
    } else {
      console.error("URL del documento no válida:", doc.Storage_URL);
      setSelectedDocURL(null);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
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
        {selectedDocURL ? (
          <iframe
            src={selectedDocURL}
            title="Document Preview"
            width="100%"
            height="600"
            style={{ border: 'none' }}
          ></iframe>
        ) : (
          <p className="text-center text-gray-500">Selecciona un documento para ver su vista previa.</p>
        )}
      </div>
    </div>
  );
};

export default DocSummaryPage;
