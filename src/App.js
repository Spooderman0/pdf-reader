import { BrowserRouter, Route, Routes } from "react-router-dom";
import UploadPDF from "./views/UploadPDF";
import PDFAnalysisTerminos from "./views/PDFAnalysisTerminos";
import Settings from "./views/Settings";
import LoadingScreen from "./views/LoadingScreen";
import MainFrida from "./views/MainFrida";
import PDFAnalysisFiguras from "./views/PDFAnalysisFiguras";
import DocSummaryPage from "./views/DocSummaryPage";
import Navbar from './Components/Navbar'; // Ajusta la ruta según la ubicación real
import Login from "./views/Login";
import SignUp from "./views/SignUp";
import PDFAnalysis from "./views/PDFAnalysis";
import vistaPreliminar from "./views/vistaPreliminar";



function App() {
  return (
    <BrowserRouter basename={""}>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Login />} />
          <Route path="/signup" exact element={<SignUp/>} />
          <Route path="/main" exact element={<UploadPDF />} />
          <Route path="main/pdf-analysis/:docId" exact element={<PDFAnalysis />} />
          <Route path="main/pdf-analysis-terminos" exact element={<PDFAnalysisTerminos />} />
          <Route path="/settings" exact element={<Settings />} />
          <Route path="/loading" exact element={<LoadingScreen/>} />
          <Route path="/vistapreliminar" exact element={<vistaPreliminar/>} />
          <Route path="/history" exact element={<DocSummaryPage/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
