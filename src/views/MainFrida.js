import React from 'react';
import Navbar from '../Components/Navbar';
import ChatBot from '../Components/ChatBox';
import ConversationHistory from '../Components/ConversationHistory';

function MainFrida() {
  return (
    <div style={{ overflowY: 'hidden' }}> {/* Aquí establecemos overflowY: hidden para ocultar el scroll vertical */}
      <Navbar /> 
      <ChatBot onMessageSent={(message) => console.log(message)} /> 
      <ConversationHistory />
    </div>
  );
}

export default MainFrida;
