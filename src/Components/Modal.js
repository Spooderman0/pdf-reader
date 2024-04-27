import React, { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";

const Modal = ({isOpen, close }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileText, setFileText] = useState("")
  const [isLoading, setIsLoading] = useState(false)
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
      setIsLoading(true);
      const uploadResponse = await fetch('https://frida-backend.onrender.com/U1/upload_file2', {
      // const uploadResponse = await fetch('http://127.0.0.1:5000/U1/upload_file2', {
        method: 'POST',
        body: formData,
      });

      if(!uploadResponse.ok)
      {
        throw new Error(uploadData.error || 'Failed to upload file');
      }
      const uploadData = await uploadResponse.json();

      // console.log('Docref:', uploadData.doc_ref);

      // navigate('../main/pdf-analysis', { state: { fileText: uploadData.text, fileUrl: uploadData.public_url, keywords: uploadData.keywords, docID: uploadData.doc_ref } });
      navigate(`../main/pdf-analysis/${uploadData.doc_id}`)
    } catch (error) {
      setIsLoading(false);
      console.error('Error en el proceso de carga y extracción:', error);
    } finally {
      setIsLoading(false);
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
            {isLoading ? (
                <div className='text-center'>
                  <div role="status">
                      <svg aria-hidden="true" class="inline w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                      </svg>
                      <span class="sr-only">Loading...</span>
                  </div>
                  <p>
                    Procesando tu documento...
                  </p>
                </div>
            ) : (
               (
                <>
                  <input
                  type="file"
                  onChange={handleFileChange}
                  className="px-4 py-2 text-blue-600 bg-white border rounded cursor-pointer w-full"
                  accept=".pdf,.doc,.docx"
                  />
                  { selectedFile && (
                    <button
                      onClick={handleFileUpload}
                      className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition ease-in-out duration-300 w-full"
                      >
                      Subir documento
                    </button>
                  )
                  }
                </>
  
            )
            )}
        </div>
        <div className="mb-4">
          <Link to="pdf-analysis" >
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