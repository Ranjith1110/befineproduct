import {
    Search,
    Filter,
    Calendar,
    Clock,
    MapPin,
    CalendarCheck,
    CalendarClock,
    CalendarX,
    MoreVertical,
    Eye
} from 'lucide-react';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import { Badge } from '../../ui/Badge';

const mockAppointments = [
    {
        id: 'APT-2042',
        patient: 'Eleanor Pena',
        service: 'Skilled Nursing Care',
        date: 'Jul 21, 2026',
        time: '09:00 AM',
        location: 'Koramangala, Bengaluru',
        assignedTo: { name: 'Sarah Jenkins', role: 'Registered Nurse', avatar: 'S' },
        status: 'upcoming'
    },
    {
        id: 'APT-2043',
        patient: 'Ralph Edwards',
        service: 'Physical Therapy',
        date: 'Jul 22, 2026',
        time: '11:30 AM',
        location: 'Indiranagar, Bengaluru',
        assignedTo: { name: 'Michael Chen', role: 'Physical Therapist', avatar: 'M' },
        status: 'upcoming'
    },
    {
        id: 'APT-2044',
        patient: 'Alice Smith',
        service: 'Post-Op Wound Care',
        date: 'Jul 20, 2026',
        time: '02:00 PM',
        location: 'Whitefield, Bengaluru',
        assignedTo: { name: 'Sarah Jenkins', role: 'Registered Nurse', avatar: 'S' },
        status: 'completed'
    },
    {
        id: 'APT-2045',
        patient: 'Robert Fox',
        service: 'Daily Living Assistance',
        date: 'Jul 19, 2026',
        time: '08:00 AM',
        location: 'Jayanagar, Bengaluru',
        assignedTo: { name: 'Emily Davis', role: 'Care Aide', avatar: 'E' },
        status: 'completed'
    },
    {
        id: 'APT-2046',
        patient: 'Jane Cooper',
        service: 'Routine Checkup',
        date: 'Jul 23, 2026',
        time: '10:00 AM',
        location: 'HSR Layout, Bengaluru',
        assignedTo: { name: 'Robert Wilson', role: 'Registered Nurse', avatar: 'R' },
        status: 'cancelled'
    }
];

const SweviceProviderAppointments = () => {
    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'upcoming': return <Badge variant="primary" className="text-[10px] px-2 py-0.5">Upcoming</Badge>;
            case 'completed': return <Badge variant="success" className="text-[10px] px-2 py-0.5">Completed</Badge>;
            case 'cancelled': return <Badge variant="danger" className="text-[10px] px-2 py-0.5">Cancelled</Badge>;
            default: return <Badge variant="secondary" className="text-[10px] px-2 py-0.5">Unknown</Badge>;
        }
    };

    return (
        <div className="flex flex-col gap-4 max-w-[1400px] mx-auto w-full relative pb-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 font-heading tracking-tight mb-0">
                        Appointments Schedule
                    </h1>
                    <p className="text-xs font-medium text-slate-500 mt-1">
                        View all scheduled visits, patient details, and staff assignments.
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-56 hidden md:block">
                        <Input
                            placeholder="Search patient or ID..."
                            leftIcon={<Search size={16} />}
                            className="bg-white border-transparent shadow-sm text-sm h-9"
                        />
                    </div>
                    <Button variant="outline" size="sm" leftIcon={<Filter size={14} />}>
                        Filter
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                        <Calendar size={20} />
                    </div>
                    <div>
                        <div className="text-xl font-bold text-slate-800">156</div>
                        <div className="text-xs font-medium text-slate-500">Total Appointments</div>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center">
                        <CalendarClock size={20} />
                    </div>
                    <div>
                        <div className="text-xl font-bold text-slate-800">42</div>
                        <div className="text-xs font-medium text-slate-500">Upcoming Visits</div>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                        <CalendarCheck size={20} />
                    </div>
                    <div>
                        <div className="text-xl font-bold text-slate-800">108</div>
                        <div className="text-xs font-medium text-slate-500">Completed</div>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center">
                        <CalendarX size={20} />
                    </div>
                    <div>
                        <div className="text-xl font-bold text-slate-800">6</div>
                        <div className="text-xs font-medium text-slate-500">Cancelled</div>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden flex flex-col">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/50 border-b border-slate-100">
                                <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Patient & Details</th>
                                <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Date & Time</th>
                                <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Assigned Caregiver</th>
                                <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Location</th>
                                <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                                <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {mockAppointments.map((apt) => (
                                <tr key={apt.id} className="hover:bg-slate-50/50 transition-colors group">
                                    <td className="px-4 py-3">
                                        <div className="text-sm font-bold text-slate-900">{apt.patient}</div>
                                        <div className="text-[10px] font-bold text-primary mt-0.5">{apt.service}</div>
                                        <div className="text-[10px] font-medium text-slate-500 mt-0.5">ID: {apt.id}</div>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex flex-col gap-1.5">
                                            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
                                                <Calendar size={12} className="text-slate-400" />
                                                {apt.date}
                                            </div>
                                            <div className="flex items-center gap-1.5 text-[10px] font-medium text-slate-600">
                                                <Clock size={12} className="text-slate-400" />
                                                {apt.time}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-2.5">
                                            <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[11px] font-bold shrink-0">
                                                {apt.assignedTo.avatar}
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-xs font-bold text-slate-800">{apt.assignedTo.name}</span>
                                                <span className="text-[10px] font-medium text-slate-500">{apt.assignedTo.role}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-600">
                                            <MapPin size={12} className="text-slate-400 shrink-0" />
                                            <span className="line-clamp-2 max-w-[140px] leading-tight">{apt.location}</span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3">
                                        {getStatusBadge(apt.status)}
                                    </td>
                                    <td className="px-4 py-3 text-right">
                                        <div className="flex items-center justify-end gap-1">
                                            <button 
                                                className="p-1.5 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors" 
                                                title="View Details"
                                            >
                                                <Eye size={14} />
                                            </button>
                                            <button className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors">
                                                <MoreVertical size={14} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="p-3 border-t border-slate-100 flex items-center justify-between text-xs font-medium text-slate-500">
                    <span>Showing 1 to 5 of 156 appointments</span>
                    <div className="flex gap-1">
                        <Button variant="ghost" size="sm" disabled className="h-7 text-xs px-2">Prev</Button>
                        <Button variant="ghost" size="sm" className="bg-primary/10 text-primary h-7 text-xs px-2.5">1</Button>
                        <Button variant="ghost" size="sm" className="h-7 text-xs px-2.5">2</Button>
                        <Button variant="ghost" size="sm" className="h-7 text-xs px-2.5">3</Button>
                        <Button variant="ghost" size="sm" className="h-7 text-xs px-2">Next</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SweviceProviderAppointments;