import React from 'react';
import Navbar from '../Components/Navbar'; // Ajusta la ruta según la ubicación real de Navbar.js
import ChatBot from '../Components/ChatBox'; // Ajusta la ruta según la ubicación real de ChatBot.js

function MainFrida() {
  return (
    <div>
      <Navbar /> 
      <ChatBot onMessageSent={(message) => console.log(message)} /> {/* Cambia console.log(message) por la función que deseas que maneje los mensajes enviados */}
    </div>
  );
}

export default MainFrida;
