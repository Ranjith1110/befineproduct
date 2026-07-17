import { useState } from 'react';
import {
    Plus,
    Search,
    Filter,
    Edit2,
    Trash2,
    MoreVertical,
    UserCheck,
    Building2,
    PhoneCall,
    Activity,
    X,
    Check
} from 'lucide-react';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import { Badge } from '../../ui/Badge';
import { Select } from '../../ui/Select';

const mockCareManagers = [
    {
        id: 'CM-001',
        name: 'Sarah Jenkins',
        email: 'sarah.j@example.com',
        phone: '+1 (555) 123-4567',
        assignedProvider: 'Apex Healthcare Partners',
        activeFollowups: 24,
        status: 'active',
        avatar: 'https://i.pravatar.cc/150?img=5'
    },
    {
        id: 'CM-002',
        name: 'Michael Chen',
        email: 'm.chen@example.com',
        phone: '+1 (555) 987-6543',
        assignedProvider: 'Serenity Senior Solutions',
        activeFollowups: 18,
        status: 'active',
        avatar: 'https://i.pravatar.cc/150?img=11'
    },
    {
        id: 'CM-003',
        name: 'Jessica Walsh',
        email: 'j.walsh@example.com',
        phone: '+1 (555) 456-7890',
        assignedProvider: 'Guardian Home Care',
        activeFollowups: 32,
        status: 'pending',
        avatar: 'https://i.pravatar.cc/150?img=9'
    }
];

const availableProviders = [
    { label: 'Select a Service Provider...', value: '' },
    { label: 'Apex Healthcare Partners', value: 'SP-101' },
    { label: 'Serenity Senior Solutions', value: 'SP-102' },
    { label: 'Guardian Home Care', value: 'SP-103' },
    { label: 'Vitality Medical Group', value: 'SP-104' },
];

const CareManagerCom = () => {
    const [isAddManagerOpen, setIsAddManagerOpen] = useState(false);

    return (
        <div className="flex flex-col gap-4 max-w-[1400px] mx-auto w-full relative pb-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 font-heading tracking-tight mb-0">
                        Care Managers
                    </h1>
                    <p className="text-xs font-medium text-slate-500">
                        Onboard managers and assign providers for service follow-ups.
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-56 hidden md:block">
                        <Input
                            placeholder="Search managers..."
                            leftIcon={<Search size={16} />}
                            className="bg-white border-transparent shadow-sm text-sm h-9"
                        />
                    </div>
                    <Button variant="outline" size="sm" leftIcon={<Filter size={14} />}>
                        Filter
                    </Button>
                    <Button
                        size="sm"
                        leftIcon={<Plus size={16} strokeWidth={2.5} />}
                        onClick={() => setIsAddManagerOpen(true)}
                    >
                        Onboard Manager
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                        <UserCheck size={20} />
                    </div>
                    <div>
                        <div className="text-xl font-bold text-slate-800">12</div>
                        <div className="text-xs font-medium text-slate-500">Active Managers</div>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-secondary/20 text-primary flex items-center justify-center">
                        <Building2 size={20} />
                    </div>
                    <div>
                        <div className="text-xl font-bold text-slate-800">24</div>
                        <div className="text-xs font-medium text-slate-500">Mapped Providers</div>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center">
                        <PhoneCall size={20} />
                    </div>
                    <div>
                        <div className="text-xl font-bold text-slate-800">156</div>
                        <div className="text-xs font-medium text-slate-500">Active Follow-ups</div>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                        <Activity size={20} />
                    </div>
                    <div>
                        <div className="text-xl font-bold text-slate-800">94%</div>
                        <div className="text-xs font-medium text-slate-500">Completion Rate</div>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden flex flex-col">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/50 border-b border-slate-100">
                                <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Manager Details</th>
                                <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Contact Info</th>
                                <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Assigned Provider</th>
                                <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Follow-ups</th>
                                <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                                <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {mockCareManagers.map((manager) => (
                                <tr key={manager.id} className="hover:bg-slate-50/50 transition-colors group">
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-3">
                                            <img src={manager.avatar} alt={manager.name} className="w-8 h-8 rounded-full object-cover border border-slate-200" />
                                            <div>
                                                <div className="text-sm font-bold text-slate-900">{manager.name}</div>
                                                <div className="text-[10px] font-medium text-slate-500">{manager.id}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="text-xs font-semibold text-slate-700 mb-0.5">{manager.phone}</div>
                                        <div className="text-[10px] font-medium text-slate-500">{manager.email}</div>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-1.5">
                                            <Building2 size={14} className="text-primary" />
                                            <span className="text-xs font-semibold text-slate-800">{manager.assignedProvider}</span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-1.5">
                                            <div className="w-6 h-6 rounded-md bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-xs">
                                                {manager.activeFollowups}
                                            </div>
                                            <span className="text-[10px] font-medium text-slate-500">Active</span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3">
                                        {manager.status === 'active' ? (
                                            <Badge variant="success">Active</Badge>
                                        ) : (
                                            <Badge variant="warning">Pending</Badge>
                                        )}
                                    </td>
                                    <td className="px-4 py-3 text-right">
                                        <div className="flex items-center justify-end gap-1">
                                            <button className="p-1.5 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors" title="Edit Manager">
                                                <Edit2 size={14} />
                                            </button>
                                            <button className="p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors" title="Remove Manager">
                                                <Trash2 size={14} />
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
                    <span>Showing 1 to 3 of 12 managers</span>
                    <div className="flex gap-1">
                        <Button variant="ghost" size="sm" disabled className="h-7 text-xs px-2">Prev</Button>
                        <Button variant="ghost" size="sm" className="bg-primary/10 text-primary h-7 text-xs px-2.5">1</Button>
                        <Button variant="ghost" size="sm" className="h-7 text-xs px-2.5">2</Button>
                        <Button variant="ghost" size="sm" className="h-7 text-xs px-2">Next</Button>
                    </div>
                </div>
            </div>

            {isAddManagerOpen && (
                <>
                    <div
                        className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 transition-opacity"
                        onClick={() => setIsAddManagerOpen(false)}
                    />
                    <div className="fixed inset-y-0 right-0 z-50 w-full md:w-[600px] bg-white shadow-2xl transform transition-transform duration-300 flex flex-col">
                        <div className="flex items-center justify-between p-5 border-b border-slate-100">
                            <div>
                                <h2 className="text-lg font-bold text-slate-900 tracking-tight">Onboard Care Manager</h2>
                                <p className="text-xs font-medium text-slate-500">Create profile and assign a service provider.</p>
                            </div>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setIsAddManagerOpen(false)}
                                className="p-1.5 text-slate-400 hover:text-slate-700 bg-slate-50 hover:bg-slate-100 rounded-full"
                            >
                                <X size={18} />
                            </Button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-5 space-y-5 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-200 [&::-webkit-scrollbar-thumb]:rounded-full">

                            <div className="space-y-3">
                                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                                    <span className="w-5 h-5 rounded bg-primary/10 text-primary flex items-center justify-center text-[10px]">1</span>
                                    Primary Information
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    <div className="md:col-span-2">
                                        <Input label="Full Name" placeholder="e.g. Sarah Jenkins" />
                                    </div>
                                    <Input label="Mobile Number" placeholder="+1 (555) 000-0000" type="tel" />
                                    <Input label="Email ID" placeholder="sarah@example.com" type="email" />
                                </div>
                            </div>

                            <div className="w-full h-px bg-slate-100"></div>

                            <div className="space-y-3">
                                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                                    <span className="w-5 h-5 rounded bg-primary/10 text-primary flex items-center justify-center text-[10px]">2</span>
                                    Provider Assignment
                                </h3>
                                <div className="grid grid-cols-1 gap-3">
                                    <div className="bg-primary/5 p-3 rounded-lg border border-primary/10 mb-1">
                                        <p className="text-[11px] font-medium text-primary">
                                            Assigning a Service Provider allows this Care Manager to follow up on and ensure completion of services rendered by the selected partner.
                                        </p>
                                    </div>
                                    <Select
                                        label="Assign Service Provider"
                                        options={availableProviders}
                                    />
                                </div>
                            </div>

                            <div className="w-full h-px bg-slate-100"></div>

                            <div className="space-y-3">
                                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                                    <span className="w-5 h-5 rounded bg-primary/10 text-primary flex items-center justify-center text-[10px]">3</span>
                                    Account Settings
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    <Input label="Temporary Password" type="password" placeholder="••••••••" />
                                    <Select
                                        label="Initial Status"
                                        options={[
                                            { label: 'Active', value: 'active' },
                                            { label: 'Pending Verification', value: 'pending' },
                                        ]}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-end gap-3">
                            <Button variant="ghost" size="sm" onClick={() => setIsAddManagerOpen(false)}>
                                Cancel
                            </Button>
                            <Button size="sm" leftIcon={<Check size={16} />}>
                                Save Care Manager
                            </Button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default CareManagerCom;