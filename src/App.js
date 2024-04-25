import { BrowserRouter, Route, Routes } from "react-router-dom";
import 'tailwindcss/tailwind.css';
import UploadPDF from "./views/UploadPDF";
import PDFAnalysis from "./views/PDFAnalysis";
import PDFAnalysisTerminos from "./views/PDFAnalysisTerminos";
import Settings from "./views/Settings";
import LoadingScreen from "./views/LoadingScreen";
import MainFrida from "./views/MainFrida";
import Login from './views/Login';
import SignUp from './views/SignUp';
import VistaPreliminar from "./views/vistaPreliminar";
import Navbar from "./Components/Navbar";

function App() {
  return (
    <BrowserRouter basename={""}>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Login />} />
          <Route path="/signup" exact element={<SignUp/>} />
          <Route path="/main" exact element={<UploadPDF />} />
          <Route path="main/pdf-analysis" exact element={<PDFAnalysis />} />
          <Route path="main/pdf-analysis-terminos" exact element={<PDFAnalysisTerminos />} />
          <Route path="chatbot" exact element={<MainFrida/>} />
          <Route path="/settings" exact element={<Settings />} />
          <Route path="/loading" exact element={<LoadingScreen/>} />
          <Route path="/vistapreliminar" exact element={<VistaPreliminar/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;