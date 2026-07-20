import { Routes, Route } from 'react-router-dom';
import OverView from '../pages/super-admin/OverView';
import Client from '../pages/super-admin/Client';
import ServicesProviders from '../pages/super-admin/ServicesProviders';
import SuperAdminAppointments from '../pages/super-admin/SuperAdminAppointments';
import NotificationMessages from '../pages/super-admin/NotificationMessages';
import SuperAdminBilling from '../pages/super-admin/SuperAdminBilling';
import OurServices from '../pages/super-admin/OurServices';
import Subscription from '../pages/super-admin/Subscription';
import CareManager from '../pages/super-admin/CareManager';

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

export function AppRoutes() {
    return (
        <Routes>
            {/* Super Admin Routes */}
            <Route path="/" element={<OverView />} />
            <Route path="/super-admin/clients" element={<Client />} />
            <Route path="/super-admin/services-providers" element={<ServicesProviders />} />
            <Route path="/super-admin/appointments" element={<SuperAdminAppointments />} />
            <Route path="/super-admin/notification-messages" element={<NotificationMessages />} />
            <Route path="/super-admin/billing" element={<SuperAdminBilling />} />
            <Route path="/super-admin/our-services" element={<OurServices />} />
            <Route path="/super-admin/subscription" element={<Subscription />} />
            <Route path="/super-admin/care-manager" element={<CareManager />} />

            {/* User Routes */}
            <Route path="/user/dashboard" element={<UserDashboard />} />
            <Route path="/user/sponsored-services" element={<SponsoredServices />} />
            <Route path="/user/care-services" element={<CareServices />} />
            <Route path="/user/home-care-services" element={<HomeCareServices />} />
            <Route path="/user/my-records" element={<MyRecords />} />
            
            {/* Dependent Routes */}
            <Route path="/dependent/dashboard" element={<DependentDashboard />} />
            <Route path="/dependent/parents-sponsored-services" element={<ParentsSponsoredServices />} />
            <Route path="/dependent/parents-care-services" element={<ParentsCareServices />} />
            <Route path="/dependent/parents-home-care-services" element={<ParentsHomeCareServices />} />
            <Route path="/dependent/my-parent-records" element={<MyParentRecords />} />
            
            {/* Service Provider Routes */}
            <Route path="/service-provider/dashboard" element={<ServiceProviderDashboard />} />
            <Route path="/service-provider/my-caregiver" element={<MyCareGiver />} />
            <Route path="/service-provider/service-requests-status" element={<ServiceProviderServiceRequestStatus />} />
            <Route path="/service-provider/appointments" element={<ServiceProviderAppointments />} />
            <Route path="/service-provider/reports" element={<ServiceProviderReports />} />
            <Route path="/service-provider/billing" element={<ServiceProviderBilling />} />

            {/* Care Giver Routes */}
            <Route path="/care-giver/dashboard" element={<CareGiverDashboard />} />
            <Route path="/care-giver/my-clients" element={<MyClients />} />
            <Route path="/care-giver/service-request-status" element={<CareGiverServiceRequestStatus />} />
            <Route path="/care-giver/appointments" element={<CareGiverAppointments />} />
            <Route path="/care-giver/reports" element={<CareGiverReports />} />
            
        </Routes>
    );
}