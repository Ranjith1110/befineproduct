import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { isAuthenticated, getUserRole } from '../api/auth';

interface ProtectedRouteProps {
    children?: React.ReactNode;
    allowedRoles?: string[]; // New: Pass an array of roles that are allowed to see these routes
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
    const isAuth = isAuthenticated();
    const userRoles = getUserRole(); // e.g., ["ADMIN"], ["CARE_GIVER"]

    // 1. Check if user is logged in at all
    if (!isAuth) {
        return <Navigate to="/" replace />;
    }

    // 2. Check if the user's role matches the required roles for this route group
    if (allowedRoles && allowedRoles.length > 0) {
        // Convert all roles to uppercase to avoid case-sensitivity bugs
        const normalizedUserRoles = userRoles.map(role => role.toUpperCase());
        
        const hasRequiredRole = allowedRoles.some(allowedRole => 
            normalizedUserRoles.includes(allowedRole.toUpperCase()) || 
            // Handle variations in role naming from the backend
            normalizedUserRoles.some(ur => ur.includes(allowedRole.toUpperCase())) 
        );

        if (!hasRequiredRole) {
            // If they are logged in but don't have access to this specific dashboard,
            // send them back to the login page (or a dedicated 'Unauthorized' page)
            return <Navigate to="/" replace />;
        }
    }

    return children ? <>{children}</> : <Outlet />;
};

export default ProtectedRoute;