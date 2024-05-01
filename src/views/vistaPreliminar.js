import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'

export const VistaPreliminar = () => {
    const location = useLocation();
    const docURL = location.state && location.state.docURL;
    //const { docURL } = location.state;

    //console.log('el url que se debe de ver en vista preliminar es', docURL)
    return (
        <div>
            <iframe
            id="inlineFrameExample"
            title="Inline Frame Example"
            width="100%"
            height="1000dv"
            src={docURL}>
            </iframe>
        </div>
    );
}

export default VistaPreliminar;