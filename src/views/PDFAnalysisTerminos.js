import React, { useState, useEffect } from 'react';
import 'tailwindcss/tailwind.css';
import { Link, useLocation } from "react-router-dom";
import terminosRelacionadosImg from '../Images/TerminosRelacionados.png'
import frecuenciaPalabrasImg from '../Images/FrecuenciaPalabras.png'
import WordCloud from '../Components/WordCloud';

export const  PDFAnalysisTerminos = () => {

    //const [docID, setDocID] = useState('');
    const [wordCloudData, setWordCloudData] = useState([]);



    /*useEffect(() => {
        console.log(location.state)
        if (location.state) {
            //setFileText(location.state.fileText);
            //setDocID(extractWords(location.state.keywords));
            setDocID(location.state.docID);
        }
    }, [location, location.state]);*/
   // console.log('estoy en terminos y el docid es', docID)

   /*
    useEffect(() => {
        const fetchData = async () => {
        try {
            //const response = await fetch(`https://pdf-reader-9s86.onrender.com/U1/keyterms/${docID}`);
            const response = await fetch(`https://localhost:5000/U1/keyterms/${docID}`);
            if (response.ok) {
                const data = await response.json();
                console.log(data)
            } else {
                throw new Error('Failed to fetch data');
            }
        } catch (error) {
        console.error('Error fetching data:', error);
        }
  };

  if (docID) {
    fetchData();
  }
}, [docID]); */

    

    function extractWords(text) {
        const wordsArray = text.split(/\s+/);
        const wordCounts = wordsArray.reduce((acc, word) => {
            word = word.replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, ""); // Remueve la puntuación
            if (word.length > 3) { // Solo palabras con más de 3 letras
                acc[word] = acc.hasOwnProperty(word) ? acc[word] + 1 : 1;
            }
            return acc;
        }, {});

        return Object.entries(wordCounts).map(([text, value]) => {
            return { text, value: value * 10 }; // Ajuste el tamaño de la fuente multiplicando por 10 o cualquier otro factor
        });
    }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="bg-white w-full flex flex-row" style={{ height: '90vh' }}>

        <div className="basis-2/5 px-5 py-3">
            <div style={{ height: '15dvh' }}>
                <h4 className="mb-4 text-4xl font-bold">Algoritmos: análisis, diseño e implementación</h4>
                
            </div>
            <div className='flex flex-col justify-between' style={{height: "70dvh"}}>
                <div className="card px-3 py-2 bg-gray-100 border-0 shadow-md" style={{height: "33dvh"}}>
                    <h6 className='font-medium'>Términos relacionados</h6>
                    <div className="flex mt-1 justify-center">
                        <img className='h-auto' style={{height: "25dvh"}} src={terminosRelacionadosImg} alt='terminos'/>
                    </div>
                </div>
                <div className="relative h-64 w-full" style={{ height: "33dvh" }}>
                        <h6 className='font-medium'>Nube de palabras</h6>
                        <WordCloud words={wordCloudData} />
                </div>


            </div>
        </div>

        <div className="basis-3/5 flex flex-col py-3 px-3">
        <div className="container w-full flex justify-between px-0 items-center" style={{height: "15dvh"}}>
            <Link to="/pdf-analysis-indice"><button className="bg-gray-100 focus:outline-none font-medium rounded-3xl px-5 py-2.5 me-2 mb-2">ÍNDICE</button></Link>
            <Link to="/pdf-analysis-terminos"><button className="bg-gray-100 focus:outline-none font-medium rounded-3xl px-5 py-2.5 me-2 mb-2">TÉRMINOS</button></Link>
            <Link to="#"><button className="bg-gray-100 focus:outline-none font-medium rounded-3xl px-5 py-2.5 me-2 mb-2">FIGURAS</button></Link>
            <Link to="/chatbot"><button className="bg-gray-100 focus:outline-none font-medium rounded-3xl px-5 py-2.5 me-2 mb-2">FRIDA</button></Link>
        </div>

        <div className="flex flex-col justify-between" style={{height: "70dvh"}}>
                <div className="card px-3 py-2 bg-gray-100 border-0 shadow-md" style={{height: "33dvh"}}>
                    <h6 className='font-medium'>Hechos y definiciones</h6>
                    <p><b>a. Impacto en el Diagnóstico:</b><br/>Examiner cómo los algoritmos de aprendizaje profundo pueden 
                    mejorar la detección temprana de enfermedades.</p>
                    <p><b>b. Ética y Privacidad:</b><br/> Analizar las preocupaciones éticas relacionadas con la utilización de datos
                    médicos sensibles.</p>
                </div>
                <div className="card px-3 py-2 bg-gray-100 border-0 shadow-md" style={{height: "33dvh"}}>
                    <h6 className='font-medium'>Frecuencia de términos</h6>
                    <div className="flex mt-1 justify-center">
                        <img className='h-auto' style={{height: "25dvh"}} src={frecuenciaPalabrasImg} alt='terminos'/>
                    </div>
                </div>
        </div>

        </div>

        </div>
    </div>
  );
}

export default PDFAnalysisTerminos;