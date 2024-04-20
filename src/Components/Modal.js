import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import PDFAnalysisIndice from '../views/PDFAnalysisIndice';

const Modal = ({isOpen, close }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileText, setFileText] = useState("")
  let file_url = '';
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    console.log(event.target.files[0]);
  };

  const handleFileUpload = async () => {

    if (!selectedFile) return;

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const uploadResponse = await fetch('http://localhost:5000/U1/upload_file2', {
        method: 'POST',
        body: formData,
      });

      if(!uploadResponse.ok)
      {
        throw new Error(uploadData.error || 'Failed to upload file');
      }
      const uploadData = await uploadResponse.json();

      console.log('Data to be sent:', uploadData.public_url, uploadData.text);

      navigate('/pdf-analysis-indice', { state: { fileText: uploadData.text, fileUrl: uploadData.public_url } });
    } catch (error) {
      console.error('Error en el proceso de carga y extracción:', error);
    } finally {
      close();  // Asegurar que el modal se cierra después de la operación
    }

  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full z-50" onClick={close}>
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white" onClick={(e) => e.stopPropagation()}>
      {fileText ? (
              <>
              <div className="flex justify-between items-center text-xl mb-4">
              <h6 className="text-xl font-bold">Texto procesado</h6>
              <button 
                className="font-semibold text-2xl" 
                onClick={close}
                >
                &times;
              </button>
              </div>
                <p>
                  {fileText}
                </p>
              </>
        ) : (
          <>
            
        <div className="flex justify-between items-center text-xl mb-4">
          <h6 className="text-xl font-bold">Subir archivo</h6>
          <button 
            className="font-semibold text-2xl" 
            onClick={close}
          >
            &times;
          </button>
        </div>

        <div className="mb-4">
          <input
            type="file"
            onChange={handleFileChange}
            className="px-4 py-2 text-blue-600 bg-white border rounded cursor-pointer w-full"
            accept=".pdf,.doc,.docx"
          />
          {selectedFile && (
              <button
                onClick={handleFileUpload}
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition ease-in-out duration-300 w-full"
              >
                Subir documento
              </button>

          )}
        </div>
        <div className="mb-4">

          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition ease-in-out duration-300 w-full">
            Subir desde URL
          </button>
          
        </div>
        <div className="mb-4">
          <input type="text" placeholder="Ingresar texto" className="px-4 py-2 border rounded w-full" />
        </div>
            </>
        )}


      </div>
    </div>
  );
};

export default Modal;
