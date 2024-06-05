import React, { useState } from 'react';
import WordCloud from './WordCloud';
import { BACKEND_LINK } from '../utils/constants';
import TrendChart from './TrendChart';
import { FaExpand, FaCompress, FaSearchPlus, FaSearchMinus } from 'react-icons/fa'; // Importa iconos de zoom
import styled from 'styled-components';
import MindMap from './MindMap';
import { Scrollbars } from 'react-custom-scrollbars';
import mindMapData from '../data/mindMapData.json';

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
  ${(props) => props.expanded && `
    position: fixed;
    top: 62%;
    left: %;
    transform: translate(-20%, -50%);
    width: 70%;
    height: 55%;
    z-index: 1000;
    overflow: hidden;
  `}
`;

export const SeccionTerminos = ({ wordCloudData, terms_defs }) => {
  const [expandedCard, setExpandedCard] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);

  const handleExpandClick = (card) => {
    setExpandedCard(expandedCard === card ? null : card);
  };

  const handleZoomIn = () => {
    setZoomLevel(prevZoomLevel => Math.min(prevZoomLevel + 0.1, 3));
  };

  const handleZoomOut = () => {
    setZoomLevel(prevZoomLevel => Math.max(prevZoomLevel - 0.1, 0.5));
  };

  return (
    <div className='flex flex-row'>
      <div className='flex flex-col justify-between basis-2/5 px-3 mx-3' style={{ height: "73dvh", marginLeft: '10%' }}>
        <Card expanded={expandedCard === 'termRelacionados'} className="card" style={{ height: expandedCard === 'termRelacionados' ? 'auto' : "83dvh" }}>
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
            <MindMap data={mindMapData} zoomLevel={zoomLevel} />
          </div>
        </Card>
      </div>

      <div className="flex flex-col basis-2/5 mx-3" style={{ height: "73dvh" }}>
        <div className="flex justify-between mb-8" style={{ height: "50%", marginRight: '7%' }}>
          <Card expanded={expandedCard === 'hechosDefiniciones'} className="card" style={{ height: expandedCard === 'hechosDefiniciones' ? 'auto' : "35dvh", overflow: 'hidden', width: '100%' }}>
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
        <div className="flex justify-between" style={{ height: "50%" }}>
          <Card expanded={expandedCard === 'card3'} className="card" style={{ height: expandedCard === 'card3' ? 'auto' : "100%", marginRight: '5%', width: '45%' }}>
            <div className="flex justify-between items-center">
              <h6 className='font-medium'>Card 3</h6>
              {expandedCard === 'card3' ? (
                <IconWrapperCompress onClick={() => handleExpandClick('card3')} />
              ) : (
                <IconWrapperExpand onClick={() => handleExpandClick('card3')} />
              )}
            </div>
          </Card>
          <Card expanded={expandedCard === 'card4'} className="card" style={{ height: expandedCard === 'card4' ? 'auto' : "100%", marginRight: '7%', width: '45%' }}>
            <div className="flex justify-between items-center">
              <h6 className='font-medium'>Card 4</h6>
              {expandedCard === 'card4' ? (
                <IconWrapperCompress onClick={() => handleExpandClick('card4')} />
              ) : (
                <IconWrapperExpand onClick={() => handleExpandClick('card4')} />
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SeccionTerminos;
