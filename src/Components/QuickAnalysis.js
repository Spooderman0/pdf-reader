import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import 'tailwindcss/tailwind.css';
import { SeccionAnalisis } from '../Components/SeccionAnalisis';
import { FaClipboard } from "react-icons/fa";
import { BACKEND_LINK } from '../utils/constants';
import Swal from 'sweetalert2';
import { generateUUID } from '../utils/generateUUID';


const QuickAnalysis = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [analysisData, setAnalysisData] = useState(location.state?.analysisData || {});
  const [selectedFile, setSelectedFile] = useState(location.state?.file || null);
  const [isLoading, setIsLoading] = useState(false);
  const intervalIdRef = useRef(null);
  let authors = [];
  let authorsList;
  let referencia;
  let msjerror;

  useEffect(() => {
    const fetchAnalysisData = async () => {
      try {
        const response = await fetch(`${BACKEND_LINK}/fast_upload`, {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
          },
          credentials: 'include',
          body: JSON.stringify(location.state?.file) // Asegúrate de enviar los datos correctos del archivo
        });

        const data = await response.json();
        setAnalysisData(data);
      } catch (error) {
        console.error('Error fetching analysis data:', error);
      }
    };

    if (!analysisData.Title) {
      fetchAnalysisData();
    }
  }, [location.state, analysisData.Title]);

  const title = analysisData.Title || 'Cargando...';

  const handleCopyReference = () => {
    const referenceText = "González, D. (2018, 24 enero). Metodología Proceso unificado (UP) - blog Yunbit Software.";
    navigator.clipboard.writeText(referenceText).then(() => {
      alert('Referencia copiada al portapapeles');
    }).catch(err => {
      console.error('Error al copiar la referencia', err);
    });
  };

  /*const handleFullAnalysis = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      setIsLoading(true);
      const uploadResponse = await fetch(`${BACKEND_LINK}/user_id/upload_file2`, {
        method: 'POST',
        body: formData,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
        credentials: 'include'
      });

      if (!uploadResponse.ok) {
        throw new Error(uploadResponse.statusText || 'Failed to upload file');
      }
      const uploadData = await uploadResponse.json();
      console.log(uploadData.doc_id);

      navigate(`../main/pdf-analysis/${uploadData.doc_id}`);
    } catch (error) {

      if (error.message.includes('Failed to fetch')) {
        //alert('Error de red: No se pudo conectar con el servidor.');
        msjerror='Error: Sobrecarga de RAM'
      } else if (error.message.includes('INTERNAL SERVER ERROR')) {
        //alert('Error del servidor: Hubo un problema en el servidor.');
        msjerror='Error: No hay contenido para analizar'
      } else {
        //alert(`Error desconocido: ${error.message}`);
        msjerror='Error: desconocido'
      }
      Swal.fire ({
        icon: 'error',
        text: msjerror,
      })
      setIsLoading(false);
      console.error('Error en el proceso de carga y extracción:', error);
    } finally {
      setIsLoading(false);
    }
  };
*/

const handleFullAnalysis = async () => {
  if (!selectedFile) return;
  const docId = generateUUID("D");

  const formData = new FormData();
  formData.append('file', selectedFile);

  try {
    console.log(`generatedDocId: ${docId}`);
    setIsLoading(true);
    const uploadResponse = await fetch(`${BACKEND_LINK}/user_id/upload_file2/${docId}`, {
      method: 'POST',
      body: formData,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      credentials: 'include'
    });

    if (!uploadResponse.ok) {
      throw new Error(uploadResponse.statusText || 'Failed to upload file');
    }
    const uploadData = await uploadResponse.json();
    // console.log(docId);

    // Start the interval to execute a function every 5 seconds
    intervalIdRef.current = setInterval(() => {
      checkFileUploaded(docId);
      // console.log(`intervalId = ${intervalIdRef.current}`);
      
    }, 5000);
    // console.log(`id = ${intervalIdRef.current}`);

    // navigate(`../main/pdf-analysis/${uploadData.doc_id}`);
  } catch (error) {
    setIsLoading(false);
    console.error('Error en el proceso de carga y extracción:', error);

    if (error.message.includes('Failed to fetch')) {
      msjerror = 'Error: Sobrecarga de RAM';
    } else if (error.message.includes('INTERNAL SERVER ERROR')) {
      msjerror = 'Error: No hay contenido para analizar';
    } else {
      msjerror = 'Error: desconocido';
    }
    Swal.fire({
      icon: 'error',
      text: msjerror,
    });
  } finally {
    setSelectedFile(null);  // Reiniciar el estado del archivo seleccionado
  }
};

const checkFileUploaded = async (docId) => {
  try {
    const response = await fetch(`${BACKEND_LINK}/documentUploaded/${docId}`, {
      method: 'GET',
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error(`La respuesta de la red no fue correcta al obtener los datos de sección:`);
    }

    const data = await response.json();
    // console.log(data["documentUploaded"]);
    const documentUploaded = data["documentUploaded"];
    if (documentUploaded) {
      console.log("Doc is ready");
      // console.log(`clearInterval(${intervalIdRef.current})`);
      clearInterval(intervalIdRef.current);
      intervalIdRef.current = null;
      setIsLoading(false);
      //close();
      navigate(`../main/pdf-analysis/${docId}`);
    }

  } catch (error) {
    console.error(`Error al obtener los datos de sección:`, error);
  }
};

  if (analysisData.Authors) {
    let authRef;
    for (const auth of analysisData.Authors) {
      authRef = auth.split(' ');
      const lastname = authRef[1];
      const initial = authRef[0].charAt(0);
      authors.push(lastname + ', ' + initial + '.');
    }
    authorsList = authors.length > 1 ? authors.join(', ') : authors[0];
  }

  if (!analysisData.CreationDate) {
    referencia = authorsList ? (
      <>
        {authorsList}. <i>{analysisData.Title}</i>.
      </>
    ) : (
      <>
        <i>{analysisData.Title}</i>.
      </>
    );
  } else {
    referencia = authorsList ? (
      <>
        {authorsList}. ({analysisData.CreationDate}). <i>{analysisData.Title}</i>.
      </>
    ) : (
      <>
        <i>{analysisData.Title}</i>. ({analysisData.CreationDate})
      </>
    );
  }
  return (
    <div className="bg-white w-full flex flex-col" style={{ height: '90vh' }}>
      <div className='flex flex-row justify-between px-3' style={{ height: '15dvh', marginLeft: '10%', marginRight: '10%' }}>
        <div className='basis-2/5 items-center flex'>
          <h4 className="mb-4 text-4xl font-bold">{title}</h4>
        </div>
        <div className='basis-3/5 flex justify-end items-center'>
          <button
            onClick={handleFullAnalysis}
            className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-700 transition ease-in-out duration-300"
            disabled={isLoading}
          >
            {isLoading ? (
              <svg aria-hidden="true" className="inline w-5 h-5 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
              </svg>
            ) : (
              'Análisis Completo'
            )}
          </button>
        </div>
      </div>
      <div className='flex flex-row'>
        <div className="card p-3 bg-gray-100 border-0 shadow-md basis-2/5 mx-3" style={{ height: "73dvh", marginLeft: '10%', overflowY: 'auto' }}>
          <div className='flex flex-row justify-between items-center'>
            <h5 className="mb-4 text-2xl font-bold">Vista preliminar</h5>
          </div>
          <div className="p-4 flex justify-center">
            <p style={{ whiteSpace: 'pre-wrap' }}>
              {analysisData.Text}
            </p>
          </div>
        </div>
        <div className="flex flex-col justify-between basis-3/5 mx-3" style={{ height: "73dvh", marginRight: '10%' }}>
          <div className="card bg-gray-100 p-3 border-0 shadow-md overflow-auto" style={{ width: "100%", height: "40dvh" }}>
            <div className='flex flex-row justify-between items-center'>
              <h5 className="mb-4 text-2xl font-bold">Resumen</h5>
            </div>
            {!analysisData.Summary && (
              <div role="status" className='flex items-center justify-center' style={{ height: "60%" }}>
                <svg aria-hidden="true" className="inline w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
            )}
            <p> {analysisData.Summary} </p>
          </div>
          <div className="card bg-gray-100 p-3 border-0 shadow-md" style={{ height: "30dvh" }}>
            <h5 className="mb-4 text-2xl font-bold">Referencia</h5>
            <div className="flex justify-between items-center">
              <div>
                <p>{referencia}</p>
              </div>
              <button
                onClick={handleCopyReference}
                className="text-gray-700 hover:text-black"
              >
                <FaClipboard className="text-2xl" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

}

export default QuickAnalysis;
