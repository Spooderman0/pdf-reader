import React, { useState } from 'react';

const AboutPage = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const questions = [
    {
      title: '¿Como funciona?',
      content: 'La aplicación utiliza inteligencia artificial para analizar el contenido del documento y proporcionar una interfaz de chat para que los usuarios hagan preguntas y obtengan respuestas.',
    },
    {
      title: '¿Es necesario crear una cuenta para usar la aplicacion?',
      content: 'Si, si es necesario crear una cuenta para usar la aplicacion, cabe recalcar que ya creando la cuenta no hay restricciones en este ni pagos para el uso de la pagina.',
    },
    {
      title: '¿Qué pasa si tengo una pregunta que la AI no puede responder?',
      content: 'Si la respuesta está en el documento cargado, es muy probable que la IA la proporcione. La IA está aprendiendo constantemente, por lo que si no tiene una respuesta, siempre puede reformular la pregunta o hacer una pregunta diferente..',
    },
    {
      title: '¿Puedo chatear con otros usuarios de la aplicación?',
      content: 'No, la interfaz de chat es únicamente para interactuar con el contenido del documento..',
    },
    {
      title: '¿Cuánto tiempo lleva desarrollar esta página?',
      content: 'El desarrollo de esta página tomó aproximadamente tres meses, desde la planificación inicial hasta el lanzamiento final. El proceso incluyó diseño, desarrollo, pruebas y optimización.',
    },
    {
      title: '¿Puedo subir varios documentos a la vez?',
      content: 'No, solo se puede cargar un documento a la vez. Pero esto será posible en el futuro..',
    },
    {
      title: '¿Puedo subir cualquier documento?',
      content: 'Por el momento solo admitimos un formato de documentos: ".pdf", dentro de un futuro se espera poder subir documentos: ".pdf", ".txt", ".ppt", ".pptx", ".csv", ".epub" y ".rtf.',
    },
    {
      title: '¿Puedo usar PDF Reader en cualquier dispositivo?',
      content: 'Sí, PDF Reader es accesible desde cualquier dispositivo con navegadores estándar y una conexión a Internet..',
    },
    {
      title: '¿Esta página ofrece servicios adicionales?',
      content: 'No, esta pagina no ofrece servicios adicionales de los que ya estan dentro de la pagina.',
    },
    {
      title: '¿Están seguros mis datos?',
      content: 'Absolutamente. La privacidad de los datos es nuestra máxima prioridad.',
    },
  ];

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="mx-auto mt-5">
      <div className="flex justify-center">
        <div className="w-1/2 px-4">
          {questions.slice(0, 5).map((question, index) => (
            <div key={index} className="border border-gray-300 rounded-lg mb-4">
              <h2
                className="cursor-pointer px-5 py-4 bg-gray-100 border-b border-gray-300 font-medium text-lg flex justify-between items-center"
                onClick={() => toggleAccordion(index)}
              >
                <span>{question.title}</span>
                <svg
                  className={`w-4 h-4 transition-transform transform ${
                    activeIndex === index ? 'rotate-180' : 'rotate-0'
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </h2>
              {activeIndex === index && (
                <div className="p-5 bg-gray-100">
                  <p>{question.content}</p>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="w-1/2 px-4">
          {questions.slice(5, 10).map((question, index) => (
            <div key={index} className="border border-gray-300 rounded-lg mb-4">
              <h2
                className="cursor-pointer px-5 py-4 bg-gray-100 border-b border-gray-300 font-medium text-lg flex justify-between items-center"
                onClick={() => toggleAccordion(index + 5)}
              >
                <span>{question.title}</span>
                <svg
                  className={`w-4 h-4 transition-transform transform ${
                    activeIndex === index + 5 ? 'rotate-180' : 'rotate-0'
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </h2>
              {activeIndex === index + 5 && (
                <div className="p-5 bg-gray-100">
                  <p>{question.content}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
