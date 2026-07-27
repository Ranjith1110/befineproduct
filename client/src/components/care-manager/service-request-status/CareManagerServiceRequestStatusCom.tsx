import { useState } from 'react';
import {
    Search,
    Filter,
    Calendar,
    Clock,
    MapPin,
    ClipboardList,
    CheckCircle2,
    Activity,
    X,
    Check,
    MoreVertical,
    Building2,
    UserCircle,
    AlertCircle,
    UserPlus
} from 'lucide-react';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import { Badge } from '../../ui/Badge';
import { Select } from '../../ui/Select';

const mockGlobalRequests = [
    {
        id: 'REQ-8042',
        patient: 'Eleanor Pena',
        service: 'Skilled Nursing Care',
        date: 'Jul 27, 2026',
        time: '09:00 AM',
        location: 'Koramangala, Bengaluru',
        provider: 'Apex Healthcare',
        caregiver: 'Sarah Jenkins',
        status: 'completed'
    },
    {
        id: 'REQ-8044',
        patient: 'Alice Smith',
        service: 'Post-Op Wound Care',
        date: 'Jul 28, 2026',
        time: '11:30 AM',
        location: 'Whitefield, Bengaluru',
        provider: 'Guardian Home Care',
        caregiver: null,
        status: 'assigned'
    },
    {
        id: 'REQ-8047',
        patient: 'Robert Fox',
        service: 'Medication Administration',
        date: 'Jul 29, 2026',
        time: '02:00 PM',
        location: 'Jayanagar, Bengaluru',
        provider: null,
        caregiver: null,
        status: 'pending'
    },
    {
        id: 'REQ-8049',
        patient: 'Jane Cooper',
        service: 'Daily Living Assistance',
        date: 'Jul 30, 2026',
        time: '10:00 AM',
        location: 'HSR Layout, Bengaluru',
        provider: 'Serenity Senior Solutions',
        caregiver: 'Emily Davis',
        status: 'in-progress'
    }
];

const providerOptions = [
    { label: 'Select a Service Provider...', value: '' },
    { label: 'Apex Healthcare Partners', value: 'prv-1' },
    { label: 'Guardian Home Care', value: 'prv-2' },
    { label: 'Serenity Senior Solutions', value: 'prv-3' },
    { label: 'Vitality Medical Group', value: 'prv-4' }
];

const CareManagerServiceRequestStatusCom = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState<any>(null);

    const handleManageRequest = (request: any) => {
        setSelectedRequest(request);
        setIsModalOpen(true);
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'pending': return <Badge variant="warning" className="text-[10px] px-2 py-0.5">Pending Route</Badge>;
            case 'assigned': return <Badge variant="secondary" className="text-[10px] px-2 py-0.5 text-slate-700">Provider Assigned</Badge>;
            case 'in-progress': return <Badge variant="primary" className="text-[10px] px-2 py-0.5">In Progress</Badge>;
            case 'completed': return <Badge variant="success" className="text-[10px] px-2 py-0.5">Completed</Badge>;
            default: return <Badge variant="secondary" className="text-[10px] px-2 py-0.5">Unknown</Badge>;
        }
    };

    return (
        <div className="flex flex-col gap-4 max-w-[1400px] mx-auto w-full relative pb-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 font-heading tracking-tight mb-0">
                        Global Service Requests
                    </h1>
                    <p className="text-xs font-medium text-slate-500 mt-1">
                        Monitor patient requests, track provider routing, and verify caregiver assignments network-wide.
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-56 hidden md:block">
                        <Input
                            placeholder="Search by ID or Patient..."
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
                        <div className="text-xl font-bold text-slate-800">1,284</div>
                        <div className="text-xs font-medium text-slate-500">Total Requests (MTD)</div>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center">
                        <AlertCircle size={20} />
                    </div>
                    <div>
                        <div className="text-xl font-bold text-slate-800">18</div>
                        <div className="text-xs font-medium text-slate-500">Pending Routing</div>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                        <Activity size={20} />
                    </div>
                    <div>
                        <div className="text-xl font-bold text-slate-800">156</div>
                        <div className="text-xs font-medium text-slate-500">Active / In-Progress</div>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                        <CheckCircle2 size={20} />
                    </div>
                    <div>
                        <div className="text-xl font-bold text-slate-800">1,110</div>
                        <div className="text-xs font-medium text-slate-500">Completed Successfully</div>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden flex flex-col">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/50 border-b border-slate-100">
                                <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Patient Request</th>
                                <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Appointment Schedule</th>
                                <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Assigned Teams</th>
                                <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                                <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {mockGlobalRequests.map((req) => (
                                <tr key={req.id} className="hover:bg-slate-50/50 transition-colors group">
                                    <td className="px-4 py-3">
                                        <div className="text-sm font-bold text-slate-900">{req.patient}</div>
                                        <div className="text-[10px] font-bold text-primary mt-0.5">{req.service}</div>
                                        <div className="text-[10px] font-medium text-slate-500 mt-0.5">ID: {req.id}</div>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex flex-col gap-1.5">
                                            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
                                                <Calendar size={12} className="text-slate-400" />
                                                {req.date}
                                            </div>
                                            <div className="flex items-center gap-1.5 text-[10px] font-medium text-slate-600">
                                                <Clock size={12} className="text-slate-400" />
                                                {req.time}
                                            </div>
                                            <div className="flex items-center gap-1.5 text-[10px] font-medium text-slate-600">
                                                <MapPin size={12} className="text-slate-400 shrink-0" />
                                                <span className="truncate max-w-[140px] leading-tight">{req.location}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex flex-col gap-2">
                                            {req.provider ? (
                                                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-800">
                                                    <Building2 size={12} className="text-indigo-500" />
                                                    <span className="truncate max-w-[150px]">{req.provider}</span>
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-1.5 text-[10px] font-bold text-amber-600">
                                                    <AlertCircle size={12} /> Pending Provider Route
                                                </div>
                                            )}

                                            {req.caregiver ? (
                                                <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-600">
                                                    <UserCircle size={12} className="text-slate-400" />
                                                    {req.caregiver}
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-1.5 text-[10px] font-medium text-slate-400 italic">
                                                    <UserPlus size={10} /> Staff Unassigned
                                                </div>
                                            )}
                                        </div>
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
                    <span>Showing 1 to 4 of 1,284 requests</span>
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
                                <h2 className="text-lg font-bold text-slate-900 tracking-tight">Manage Global Request</h2>
                                <p className="text-xs font-medium text-slate-500">Route and track request {selectedRequest.id}</p>
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
                                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Patient Details</div>
                                    <div className="text-sm font-bold text-slate-800">{selectedRequest.patient}</div>
                                </div>
                                <div>
                                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Service Requested</div>
                                    <div className="text-sm font-bold text-primary">{selectedRequest.service}</div>
                                </div>
                                <div>
                                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Appt Date & Time</div>
                                    <div className="text-xs font-bold text-slate-700">{selectedRequest.date} at {selectedRequest.time}</div>
                                </div>
                                <div>
                                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Service Location</div>
                                    <div className="text-xs font-bold text-slate-700 truncate">{selectedRequest.location}</div>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                                    <span className="w-5 h-5 rounded bg-primary/10 text-primary flex items-center justify-center text-[10px]">1</span>
                                    Provider Routing
                                </h3>
                                <div className="grid grid-cols-1 gap-3">
                                    <Select
                                        label="Assign Service Provider Agency"
                                        options={providerOptions}
                                        defaultValue={selectedRequest.provider ? 'prv-1' : ''}
                                    />
                                </div>
                                {!selectedRequest.provider && (
                                    <div className="bg-amber-50 p-3 rounded-lg border border-amber-100 mt-1 flex gap-2">
                                        <AlertCircle size={14} className="text-amber-600 shrink-0 mt-0.5" />
                                        <p className="text-[11px] font-medium text-amber-800">
                                            Select an active agency from the network to fulfill this service request. The agency will then allocate specific staff.
                                        </p>
                                    </div>
                                )}
                            </div>

                            <div className="w-full h-px bg-slate-100"></div>

                            <div className="space-y-3">
                                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                                    <span className="w-5 h-5 rounded bg-primary/10 text-primary flex items-center justify-center text-[10px]">2</span>
                                    Update Global Status
                                </h3>
                                <div className="grid grid-cols-1 gap-3">
                                    <Select
                                        label="System Status"
                                        defaultValue={selectedRequest.status}
                                        options={[
                                            { label: 'Pending Provider Route', value: 'pending' },
                                            { label: 'Provider Assigned', value: 'assigned' },
                                            { label: 'In Progress / Active', value: 'in-progress' },
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
                                Apply Updates
                            </Button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default CareManagerServiceRequestStatusCom;