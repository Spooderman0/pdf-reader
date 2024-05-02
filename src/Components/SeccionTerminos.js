import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import frecuenciaPalabrasImg from '../Images/FrecuenciaPalabras.png'
import terminosRelacionadosImg from '../Images/TerminosRelacionados.png'
import WordCloud from './WordCloud';
import { BACKEND_LINK } from '../utils/constants';

export const  SeccionTerminosIzquierda = ({docID}) => {

    const [wordCloudData, setWordCloudData] = useState([]);  

    useEffect(() => {
        const termsData = async () => {
            try {
                // const response = await fetch(`https://frida-backend.onrender.com/U1/keyterms/${docID}`)
                const response = await fetch(`${BACKEND_LINK}/U1/keyterms/${docID}`)
                if (response.ok)
                {
                    const data = await response.json();
                    //console.log(data.terms);
                    const terminosArray = Object.entries(data.terms).map(([text, value]) => ({ text, value }));
                    //console.log(terminosArray);
                    setWordCloudData(terminosArray)
                }
            }
            catch (error) {
                console.error('Error fetching terms:', error);
            }
        };

        termsData();
    }, []);

    /*function extractWords(text) {
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
    }*/



  return (
    <div className='flex flex-col justify-between' style={{height: "70dvh"}}>
        <div className="card px-3 py-2 bg-gray-100 border-0 shadow-md" style={{height: "33dvh"}}>
            <h6 className='font-medium'>Términos relacionados</h6>
            <div className="flex mt-1 justify-center">
                <img className='h-auto' style={{height: "25dvh"}} src={terminosRelacionadosImg} alt='terminos'/>
            </div>
        </div>
        <div className="card px-3 py-2 bg-gray-100 border-0 shadow-md" style={{ height: "33dvh" }}>
            <h6 className='font-medium'>Nube de palabras</h6>
            <WordCloud words={wordCloudData} />
        </div>


    </div>
  );
} 

export const  SeccionTerminosDerecha = () => {

    const location = useLocation();

  return (
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
  );
}

