import { Routes, Route } from 'react-router-dom';
import OverView from '../pages/super-admin/OverView';
import Client from '../pages/super-admin/Client';
import ServicesProviders from '../pages/super-admin/ServicesProviders';
import Appointments from '../pages/super-admin/Appointments';
import NotificationMessages from '../pages/super-admin/NotificationMessages';
import Billing from '../pages/super-admin/Billing';
import OurServices from '../pages/super-admin/OurServices';
import Subscription from '../pages/super-admin/Subscription';
import CareManager from '../pages/super-admin/CareManager';

export function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<OverView />} />
            <Route path="/clients" element={<Client />} />
            <Route path="/services-providers" element={<ServicesProviders />} />
            <Route path="/appointments" element={<Appointments />} />
            <Route path="/notification-messages" element={<NotificationMessages />} />
            <Route path="/billing" element={<Billing />} />
            <Route path="/our-services" element={<OurServices />} />
            <Route path="/subscription" element={<Subscription />} />
            <Route path="/care-manager" element={<CareManager />} />
            
        </Routes>
    );
}