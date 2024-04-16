import React, { useState, useRef, useEffect } from 'react';

export const Chatbox = ({ onMessageSent }) => {
  const [message, setMessage] = useState('');
  const [conversation, setConversation] = useState([]);
  const [responseData, setResponseData] = useState("")

  const conversationEndRef = useRef(null);

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    try {
        const response = await fetch('https://httpsflaskexample-2qaksr7roa-uc.a.run.app/chatbot/When was the american continent discovered?', {
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin':  '*',
                'Content-Type': 'application/json',
                // Add any additional headers if needed
            },
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log(data);
        setResponseData(data); // Update state with response data
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};



  const sendMessage = () => {
    if (message.trim() === '') {
      // No enviamos mensajes vacíos
      return;
    }

    // Simulamos una respuesta del servidor por ahora
    const fakeResponse = `Respuesta a "${message}"`; 

    // Actualizamos la conversación con el nuevo mensaje enviado y la respuesta simulada
    setConversation(prevConversation => [...prevConversation, { user: message, bot: fakeResponse }]);

    // Llamamos a la función que maneja los mensajes enviados
    if (onMessageSent) {
      onMessageSent(message);
    }

    // Limpiamos el campo de mensaje después de enviar
    setMessage('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Evita que se envíe el formulario
      sendMessage();
    }
  };

  // Esta función hace scroll hacia abajo para mostrar el último mensaje
  const scrollToBottom = () => {
    conversationEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Hacer scroll hacia abajo cada vez que la conversación se actualiza
  useEffect(() => {
    scrollToBottom();
  }, [conversation]);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="container mx-auto bg-gray-100 rounded-[12px] shadow-lg p-8 lg:w-[1000px] lg:h-[800px] flex flex-col">
        <div className="text-black font-bold text-4xl mb-4">AI Chat Helper</div>
        {/* Contenedor para mostrar la conversación */}
        <div className="flex-grow overflow-auto border border-gray-300 rounded-md p-4">
          {conversation.map((msg, index) => (
            <div key={index} className="message mb-2">
              {msg.user && (
                <div className="text-right">
                  <div className="text-blue-600" style={{ maxWidth: "100%" }}>Tú: {msg.user}</div>
                </div>
              )}
              {msg.bot && (
                <div className="text-left">
                  <div className="text-green-600" style={{ maxWidth: "100%" }}>ChatBot: {msg.bot}</div>
                </div>
              )}
            </div>
          ))}
          {/* Este elemento se utiliza para hacer scroll hacia abajo */}
          <div ref={conversationEndRef}></div>
        </div>
        {/* Campo de texto para escribir el mensaje */}
        <div className="flex justify-between items-end px-4 py-2 bg-white rounded-lg mt-4">
          <textarea 
            rows={1} 
            placeholder="Escribe tu mensaje..." 
            className="flex-grow border border-gray-300 rounded-md outline-none p-2 resize-none" 
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button 
            className="ml-2 px-6 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition-colors"
            onClick={sendMessage}
          >
            Enviar
          </button>
          <button 
            className="ml-2 px-6 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition-colors"
            onClick={handleSubmit}
          >
            API
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chatbox;