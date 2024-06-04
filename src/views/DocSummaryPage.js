import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BACKEND_LINK } from '../utils/constants';
import { useNavigate, Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";

const DocSummaryPage = () => {
  const [docs, setDocs] = useState([]);
  const [selectedDocData, setSelectedDocData] = useState(null);
  const [loading, setLoading] = useState(true); // Estado de carga
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
    } finally {
      setLoading(false); // Finaliza la carga
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
        {loading ? ( // Mostrar icono de carga mientras se cargan los datos
          <div className="flex justify-center items-center h-full">
            <svg aria-hidden="true" className="w-1/6 inline animate-spin text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
            </svg>
          </div>
        ) : (
          docs.length > 0 ? ( // Mostrar documentos si existen
            <ul>
              {docs.map((doc, index) => (
                <li key={index} onClick={() => handleSelectDoc(index)} className="flex justify-between p-2 hover:bg-gray-200 cursor-pointer group">
                  <div className="flex flex-col">
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
          ) : ( // Mostrar mensaje si no hay documentos
            <div className="text-center text-gray-500">No hay documentos subidos.</div>
          )
        )}
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
