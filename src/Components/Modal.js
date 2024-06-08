import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { BACKEND_LINK } from '../utils/constants';
import { FaRegFilePdf } from 'react-icons/fa';  // Importar el icono
import Swal from 'sweetalert2';
import { generateUUID } from '../utils/generateUUID';


const Modal = ({ isOpen, close }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileText, setFileText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const intervalCountRef = useRef(0); // Add a ref for interval count
  const intervalIdRef = useRef(null);

  let msjerror;
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    console.log(event.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (!selectedFile) return;
    const docId = generateUUID("D");

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      console.log(`generatedDocId: ${docId}`);
      setIsLoading(true);
      intervalCountRef.current = 0; // Reset the interval count when starting a new upload
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
        intervalCountRef.current += 1; // Increment the interval count
        checkFileUploaded(docId);
        // loadingTime.current += 5;
        // console.log(`intervalId = ${intervalIdRef.current}`);
      }, 5000);

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
      // console.log(intervalCountRef);
      const documentUploaded = data["documentUploaded"];
      if (documentUploaded) {
        console.log("Doc is ready");
        // console.log(`clearInterval(${intervalIdRef.current})`);
        clearInterval(intervalIdRef.current);
        intervalIdRef.current = null;

        const response = await fetch(`${BACKEND_LINK}/process/user_id/${docId}`, {
          method: 'POST',
          headers: {
            "Access-Control-Allow-Origin": "*"
          },
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error(`La respuesta de la red no fue correcta al obtener los datos de sección:`);
        }
        

        
        setIsLoading(false);
        close();




        navigate(`../main/pdf-analysis/${docId}`);
      } else if (intervalCountRef.current >= 18) { // 18 * 5 seconds = 90 seconds
        setIsLoading(false);
        clearInterval(intervalIdRef.current);
        intervalIdRef.current = null;
        Swal.fire({
          icon: 'error',
          text: 'Error al procesar archivo. Vuelve a intentarlo.',
        });
      }

    } catch (error) {
      console.error(`Error al obtener los datos de sección:`, error);
    }
  };

  const handleDrag = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (event.type === 'dragenter' || event.type === 'dragover') {
      setDragActive(true);
    } else if (event.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setDragActive(false);
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      setSelectedFile(event.dataTransfer.files[0]);
      console.log(event.dataTransfer.files[0]);
    }
  };

  const handleClose = () => {
    if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current);
      intervalIdRef.current = null;
    }
    close();
    setSelectedFile(null);  // Reiniciar el estado del archivo seleccionado
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full z-50" onClick={handleClose}>
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white" onClick={(e) => e.stopPropagation()}>
        {fileText ? (
          <>
            <div className="flex justify-between items-center text-xl mb-4">
              <h6 className="text-xl font-bold">Texto procesado</h6>
              <button className="font-semibold text-2xl" onClick={handleClose}>&times;</button>
            </div>
            <p>{fileText}</p>
          </>
        ) : (
          <>
            <div className="flex justify-between items-center text-xl mb-4">
              <h6 className="text-xl font-bold">Subir archivo</h6>
              <button className="font-semibold text-2xl" onClick={handleClose}>&times;</button>
            </div>
            <div
              className={`mb-4 p-4 border-dashed border-2 rounded ${dragActive ? 'border-blue-600' : 'border-gray-300'}`}
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
            >
              {isLoading ? (
                <div className='text-center'>
                  <div role="status">
                    <svg aria-hidden="true" className="inline w-10 h-10 text-gray-200 animate-spin fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                    </svg>
                    <span className="sr-only">Loading...</span>
                  </div>
                  <p>Procesando tu documento...</p>
                </div>
              ) : (
                <>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="hidden"
                    id="fileUpload"
                    accept=".pdf,.doc,.docx"
                  />
                  <label htmlFor="fileUpload" className="block text-center cursor-pointer p-4">
                    <p>Arrastra y suelta tu archivo aquí o haz clic para seleccionar un archivo</p>
                  </label>
                  {selectedFile && (
                    <div className="text-center mt-2">
                      <FaRegFilePdf className="inline-block text-blue-600 mb-1" size={48} />
                      <p className="text-blue-600">{selectedFile.name}</p>
                    </div>
                  )}
                  {selectedFile && (
                    <button
                      onClick={handleFileUpload}
                      className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition ease-in-out duration-300 w-full"
                    >
                      Subir documento
                    </button>
                  )}
                </>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Modal;
