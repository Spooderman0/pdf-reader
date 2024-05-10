import React from 'react';
import ChatBox from '../Components/ChatBox';
import ConversationHistory from '../Components/ConversationHistory';

function MainFrida() {



  return (
    <div style={{height: "90dvh"}}> {/* Aquí establecemos overflowY: hidden para ocultar el scroll vertical */}
      <ChatBox onMessageSent={(message) => console.log(message)} /> 
      <ConversationHistory />
    </div>
  );
}

export default MainFrida;
