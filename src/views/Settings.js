import React, { useState } from "react";
import "tailwindcss/tailwind.css";
import SettingsImage from '../Images/settingspic.png'; 
import VocabularyLevel from "../Components/VocabularyLevel";
import DeleteAccountModal from "../Components/DeleteAccountModal";
import ChangePasswordModal from "../Components/ChangePasswordModal";

export const Settings = () => {
  const [vocabularyLevel, setVocabularyLevel] = useState(3);
  const [isDeleteAccountModalOpen, setIsDeleteAccountModalOpen] = useState(false);
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState(false);

  const openDeleteAccountModal = () => setIsDeleteAccountModalOpen(true);
  const openChangePasswordModal = () => setIsChangePasswordModalOpen(true);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="flex justify-around">
        <div className="flex flex-col max-h-180" style={{ paddingTop: "90px" }}>
          <h1 className="text-3xl font-bold text-gray-700 sticky left-10">
            Ajustes
          </h1>

          <div className="space-x-6 mb-4" style={{ paddingTop: "60px" }}>
            <button
              onClick={openChangePasswordModal}
              className="bg-gray-600 text-white px-16 py-10 rounded-md shadow-lg min-w-96 hover:bg-gray-700 transition duration-300"
            >
              Cambiar Contraseña
            </button>
          </div>
          
          <div className="mb-4">
            <button
              className="bg-gray-600 text-white px-20 py-10 rounded-md shadow-lg min-w-96 hover:bg-gray-700 transition duration-300"
            >
              Claro
            </button>
          </div>

          <div>
            <button
              onClick={openDeleteAccountModal}
              className="text-white bg-red-600 px-20 py-10 rounded-md shadow-lg min-w-96 hover:bg-gray-700 transition duration-300 "
            >
              Borrar cuenta
            </button>
          </div>
        </div>

        <div className="flex items-center justify-center flex-col">
          <img src={SettingsImage} alt="Settings" />
          <div>
            <VocabularyLevel 
              level={vocabularyLevel} 
              setLevel={setVocabularyLevel}
            />
          </div>
        </div>
      </div>

      <DeleteAccountModal open={isDeleteAccountModalOpen} setOpen={setIsDeleteAccountModalOpen} />
      <ChangePasswordModal open={isChangePasswordModalOpen} setOpen={setIsChangePasswordModalOpen} />
    </div>
  );
};

export default Settings;
