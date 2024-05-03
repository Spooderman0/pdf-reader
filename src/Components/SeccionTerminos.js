import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import frecuenciaPalabrasImg from '../Images/FrecuenciaPalabras.png'
import terminosRelacionadosImg from '../Images/TerminosRelacionados.png'
import WordCloud from './WordCloud';
import { BACKEND_LINK } from '../utils/constants';
import TrendChart from './TrendChart';

export const  SeccionTerminosIzquierda = ({wordCloudData}) => {

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
            <WordCloud words={wordCloudData}/>
        </div>


    </div>
  );
} 

export const  SeccionTerminosDerecha = ({wordCloudData}) => {

  return (
        <div className="flex flex-col justify-between" style={{height: "70dvh"}}>
                <div className="card px-3 py-2 bg-gray-100 border-0 shadow-md" style={{height: "33dvh"}}>
                    <h6 className='font-medium'>Hechos y definiciones</h6>
                    <p><b>a. Impacto en el Diagnóstico:</b><br/>Examiner cómo los algoritmos de aprendizaje profundo pueden 
                    mejorar la detección temprana de enfermedades.</p>
                    <p><b>b. Ética y Privacidad:</b><br/> Analizar las preocupaciones éticas relacionadas con la utilización de datos
                    médicos sensibles.</p>
                </div>
                <div className="card px-3 py-2 bg-gray-100 border-0 shadow-md" style={{height: "33dvh"}} >
                    <h6 className='font-medium'>Frecuencia de términos</h6>
                    <TrendChart words={wordCloudData}></TrendChart>
                </div>
        </div>
  );
}

