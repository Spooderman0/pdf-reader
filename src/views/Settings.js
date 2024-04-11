import React, { useState } from "react";
import "tailwindcss/tailwind.css";
import Navbar from "../Components/Navbar";
import SettingsImage from '../Images/settingspic.png'; 
import VocabularyLevel from "../Components/VocabularyLevel";


export const Settings = () => {
  const [vocabularyLevel, setVocabularyLevel] = useState(3);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />

      <div className="flex justify-around">
        <div className=" flex flex-col mt-2 max-h-160">
          <h1 className=" text-3xl font-bold text-gray-700 sticky left-10">
            {" "}
            Ajustes{" "}
          </h1>

          <div className="flex flex-col justify-center space-y-8 mt-24 ">
            {" "}
            {/* Ajuste para los botones */}
            <div>
              <button
                onClick={openModal}
                className="bg-gray-600 text-white px-16 py-3 rounded-md shadow-lg min-w-80 hover:bg-gray-700 transition duration-300" /* bordes redondos */
              >
                Cambiar Contraseña
              </button>
            </div>
            <div>
              <button
                onClick={openModal}
                className="bg-gray-600 text-white px-20 py-3 rounded-md shadow-lg min-w-80 hover:bg-gray-700 transition duration-300" /* bordes redondos */
              >
                Claro
              </button>
            </div>
            <div>
              <button
                onClick={openModal}
                className="text-red-600 bg-gray-600 px-20 py-3 rounded-md shadow-lg min-w-80 hover:bg-gray-700 transition duration-300" /* bordes redondos */
              >
                Borrar cuenta
              </button>
            </div>
            <div>
              <button
                onClick={openModal}
                className="bg-gray-600 text-white px-20 py-3 rounded-md shadow-lg min-w-80 hover:bg-gray-700 transition duration-300" /* bordes redondos */
              >
                Cambiar Contraseña
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center flex-col">
          <img src ={SettingsImage}></img>
          <></>
          <div>
            <VocabularyLevel 
              level={vocabularyLevel} 
              setLevel={setVocabularyLevel}
            />

            </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
