import React, { useState, useEffect } from 'react';
import WordCloud from './WordCloud';
import { BACKEND_LINK } from '../utils/constants';
import TrendChart from './TrendChart';
import { FaExpand, FaCompress } from 'react-icons/fa';
import styled from 'styled-components'; // Importa styled-components
import MindMap from './MindMap'; // Importa el componente MindMap
import { Scrollbars } from 'react-custom-scrollbars'; // Importa Scrollbars
import mindMapData from '../data/mindMapData.json'; // Importa el archivo JSON


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
  display: flex;
  flex-direction: column;
  position: relative; /* Agregado */
  ${(props) => props.expanded && `
    top: 55px; /* Movido aquí */
    position: fixed;
    top: 55%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: ${props => (props.expanded ? '90vw' : '50vw')};
    height: ${props => (props.expanded ? '90vh' : '50vh')};
    z-index: 1000;
    overflow: hidden;
  `}
`;

const WordCloudContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  ${(props) => props.expanded && `
    height: 100%;
    width: 100%;
  `}
`;

export const SeccionTerminos2 = ({ wordCloudData, terms_defs }) => {
  const [expandedCard, setExpandedCard] = useState(null);

  const handleExpandClick = (card) => {
    setExpandedCard(expandedCard === card ? null : card);
  };

  return (
    <div className='flex flex-row'>
      <div className='flex flex-col justify-between basis-2/5 px-3 mx-3' style={{ height: "73dvh", marginLeft: '10%' }}>
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

          <Card expanded={expandedCard === 'nubePalabras'} className="card" style={{ height: expandedCard === 'nubePalabras' ? 'auto' : "35dvh" }}>
            <div className="flex justify-between items-center">
              <h6 className='font-medium'>Nube de palabras</h6>
              {expandedCard === 'nubePalabras' ? (
                <IconWrapperCompress onClick={() => handleExpandClick('nubePalabras')} />
              ) : (
                <IconWrapperExpand onClick={() => handleExpandClick('nubePalabras')} />
              )}
            </div>
            <WordCloudContainer expanded={expandedCard === 'nubePalabras'}>
              <WordCloud words={wordCloudData} />
            </WordCloudContainer>
          </Card>
      </div>

      <div className="flex flex-col basis-3/5 mx-3" style={{ marginRight: '10%' }}>
        <div className="flex flex-col mb-3" style={{ height: "60%" }}>
          
          <Card expanded={expandedCard === 'hechosDefiniciones'} className="card flex" style={{ height: expandedCard === 'hechosDefiniciones' ? 'auto' : "120dvh" }}>
            <div className="flex justify-between items-center">
              <h6 className='font-medium'>Hechos y definiciones</h6>
              {expandedCard === 'hechosDefiniciones' ? (
                <IconWrapperCompress onClick={() => handleExpandClick('hechosDefiniciones')} />
              ) : (
                <IconWrapperExpand onClick={() => handleExpandClick('hechosDefiniciones')} />
              )}
            </div>
            <br />
            <div style={{ height: expandedCard === 'hechosDefiniciones' ? '60vh' : 'calc(100% - 2rem)', overflow: 'hidden' }}>
              <Scrollbars autoHide style={{ height: '100%' }}>
                <div className="p-2">
                  {terms_defs && Object.entries(terms_defs).map(([term, definition], index) => (
                    <p key={index}><b>{term}:</b><br />{definition}</p>
                  ))}
                </div>
              </Scrollbars>
            </div>
          </Card>
        </div>
        <div className="flex flex-col" style={{ height: "40%" }}>
          
        </div>
      </div>
    </div>
  );
};

export default SeccionTerminos2;