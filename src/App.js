import { BrowserRouter, Route, Routes } from "react-router-dom";
import UploadPDF from "./views/UploadPDF";
import PDFAnalysis from "./views/PDFAnalysis";

function App() {
  return (
    <BrowserRouter basename={""}>
      <Routes>
        <Route path="/" exact element={<UploadPDF />} />
        <Route path="/pdf-analysis" exact element={<PDFAnalysis />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
