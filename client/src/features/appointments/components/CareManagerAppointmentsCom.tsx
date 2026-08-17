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
    Eye,
    Building2,
    UserCircle,
    UserPlus
} from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { Badge } from '../../../components/ui/Badge';

const mockGlobalAppointments = [
    {
        id: 'APT-8042',
        patient: 'Eleanor Pena',
        service: 'Skilled Nursing Care',
        date: 'Jul 28, 2026',
        time: '09:00 AM',
        location: 'Koramangala, Bengaluru',
        provider: 'Apex Healthcare Partners',
        caregiver: 'Sarah Jenkins',
        status: 'upcoming'
    },
    {
        id: 'APT-8043',
        patient: 'Ralph Edwards',
        service: 'Physical Therapy',
        date: 'Jul 28, 2026',
        time: '11:30 AM',
        location: 'Indiranagar, Bengaluru',
        provider: 'Vitality Medical Group',
        caregiver: 'Michael Chen',
        status: 'upcoming'
    },
    {
        id: 'APT-8044',
        patient: 'Alice Smith',
        service: 'Post-Op Wound Care',
        date: 'Jul 29, 2026',
        time: '10:00 AM',
        location: 'Whitefield, Bengaluru',
        provider: 'Guardian Home Care',
        caregiver: null,
        status: 'pending-staff'
    },
    {
        id: 'APT-8030',
        patient: 'Jane Cooper',
        service: 'Daily Living Assistance',
        date: 'Jul 27, 2026',
        time: '08:00 AM',
        location: 'HSR Layout, Bengaluru',
        provider: 'Serenity Senior Solutions',
        caregiver: 'Emily Davis',
        status: 'completed'
    },
    {
        id: 'APT-8035',
        patient: 'Robert Fox',
        service: 'Routine Checkup',
        date: 'Jul 26, 2026',
        time: '04:00 PM',
        location: 'Jayanagar, Bengaluru',
        provider: 'Apex Healthcare Partners',
        caregiver: 'Sarah Jenkins',
        status: 'cancelled'
    }
];

const CareManagerAppointmentsCom = () => {
    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'upcoming': return <Badge variant="primary" className="text-[10px] px-2 py-0.5">Upcoming</Badge>;
            case 'pending-staff': return <Badge variant="warning" className="text-[10px] px-2 py-0.5">Staff Pending</Badge>;
            case 'completed': return <Badge variant="success" className="text-[10px] px-2 py-0.5">Completed</Badge>;
            case 'cancelled': return <Badge variant="danger" className="text-[10px] px-2 py-0.5">Cancelled</Badge>;
            default: return <Badge variant="secondary" className="text-[10px] px-2 py-0.5">Unknown</Badge>;
        }
    };

    return (
        <div className="flex flex-col gap-4 max-w-[1400px] mx-auto w-full relative pb-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 font-heading tracking-tight mb-0 flex items-center gap-2">
                        Global Appointments
                    </h1>
                    <p className="text-xs font-medium text-slate-500 mt-1">
                        Monitor network-wide schedules, provider allocations, and caregiver assignments.
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-56 hidden md:block">
                        <Input
                            placeholder="Search appointment or provider..."
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
                    <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center">
                        <Calendar size={20} />
                    </div>
                    <div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Total Network Visits</div>
                        <div className="text-xl font-bold text-slate-800">2,142</div>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                        <CalendarClock size={20} />
                    </div>
                    <div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Upcoming Schedules</div>
                        <div className="text-xl font-bold text-slate-800">418</div>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                        <CalendarCheck size={20} />
                    </div>
                    <div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Completed Successfully</div>
                        <div className="text-xl font-bold text-slate-800">1,692</div>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center">
                        <CalendarX size={20} />
                    </div>
                    <div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Cancelled / Missed</div>
                        <div className="text-xl font-bold text-slate-800">32</div>
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
                                <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Assigned Provider & Staff</th>
                                <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Location</th>
                                <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                                <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {mockGlobalAppointments.map((apt) => (
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
                                        <div className="flex flex-col gap-2">
                                            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-800">
                                                <Building2 size={12} className="text-indigo-500 shrink-0" />
                                                <span className="truncate max-w-[150px]">{apt.provider}</span>
                                            </div>
                                            {apt.caregiver ? (
                                                <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-600">
                                                    <UserCircle size={12} className="text-slate-400 shrink-0" />
                                                    {apt.caregiver}
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-1.5 text-[10px] font-medium text-amber-600">
                                                    <UserPlus size={12} className="shrink-0" />
                                                    Pending Staff Allocation
                                                </div>
                                            )}
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
                                        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
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
                    <span>Showing 1 to 5 of 2,142 appointments</span>
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

export default CareManagerAppointmentsCom;
