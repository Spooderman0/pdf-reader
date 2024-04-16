import { BrowserRouter, Route, Routes } from "react-router-dom";
import UploadPDF from "./views/UploadPDF";
import PDFAnalysisIndice from "./views/PDFAnalysisIndice";
import PDFAnalysisTerminos from "./views/PDFAnalysisTerminos";
import Settings from "./views/Settings";
import LoadingScreen from "./views/LoadingScreen";
import MainFrida from "./views/MainFrida";

function App() {
  return (
    <BrowserRouter basename={""}>
      <Routes>
        <Route path="/" exact element={<UploadPDF />} />
        <Route path="/pdf-analysis-indice" exact element={<PDFAnalysisIndice />} />
        <Route path="/pdf-analysis-terminos" exact element={<PDFAnalysisTerminos />} />
        <Route path="/settings" exact element={<Settings />} />
        <Route path="/loading" exact element={<LoadingScreen/>} />
        <Route path="/chatbot" exact element={<MainFrida/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
