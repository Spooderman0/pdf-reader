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
    <div className="relative h-32 w-32">
      <div className="absolute inset-y-0 left-0 w-16" style={{ marginTop: '-510px' }}>
        <div className="container bg-gray-100 rounded-[12px] shadow-lg lg:w-[350px] lg:h-[760px] flex flex-col justify-start items-center overflow-y-auto overflow-x-hidden">
          <div className="text-black font-bold text-2xl mb-4 bg-gray-100" style={{position: 'center', top: 0, width: '100%', zIndex: 1, padding: '10px 0', marginLeft:'100px' }}>Conversation History</div>
          <Scrollbars autoHide>
            <div className=' conversation-list mt-3' style={{marginLeft:'58px'}}>
                {conversations.map((conversation, index) => (
                  <div key={index} className="bg-gray-200 rounded-md p-4 mb-4 w-56 truncate">{conversation.title}</div>
                ))}
              </div>
          </Scrollbars>
        </div>
      </div>
    </div>
  );
};

export default ConversationHistory; 