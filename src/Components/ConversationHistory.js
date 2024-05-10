import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';

const ConversationHistory = () => {

  const conversations = [
    { title: "Este un titulo como ejemplo para poder guardar la conversacion del chat" },
    { title: "Este un titulo como ejemplo para poder guardar la conversacion del chat" },
    { title: "Este un titulo como ejemplo para poder guardar la conversacio del chat" },
    { title: "Este un titulo como ejemplo para poder guardar la conversacion del chat" },
    { title: "Este un titulo como ejemplo para poder guardar la conversacion del chat" },
    { title: "Este un titulo como ejemplo para poder guardar la conversacion del chat" },
    { title: "Este un titulo como ejemplo para poder guardar la conversacion del chat" },
    { title: "Este un titulo como ejemplo para poder guardar la conversacion del chat" },
    { title: "Este un titulo como ejemplo para poder guardar la conversacion del chat" },
    { title: "Este un titulo como ejemplo para poder guardar la conversacion del chat" },
    { title: "Este un titulo como ejemplo para poder guardar la conversacion del chat" },
    { title: "Este un titulo como ejemplo para poder guardar la conversacion del chat" },
    { title: "Este un titulo como ejemplo para poder guardar la conversacion del chat" },
    { title: "Este un titulo como ejemplo para poder guardar la conversacion del chat" },
    { title: "Este un titulo como ejemplo para poder guardar la conversacion del chat" },
    { title: "Este un titulo como ejemplo para poder guardar la conversacion del chat" },
    { title: "Este un titulo como ejemplo para poder guardar la conversacion del chat" },
    
  ];
  return (
      <div className="container bg-gray-100 shadow-lg px-8 w-1/4 rounded-[12px] mx-3" style={{height: "73dvh"}}>
        <p class="text-xl font-bold py-3">Conversaciones</p>
        <div className="container bg-gray-400 rounded-[12px] border w-full h-full flex flex-col justify-start items-center" style={{height: "63dvh"}}>
          <Scrollbars autoHide>
            <div className='m-3'>
              {conversations.map((conversation, index) => (
                <div key={index} className="bg-gray-200 rounded-md p-4 mb-4 truncate">{conversation.title}</div>
              ))}
            </div>
          </Scrollbars>
        </div>
      </div>
  );
};

export default ConversationHistory; 