import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import { UserRoutes } from "./utils/UserRoutes";
import UploadPDF from "./views/UploadPDF";
import Settings from "./views/Settings";
import LoadingScreen from "./views/LoadingScreen";
import DocSummaryPage from "./views/DocSummaryPage";
import Navbar from './Components/Navbar'; // Ajusta la ruta según la ubicación real
import Login from "./views/Login";
import SignUp from "./views/SignUp";
import PDFAnalysis from "./views/PDFAnalysis";
import VistaPreliminar from "./views/vistaPreliminar";
import About from "./views/About";
import QuickAnalysis from "./Components/QuickAnalysis";



function AppWrapper() {
  return (
    <BrowserRouter basename={""}>
      <App />
    </BrowserRouter>
  );
}

function App() {
  const location = useLocation();
  const [showNavbar, setShowNavbar] = useState(true);

  useEffect(() => {
    // Define en qué rutas NO quieres mostrar la Navbar
    const hideNavbarRoutes = ['/', '/signup', '/loading'];
    setShowNavbar(!hideNavbarRoutes.includes(location.pathname));
  }, [location]);

  return (
    <div>
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/" exact element={<Login/>} />
        <Route path="/signup" exact element={<SignUp />} />
        <Route path="/loading" exact element={<LoadingScreen />} />
        <Route element={<UserRoutes />}>
          <Route path="/main" exact element={<UploadPDF />} />
          <Route path="main/pdf-analysis/:docId" exact element={<PDFAnalysis />} />
          <Route path="/settings" exact element={<Settings />} />
          <Route path="/vistapreliminar" exact element={<VistaPreliminar />} />
          <Route path="/history" exact element={<DocSummaryPage />} />
          <Route path = "/about" exact element= {<About />}/>
          <Route path = "/quick-analysis" exact element= {<QuickAnalysis />}/>
        </Route>
      </Routes>
    </div>
  );
}

export default AppWrapper;