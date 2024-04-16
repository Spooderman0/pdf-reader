import React from 'react';
import Navbar from '../Components/Navbar'; // Ajusta la ruta según la ubicación real de Navbar.js
import ChatBox from '../Components/ChatBox';
function MainFrida() {
  return (
    <div>
      <Navbar /> 
      <ChatBox onMessageSent={(message) => console.log(message)} />
    </div>
  );
}

export default MainFrida;
