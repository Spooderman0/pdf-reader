import { BrowserRouter, Route, Routes } from "react-router-dom";
import UploadPDF from "./views/UploadPDF";
import PDFAnalysis from "./views/PDFAnalysis";
import Settings from "./views/Settings";

function App() {
  return (
    <BrowserRouter basename={""}>
      <Routes>
        <Route path="/" exact element={<UploadPDF />} />
        <Route path="/pdf-analysis" exact element={<PDFAnalysis />} />
        <Route path="/settings" exact element={<Settings />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
