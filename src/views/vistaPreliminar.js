import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { IoIosArrowBack } from "react-icons/io";

export const VistaPreliminar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const docURL = location.state && location.state.docURL;

    const handleBackClick = () => {
        navigate(-1);
    };

    return (
        <div className='bg-black flex flex-row pt-5'>
            <div className='flex justify-center items-start' style={{width: "5%"}}>
                <button className='text-white text-2xl' onClick={handleBackClick}>
                    <IoIosArrowBack className='' />
                </button>
                
            </div>
            <div style={{width: "90%"}}>
                <iframe
                    id="inlineFrameExample"
                    title="Inline Frame Example"
                    width="100%"
                    height="1000px"
                    src={docURL}>
                </iframe>

            </div>
        </div>
    );
}

export default VistaPreliminar;
