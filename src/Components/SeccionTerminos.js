import React, { useState, useEffect } from 'react';
import WordCloud from './WordCloud';
import { BACKEND_LINK } from '../utils/constants';
import TrendChart from './TrendChart';
import { FaExpand,FaCompress } from 'react-icons/fa';
import styled from 'styled-components'; // Importa styled-components
import MindMap from './MindMap'; // Importa el componente MindMap


const IconWrapperExpand = styled(FaExpand)`

  color: #a0a0a0;
  transition: color 0.3s ease;

  &:hover {
    color: #000000;
  }
`;

const IconWrapperCompress = styled(FaCompress)`
  color: #a0a0a0;
  transition: color 0.3s ease;

  &:hover {
    color: #000000;
  }
`;

const Card = styled.div`
  background: #f7fafc;
  padding: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 0.5rem;
  transition: all 0.3s ease;
  ${(props) => props.expanded && `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 70vw; /* Ajusta este tamaño según tus necesidades */
    height: 85vh; /* Ajusta este tamaño según tus necesidades */
    z-index: 1000;
    overflow: auto;
  `}
`;

export const SeccionTerminos = ({ wordCloudData, terms_defs }) => {
  const [expandedCard, setExpandedCard] = useState(null);

  const handleExpandClick = (card) => {
    setExpandedCard(expandedCard === card ? null : card);
  };

   // Estructura de datos para el mapa mental
   const mindMapData = {
    nodes: [
      { id: 'react', text: 'React' },
      { id: 'tailwind', text: 'Tailwind CSS' },
      // Más nodos aquí...
    ],
    connections: [
      { source: 'react', target: 'hooks' },
      { source: 'react', target: 'jsx' },
      // Más conexiones aquí...
    ]
  };

  const terms = [
    { id: 'react', text: 'React' },
    { id: 'tailwind', text: 'Tailwind CSS' },
    { id: 'hooks', text: 'Hooks', target: 'react' },
    { id: 'jsx', text: 'JSX', target: 'react' },
    { id: 'components', text: 'Components', target: 'react' },
  ];


  return (
    <div className='flex flex-row'>
      <div className='flex flex-col justify-between basis-2/5 px-3' style={{ height: "73dvh" }}>
        <Card expanded={expandedCard === 'termRelacionados'} className="card" style={{ height: expandedCard === 'termRelacionados' ? 'auto' : "35dvh" }}>
          <div className="flex justify-between items-center">
            <h6 className='font-medium'>Términos relacionados</h6>
            {expandedCard === 'termRelacionados' ? (
              <IconWrapperCompress onClick={() => handleExpandClick('termRelacionados')} />
            ) : (
              <IconWrapperExpand onClick={() => handleExpandClick('termRelacionados')} />
            )}
          </div>
          <div className="flex mt-1 justify-center">
          <MindMap terms={mindMapData.nodes} connections={mindMapData.connections} />
          </div>
        </Card>
        <Card expanded={expandedCard === 'nubePalabras'} className="card" style={{ height: expandedCard === 'nubePalabras' ? 'auto' : "35dvh" }}>
          <div className="flex justify-between items-center">
            <h6 className='font-medium'>Nube de palabras</h6>
            {expandedCard === 'nubePalabras' ? (
              <IconWrapperCompress onClick={() => handleExpandClick('nubePalabras')} />
            ) : (
              <IconWrapperExpand onClick={() => handleExpandClick('nubePalabras')} />
            )}
          </div>
          <WordCloud words={wordCloudData} />
        </Card>
      </div>
      <div className="flex flex-col justify-between basis-3/5 px-3" style={{ height: "73dvh" }}>
        <Card expanded={expandedCard === 'hechosDefiniciones'} className="card" style={{ height: expandedCard === 'hechosDefiniciones' ? 'auto' : "35dvh", overflowY: "auto" }}>
          <div className="flex justify-between items-center">
            <h6 className='font-medium'>Hechos y definiciones</h6>
            {expandedCard === 'hechosDefiniciones' ? (
              <IconWrapperCompress onClick={() => handleExpandClick('hechosDefiniciones')} />
            ) : (
              <IconWrapperExpand onClick={() => handleExpandClick('hechosDefiniciones')} />
            )}
          </div>
          <br />
          {terms_defs && Object.entries(terms_defs).map(([term, definition], index) => (
            <p key={index}><b>{term}:</b><br />{definition}</p>
          ))}
        </Card>
        <Card expanded={expandedCard === 'frecuenciaTerminos'} className="card" style={{ height: expandedCard === 'frecuenciaTerminos' ? 'auto' : "35dvh" }}>
          <div className="flex justify-between items-center">
            <h6 className='font-medium'>Frecuencia de términos</h6>
            {expandedCard === 'frecuenciaTerminos' ? (
              <IconWrapperCompress onClick={() => handleExpandClick('frecuenciaTerminos')} />
            ) : (
              <IconWrapperExpand onClick={() => handleExpandClick('frecuenciaTerminos')} />
            )}
          </div>
          <TrendChart words={wordCloudData}></TrendChart>
        </Card>
      </div>
    </div>
  );
}

export default SeccionTerminos;
