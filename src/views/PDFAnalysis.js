import React, { useState, useEffect } from 'react';
import 'tailwindcss/tailwind.css';
import { useNavigate, useParams } from "react-router-dom";
import AnalysisButtons from '../Components/AnalysisButtons';
import { SeccionAnalisis } from '../Components/SeccionAnalisis';
import { SeccionTerminos } from '../Components/SeccionTerminos';
import SeccionFiguras, { seccionFiguras } from '../Components/SeccionFiguras';
import ChatBox from '../Components/ChatBox';
import ConversationHistory from '../Components/ConversationHistory';
import { BACKEND_LINK } from '../utils/constants';


export const  PDFAnalysis = () => {
  const [currentSection, setCurrentSection] = useState("indice");
  const { docId } = useParams();
  const [docData, setDocData] = useState({});
  const [analysisData, setAnalysisData] = useState({});
  const [wordCloudData, setWordCloudData] = useState([]);
  const [allData, setAllData] = useState({});
  const [conversationId, setConversationId] = useState(null);


  useEffect(() => {
    // console.log('Current section:', currentSection)
    // console.log(docId)
    // console.log(docId)
    if(docId){
      //getDocData(docId);
      //getAnalysisData(docId)
      //getWordCloudData(docId)
      getAllNew(docId)
    }
    console.log(conversationId);
  
  }, [currentSection, docId, conversationId]);

  const getAllNew = async (docId) => {
    
    try {
      const response = await fetch(`${BACKEND_LINK}/getAllInfo/${docId}`, {
        method: 'GET',
        headers: {
          "Access-Control-Allow-Origin": "*"
        },
        credentials:'include',
      });

      const data = await response.json();
      //console.log(data);
      const terminos = Object.entries(data.Terms).map(([text, value]) => ({ text, value }));
      setWordCloudData(terminos);
      setAllData({...data});

    } catch (error) {
      console.error('Failed to get document data:', error);
    }
  };

  const handleConversationIdChange = (newConversationId) => {
    setConversationId(newConversationId);
  };

  /*const getAnalysisData = async (docId) => {
    
    try {
      // const uploadResponse = await fetch(`https://frida-backend.onrender.com/U1/analysis/${docId}`, {
      const uploadResponse = await fetch(`${BACKEND_LINK}/user_id/analysis/${docId}`, {
        method: 'GET',
        headers: {
          "Access-Control-Allow-Origin": "*"
        },
        credentials:'include',
      });

      const uploadData = await uploadResponse.json();
      // console.log(uploadData);
      setAnalysisData({...uploadData});

    } catch (error) {
      console.error('Failed to get document data:', error);
    }
  };*/


  /*const getDocData = async (docId) => {
    
    try {
      const uploadResponse = await fetch(`${BACKEND_LINK}/user_id/main_info/${docId}`, {
        method: 'GET',
        headers: {
          "Access-Control-Allow-Origin": "*"
        },
        credentials:'include',
      });

      const uploadData = await uploadResponse.json();
      // console.log(uploadData);
      setDocData({...uploadData});
    } catch (error) {
      console.error('Failed to get document data:', error);
    }
  };*/

  /*const getWordCloudData = async (docId) => {
    
    try {
      const uploadResponse = await fetch(`${BACKEND_LINK}/user_id/keyterms/${docId}`, {
        method: 'GET',
        headers: {
          "Access-Control-Allow-Origin": "*"
        },
        credentials:'include',
      });

      const data = await uploadResponse.json();
      const terminosArray = Object.entries(data.terms).map(([text, value]) => ({ text, value }));
      setWordCloudData(terminosArray);
    } catch (error) {
      console.error('Failed to get document data:', error);
    }
  };*/

  //console.log(docData)
  //console.log(allData.Abstract)
  //console.log(wordCloudData2)

  const title = allData.Title || 'Cargando...';
  //const cleanTitle = title.split('.').slice(0, -1).join('.');

  return (
    <div className="bg-white w-full flex flex-col" style={{ height: '90vh' }}>
      <div className='flex flex-row'>
        <div className='basis-2/5 items-center flex px-3' style={{ height: '15dvh', marginLeft: '10%' }}>
            <h4 className="mb-4 text-4xl font-bold">{title}</h4>
        </div>
        <div className='basis-3/5 flex px-3' style={{ height: '15dvh' }}>
        <AnalysisButtons 
          setCurrentSection={setCurrentSection}
          currentSection={currentSection}
          data={allData}
        />
        </div>

      </div>
        <div >
          {currentSection === "indice" && (
              <SeccionAnalisis docURL = {allData.Storage_URL} summary={allData.Abstract} raw_text={allData.Text} />
          )}

          {currentSection === "terminos" && (
              <SeccionTerminos wordCloudData ={wordCloudData} terms_defs={allData.Definitions}/>
          )}
          {currentSection === "frida" && (
            <div className='flex flex-row'>
              <ConversationHistory docId={docId} handleConversationIdChange={handleConversationIdChange} />
              <ChatBox onMessageSent={(message) => console.log(message)} docId={docId} conversationId={conversationId} /> 
            </div>
          )}
          {currentSection === "figuras" && (
            <div className='flex flex-row'>
              <SeccionFiguras  figuras = {allData.Figuras}/> 
            </div>
          )}


        </div>

    </div>
  );
}

export default PDFAnalysis;
