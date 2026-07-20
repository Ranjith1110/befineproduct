import AppointmentsCom from '../../components/super-admin/appointments/SuperAdminAppointmentsCom';
import { SuperAdminLayout } from '../../layouts/SuperAdminLayout';


const Appointments = () => {
    return (
        <SuperAdminLayout>
            <AppointmentsCom />
        </SuperAdminLayout>
    );
};

export default Appointments;