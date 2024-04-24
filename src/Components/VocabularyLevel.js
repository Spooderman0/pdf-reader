import React from 'react';

const VocabularyLevel = ({ level, setLevel }) => {
  return (
    <div className="bg-gray-600 text-white p-4 rounded-md shadow-lg max-w-xs mx-auto mt-6">
      <h6 className="text-lg font-bold text-center mb-2">Nivel de Vocabulario</h6>
      <div className="flex justify-center items-center">
        <input
          type="range"
          min="1"
          max="5"
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          className="w-full h-2 bg-blue-600 rounded-lg appearance-none cursor-pointer"
        />
      </div>
      <div className="text-center mt-2">
        {level}
      </div>
    </div>
  );
};

export default VocabularyLevel;