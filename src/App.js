import { BrowserRouter, Route, Routes } from "react-router-dom";
import UploadPDF from "./views/UploadPDF";
import PDFAnalysisIndice from "./views/PDFAnalysisIndice";
import PDFAnalysisTerminos from "./views/PDFAnalysisTerminos";

function App() {
  return (
    <BrowserRouter basename={""}>
      <Routes>
        <Route path="/" exact element={<UploadPDF />} />
        <Route path="/pdf-analysis-indice" exact element={<PDFAnalysisIndice />} />
        <Route path="/pdf-analysis-terminos" exact element={<PDFAnalysisTerminos />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
