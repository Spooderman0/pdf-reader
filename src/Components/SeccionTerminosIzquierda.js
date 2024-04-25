import React, { useState, useEffect } from 'react';
import 'tailwindcss/tailwind.css';
import { Link, useLocation } from "react-router-dom";
import terminosRelacionadosImg from '../Images/TerminosRelacionados.png'
import nubePalabrasImg from '../Images/NubePalabras.png'
import WordCloud from './WordCloud';

export const  SeccionTerminosIzquierda = () => {

    const location = useLocation();
    const [fileText, setFileText] = useState('');
    const [wordCloudData, setWordCloudData] = useState([]);


    useEffect(() => {
        if (location.state?.fileText) {
            setFileText(location.state.fileText);
            setWordCloudData(extractWords(location.state.fileText));
        }
    }, [location]);

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

export default SeccionTerminosIzquierda;