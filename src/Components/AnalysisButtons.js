import React from 'react';
import 'tailwindcss/tailwind.css';

export const AnalysisButtons = ({ setCurrentSection, currentSection }) => {
  const sections = [
    { id: 'indice', label: 'ANÁLISIS' },
    { id: 'terminos', label: 'TÉRMINOS' },
    { id: 'figuras', label: 'FIGURAS' },
    { id: 'frida', label: 'FRIDA' },
  ];

  const buttonStyles = "focus:outline-none font-medium rounded-3xl px-5 py-2.5 me-2 mb-2";

  return (
    <div className="container w-full flex justify-between px-0 items-center" style={{ height: "15dvh" }}>
      {sections.map(section => (
        <button
          key={section.id}
          onClick={() => setCurrentSection(section.id)}
          className={`${buttonStyles} ${currentSection === section.id ? "bg-gray-300" : "bg-gray-100"}`}
        >
          {section.label}
        </button>
      ))}
    </div>
  );
}

export default AnalysisButtons;
