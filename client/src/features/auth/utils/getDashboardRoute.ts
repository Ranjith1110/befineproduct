export const getDashboardRoute = (roles: string[]): string => {
    const roleStr = roles.join(',').toUpperCase();

    if (roleStr.includes('ADMIN') || roleStr.includes('SUPERADMIN')) {
        return '/super-admin/overview';
    }
    if (roleStr.includes('CAREMANAGER') || roleStr.includes('CARE_MANAGER')) {
        return '/care-manager/dashboard';
    }
    if (roleStr.includes('CAREGIVER') || roleStr.includes('CARE_GIVER')) {
        return '/care-giver/dashboard';
    }
    if (roleStr.includes('PROVIDER') || roleStr.includes('SERVICE_PROVIDER') || roleStr.includes('PROVIDERADMIN')) {
        return '/service-provider/dashboard';
    }
    if (roleStr.includes('DEPENDENT')) {
        return '/dependent/dashboard';
    }
    if (roleStr.includes('CLIENT') || roleStr.includes('USER')) {
        return '/user/dashboard';
    }

    return '';
};
