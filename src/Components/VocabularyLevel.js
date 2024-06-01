import React from 'react';
import { BACKEND_LINK } from '../utils/constants';

const VocabularyLevel = ({ level, setLevel }) => {

  const handleChange = async (e) => {
    const newLevel = e.target.value;
    setLevel(newLevel);

    try {
      const response = await fetch(`${BACKEND_LINK}/vocab/${newLevel}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          "Access-Control-Allow-Origin": "*"
        },
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Optionally handle the response
      const data = await response.json();
      console.log('Vocabulary level set to:', data);
    } catch (error) {
      console.error('Error setting vocabulary level:', error);
    }
  };

  return (
    <div className="bg-gray-600 text-white p-4 rounded-md shadow-lg max-w-xs mx-auto mt-6">
      <h6 className="text-lg font-bold text-center mb-2">Nivel de Vocabulario</h6>
      <div className="flex justify-center items-center">
        <input
          type="range"
          min="1"
          max="5"
          value={level}
          onChange={handleChange}
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
