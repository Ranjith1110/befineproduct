import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';

import OverView from '../features/super-admin/pages/OverView';
import Client from '../features/super-admin/pages/Client';
import ServicesProviders from '../features/super-admin/pages/ServicesProviders';
import SuperAdminAppointments from '../features/super-admin/pages/SuperAdminAppointments';
import NotificationMessages from '../features/super-admin/pages/NotificationMessages';
import SuperAdminBilling from '../features/super-admin/pages/SuperAdminBilling';
import OurServices from '../features/super-admin/pages/OurServices';
import Subscription from '../features/super-admin/pages/Subscription';
import CareManager from '../features/super-admin/pages/CareManager';
import Settings from '../features/super-admin/pages/Settings';

import UserDashboard from '../pages/user/UserDashboard';
import SponsoredServices from '../pages/user/SponsoredServices';
import CareServices from '../pages/user/CareServices';
import HomeCareServices from '../pages/user/HomeCareServices';
import MyRecords from '../pages/user/MyRecords';

import DependentDashboard from '../pages/dependent/DependentDashboard';
import ParentsSponsoredServices from '../pages/dependent/ParentsSponsoredServices';
import ParentsCareServices from '../pages/dependent/ParentsCareServices';
import ParentsHomeCareServices from '../pages/dependent/ParentsHomeCareServices';
import MyParentRecords from '../pages/dependent/MyParentRecords';

import ServiceProviderDashboard from '../pages/service-provider/ServiceProviderDashboard';
import MyCareGiver from '../pages/service-provider/MyCareGiver';
import ServiceProviderServiceRequestStatus from '../pages/service-provider/ServiceProviderServiceRequestStatus';
import ServiceProviderAppointments from '../pages/service-provider/ServiceProviderAppointments';
import ServiceProviderReports from '../pages/service-provider/ServiceProviderReports';
import ServiceProviderBilling from '../pages/service-provider/ServiceProviderBilling';

import CareGiverDashboard from '../pages/care-giver/CareGiverDashboard';
import MyClients from '../pages/care-giver/MyClients';
import CareGiverServiceRequestStatus from '../pages/care-giver/CareGiverServiceRequestStatus';
import CareGiverAppointments from '../pages/care-giver/CareGiverAppointments';
import CareGiverReports from '../pages/care-giver/CareGiverReports';

import CareManagerDashboard from '../pages/care-manager/CareManagerDashboard';
import CareManagerMyServiceProvider from '../pages/care-manager/CareManagerMyServiceProvider';
import CareManagerServiceRequestStatus from '../pages/care-manager/CareManagerServiceRequestStatus';
import CareManagerAppointments from '../pages/care-manager/CareManagerAppointments';
import CareManagerReports from '../pages/care-manager/CareManagerReports';
import CareManagerBilling from '../pages/care-manager/CareManagerBilling';

import Login from '../features/auth/pages/Login';

export function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<PublicRoute><Login /></PublicRoute>} />
            <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />

            {/* SUPER ADMIN ROUTES */}
            <Route element={<ProtectedRoute allowedRoles={['ADMIN', 'SUPERADMIN']} />}>
                <Route path="/super-admin/overview" element={<OverView />} />
                <Route path="/super-admin/clients" element={<Client />} />
                <Route path="/super-admin/services-providers" element={<ServicesProviders />} />
                <Route path="/super-admin/appointments" element={<SuperAdminAppointments />} />
                <Route path="/super-admin/notification-messages" element={<NotificationMessages />} />
                <Route path="/super-admin/billing" element={<SuperAdminBilling />} />
                <Route path="/super-admin/our-services" element={<OurServices />} />
                <Route path="/super-admin/subscription" element={<Subscription />} />
                <Route path="/super-admin/care-manager" element={<CareManager />} />
                <Route path="/super-admin/settings" element={<Settings />} />
            </Route>

            {/* USER / CLIENT ROUTES */}
            <Route element={<ProtectedRoute allowedRoles={['USER', 'CLIENT']} />}>
                <Route path="/user/dashboard" element={<UserDashboard />} />
                <Route path="/user/sponsored-services" element={<SponsoredServices />} />
                <Route path="/user/care-services" element={<CareServices />} />
                <Route path="/user/home-care-services" element={<HomeCareServices />} />
                <Route path="/user/my-records" element={<MyRecords />} />
            </Route>

            {/* DEPENDENT ROUTES */}
            <Route element={<ProtectedRoute allowedRoles={['DEPENDENT']} />}>
                <Route path="/dependent/dashboard" element={<DependentDashboard />} />
                <Route path="/dependent/parents-sponsored-services" element={<ParentsSponsoredServices />} />
                <Route path="/dependent/parents-care-services" element={<ParentsCareServices />} />
                <Route path="/dependent/parents-home-care-services" element={<ParentsHomeCareServices />} />
                <Route path="/dependent/my-parent-records" element={<MyParentRecords />} />
            </Route>

            {/* SERVICE PROVIDER ROUTES */}
            <Route element={<ProtectedRoute allowedRoles={['PROVIDER', 'SERVICE_PROVIDER', 'PROVIDERADMIN']} />}>
                <Route path="/service-provider/dashboard" element={<ServiceProviderDashboard />} />
                <Route path="/service-provider/my-caregiver" element={<MyCareGiver />} />
                <Route path="/service-provider/service-requests-status" element={<ServiceProviderServiceRequestStatus />} />
                <Route path="/service-provider/appointments" element={<ServiceProviderAppointments />} />
                <Route path="/service-provider/reports" element={<ServiceProviderReports />} />
                <Route path="/service-provider/billing" element={<ServiceProviderBilling />} />
            </Route>

            {/* CARE GIVER ROUTES */}
            <Route element={<ProtectedRoute allowedRoles={['CAREGIVER', 'CARE_GIVER']} />}>
                <Route path="/care-giver/dashboard" element={<CareGiverDashboard />} />
                <Route path="/care-giver/my-clients" element={<MyClients />} />
                <Route path="/care-giver/service-request-status" element={<CareGiverServiceRequestStatus />} />
                <Route path="/care-giver/appointments" element={<CareGiverAppointments />} />
                <Route path="/care-giver/reports" element={<CareGiverReports />} />
            </Route>

            {/* CARE MANAGER ROUTES */}
            <Route element={<ProtectedRoute allowedRoles={['CAREMANAGER', 'CARE_MANAGER']} />}>
                <Route path="/care-manager/dashboard" element={<CareManagerDashboard />} />
                <Route path="/care-manager/my-service-providers" element={<CareManagerMyServiceProvider />} />
                <Route path="/care-manager/service-request-status" element={<CareManagerServiceRequestStatus />} />
                <Route path="/care-manager/appointments" element={<CareManagerAppointments />} />
                <Route path="/care-manager/reports" element={<CareManagerReports />} />
                <Route path="/care-manager/billing" element={<CareManagerBilling />} />
            </Route>

        </Routes>
    );
}
