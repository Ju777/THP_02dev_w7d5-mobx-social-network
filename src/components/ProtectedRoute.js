import React from 'react';
import { useAtomValue } from 'jotai';
import { tokenStatusAtom } from '../atoms/tokenStatus';
import { Navigate, Outlet } from 'react-router-dom';
import tokenStatusStore from '../stores/store';
import { useSelector } from 'react-redux';

function ProtectedRoute({children}) {
    
    // const isTokenCreated = useAtomValue(tokenStatusAtom); // Avec JOTAI
    const isTokenCreated = useSelector((state) => state.tokenStatus); // Avec Redux
    
    console.log('ProtectedRoute, isTokenCreated', isTokenCreated);

    if (isTokenCreated) {
        // return <Outlet/>
        return children
    } else {
        return <Navigate to="/login"/>
    } 
    
    
}

export default ProtectedRoute;