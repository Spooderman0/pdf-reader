import React, { useState, useEffect } from 'react';
import WordCloud from './WordCloud';
import { BACKEND_LINK } from '../utils/constants';
import TrendChart from './TrendChart';
import { FaExpand, FaCompress, FaSearchPlus, FaSearchMinus  } from 'react-icons/fa';
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

const IconWrapperZoomIn = styled(FaSearchPlus)`
  color: #a0a0a0;
  transition: color 0.3s ease;
  &:hover {
    color: #000000;
  }
`;

const IconWrapperZoomOut = styled(FaSearchMinus)`
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


export const SeccionTerminos3 = ({ wordCloudData, terms_defs }) => {
  const [expandedCard, setExpandedCard] = useState(null);
  //cambios emi 1
  const [zoomLevel, setZoomLevel] = useState(1);
  const [mindMapDimensions, setMindMapDimensions] = useState({ width: 500, height: 500 });


  const handleExpandClick = (card) => {
    setExpandedCard(expandedCard === card ? null : card);
    //cambios emi 2
    setMindMapDimensions(expandedCard === card ? { width: 500, height: 73 } : { width: 800, height: 800 })
  };


  //cambios emi 3
  const handleZoomIn = () => {
    setZoomLevel(prevZoomLevel => Math.min(prevZoomLevel + 0.1, 3));
  };

  const handleZoomOut = () => {
    setZoomLevel(prevZoomLevel => Math.max(prevZoomLevel - 0.1, 0.5));
  };


  return (
    <div className='flex flex-row'>
      <div className='flex flex-col justify-between basis-2/5 px-3 mx-3' style={{ height: "73dvh", marginLeft: '10%' }}>
        {/* Terminos relacionados antes de emi (por cualquier cosa) */}
        {/*<Card expanded={expandedCard === 'termRelacionados'} className="card" style={{ height: expandedCard === 'termRelacionados' ? '80dvh' : "74dvh", boxShadow: expandedCard === 'termRelacionados' ? '0px 0px 15px 4px rgba(0,0,0,0.59)': '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
          <div className="flex justify-between items-center">
            <h6 className='font-medium'>Términos relacionados</h6>
            {expandedCard === 'termRelacionados' ? (
              <IconWrapperCompress onClick={() => handleExpandClick('termRelacionados')} />
            ) : (
              <IconWrapperExpand onClick={() => handleExpandClick('termRelacionados')} />
            )}
          </div>
          <div className="flex mt-1 justify-center">
            <MindMap data={mindMapData} />
          </div>
        </Card>*/}
        <Card expanded={expandedCard === 'termRelacionados'} className="card" style={{ height: expandedCard === 'termRelacionados' ? '80dvh' : "74dvh" , boxShadow: expandedCard === 'termRelacionados' ? '0px 0px 15px 4px rgba(0,0,0,0.59)': '0 4px 6px rgba(0, 0, 0, 0.1)'}}>
          <div className="flex justify-between items-center">
            <h6 className='font-medium'>Términos relacionados</h6>
            <div className="flex items-center">
              <IconWrapperZoomIn onClick={handleZoomIn} style={{ marginRight: '10px' }} />
              <IconWrapperZoomOut onClick={handleZoomOut} style={{ marginRight: '10px' }} />
              {expandedCard === 'termRelacionados' ? (
                <IconWrapperCompress onClick={() => handleExpandClick('termRelacionados')} />
              ) : (
                <IconWrapperExpand onClick={() => handleExpandClick('termRelacionados')} />
              )}
            </div>
          </div>
          <div className="flex mt-1 justify-center" style={{ height: '100%' }}>
            <MindMap data={mindMapData} zoomLevel={zoomLevel} width={mindMapDimensions.width} height={mindMapDimensions.height} />
          </div>
        </Card>
      </div>


      <div className="flex flex-col justify-between basis-2/5 px-3 mx-3" style={{ marginRight: '10%',  height: "74dvh" }}>
          <Card expanded={expandedCard === 'nubePalabras'} className="card" style={{ height: expandedCard === 'nubePalabras' ? '60dvh' : "20dvh", width: expandedCard === 'nubePalabras' ? '80dvh' : "auto", boxShadow: expandedCard === 'nubePalabras' ? '0px 0px 15px 4px rgba(0,0,0,0.59)': '0 4px 6px rgba(0, 0, 0, 0.1)'}}>
            <div className="flex justify-between items-center">
              <h6 className='font-medium'>Nube de palabras</h6>
              {expandedCard === 'nubePalabras' ? (
                <IconWrapperCompress onClick={() => handleExpandClick('nubePalabras')} />
              ) : (
                <IconWrapperExpand onClick={() => handleExpandClick('nubePalabras')} />
              )}
            </div>
            <WordCloudContainer expanded={expandedCard === 'nubePalabras'}>
              <WordCloud words={wordCloudData} className="w-full h-full"/>
            </WordCloudContainer>
          </Card>


          <Card expanded={expandedCard === 'hechosDefiniciones'} className="card" style={{ height: expandedCard === 'hechosDefiniciones' ? '80dvh' : "15dvh", overflow: 'hidden', width: expandedCard === 'hechosDefiniciones' ? '120dvh' : "auto", boxShadow: expandedCard === 'hechosDefiniciones' ? '0px 0px 15px 4px rgba(0,0,0,0.59)': '0 4px 6px rgba(0, 0, 0, 0.1)'}}>
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


          <Card expanded={expandedCard === 'frecuenciaTerminos'} className="card" style={{ height: expandedCard === 'frecuenciaTerminos' ? '60dvh' : "33dvh", width: expandedCard === 'frecuenciaTerminos' ? '90dvh' : "auto", boxShadow: expandedCard === 'frecuenciaTerminos' ? '0px 0px 15px 4px rgba(0,0,0,0.59)': '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
            <div className="flex justify-between items-center">
              <h6 className='font-medium'>Frecuencia de términos</h6>
              {expandedCard === 'frecuenciaTerminos' ? (
                <IconWrapperCompress onClick={() => handleExpandClick('frecuenciaTerminos')} />
              ) : (
                <IconWrapperExpand onClick={() => handleExpandClick('frecuenciaTerminos')} />
              )}
            </div>
            <div className='flex justify-center items-center flex-grow h-full'>
              <TrendChart words={wordCloudData}></TrendChart>
            </div>
           
          </Card>
      </div>
    </div>
  );
};


export default SeccionTerminos3;
