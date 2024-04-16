import React from 'react';
import Navbar from '../Components/Navbar'; // Ajusta la ruta según la ubicación real de Navbar.js
import ChatBox from '../Components/ChatBox';

export const  MainFrida = () => {
  return (
    <div>
      <Navbar /> 
      <ChatBox onMessageSent={(message) => console.log(message)} /> {/* Cambia console.log(message) por la función que deseas que maneje los mensajes enviados */}
    </div>
  );
}

export default MainFrida;