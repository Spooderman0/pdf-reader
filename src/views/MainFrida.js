import React from 'react';
import ChatBox from '../Components/ChatBox';

export const  MainFrida = () => {
  return (
    <div>
      <ChatBox onMessageSent={(message) => console.log(message)} /> {/* Cambia console.log(message) por la función que deseas que maneje los mensajes enviados */}
    </div>
  );
}

export default MainFrida;
