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
    <div className="flex items-center h-screen justify-left"> {/* Adjusted to fill parent container */}
      <div className="absolute inset-0" style={{ marginLeft: '2rem', marginRight: '1350px', marginTop: '160px' }}> {/* Adjust for specific positioning */}
        <div className="container bg-gray-100 rounded-[12px] shadow-lg w-full h-full flex flex-col justify-start items-center overflow-y-auto overflow-x-hidden">
          <div className="text-black font-bold text-2xl mb-4 bg-gray-100" style={{ width: '100%', padding: '10px 0' }}>Conversation History</div>
          <Scrollbars autoHide>
            <div className='conversation-list mt-3'>
              {conversations.map((conversation, index) => (
                <div key={index} className="bg-gray-200 rounded-md p-4 mb-4 truncate">{conversation.title}</div>
              ))}
            </div>
          </Scrollbars>
        </div>
      </div>
    </div>
  );
};

export default ConversationHistory; 