import React, { useState } from 'react';
import GridLayout from 'react-grid-layout';
import terminosRelacionadosImg from '../Images/TerminosRelacionados.png';
import WordCloud from './WordCloud';
import TrendChart from './TrendChart';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

export const SeccionTerminos = ({ wordCloudData, terms_defs }) => {
  const layout = [
    { i: '1', x: 0, y: 0, w: 1, h: 1 },
    { i: '2', x: 1, y: 0, w: 1, h: 1 },
    { i: '3', x: 0, y: 1, w: 1, h: 1 },
    { i: '4', x: 1, y: 1, w: 1, h: 1 },
  ];

  return (
    <GridLayout
      className="layout"
      layout={layout}
      cols={2}
      rowHeight={300}
      width={1200}
      margin={[30, 30]}
      //Margin left
      style={{ marginLeft: "8%" }}
      
    >
      <div key="1" className="card px-3 py-2 bg-gray-100 border-0 shadow-md">
        <h6 className="font-medium">Términos relacionados</h6>
        <div className="flex mt-1 justify-center">
          <img className="h-auto" style={{ height: "25dvh" }} src={terminosRelacionadosImg} alt="terminos" />
        </div>
      </div>
      <div key="2" className="card px-3 py-2 bg-gray-1020 border-0 shadow-md">
        <h6 className="font-medium">Nube de palabras</h6>
        <WordCloud words={wordCloudData} />
      </div>
      <div key="3" className="card px-3 py-2 bg-gray-100 border-0 shadow-md" style={{height: "35dvh", overflowY: "auto"}}>
        <h6 className="font-medium">Hechos y definiciones</h6>
        <br/>
        {terms_defs && Object.entries(terms_defs).map(([term, definition], index) => (
            <p key={index}><b>{term}:</b><br/>{definition}<br/><br></br></p>
        ))}
      </div>
      <div key="4" className="card px-3 py-2 bg-gray-100 border-0 shadow-md">
        <h6 className="font-medium">Frecuencia de términos</h6>
        <TrendChart words={wordCloudData} />
      </div>
    </GridLayout>
  );
};

export default SeccionTerminos;
