import React, { useState, useRef, useEffect } from 'react';

export const Chatbox = ({ onMessageSent, docId }) => {
  const [message, setMessage] = useState('');
  const [conversation, setConversation] = useState([]);

  const conversationEndRef = useRef(null);

    // Hacer scroll hacia abajo cada vez que la conversación se actualiza
  useEffect(() => {
    getConversation();
  }, [message]);

  const handleSubmitQuery = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    try {
        setConversation(prevConversation => [...prevConversation, { owner: "Usuario", message: message }]);

        const response = await fetch(`https://frida-backend.onrender.com/U1/chatbot/${docId}/${message}`, {
        // const response = await fetch(`http://127.0.0.1:5000/U1/chatbot/${docId}/${message}`, {
            method: 'GET',

        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setConversation(prevConversation => [...prevConversation, { owner: "AI", message: data["respuestaAI"] }]);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
  };

  const getConversation = async () => {
    try {
        const response = await fetch(`https://frida-backend.onrender.com/U1/chatbot/${docId}/conversation`, {
        // const response = await fetch(`http://127.0.0.1:5000/U1/chatbot/${docId}/conversation`, {
            method: 'GET',
        });
        
        if (!response.ok) {
          throw new Error('Network response was not ok while getting conversation');
        }
        
        const data = await response.json();
        setConversation(data.conversation)
    } catch (error) {
        console.error('Error fetching conversation:', error);
    }
};



  const scrollToBottom = () => {
    conversationEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Hacer scroll hacia abajo cada vez que la conversación se actualiza
  useEffect(() => {
    scrollToBottom();
  }, [conversation]);

  return (
    <div className="flex items-center h-screen justify-end">
      <div className="container mx-auto bg-gray-100 rounded-[12px] shadow-lg h-dvh p-8 flex flex-col" style={{ width: '100dvw', height: '90dvh', margin: '10px', marginTop: "40dvh" }}>
        <div className="text-black font-bold text-4xl mb-4">AI Chat Helper</div>
        {/* Contenedor para mostrar la conversación */}
        <div className="flex-grow overflow-auto border border-gray-300 rounded-md p-4">
          {conversation.map((msg, index) => (
            <div key={index} className={`message mb-2 ${msg.owner === "Usuario" ? "text-left" : "text-right"}`}>
              <div className={`bg-${msg.owner === "Usuario" ? "blue-200" : "green-200"} text-${msg.owner === "Usuario" ? "blue-600" : "green-600"} rounded-lg p-2`} style={{ maxWidth: "80%", margin: "auto" }}>
                {msg.owner === "Usuario" && (
                  <span>Usuario: </span>
                )}
                {msg.owner === "AI" && (
                  <span>ChatBot: </span>
                )}
                {msg.message}
              </div>
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
            // onKeyDown={handleKeyDown}
          />
          <button 
            className="ml-2 px-6 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition-colors"
            onClick={handleSubmitQuery}
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chatbox;
