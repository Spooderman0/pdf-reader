import React, { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
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
      const uploadResponse = await fetch('http://localhost:5000/upload_file', {
        method: 'POST',
        body: formData,
      });

      const uploadData = await uploadResponse.json();
      if (!uploadResponse.ok) throw new Error(uploadData.error || 'Failed to upload file');
      console.log('Upload response:', uploadData)

      const response = await fetch('http://localhost:5000/extract', {
        method: 'POST',
        body: formData,
      });

      const extractData = await response.json();
      if (!response.ok) throw new Error(extractData.error || 'Failed to extract text');
      console.log('Extract response:', extractData)
      
      console.log('Data to be sent:', extractData.text, uploadData.public_url);

      navigate('/pdf-analysis-indice', { state: { fileText: extractData.texto, fileUrl: uploadData.public_url } });
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
          <Link to="pdf-analysis-indice" >
            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition ease-in-out duration-300 w-full">
              Subir desde URL
            </button>
          </Link>
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
