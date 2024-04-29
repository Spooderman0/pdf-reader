import React from 'react';
import ChatBot from '../Components/ChatBox';
import ConversationHistory from '../Components/ConversationHistory';

function MainFrida() {
  return (
    <div style={{ overflowY: 'hidden' }}> {/* Aquí establecemos overflowY: hidden para ocultar el scroll vertical */}

      <ChatBot onMessageSent={(message) => console.log(message)} /> 
      <ConversationHistory />
    </div>
  );
}

export default MainFrida;
