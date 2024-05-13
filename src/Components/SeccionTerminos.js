import React, { useState, useEffect } from 'react';
import terminosRelacionadosImg from '../Images/TerminosRelacionados.png'
import WordCloud from './WordCloud';
import { BACKEND_LINK } from '../utils/constants';
import TrendChart from './TrendChart';

export const  SeccionTerminos = ({wordCloudData, terms_defs}) => {

  console.log('terms and defs', terms_defs)

  return (
    <div className='flex flex-row'>
      <div className='flex flex-col justify-between basis-2/5 px-3' style={{height: "73dvh"}}>
        <div className="card px-3 py-2 bg-gray-100 border-0 shadow-md" style={{height: "35dvh"}}>
            <h6 className='font-medium'>Términos relacionados</h6>
            <div className="flex mt-1 justify-center">
                <img className='h-auto' style={{height: "25dvh"}} src={terminosRelacionadosImg} alt='terminos'/>
            </div>
        </div>
        <div className="card px-3 py-2 bg-gray-100 border-0 shadow-md" style={{ height: "35dvh" }}>
            <h6 className='font-medium'>Nube de palabras</h6>
            <WordCloud words={wordCloudData}/>
        </div>


      </div>
      <div className="flex flex-col justify-between basis-3/5 px-3" style={{height: "73dvh"}}>
          <div className="card px-3 py-2 bg-gray-100 border-0 shadow-md" style={{height: "35dvh", overflowY: "auto"}}>
              <h6 className='font-medium'>Hechos y definiciones</h6>
              <br/>
              {Object.entries(terms_defs).map(([term, definition], index) => (
              <p key={index}><b>{term}:</b><br/>{definition}</p>
              ))}
          </div>
          <div className="card px-3 py-2 bg-gray-100 border-0 shadow-md" style={{height: "35dvh"}} >
              <h6 className='font-medium'>Frecuencia de términos</h6>
              <TrendChart words={wordCloudData}></TrendChart>
          </div>
      </div>
    </div>
  );
} 

