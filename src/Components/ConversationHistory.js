import React, { useState, useEffect } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { BACKEND_LINK } from '../utils/constants';
import { RiDeleteBin5Line } from "react-icons/ri";
import { IoIosAddCircle } from "react-icons/io";

const ConversationHistory = ({ docId, handleCurrentConversationChange }) => {
  const [conversationList, setConversationList] = useState([]);
  const [currentConversation, setCurrentConversation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const conversations = await getConversationList();
      if (conversations.length > 0) {
        setCurrentConversation(conversations[0]);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (currentConversation) {
      handleCurrentConversationChange(currentConversation);
    }
  }, [currentConversation, handleCurrentConversationChange]);

  const getConversationList = async () => {
    try {
      const response = await fetch(`${BACKEND_LINK}/user_id/chatbot/${docId}/conversationList`, {
        method: 'GET',
        headers: {
          "Access-Control-Allow-Origin": "*"
        },
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Network response was not ok while getting conversations id list');
      }

      const data = await response.json();
      // console.log(data["conversation_list"]);
      setConversationList(data["conversation_list"]);
      return data["conversation_list"];
    } catch (error) {
      console.error('Error fetching conversations id list:', error);
      return [];
    }
  };

  const handleConversationClick = (conversation) => {
    setCurrentConversation(conversation);
  };

  const handleDeleteConversation = async (conversationId) => {
    // console.log(`delete id: ${conversationId}`);
    try {
      const response = await fetch(`${BACKEND_LINK}/user_id/chatbot/${docId}/deleteconversation/${conversationId}`, {
        method: 'GET',
        headers: {
          "Access-Control-Allow-Origin": "*"
        },
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Network response was not ok while deleting conversation');
      }

      const updatedConversationList = await getConversationList();
      if (updatedConversationList.length > 0) {
        setCurrentConversation(updatedConversationList[0]);
      } else {
        setCurrentConversation(null);
        handleCurrentConversationChange(null)
      }
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
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Network response was not ok while adding conversation');
      }

      const updatedConversationList = await getConversationList();
      if (updatedConversationList.length > 0) {
        setCurrentConversation(updatedConversationList[updatedConversationList.length - 1]);
      }
    } catch (error) {
      console.error('Error creating new conversation:', error);
    }
  };

  return (
    <div className="container bg-gray-100 shadow-lg px-8 w-1/4 rounded-[12px] mx-3" style={{ height: "73dvh" }}>
      <div className='flex flex-row justify-between items-center'>
        <p className="text-xl font-bold py-3">Conversaciones</p>
        <button
          className="text-center py-1 text-white px-5 bg-blue-500 font-bold text-xl hover:bg-blue-600 h-1/2 rounded-full"
          onClick={handleAddConversation}
        >
          <IoIosAddCircle />
        </button>
      </div>
      <div className="container bg-gray-400 rounded-[12px] border w-full h-full flex flex-col justify-start items-center" style={{ height: "63dvh" }}>
        <Scrollbars autoHide>
          <div className='m-3'>
            {loading ? (
              <div className="flex justify-center items-center h-full">
                  <svg aria-hidden="true" class="h-full w-2/6  inline w-10 h-10  animate-spin text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                  </svg>
              </div>
            ) : (
              conversationList.map((conversation) => (
                <div key={conversation.id} className="relative inline-flex items-center w-full">
                  <button
                    type="button"
                    className={`w-full px-4 py-2 text-sm font-medium border-b border-gray-300 hover:bg-white ${conversation.id === currentConversation?.id ? "bg-white text-blue-700" : "bg-gray-200"}`}
                    onClick={() => handleConversationClick(conversation)}
                  >
                    <div className='flex flex-row justify-between items-center w-full'>
                      {conversation.date}
                    </div>
                  </button>
                  <div className="absolute right-0 top-0 h-full flex items-center">
                    <button
                      className="ml-2 py-1 px-5 bg-red-300 font-bold text-xl hover:bg-red-500 transition-colors rounded-full"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent triggering the parent button's onClick event
                        handleDeleteConversation(conversation.id);
                      }}
                    >
                      <RiDeleteBin5Line className='text-white' />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </Scrollbars>
      </div>
    </div>
  );
};

export default ConversationHistory;
