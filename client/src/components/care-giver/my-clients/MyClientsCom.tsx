import { useState } from 'react';
import {
    Search,
    Filter,
    Users,
    Activity,
    HeartPulse,
    Calendar,
    MapPin,
    FileText,
    AlertCircle,
    X,
    Shield,
    Phone,
    ClipboardList,
    Stethoscope
} from 'lucide-react';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import { Badge } from '../../ui/Badge';

const mockClients = [
    {
        id: 'PT-1042',
        name: 'Eleanor Pena',
        age: 72,
        gender: 'Female',
        service: 'Skilled Nursing Care',
        condition: 'Hypertension, Post-Stroke Recovery',
        status: 'stable',
        nextVisit: 'Today, 09:00 AM',
        address: 'Koramangala, Bengaluru',
        phone: '+91 98765 43210',
        emergencyContact: 'Jane Doe (Daughter)',
        carePlan: 'Daily vitals monitoring, BP medication administration, mobility assistance.'
    },
    {
        id: 'PT-1043',
        name: 'Alice Smith',
        age: 65,
        gender: 'Female',
        service: 'Post-Op Wound Care',
        condition: 'Knee Replacement Surgery',
        status: 'attention',
        nextVisit: 'Today, 11:30 AM',
        address: 'Whitefield, Bengaluru',
        phone: '+91 98765 43211',
        emergencyContact: 'John Smith (Son)',
        carePlan: 'Surgical dressing change, infection monitoring, pain management.'
    },
    {
        id: 'PT-1044',
        name: 'Robert Fox',
        age: 81,
        gender: 'Male',
        service: 'Medication Administration',
        condition: 'Type 2 Diabetes, Mild Dementia',
        status: 'stable',
        nextVisit: 'Today, 02:00 PM',
        address: 'Jayanagar, Bengaluru',
        phone: '+91 98765 43212',
        emergencyContact: 'Sarah Fox (Wife)',
        carePlan: 'Insulin administration, post-meal blood sugar tracking, cognitive engagement.'
    },
    {
        id: 'PT-1045',
        name: 'Jane Cooper',
        age: 68,
        gender: 'Female',
        service: 'Daily Living Assistance',
        condition: 'Osteoarthritis',
        status: 'stable',
        nextVisit: 'Tomorrow, 10:00 AM',
        address: 'HSR Layout, Bengaluru',
        phone: '+91 98765 43213',
        emergencyContact: 'Mark Cooper (Son)',
        carePlan: 'Assistance with bathing, dressing, and light mobility exercises.'
    }
];

const MyClientsCom = () => {
    const [isClientModalOpen, setIsClientModalOpen] = useState(false);
    const [selectedClient, setSelectedClient] = useState<any>(null);

    const handleViewClient = (client: any) => {
        setSelectedClient(client);
        setIsClientModalOpen(true);
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'stable': return <Badge variant="success" className="text-[10px] px-2 py-0.5">Stable</Badge>;
            case 'attention': return <Badge variant="warning" className="text-[10px] px-2 py-0.5">Needs Attention</Badge>;
            case 'critical': return <Badge variant="danger" className="text-[10px] px-2 py-0.5">Critical</Badge>;
            default: return <Badge variant="secondary" className="text-[10px] px-2 py-0.5">Unknown</Badge>;
        }
    };

    return (
        <div className="flex flex-col gap-4 max-w-[1400px] mx-auto w-full relative pb-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 font-heading tracking-tight mb-0 flex items-center gap-2">
                        My Assigned Clients
                    </h1>
                    <p className="text-xs font-medium text-slate-500 mt-1">
                        View and manage the patients currently assigned to your care roster.
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-56 hidden md:block">
                        <Input
                            placeholder="Search patient name or ID..."
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
                    <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                        <Users size={20} />
                    </div>
                    <div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Total Assigned</div>
                        <div className="text-xl font-black text-slate-800">12</div>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                        <HeartPulse size={20} />
                    </div>
                    <div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Stable Condition</div>
                        <div className="text-xl font-black text-slate-800">10</div>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                        <AlertCircle size={20} />
                    </div>
                    <div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Requires Attention</div>
                        <div className="text-xl font-black text-slate-800">2</div>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                        <Calendar size={20} />
                    </div>
                    <div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Visits Today</div>
                        <div className="text-xl font-black text-slate-800">4</div>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden flex flex-col">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/50 border-b border-slate-100">
                                <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Patient Profile</th>
                                <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Clinical Context</th>
                                <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Next Scheduled Visit</th>
                                <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                                <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {mockClients.map((client) => (
                                <tr key={client.id} className="hover:bg-slate-50/50 transition-colors group">
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-sm">
                                                {client.name.charAt(0)}
                                            </div>
                                            <div>
                                                <div className="text-sm font-bold text-slate-900">{client.name}</div>
                                                <div className="text-[10px] font-medium text-slate-500 mt-0.5 flex items-center gap-1.5">
                                                    <span>{client.id}</span>
                                                    <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                                                    <span>{client.age} yrs, {client.gender.charAt(0)}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="text-xs font-bold text-primary mb-0.5">{client.service}</div>
                                        <div className="text-[10px] font-medium text-slate-600 truncate max-w-[200px]">{client.condition}</div>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex flex-col gap-1.5">
                                            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
                                                <Calendar size={12} className="text-slate-400" />
                                                {client.nextVisit}
                                            </div>
                                            <div className="flex items-center gap-1.5 text-[10px] font-medium text-slate-500">
                                                <MapPin size={12} className="text-slate-400 shrink-0" />
                                                <span className="truncate max-w-[150px]">{client.address}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3">
                                        {getStatusBadge(client.status)}
                                    </td>
                                    <td className="px-4 py-3 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Button 
                                                variant="secondary" 
                                                size="sm" 
                                                className="h-7 text-[10px] px-2.5"
                                                onClick={() => handleViewClient(client)}
                                            >
                                                View Care Plan
                                            </Button>
                                            <button className="p-1.5 text-slate-400 hover:text-primary hover:bg-primary/10 rounded transition-colors" title="Quick Notes">
                                                <FileText size={14} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="p-3 border-t border-slate-100 flex items-center justify-between text-xs font-medium text-slate-500">
                    <span>Showing 1 to 4 of 12 assigned clients</span>
                    <div className="flex gap-1">
                        <Button variant="ghost" size="sm" disabled className="h-7 text-xs px-2">Prev</Button>
                        <Button variant="ghost" size="sm" className="bg-primary/10 text-primary h-7 text-xs px-2.5">1</Button>
                        <Button variant="ghost" size="sm" className="h-7 text-xs px-2.5">2</Button>
                        <Button variant="ghost" size="sm" className="h-7 text-xs px-2">Next</Button>
                    </div>
                </div>
            </div>

            {isClientModalOpen && selectedClient && (
                <>
                    <div
                        className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 transition-opacity"
                        onClick={() => setIsClientModalOpen(false)}
                    />
                    <div className="fixed inset-y-0 right-0 z-50 w-full md:w-[500px] bg-white shadow-2xl transform transition-transform duration-300 flex flex-col">
                        <div className="flex items-center justify-between p-5 border-b border-slate-100">
                            <div>
                                <h2 className="text-lg font-bold text-slate-900 tracking-tight">Patient Profile & Care Plan</h2>
                                <p className="text-xs font-medium text-slate-500">Clinical summary for {selectedClient.id}</p>
                            </div>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setIsClientModalOpen(false)}
                                className="p-1.5 text-slate-400 hover:text-slate-700 bg-slate-50 hover:bg-slate-100 rounded-full"
                            >
                                <X size={18} />
                            </Button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-5 space-y-6 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-200 [&::-webkit-scrollbar-thumb]:rounded-full">
                            
                            <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
                                <div className="w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xl shadow-sm shrink-0">
                                    {selectedClient.name.charAt(0)}
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-start">
                                        <h3 className="text-base font-bold text-slate-900">{selectedClient.name}</h3>
                                        {getStatusBadge(selectedClient.status)}
                                    </div>
                                    <div className="text-xs font-medium text-slate-500 mt-0.5">
                                        {selectedClient.age} Years Old • {selectedClient.gender}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                                    <span className="w-5 h-5 rounded bg-primary/10 text-primary flex items-center justify-center text-[10px]">1</span>
                                    Clinical Overview
                                </h3>
                                <div className="grid grid-cols-1 gap-3">
                                    <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm flex flex-col gap-1">
                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Primary Diagnosis / Condition</span>
                                        <span className="text-sm font-bold text-slate-800">{selectedClient.condition}</span>
                                    </div>
                                    <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm flex flex-col gap-1">
                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Active Care Plan</span>
                                        <span className="text-xs font-semibold text-primary mb-1">{selectedClient.service}</span>
                                        <p className="text-[11px] font-medium text-slate-600 leading-relaxed">
                                            {selectedClient.carePlan}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="w-full h-px bg-slate-100"></div>

                            <div className="space-y-3">
                                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                                    <span className="w-5 h-5 rounded bg-primary/10 text-primary flex items-center justify-center text-[10px]">2</span>
                                    Contact & Emergency
                                </h3>
                                <div className="grid grid-cols-1 gap-3">
                                    <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100">
                                        <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center shrink-0">
                                            <MapPin size={14} />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-bold text-slate-400 uppercase">Residence</span>
                                            <span className="text-xs font-semibold text-slate-800">{selectedClient.address}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between p-3 bg-rose-50 rounded-lg border border-rose-100">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                                                <Phone size={14} />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-[10px] font-bold text-rose-400 uppercase">Emergency Contact</span>
                                                <span className="text-xs font-bold text-rose-700">{selectedClient.emergencyContact}</span>
                                                <span className="text-[10px] font-semibold text-rose-600">{selectedClient.phone}</span>
                                            </div>
                                        </div>
                                        <Button size="sm" variant="outline" className="h-7 px-2.5 text-[10px] border-rose-200 text-rose-700 hover:bg-rose-100">
                                            Call
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            <div className="w-full h-px bg-slate-100"></div>

                            <div className="space-y-3">
                                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                                    <span className="w-5 h-5 rounded bg-primary/10 text-primary flex items-center justify-center text-[10px]">3</span>
                                    Quick Actions
                                </h3>
                                <div className="grid grid-cols-2 gap-3">
                                    <Button variant="outline" size="sm" leftIcon={<Activity size={14} />} className="w-full justify-start text-xs h-9">
                                        Log Vitals
                                    </Button>
                                    <Button variant="outline" size="sm" leftIcon={<ClipboardList size={14} />} className="w-full justify-start text-xs h-9">
                                        Clinical Notes
                                    </Button>
                                    <Button variant="outline" size="sm" leftIcon={<Stethoscope size={14} />} className="w-full justify-start text-xs h-9">
                                        View History
                                    </Button>
                                    <Button variant="outline" size="sm" leftIcon={<Shield size={14} />} className="w-full justify-start text-xs h-9">
                                        Incident Report
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default MyClientsCom;