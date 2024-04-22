import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'

export const VistaPreliminar = () => {
    const location = useLocation();
    const [fileUrl, setFileUrl] = useState('');


    
    useEffect(() => {
        console.log('Location state:', location.state)
        if(location.state) {
            //const { fileUrl } = location.state
            setFileUrl(location.state.fileUrl)
        }
      }, [location, location.state]);

    console.log('el url que se debe de ver en vista preliminar es', fileUrl)
    return (
        <div>
            <iframe
            id="inlineFrameExample"
            title="Inline Frame Example"
            width="100%"
            height="1000dv"
            src={fileUrl}>
            </iframe>
        </div>
    );
}

export default VistaPreliminar;