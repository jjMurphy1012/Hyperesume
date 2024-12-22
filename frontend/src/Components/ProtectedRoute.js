import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated, selectUserStatus } from '../redux/reducers/userSlice';

function ProtectedRoute({ component: Component, roles }) {
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const userRole = useSelector(state => state.user.userInfo?.role);
    const status = useSelector(selectUserStatus);

    // Show loading while checking authentication
    if (status === 'loading' || status === 'idle') {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    // Only redirect after we've confirmed the user isn't authenticated
    if (status === 'failed' || !isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (roles && !roles.includes(userRole)) {
        return <Navigate to="/" replace />;
    }

    return <Component />;
}

export default ProtectedRoute;