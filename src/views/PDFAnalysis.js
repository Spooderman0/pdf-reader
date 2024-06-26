import React, { useState, useEffect } from 'react';
import 'tailwindcss/tailwind.css';
import { useParams } from "react-router-dom";
import AnalysisButtons from '../Components/AnalysisButtons';
import { SeccionAnalisis } from '../Components/SeccionAnalisis';
import { SeccionTerminos } from '../Components/SeccionTerminos';
import { SeccionTerminos2 } from '../Components/SeccionTerminos2';
import { SeccionTerminos3 } from '../Components/SeccionTerminos3';
import SeccionFiguras from '../Components/SeccionFiguras';
import ChatBox from '../Components/ChatBox';
import ConversationHistory from '../Components/ConversationHistory';
import { BACKEND_LINK } from '../utils/constants';

export const PDFAnalysis = () => {
  const [currentSection, setCurrentSection] = useState("indice");
  const { docId } = useParams();
  const [wordCloudData, setWordCloudData] = useState([]);
  const [allData, setAllData] = useState({});
  const [currentConversation, setCurrentConversation] = useState(null);
  const [hasFigures, setHasFigures] = useState(false);
  const [portada, setPortada] = useState();
  const [figuras, setFiguras] = useState([]);
  const [mindMapData, setMindMapData] = useState({});



  useEffect(() => {
    if (docId) {
      getAllNew(docId);
    }
  
  }, [currentSection, docId, currentConversation]);

  const getAllNew = async (docId) => {
    try {
      const response = await fetch(`${BACKEND_LINK}/getAllInfo/${docId}`, {
        method: 'GET',
        headers: {
          "Access-Control-Allow-Origin": "*"
        },
        credentials: 'include',
      });

      const data = await response.json();
      console.log(data);
      const terminos = Object.entries(data.Terms).map(([text, value]) => ({ text, value }));
      //console.log('terminos', terminos)
      setWordCloudData(terminos);
      setAllData({ ...data });
      //setPortada(data.PortadaURL);
      // Check if there are figures
      if (data.Figuras && data.Figuras.length > 1) {
        setHasFigures(true);
        setFiguras(data.Figuras);
      } else {
        setHasFigures(false);
      }
      const titles = data.SectionSummaries.map(section => ({"name": section.title}));
      setMindMapData({
        "name": data.Topic,
        "children": titles
      })

    } catch (error) {
      console.error('Failed to get document data:', error);
    }
  };

  const handleCurrentConversationChange = (newCurrentConversation) => {
    setCurrentConversation(newCurrentConversation);
  };

  const title = allData.Title || 'Cargando...';


  return (
    <div className="flex justify-center">

      <div className="bg-white w-full flex flex-col" style={{ height: '90vh', width: "80dvw" }}>
        <div className='flex flex-row'>
          <div className='basis-2/5 items-center flex px-3' style={{ height: '15dvh' }}>
            <h4 className="mb-4 text-4xl font-bold">{title}</h4>
          </div>
          <div className='basis-3/5 flex px-3' style={{ height: '15dvh' }}>
            <AnalysisButtons 
              setCurrentSection={setCurrentSection}
              currentSection={currentSection}
              hasFigures={hasFigures} // Pass the hasFigures flag to AnalysisButtons
            />
          </div>
        </div>
          <div>
            {currentSection === "indice" && (
                <SeccionAnalisis docId={docId} docURL = {allData.Storage_URL} summary={allData.Abstract} raw_text={allData.Text} sectionSummariesDB={allData.SectionSummaries} portada={allData.PortadaURL} title={allData.Title} author={allData.Authors} creationDate={allData.CreationDate}/>
            )}

            {currentSection === "terminos" && (
                <SeccionTerminos3 mindMapData={mindMapData} wordCloudData ={wordCloudData} terms_defs={allData.Definitions}/>
            )}
            {currentSection === "frida" && (
              <div className='flex flex-row'>
                <ConversationHistory docId={docId} handleCurrentConversationChange={handleCurrentConversationChange} />
                <ChatBox onMessageSent={(message) => console.log(message)} docId={docId} currentConversation={currentConversation} /> 
              </div>
            )}
            {currentSection === "figuras" && (
              <div className='flex flex-row'>
                <SeccionFiguras figuras={figuras}/> 
              </div>
            )}
          </div>

      </div>
    </div>

  );
}

export default PDFAnalysis;
