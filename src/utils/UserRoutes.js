import React, { useEffect, useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { BACKEND_LINK } from './constants';

export const UserRoutes = () => {
    const [userVerified, setUserVerified] = useState(null);

    useEffect(() => {
        const verifyUser = async () => {
            try {
                const response = await fetch(`${BACKEND_LINK}/verifyuser`, {
                    method: 'GET',
                    headers: {
                        'Access-Control-Allow-Origin': '*'
                    },
                    credentials: 'include'
                });

                if (response.status === 200) {
                    setUserVerified(true);
                } else {
                    setUserVerified(false);
                }
            } catch (error) {
                console.error('Failed to verify user:', error);
                setUserVerified(false);
            }
        };

        verifyUser();
    }, []); // Empty dependency array means this effect runs only once

    if (userVerified === null){
        return (  
            <div className="flex items-center justify-center min-h-screen">
              <div className="spinner"></div>
            </div>
          );
    }
    return userVerified ? <Outlet /> : <Navigate to="/" />;
};
