import React from 'react';

const LogoutModal = ({ isOpen, onClose }) => {
  return (
    <>
      {isOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={onClose}>&times;</span>
            <h2>Salir de Cuenta</h2>
            {/* Contenido del modal para salir de cuenta */}
          </div>
        </div>
      )}
    </>
  );
};

export default LogoutModal;
