import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { getUserRole, isAuthenticated } from '../features/auth/api/authApi';
import { getDashboardRoute } from '../features/auth/utils/getDashboardRoute';

interface PublicRouteProps {
    children: ReactNode;
}

const PublicRoute = ({ children }: PublicRouteProps) => {
    if (!isAuthenticated()) {
        return <>{children}</>;
    }

    const dashboardRoute = getDashboardRoute(getUserRole());

    if (!dashboardRoute) {
        return <>{children}</>;
    }

    return <Navigate to={dashboardRoute} replace />;
};

export default PublicRoute;
