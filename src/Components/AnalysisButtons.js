import React from 'react';
import 'tailwindcss/tailwind.css';

export const AnalysisButtons = ({ setCurrentSection, currentSection, hasFigures }) => {
  const sections = [
    { id: 'indice', label: 'ANÁLISIS' },
    { id: 'terminos', label: 'TÉRMINOS' },
    { id: 'figuras', label: 'FIGURAS' },
    { id: 'frida', label: 'FRIDA' },
  ];

  const buttonStyles = "focus:outline-none font-medium rounded-3xl px-5 py-2.5 me-1 mb-1"; 

  return (
    <div className="container w-full flex justify-between px-0 items-center space-x-2" style={{ height: "15dvh" }}>
      {sections.map(section => {
        // If the section is 'figuras' and hasFigures is false, do not render the button
        if (section.id === 'figuras' && !hasFigures) {
          return null;
        }
        return (
          <button
            key={section.id}
            onClick={() => setCurrentSection(section.id)}
            className={`${buttonStyles} ${currentSection === section.id ? "bg-gray-300" : "bg-gray-100"}`}
          >
            {section.label}
          </button>
        );
      })}
    </div>
  );
}

export default AnalysisButtons;
