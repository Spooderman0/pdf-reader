import React, { useState, useRef, useEffect } from 'react';
import { BACKEND_LINK } from '../utils/constants';
import { VscRobot, VscEmptyWindow } from "react-icons/vsc";
import { CiUser } from "react-icons/ci";
import { MdPostAdd } from "react-icons/md";



export const Chatbox = ({ docId, currentConversation }) => {
  const [message, setMessage] = useState('');
  const [conversation, setConversation] = useState([]);
  const [messageIsLoading, setMessageIsLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  const conversationEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (currentConversation) {
      setInitialLoading(true);
      getConversation();
    } else {
      setConversation([]);
    }
    console.log(`Current conv: ${currentConversation}`)
  }, [currentConversation]);

  useEffect(() => {
    scrollToBottom();
  }, [conversation, messageIsLoading]);

  const handleSubmitQuery = async (event) => {
    event.preventDefault();
    if(message){

      const userMessage = message;
      const newMessage = { owner: "Usuario", message: userMessage };
      setConversation((prevConversation) => [...prevConversation, newMessage]);
      setMessage('');
      setMessageIsLoading(true);

      try {
        const response = await fetch(`${BACKEND_LINK}/user_id/chatbot/${docId}/${currentConversation["id"]}/${userMessage}`, {
          method: 'GET',
          headers: {
            "Access-Control-Allow-Origin": "*"
          },
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('La respuesta de la red no fue correcta');
        }

        const data = await response.json();
        await getConversation(data.message);
      } catch (error) {
        setMessageIsLoading(false);
        console.error('Error al obtener los datos:', error);
      }
    }

  };

  const getConversation = async (messageToType) => {
    try {
      const response = await fetch(`${BACKEND_LINK}/user_id/chatbot/${docId}/conversation/${currentConversation["id"]}`, {
        method: 'GET',
        headers: {
          "Access-Control-Allow-Origin": "*"
        },
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Network response was not ok while getting conversation');
      }

      const data = await response.json();
      if (messageToType) {
        simulateTypingEffect(messageToType, data.conversation);
      } else {
        setConversation(data.conversation);
        setInitialLoading(false);
        setMessageIsLoading(false); // Asegurarnos de cambiar el estado aquí también
      }
    } catch (error) {
      console.error('Error fetching conversation:', error);
      setInitialLoading(false);
      setMessageIsLoading(false); // Asegurarnos de cambiar el estado aquí también
    }
  };

  const simulateTypingEffect = (text, prevConversation) => {
    if (!text) {
      setMessageIsLoading(false); // Detener el estado de carga si el texto es undefined
      return;
    }

    let index = 0;
    const interval = setInterval(() => {
      setConversation((prevConv) => {
        const lastMessage = prevConv[prevConv.length - 1];
        if (lastMessage && lastMessage.owner === "ChatBot") {
          lastMessage.message += text.charAt(index);
        } else {
          prevConv.push({ owner: "ChatBot", message: text.charAt(index) });
        }
        return [...prevConv];
      });
      index++;
      if (index >= text.length) {
        clearInterval(interval);
        setMessageIsLoading(false);
      }
    }, 50);
  };

  const scrollToBottom = () => {
    conversationEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const adjustTextareaHeight = () => {
    const input = inputRef.current;
    if (input) {
      input.style.height = "auto";
      input.style.height = Math.min(input.scrollHeight, 200) + "px";
    }
  };

  return (
    <div className="container bg-gray-100 rounded-[12px] shadow-lg flex flex-col w-3/4 p-2 basis-3/4">
      { currentConversation ? (
        <>
          <div className="text-black font-bold text-xl mb-2">Asistente con IA</div>
          <div className="overflow-auto border border-gray-300 rounded-md w-full p-2" style={{ height: "53dvh" }}>
            {initialLoading ? (
              <div className="flex justify-center items-center h-full">
                <svg aria-hidden="true" className="w-1/6 inline animate-spin text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                </svg>
              </div>
            ) : (
              conversation && conversation.map((msg, index) => (
                <div key={index} className={`mb-2 flex ${msg.owner === "Usuario" ? "justify-end" : "justify-start"}`}>
                  <div className={`rounded-lg p-2 ${msg.owner === "Usuario" ? "bg-blue-200 text-black" : "bg-green-200 text-black"}`} style={{ maxWidth: "50dvw" }}>
                    {msg.owner === "Usuario" ?
                      <span className='flex flex-row items-center font-bold'>Usuario  <CiUser className='mx-2' /></span>
                      :
                      <span className='flex flex-row items-center font-bold'>ChatBot  <VscRobot className='mx-2' /></span>}
                    {msg.message}
                  </div>
                </div>
              ))
            )}
            <div ref={conversationEndRef}></div>
          </div>
          <div className="flex justify-between items-end px-2 py-2 bg-white rounded-lg mt-4">
            <textarea
              rows={1}
              placeholder="Haz una pregunta..."
              className="flex-grow p-2 border rounded-md outline-none resize-none"
              value={message}
              ref={inputRef}
              onChange={(e) => {
                setMessage(e.target.value);
                adjustTextareaHeight();
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmitQuery(e);
                }
              }}
            />
            <button
              className="ml-2 px-6 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition-colors"
              onClick={handleSubmitQuery}
            >
              {messageIsLoading ? (
                <div role="status">
                  <svg aria-hidden="true" className="inline w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                  </svg>
                </div>
              ) : (
                <p>Enviar</p>
              )}
            </button>
          </div>
        
        </>
      ) : (
        <div className='flex flex-col items-center justify-center' style={{height: "100%", width: "100%"}}>
            <MdPostAdd className='text-gray-500 items-center' style={{height: "40dvh", width: "40dvw"}} />
            <p className='text-gray-500 font-bold'>
              Sin conversaciones registradas
            </p>
        </div>
      )}
    </div>
  );
};

export default Chatbox;
