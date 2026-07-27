import { useState } from 'react';
import {
    Search,
    Filter,
    Building2,
    Users,
    Star,
    MapPin,
    Phone,
    Mail,
    Eye,
    MoreVertical,
    X,
    ShieldCheck,
    AlertTriangle,
    TrendingUp,
    Activity,
    MessageSquare
} from 'lucide-react';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import { Badge } from '../../ui/Badge';

const mockServiceProviders = [
    {
        id: 'PRV-1001',
        name: 'Apex Healthcare Partners',
        type: 'General Nursing & Therapy',
        staffCount: 42,
        activePatients: 128,
        rating: 4.9,
        zonesCovered: ['Koramangala', 'Indiranagar', 'HSR Layout'],
        email: 'partners@apexhealth.com',
        phone: '+91 98765 11111',
        status: 'active'
    },
    {
        id: 'PRV-1002',
        name: 'Guardian Home Care',
        type: 'Elderly Care & Assistance',
        staffCount: 28,
        activePatients: 84,
        rating: 4.7,
        zonesCovered: ['Whitefield', 'Marathahalli', 'Bellandur'],
        email: 'contact@guardianhome.in',
        phone: '+91 98765 22222',
        status: 'active'
    },
    {
        id: 'PRV-1003',
        name: 'Serenity Senior Solutions',
        type: 'Specialized Dementia Care',
        staffCount: 15,
        activePatients: 32,
        rating: 4.2,
        zonesCovered: ['Jayanagar', 'JP Nagar', 'BTM Layout'],
        email: 'support@serenitycare.com',
        phone: '+91 98765 33333',
        status: 'review'
    },
    {
        id: 'PRV-1004',
        name: 'Vitality Medical Group',
        type: 'Post-Op & Rehabilitation',
        staffCount: 34,
        activePatients: 96,
        rating: 4.8,
        zonesCovered: ['Malleswaram', 'Rajajinagar', 'Hebbal'],
        email: 'admin@vitalitymed.in',
        phone: '+91 98765 44444',
        status: 'active'
    }
];

const CareManagerMyServiceProviderCom = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProvider, setSelectedProvider] = useState<any>(null);

    const handleViewProvider = (provider: any) => {
        setSelectedProvider(provider);
        setIsModalOpen(true);
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'active': return <Badge variant="success" className="text-[10px] px-2 py-0.5">Optimal Performance</Badge>;
            case 'review': return <Badge variant="warning" className="text-[10px] px-2 py-0.5">Needs Review</Badge>;
            case 'suspended': return <Badge variant="danger" className="text-[10px] px-2 py-0.5">Suspended</Badge>;
            default: return <Badge variant="secondary" className="text-[10px] px-2 py-0.5">Unknown</Badge>;
        }
    };

    return (
        <div className="flex flex-col gap-4 max-w-[1400px] mx-auto w-full relative pb-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 font-heading tracking-tight mb-0 flex items-center gap-2">
                        My Service Providers
                    </h1>
                    <p className="text-xs font-medium text-slate-500 mt-1">
                        Manage your network of healthcare agencies, monitor capacity, and review performance.
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-56 hidden md:block">
                        <Input
                            placeholder="Search provider name or ID..."
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
                    <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                        <Building2 size={20} />
                    </div>
                    <div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Network Providers</div>
                        <div className="text-xl font-black text-slate-800">24</div>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                        <Users size={20} />
                    </div>
                    <div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Total Field Staff</div>
                        <div className="text-xl font-black text-slate-800">412</div>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-500 flex items-center justify-center shrink-0">
                        <Star size={20} className="fill-amber-500 text-amber-500" />
                    </div>
                    <div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Avg Network Rating</div>
                        <div className="text-xl font-black text-slate-800 flex items-center gap-1">
                            4.6 <span className="text-[10px] font-bold text-emerald-500 flex items-center bg-emerald-50 px-1.5 py-0.5 rounded ml-1"><TrendingUp size={10} className="mr-0.5" /> +0.2</span>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
                        <AlertTriangle size={20} />
                    </div>
                    <div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Under Review</div>
                        <div className="text-xl font-black text-slate-800">3</div>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden flex flex-col">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/50 border-b border-slate-100">
                                <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Provider Details</th>
                                <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Capacity & Performance</th>
                                <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Coverage & Contact</th>
                                <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                                <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {mockServiceProviders.map((provider) => (
                                <tr key={provider.id} className="hover:bg-slate-50/50 transition-colors group">
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-lg bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
                                                <Building2 size={18} />
                                            </div>
                                            <div>
                                                <div className="text-sm font-bold text-slate-900">{provider.name}</div>
                                                <div className="text-[10px] font-bold text-primary mt-0.5">{provider.type}</div>
                                                <div className="text-[10px] font-medium text-slate-500 mt-0.5">ID: {provider.id}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex flex-col gap-1.5">
                                            <div className="flex items-center gap-3">
                                                <div className="flex items-center gap-1 text-xs font-semibold text-slate-700">
                                                    <Users size={12} className="text-slate-400" />
                                                    {provider.staffCount} Staff
                                                </div>
                                                <div className="flex items-center gap-1 text-xs font-semibold text-slate-700">
                                                    <Activity size={12} className="text-slate-400" />
                                                    {provider.activePatients} Active
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-1 text-[11px] font-bold text-amber-500">
                                                <Star size={12} className="fill-amber-500" />
                                                {provider.rating} / 5.0
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex flex-col gap-1.5 text-[10px] font-medium text-slate-600">
                                            <div className="flex items-center gap-1.5">
                                                <MapPin size={12} className="text-slate-400 shrink-0" />
                                                <span className="truncate max-w-[160px] leading-tight">
                                                    {provider.zonesCovered.join(', ')}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <Phone size={12} className="text-slate-400 shrink-0" />
                                                {provider.phone}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3">
                                        {getStatusBadge(provider.status)}
                                    </td>
                                    <td className="px-4 py-3 text-right">
                                        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                className="p-1.5 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                                                title="View Provider Details"
                                                onClick={() => handleViewProvider(provider)}
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
                    <span>Showing 1 to 4 of 24 providers</span>
                    <div className="flex gap-1">
                        <Button variant="ghost" size="sm" disabled className="h-7 text-xs px-2">Prev</Button>
                        <Button variant="ghost" size="sm" className="bg-primary/10 text-primary h-7 text-xs px-2.5">1</Button>
                        <Button variant="ghost" size="sm" className="h-7 text-xs px-2.5">2</Button>
                        <Button variant="ghost" size="sm" className="h-7 text-xs px-2.5">3</Button>
                        <Button variant="ghost" size="sm" className="h-7 text-xs px-2">Next</Button>
                    </div>
                </div>
            </div>

            {isModalOpen && selectedProvider && (
                <>
                    <div
                        className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 transition-opacity"
                        onClick={() => setIsModalOpen(false)}
                    />
                    <div className="fixed inset-y-0 right-0 z-50 w-full md:w-[500px] bg-white shadow-2xl transform transition-transform duration-300 flex flex-col">
                        <div className="flex items-center justify-between p-5 border-b border-slate-100">
                            <div>
                                <h2 className="text-lg font-bold text-slate-900 tracking-tight">Provider Overview</h2>
                                <p className="text-xs font-medium text-slate-500">Performance and capacity details for {selectedProvider.id}</p>
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

                        <div className="flex-1 overflow-y-auto p-5 space-y-6 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-200 [&::-webkit-scrollbar-thumb]:rounded-full">

                            <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
                                <div className="w-14 h-14 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-xl shadow-sm shrink-0">
                                    <Building2 size={24} />
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-start">
                                        <h3 className="text-base font-bold text-slate-900 leading-tight pr-2">{selectedProvider.name}</h3>
                                        {getStatusBadge(selectedProvider.status)}
                                    </div>
                                    <div className="text-xs font-bold text-primary mt-1">
                                        {selectedProvider.type}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                                    <span className="w-5 h-5 rounded bg-primary/10 text-primary flex items-center justify-center text-[10px]">1</span>
                                    Operational Metrics
                                </h3>
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm flex flex-col gap-1">
                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Active Staff</span>
                                        <div className="flex items-center gap-2 text-sm font-black text-slate-800">
                                            <Users size={16} className="text-blue-500" /> {selectedProvider.staffCount}
                                        </div>
                                    </div>
                                    <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm flex flex-col gap-1">
                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Patients Served</span>
                                        <div className="flex items-center gap-2 text-sm font-black text-slate-800">
                                            <Activity size={16} className="text-emerald-500" /> {selectedProvider.activePatients}
                                        </div>
                                    </div>
                                    <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm flex flex-col gap-1 col-span-2">
                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex justify-between">
                                            Quality Score
                                            <span className="text-amber-500 flex items-center gap-0.5"><Star size={10} className="fill-amber-500" /> {selectedProvider.rating}/5.0</span>
                                        </span>
                                        <div className="w-full h-1.5 bg-slate-100 rounded-full mt-1.5 overflow-hidden">
                                            <div className="h-full bg-amber-400 rounded-full" style={{ width: `${(selectedProvider.rating / 5) * 100}%` }}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="w-full h-px bg-slate-100"></div>

                            <div className="space-y-3">
                                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                                    <span className="w-5 h-5 rounded bg-primary/10 text-primary flex items-center justify-center text-[10px]">2</span>
                                    Contact & Coverage
                                </h3>
                                <div className="grid grid-cols-1 gap-3">
                                    <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100">
                                        <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center shrink-0">
                                            <Phone size={14} />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-bold text-slate-400 uppercase">Primary Contact</span>
                                            <span className="text-xs font-bold text-slate-800">{selectedProvider.phone}</span>
                                        </div>
                                        <Button size="sm" variant="outline" className="ml-auto h-7 px-2.5 text-[10px]">
                                            Call
                                        </Button>
                                    </div>
                                    <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100">
                                        <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center shrink-0">
                                            <Mail size={14} />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-bold text-slate-400 uppercase">Email Dispatch</span>
                                            <span className="text-xs font-bold text-slate-800">{selectedProvider.email}</span>
                                        </div>
                                    </div>
                                    <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 flex flex-col gap-1.5">
                                        <div className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1">
                                            <MapPin size={12} /> Approved Service Zones
                                        </div>
                                        <div className="flex flex-wrap gap-1.5 mt-1">
                                            {selectedProvider.zonesCovered.map((zone: string, index: number) => (
                                                <Badge key={index} variant="secondary" className="bg-white border-slate-200 text-[10px]">
                                                    {zone}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="w-full h-px bg-slate-100"></div>

                            <div className="space-y-3">
                                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                                    <span className="w-5 h-5 rounded bg-primary/10 text-primary flex items-center justify-center text-[10px]">3</span>
                                    Administrative Actions
                                </h3>
                                <div className="grid grid-cols-2 gap-3">
                                    <Button variant="outline" size="sm" leftIcon={<MessageSquare size={14} />} className="w-full justify-start text-xs h-9">
                                        Message Dispatch
                                    </Button>
                                    <Button variant="outline" size="sm" leftIcon={<ShieldCheck size={14} />} className="w-full justify-start text-xs h-9">
                                        Compliance Audit
                                    </Button>
                                    <Button variant="outline" size="sm" leftIcon={<AlertTriangle size={14} />} className="w-full justify-start text-xs h-9 text-rose-600 border-rose-200 hover:bg-rose-50">
                                        Flag Issue
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

export default CareManagerMyServiceProviderCom;