import React, { useState, useRef, useEffect } from 'react';

function ChatBox({ onMessageSent }) {
  const [message, setMessage] = useState('');
  const [conversation, setConversation] = useState([]);

  const conversationEndRef = useRef(null);

  const handleSubmitQuery = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    try {

        setConversation(prevConversation => [...prevConversation, { owner: "User", message: message }]);

        // const response = await fetch(`https://httpsflaskexample-2qaksr7roa-uc.a.run.app/chatbot/${message}`, {
        const response = await fetch(`https://httpsflaskexample-2qaksr7roa-uc.a.run.app/chatbot/${message}`, {
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
        setConversation(prevConversation => [...prevConversation, { owner: "AI", message: data["respuestaAI"] }]);
    } catch (error) {
        console.error('Error fetching data:', error);
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
        </div>
      </div>
    </div>
  );
}

export default ChatBox;