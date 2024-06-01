import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BACKEND_LINK } from '../utils/constants';
import { useNavigate, Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";

const DocSummaryPage = () => {
  const [docs, setDocs] = useState([]);
  const [selectedDocData, setSelectedDocData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getAnalysisData();
  }, []);

  const getAnalysisData = async () => {
    try {
      const uploadResponse = await fetch(`${BACKEND_LINK}/user_id/docs`, {
        method: 'GET',
        headers: {
          "Access-Control-Allow-Origin": "*"
        },
        credentials: 'include',
      });

      const uploadData = await uploadResponse.json();
      console.log(uploadData);
      setDocs(uploadData);
    } catch (error) {
      console.error('Failed to get document data:', error);
    }
  };

  const handleVerAnalisis = (doc_id) => {
    navigate(`../main/pdf-analysis/${doc_id}`);
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

  const handleDeleteDoc = async (doc_id) => {
    try {
      const response = await fetch(`${BACKEND_LINK}/user_id/docs/delete/${doc_id}`, {
        method: 'DELETE',
        headers: {
          "Access-Control-Allow-Origin": "*"
        },
        credentials: 'include',
      });

      if (response.status === 200) {
        alert('Documento borrado con éxito');
        setDocs(docs.filter(doc => doc.id !== doc_id));
      } else {
        alert('Error al borrar el documento');
      }
    } catch (error) {
      console.error('Error al borrar el documento:', error);
      alert('Error al borrar el documento');
    }
  };

  return (
    <div className="flex h-screen bg-gray-100" style={{ height: "90dvh" }}>
      <div className="w-1/4 bg-white p-5 overflow-auto">
        <h2 className="text-xl font-semibold mb-5 text-center">Historial</h2>
        <ul>
          {docs.map((doc, index) => (
            <li key={index} className="flex justify-between p-2 hover:bg-gray-200 cursor-pointer group">
              <div onClick={() => handleSelectDoc(index)} className="flex flex-col">
                <span className="font-bold text-base">{doc.Title || 'Documento sin título'}</span>
                <span className="text-gray-500 text-xs mt-1">{new Date(doc.UploadedDate).toLocaleDateString()}</span>
              </div>
              <button 
                onClick={() => handleDeleteDoc(doc.id)} 
                className="text-gray-600 hover:text-gray-800 hidden group-hover:block"
              >
                <FaTrash />
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="w-3/4 p-5">
        {selectedDocData ? (
          <>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <button
                  onClick={() => handleVerAnalisis(selectedDocData.id)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 my-2 px-4 rounded"
                >
                  Ver análisis
                </button>
                <span className="text-gray-500 ml-4">{new Date(selectedDocData.UploadedDate).toLocaleDateString()}</span>
              </div>
            </div>
            <iframe
              src={selectedDocData["Storage_URL"]}
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
