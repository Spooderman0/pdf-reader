import React, { useState } from 'react';
import 'tailwindcss/tailwind.css';
import Navbar from '../Components/Navbar';

export const  PDFAnalysis = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true); 
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <div className="bg-white w-100 d-flex" style={{ height: '90vh' }}>

        <div className="col-5 h-100 px-5 py-3">
        <div style={{ height: '15vh' }}>
            <h4>
            <b>Algoritmos: análisis, diseño e implementación </b>
            </h4>
        </div>
        <div className="card p-3 bg-light border-0" style={{ height: '70vh', boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px' }}>
            <h6>Vista preliminar</h6>
            <div className="p-4 d-flex justify-content-center">
            <img className="" style={{ height: '55vh' }} src="PortadaLibro.png" alt="Portada" />
            </div>
        </div>
        </div>

        <div className="col-7 d-flex flex-column py-3 px-3">
        <div className="container w-100 d-flex justify-content-between py-2 px-0" style={{ height: '15vh' }}>
            <a href="index.html"><button className="btn btn-light active" style={{ borderRadius: '10vw', width: '10vw', height: '7vh' }}>ÍNDICE</button></a>
            <a href="terminos.html"><button className="btn btn-light" style={{ borderRadius: '10vw', width: '10vw', height: '7vh' }}>TÉRMINOS</button></a>
            <a href="#"><button className="btn btn-light" style={{ borderRadius: '10vw', width: '10vw', height: '7vh' }}>FIGURAS</button></a>
            <a href="#"><button className="btn btn-light" style={{ borderRadius: '10vw', width: '10vw', height: '7vh' }}>FRIDA</button></a>
        </div>

        <div className="d-flex flex-column justify-content-between" style={{ height: '70vh' }}>
            <div className="card border-0 bg-light w-100 p-3" style={{ boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px' }}>
            <h5>Resumen</h5>
            <p>
                Este libro parece ser un recurso integral sobre algoritmos, análisis y diseño de algoritmos, y estructuras de datos, entre otros temas relacionados con la informática. Esto incluye conceptos como conjuntos, relaciones, funciones, series y sucesiones, así como técnicas para el análisis de algoritmos, como la notación asintótica (Big-O, Big-Theta, Big-Omega) y el análisis de algoritmos iterativos y recursivos.
            </p>
            <div className="d-flex justify-content-end">
                <button className="btn btn-primary w-25">Capítulos</button>
            </div>
            </div>

            <div className="container d-flex justify-content-between p-0">
            <div className="d-flex flex-column card border-0 bg-light mr-2 text-center justify-content-center" style={{ width: '25vw', boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px' }}>
                <h5>2022</h5>
            </div>
            <div className="d-flex flex-column card border-0 bg-light mr-2 text-center justify-content-center p-1" style={{ width: '25vw', boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px' }}>
                <h5>Luis Humberto González Guerra</h5>
            </div>
            </div>

            <div className="card border-0 bg-light w-100 p-3" style={{ boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px' }}>
            <h5>Referencia</h5>
            <p>González, D. (2018, 24 enero). Metodología Proceso unificado (UP) - blog Yunbit Software.</p>
            </div>
        </div>

        </div>

        </div>
    </div>
  );
}

export default PDFAnalysis;