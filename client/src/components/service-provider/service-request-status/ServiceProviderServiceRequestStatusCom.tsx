import { useState } from 'react';
import {
    Search,
    Filter,
    Calendar,
    Clock,
    MapPin,
    UserCircle,
    UserPlus,
    ClipboardList,
    AlertCircle,
    CheckCircle2,
    Activity,
    X,
    Check,
    MoreVertical
} from 'lucide-react';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import { Badge } from '../../ui/Badge';
import { Select } from '../../ui/Select';

const mockRequests = [
    {
        id: 'REQ-1042',
        patient: 'Eleanor Pena',
        dependentOf: 'Jane Doe',
        service: 'Skilled Nursing Care',
        date: 'Jul 21, 2026',
        time: '09:00 AM',
        location: 'Koramangala, Bengaluru',
        caregiver: null,
        status: 'pending'
    },
    {
        id: 'REQ-1043',
        patient: 'Ralph Edwards',
        dependentOf: 'Jane Doe',
        service: 'Physical Therapy',
        date: 'Jul 22, 2026',
        time: '11:30 AM',
        location: 'Indiranagar, Bengaluru',
        caregiver: 'Michael Chen',
        status: 'assigned'
    },
    {
        id: 'REQ-1044',
        patient: 'Alice Smith',
        dependentOf: 'Self',
        service: 'Post-Op Wound Care',
        date: 'Jul 20, 2026',
        time: '02:00 PM',
        location: 'Whitefield, Bengaluru',
        caregiver: 'Sarah Jenkins',
        status: 'in-progress'
    },
    {
        id: 'REQ-1045',
        patient: 'Robert Fox',
        dependentOf: 'Self',
        service: 'Daily Living Assistance',
        date: 'Jul 19, 2026',
        time: '08:00 AM',
        location: 'Jayanagar, Bengaluru',
        caregiver: 'Emily Davis',
        status: 'completed'
    }
];

const mockCaregivers = [
    { label: 'Select a caregiver...', value: '' },
    { label: 'Sarah Jenkins (Registered Nurse)', value: 'cg-1' },
    { label: 'Michael Chen (Physical Therapist)', value: 'cg-2' },
    { label: 'Emily Davis (Care Aide)', value: 'cg-3' },
    { label: 'Robert Wilson (Registered Nurse)', value: 'cg-4' }
];

const ServiceRequestStatusCom = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState<any>(null);

    const handleManageRequest = (request: any) => {
        setSelectedRequest(request);
        setIsModalOpen(true);
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'pending': return <Badge variant="warning" className="text-[10px] px-2 py-0.5">Pending Assignment</Badge>;
            case 'assigned': return <Badge variant="primary" className="text-[10px] px-2 py-0.5">Assigned</Badge>;
            case 'in-progress': return <Badge variant="success" className="text-[10px] px-2 py-0.5">In Progress</Badge>;
            case 'completed': return <Badge variant="secondary" className="text-[10px] px-2 py-0.5 text-slate-600">Completed</Badge>;
            default: return <Badge variant="secondary" className="text-[10px] px-2 py-0.5">Unknown</Badge>;
        }
    };

    return (
        <div className="flex flex-col gap-4 max-w-[1400px] mx-auto w-full relative pb-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 font-heading tracking-tight mb-0">
                        Service Requests & Status
                    </h1>
                    <p className="text-xs font-medium text-slate-500 mt-1">
                        Manage incoming client requests, assign caregivers, and track appointment statuses.
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-56 hidden md:block">
                        <Input
                            placeholder="Search request ID or patient..."
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
                        <ClipboardList size={20} />
                    </div>
                    <div>
                        <div className="text-xl font-bold text-slate-800">124</div>
                        <div className="text-xs font-medium text-slate-500">Total Requests</div>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center">
                        <AlertCircle size={20} />
                    </div>
                    <div>
                        <div className="text-xl font-bold text-slate-800">12</div>
                        <div className="text-xs font-medium text-slate-500">Pending Assignment</div>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                        <Activity size={20} />
                    </div>
                    <div>
                        <div className="text-xl font-bold text-slate-800">28</div>
                        <div className="text-xs font-medium text-slate-500">In Progress</div>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                        <CheckCircle2 size={20} />
                    </div>
                    <div>
                        <div className="text-xl font-bold text-slate-800">84</div>
                        <div className="text-xs font-medium text-slate-500">Completed</div>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden flex flex-col">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/50 border-b border-slate-100">
                                <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Patient & Service</th>
                                <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Schedule</th>
                                <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Assigned Caregiver</th>
                                <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                                <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {mockRequests.map((req) => (
                                <tr key={req.id} className="hover:bg-slate-50/50 transition-colors group">
                                    <td className="px-4 py-3">
                                        <div className="text-sm font-bold text-slate-900">{req.patient}</div>
                                        <div className="text-[10px] font-bold text-primary mt-0.5">{req.service}</div>
                                        <div className="text-[10px] font-medium text-slate-500 mt-0.5">ID: {req.id}</div>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex flex-col gap-1">
                                            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
                                                <Calendar size={12} className="text-slate-400" />
                                                {req.date}
                                            </div>
                                            <div className="flex items-center gap-1.5 text-[10px] font-medium text-slate-600">
                                                <Clock size={12} className="text-slate-400" />
                                                {req.time}
                                            </div>
                                            <div className="flex items-center gap-1.5 text-[10px] font-medium text-slate-500">
                                                <MapPin size={12} className="text-slate-400" />
                                                <span className="truncate max-w-[120px]">{req.location}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3">
                                        {req.caregiver ? (
                                            <div className="flex items-center gap-2">
                                                <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[10px] font-bold">
                                                    {req.caregiver.charAt(0)}
                                                </div>
                                                <span className="text-xs font-semibold text-slate-800">{req.caregiver}</span>
                                            </div>
                                        ) : (
                                            <button
                                                onClick={() => handleManageRequest(req)}
                                                className="flex items-center gap-1.5 text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded-md hover:bg-amber-100 transition-colors"
                                            >
                                                <UserPlus size={12} /> Assign Staff
                                            </button>
                                        )}
                                    </td>
                                    <td className="px-4 py-3">
                                        {getStatusBadge(req.status)}
                                    </td>
                                    <td className="px-4 py-3 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Button
                                                variant="secondary"
                                                size="sm"
                                                className="h-7 text-[10px] px-2.5"
                                                onClick={() => handleManageRequest(req)}
                                            >
                                                Manage
                                            </Button>
                                            <button className="p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded transition-colors">
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
                    <span>Showing 1 to 4 of 124 requests</span>
                    <div className="flex gap-1">
                        <Button variant="ghost" size="sm" disabled className="h-7 text-xs px-2">Prev</Button>
                        <Button variant="ghost" size="sm" className="bg-primary/10 text-primary h-7 text-xs px-2.5">1</Button>
                        <Button variant="ghost" size="sm" className="h-7 text-xs px-2.5">2</Button>
                        <Button variant="ghost" size="sm" className="h-7 text-xs px-2">Next</Button>
                    </div>
                </div>
            </div>

            {isModalOpen && selectedRequest && (
                <>
                    <div
                        className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 transition-opacity"
                        onClick={() => setIsModalOpen(false)}
                    />
                    <div className="fixed inset-y-0 right-0 z-50 w-full md:w-[500px] bg-white shadow-2xl transform transition-transform duration-300 flex flex-col">
                        <div className="flex items-center justify-between p-5 border-b border-slate-100">
                            <div>
                                <h2 className="text-lg font-bold text-slate-900 tracking-tight">Manage Service Request</h2>
                                <p className="text-xs font-medium text-slate-500">Update status or assign personnel for {selectedRequest.id}</p>
                            </div>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setIsModalOpen(false)}
                                className="p-1.5 text-slate-400 hover:text-slate-700 bg-slate-50 hover:bg-slate-100 rounded-full"
                            >
                                <X size={18} />
                            </Button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-5 space-y-5 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-200 [&::-webkit-scrollbar-thumb]:rounded-full">

                            <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 grid grid-cols-2 gap-4">
                                <div>
                                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Patient</div>
                                    <div className="text-sm font-bold text-slate-800">{selectedRequest.patient}</div>
                                </div>
                                <div>
                                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Service Requested</div>
                                    <div className="text-sm font-bold text-primary">{selectedRequest.service}</div>
                                </div>
                                <div>
                                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Date & Time</div>
                                    <div className="text-xs font-bold text-slate-700">{selectedRequest.date} at {selectedRequest.time}</div>
                                </div>
                                <div>
                                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Location</div>
                                    <div className="text-xs font-bold text-slate-700 truncate">{selectedRequest.location}</div>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                                    <span className="w-5 h-5 rounded bg-primary/10 text-primary flex items-center justify-center text-[10px]">1</span>
                                    Caregiver Assignment
                                </h3>
                                <div className="grid grid-cols-1 gap-3">
                                    <Select
                                        label="Assign to Caregiver"
                                        options={mockCaregivers}
                                        defaultValue={selectedRequest.caregiver ? 'cg-1' : ''}
                                    />
                                </div>
                                {!selectedRequest.caregiver && (
                                    <div className="bg-amber-50 p-3 rounded-lg border border-amber-100 mt-1 flex gap-2">
                                        <AlertCircle size={14} className="text-amber-600 shrink-0 mt-0.5" />
                                        <p className="text-[11px] font-medium text-amber-800">
                                            This request is currently unassigned. Please select an available caregiver to secure this appointment.
                                        </p>
                                    </div>
                                )}
                            </div>

                            <div className="w-full h-px bg-slate-100"></div>

                            <div className="space-y-3">
                                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                                    <span className="w-5 h-5 rounded bg-primary/10 text-primary flex items-center justify-center text-[10px]">2</span>
                                    Update Status
                                </h3>
                                <div className="grid grid-cols-1 gap-3">
                                    <Select
                                        label="Current Status"
                                        defaultValue={selectedRequest.status}
                                        options={[
                                            { label: 'Pending Assignment', value: 'pending' },
                                            { label: 'Assigned', value: 'assigned' },
                                            { label: 'In Progress', value: 'in-progress' },
                                            { label: 'Completed', value: 'completed' },
                                        ]}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-end gap-3">
                            <Button variant="ghost" size="sm" onClick={() => setIsModalOpen(false)}>
                                Cancel
                            </Button>
                            <Button size="sm" leftIcon={<Check size={16} />}>
                                Save Updates
                            </Button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default ServiceRequestStatusCom;