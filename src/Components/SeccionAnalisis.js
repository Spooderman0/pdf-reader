import React, { useState, useEffect } from 'react';
import 'tailwindcss/tailwind.css';
import portadaLibro from '../Images/PortadaLibro.png';
import { useNavigate } from "react-router-dom";
import { FaClipboard } from "react-icons/fa";

export const SeccionAnalisis = ({ docURL, summary, raw_text, sectionsSummary, portada, title, author, creationDate }) => {
  const [vistaPreTab, setVistaPreTab] = useState('file');
  const [selectedTab, setSelectedTab] = useState('Resumen');
  let authors=[]
  let authorsList

  let referencia
  const navigate = useNavigate();

  const handleOpenPopup = () => navigate('/vistapreliminar', { state: { docURL } });

  const handleCopyReference = () => {
    const referenceText = "González, D. (2018, 24 enero). Metodología Proceso unificado (UP) - blog Yunbit Software.";
    navigator.clipboard.writeText(referenceText).then(() => {
      alert('Referencia copiada al portapapeles');
    }).catch(err => {
      console.error('Error al copiar la referencia', err);
    });
  };

  const handleVistaPreliminar_Tab = (tab) => {
    setVistaPreTab(tab);
  };

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  if(author){
    let authRef
    //let authors=[]
    for (const auth of author){
      authRef = auth.split(' ')
      const lastname = authRef[1]
      const initial = authRef[0].charAt(0);
      authors.push(lastname+', '+initial+'.')
    }
    if(authors.length > 1){
      authorsList = authors.join(', ') ;
    }
    else {
      authorsList = authors[0]
      
    }
  }

  //ARMAR REFERENCIA DESDE EL FRONT
  if (!creationDate) {
    if (authorsList) {
        referencia = (
          <>
              {authorsList}. <i>{title}</i>.
          </>
        );
    } else {
        referencia = (
          <>
              <i>{title}</i>.
          </>
        );
    }
  } else {
    if (authorsList) {
        referencia = (
          <>
              {authorsList}. ({creationDate}). <i>{title}</i>.
          </>
        );
    } else {
        referencia = `<em>${title}</em>.(${creationDate}).`;
        referencia = (
          <>
              <i>{title}</i>. ({creationDate})
          </>
        );
    }
  }

  return (
    <div className='flex flex-row'>
      <div className="card p-3 bg-gray-100 border-0 shadow-md basis-2/5 mx-3" style={{ height: "73dvh", marginLeft: '10%', overflowY: 'auto' }}>
        <div className='flex flex-row justify-between items-center'>
          <h5 className="mb-4 text-2xl font-bold">Vista preliminar</h5>
          {/* Tabs START */}
          <div className="relative flex bg-gray-600 rounded-full p-0.5">
            <div
              className={`absolute top-0 left-0 w-1/2 h-full bg-white rounded-full transform transition-transform duration-300 ${vistaPreTab === 'text' ? 'translate-x-full' : ''}`}
            />
            <button
              onClick={() => handleVistaPreliminar_Tab('file')}
              className={`relative w-1/2 px-4 py-1 rounded-full z-10 ${vistaPreTab === 'file' ? 'text-black' : 'text-white'}`}
            >
              Archivo
            </button>
            <button
              onClick={() => handleVistaPreliminar_Tab('text')}
              className={`relative w-1/2 px-4 py-1 rounded-full z-10 ${vistaPreTab === 'text' ? 'text-black' : 'text-white'}`}
            >
              Texto
            </button>
          </div>
          {/* Tabs END */}
        </div>
        <div className="p-4 flex justify-center">
          {vistaPreTab === 'text' ? (
            <p style={{ whiteSpace: 'pre-wrap' }}>
              {raw_text}
            </p>
          ) : (
            <img
              onClick={handleOpenPopup}
              className="cursor-pointer"
              style={{ height: '55vh', borderRadius:'10px'}}
              src={portada}
              alt="Portada"
              onMouseOver={(e) => {
                //e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
              }}
              onMouseOut={(e) => {
                //e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            />
          )}
        </div>
      </div>
      <div className="flex flex-col justify-between basis-3/5 mx-3" style={{ height: "73dvh", marginRight: '10%' }}>
        <div className="card bg-gray-100 p-3 border-0 shadow-md overflow-auto" style={{ width: "100%", height: "40dvh" }}>
          <div className='flex flex-row justify-between items-center'>
            <h5 className="mb-4 text-2xl font-bold">{selectedTab === 'Resumen' ? 'Resumen' : 'Capítulos'}</h5>
            {/* Tabs START */}
            <div className="relative flex bg-gray-600 rounded-full p-0.5">
              <div
                className={`absolute top-0 left-0 w-1/2 h-full bg-white rounded-full transform transition-transform duration-300 ${selectedTab === 'Capítulos' ? 'translate-x-full' : ''}`}
              />
              <button
                onClick={() => handleTabClick('Resumen')}
                className={`relative w-1/2 px-2 py-1 rounded-full z-10 ${selectedTab === 'Resumen' ? 'text-black' : 'text-white'}`}
              >
                Resumen
              </button>
              <button
                onClick={() => handleTabClick('Capítulos')}
                className={`relative w-1/2 px-2 py-1 rounded-full z-10 ${selectedTab === 'Capítulos' ? 'text-black' : 'text-white'}`}
              >
                Capítulos
              </button>
            </div>
            {/* Tabs END */}
          </div>
          {selectedTab === 'Resumen' ? (
            !summary ? (
              <div role="status" className='flex items-center justify-center' style={{ height: "60%" }}>
                <svg aria-hidden="true" className="inline w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              <p>{summary}</p>
            )
          ) : (
            <div>
              {sectionsSummary.map((section, index) => (
                <div key={index} className="mb-4">
                  <h6 className="text-xl font-semibold">{section.title}</h6>
                  <p>{section.summary}</p>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="card bg-gray-100 p-3 border-0 shadow-md flex justify-between items-center" style={{ height: "30dvh" }}>
          <div>
            <h5 className="mb-4 text-2xl font-bold ">Referencia</h5>
            {/*<p>González, D. (2018, 24 enero). <i>Metodología Proceso unificado (UP) </i> - blog Yunbit Software.</p>*/}
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
  );
};

export default SeccionAnalisis;
