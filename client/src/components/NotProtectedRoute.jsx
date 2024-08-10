import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from "react-router-dom"

export const NotProtectedRoute = ({ children }) => {
    const { isAuthenticated, currentUser } = useSelector(state => state.user);

    if (isAuthenticated && currentUser.isVerified) {
        return <Navigate to='/' replace />;
    }

    return children;
};