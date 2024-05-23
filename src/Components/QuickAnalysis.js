import React from 'react';
import { useLocation } from "react-router-dom";
import 'tailwindcss/tailwind.css';
import { SeccionAnalisis } from '../Components/SeccionAnalisis';

const QuickAnalysis = () => {
  const location = useLocation();
  const analysisData = location.state?.analysisData || {};

  const title = analysisData.Title || 'Cargando...';
  const cleanTitle = title.split('.').slice(0, -1).join('.');

  return (
    <div className="bg-white w-full flex flex-col" style={{ height: '90vh' }}>
      <div className='flex flex-row'>
        <div className='basis-2/5 items-center flex px-3' style={{ height: '15dvh', marginLeft: '10%' }}>
          <h4 className="mb-4 text-4xl font-bold">{cleanTitle}</h4>
        </div>
      </div>
      <div>
        <SeccionAnalisis
          docURL={analysisData.Storage_URL}
          summary={analysisData.Abstract}
          raw_text={analysisData.Text}
        />
      </div>
    </div>
  );
}

export default QuickAnalysis;
