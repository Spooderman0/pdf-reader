import React, { useState, useEffect } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { BACKEND_LINK } from '../utils/constants';

import { RiDeleteBin5Line } from "react-icons/ri";
import { IoIosAddCircle } from "react-icons/io";


const ConversationHistory = ({ docId, handleConversationIdChange }) => {
  const [conversationsIdList, setConversationsIdList] = useState([]);
  const [currentConversationId, setCurrentConversationId] = useState(null);


  useEffect(() => {
    getConversationsIdList();
    setCurrentConversationId(conversationsIdList[0]);
    // console.log(`currentConversationId: ${currentConversationId} `);
  }, []);
  
  useEffect(() => {
    handleConversationIdChange(currentConversationId);
    // handleConversationIdChange(conversationsIdList[0]);
  }, [currentConversationId]);

  const getConversationsIdList = async () => {
    try {
        const response = await fetch(`${BACKEND_LINK}/user_id/chatbot/${docId}/conversationsidlist`, {
        // const response = await fetch(`${BACKEND_LINK}/user_id/chatbot/${docId}/newconversation`, {
          method: 'GET',
          headers: {
            "Access-Control-Allow-Origin": "*"
          },
          credentials:'include',
        });
        
        if (!response.ok) {
          throw new Error('Network response was not ok while getting conversations id list');
        }
        
        const data = await response.json();
        setConversationsIdList(data["conversations_id_list"])
        handleConversationIdChange(conversationsIdList[0]);
    } catch (error) {
        console.error('Error fetching conversations id list:', error);
    }
};


  const handleConversationClick = (conversationId) => {
    handleConversationIdChange(conversationId);
    setCurrentConversationId(conversationId);
  };

  const handleDeleteConversation = async (conversationId) => {
    try {
        const response = await fetch(`${BACKEND_LINK}/user_id/chatbot/${docId}/deleteconversation/${conversationId}`, {
          method: 'GET',
          headers: {
            "Access-Control-Allow-Origin": "*"
          },
          credentials:'include',
        });
        
        if (!response.ok) {
          throw new Error('Network response was not ok while deleting conversation');
        }

        getConversationsIdList();

    } catch (error) {
        console.error('Error deleting conversation:', error);
    }
};

  const handleAddConversation = async () => {
    try {
        const response = await fetch(`${BACKEND_LINK}/user_id/chatbot/${docId}/newconversation`, {
          method: 'GET',
          headers: {
            "Access-Control-Allow-Origin": "*"
          },
          credentials:'include',
        });
        
        if (!response.ok) {
          throw new Error('Network response was not ok while adding conversation');
        }
        getConversationsIdList();
        setCurrentConversationId(conversationsIdList[conversationsIdList.length-1]);

    } catch (error) {
        console.error('Error creating new conversation:', error);
    }
};

  return (
      <div className="container bg-gray-100 shadow-lg px-8 w-1/4 rounded-[12px] mx-3" style={{height: "73dvh"}}>
        <div className='flex flex-row justify-between items-center'>
          <p class="text-xl font-bold py-3">Conversaciones</p>
          <button
            className="text-center py-1 text-white px-5 bg-blue-500 font-bold text-xl hover:bg-blue-600 h-1/2 rounded-full"
            onClick={handleAddConversation}
          >
            <IoIosAddCircle />
          </button>

        </div>
        <div className="container bg-white rounded-[12px] border w-full h-full flex flex-col justify-start items-center" style={{height: "63dvh"}}>
          <Scrollbars autoHide>
            <div className='m-3'>
              {conversationsIdList && conversationsIdList.map((conversationId) => 
                <button 
                type="button" 
                class={`relative inline-flex items-center w-full px-4 py-2 text-sm font-medium border-b border-white hover:bg-gray-300 ${conversationId === currentConversationId ? "bg-gray-300 text-blue-700" : "bg-white"}`}
                onClick={() => handleConversationClick(conversationId)}
                >
                  <div className='flex flex-row justify-between items-center w-full'>
                      {conversationId}
                      <button
                        className="ml-2 py-1 px-5 bg-red-300 font-bold text-xl hover:bg-red-500 transition-colors h-1/2 rounded-full"
                        onClick={() => handleDeleteConversation(conversationId)}
                      >
                      <RiDeleteBin5Line className='text-white' />
                      </button>
                  </div>
                </button>
                    
              )}
            </div>
          </Scrollbars>
        </div>
      </div>
  );
};

export default ConversationHistory; 