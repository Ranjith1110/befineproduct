import { useState } from 'react';
import {
    Plus,
    Search,
    Filter,
    Edit2,
    Trash2,
    UserPlus,
    MoreVertical,
    FileText,
    ArrowRight,
    Users,
    X,
    Check
} from 'lucide-react';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import { Badge } from '../../ui/Badge';
import { Select } from '../../ui/Select';

const pipelineStages = [
    { name: 'Initial Contact', count: 12, color: 'bg-blue-500' },
    { name: 'Assessment', count: 8, color: 'bg-amber-500' },
    { name: 'Care Plan setup', count: 5, color: 'bg-purple-500' },
    { name: 'Active Care', count: 124, color: 'bg-emerald-500' },
];

const mockClients = [
    {
        id: 'CLI-001',
        name: 'Eleanor Pena',
        email: 'eleanor@example.com',
        pipeline: 'Active Care',
        status: 'active',
        caretaker: 'Jane Cooper',
        avatar: 'https://i.pravatar.cc/150?img=1'
    },
    {
        id: 'CLI-002',
        name: 'Esther Howard',
        email: 'esther@example.com',
        pipeline: 'Assessment',
        status: 'pending',
        caretaker: null,
        avatar: 'https://i.pravatar.cc/150?img=2'
    },
    {
        id: 'CLI-003',
        name: 'Ralph Edwards',
        email: 'ralph@example.com',
        pipeline: 'Care Plan setup',
        status: 'onboarding',
        caretaker: 'Wade Warren',
        avatar: 'https://i.pravatar.cc/150?img=3'
    },
    {
        id: 'CLI-004',
        name: 'Albert Flores',
        email: 'albert@example.com',
        pipeline: 'Initial Contact',
        status: 'new',
        caretaker: null,
        avatar: 'https://i.pravatar.cc/150?img=4'
    }
];

const ClientCom = () => {
    const [isAddClientOpen, setIsAddClientOpen] = useState(false);

    return (
        <div className="flex flex-col gap-8 max-w-[1400px] mx-auto w-full relative">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 font-heading tracking-tight mb-1">
                        Client Management
                    </h1>
                    <p className="text-sm font-medium text-slate-500">
                        Manage client onboarding, assignments, and profiles.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" leftIcon={<FileText size={18} />}>
                        Export List
                    </Button>
                    <Button
                        leftIcon={<Plus size={18} strokeWidth={2.5} />}
                        onClick={() => setIsAddClientOpen(true)}
                    >
                        Add New Client
                    </Button>
                </div>
            </div>

            <div className="flex flex-col gap-4">
                <h2 className="text-lg font-bold text-slate-800">Onboarding Pipeline</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {pipelineStages.map((stage) => (
                        <div key={stage.name} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm relative overflow-hidden group">
                            <div className={`absolute top-0 left-0 w-1 h-full ${stage.color}`}></div>
                            <div className="flex justify-between items-start mb-2">
                                <span className="text-slate-600 font-semibold">{stage.name}</span>
                                <div className="p-1.5 bg-slate-50 rounded-lg text-slate-400 hover:text-primary hover:bg-primary/10 transition-colors cursor-pointer">
                                    <ArrowRight size={16} />
                                </div>
                            </div>
                            <div className="flex items-baseline gap-2">
                                <span className="text-3xl font-bold text-slate-900">{stage.count}</span>
                                <span className="text-sm font-medium text-slate-400">clients</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col">
                <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="w-full sm:w-96">
                        <Input
                            placeholder="Search clients by name, email or ID..."
                            leftIcon={<Search size={18} />}
                            className="bg-slate-50 border-transparent"
                        />
                    </div>
                    <Button variant="secondary" leftIcon={<Filter size={16} />}>
                        Filter
                    </Button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/50 border-b border-slate-100">
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Client Details</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Pipeline Stage</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Assigned Caretaker</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {mockClients.map((client) => (
                                <tr key={client.id} className="hover:bg-slate-50/50 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <img src={client.avatar} alt={client.name} className="w-10 h-10 rounded-full object-cover border border-slate-200" />
                                            <div>
                                                <div className="font-bold text-slate-900">{client.name}</div>
                                                <div className="text-xs font-medium text-slate-500">{client.id} · {client.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-sm font-semibold text-slate-700 bg-slate-100 px-3 py-1 rounded-full">
                                            {client.pipeline}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        {client.status === 'active' && <Badge variant="success">Active</Badge>}
                                        {client.status === 'pending' && <Badge variant="warning">Pending Assessment</Badge>}
                                        {client.status === 'onboarding' && <Badge variant="info">Onboarding</Badge>}
                                        {client.status === 'new' && <Badge variant="primary">New Lead</Badge>}
                                    </td>
                                    <td className="px-6 py-4">
                                        {client.caretaker ? (
                                            <div className="flex items-center gap-2">
                                                <div className="w-7 h-7 rounded-full bg-secondary/20 text-primary flex items-center justify-center font-bold text-xs">
                                                    {client.caretaker.charAt(0)}
                                                </div>
                                                <span className="text-sm font-semibold text-slate-700">{client.caretaker}</span>
                                            </div>
                                        ) : (
                                            <Button variant="ghost" size="sm" className="text-primary bg-primary/5 hover:bg-primary/10" leftIcon={<UserPlus size={14} />}>
                                                Assign Caretaker
                                            </Button>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button className="p-2 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors">
                                                <Users size={16} />
                                            </button>
                                            <button className="p-2 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors">
                                                <Edit2 size={16} />
                                            </button>
                                            <button className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors">
                                                <Trash2 size={16} />
                                            </button>
                                            <button className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors">
                                                <MoreVertical size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="p-4 border-t border-slate-100 flex items-center justify-between text-sm font-medium text-slate-500">
                    <span>Showing 1 to 4 of 149 clients</span>
                    <div className="flex gap-1">
                        <Button variant="ghost" size="sm" disabled>Previous</Button>
                        <Button variant="ghost" size="sm" className="bg-primary/10 text-primary">1</Button>
                        <Button variant="ghost" size="sm">2</Button>
                        <Button variant="ghost" size="sm">3</Button>
                        <Button variant="ghost" size="sm">Next</Button>
                    </div>
                </div>
            </div>

            {isAddClientOpen && (
                <>
                    <div
                        className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 transition-opacity"
                        onClick={() => setIsAddClientOpen(false)}
                    />
                    <div className="fixed inset-y-0 right-0 z-50 w-full md:w-[600px] bg-white shadow-2xl transform transition-transform duration-300 flex flex-col">
                        <div className="flex items-center justify-between p-6 border-b border-slate-100">
                            <div>
                                <h2 className="text-xl font-bold text-slate-900 tracking-tight">Onboard New Client</h2>
                                <p className="text-sm font-medium text-slate-500">Enter the primary details to start the onboarding pipeline.</p>
                            </div>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setIsAddClientOpen(false)}
                                className="p-2 text-slate-400 hover:text-slate-700 bg-slate-50 hover:bg-slate-100 rounded-full"
                            >
                                <X size={20} />
                            </Button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6 space-y-8 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-200 [&::-webkit-scrollbar-thumb]:rounded-full">
                            <div className="space-y-4">
                                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                                    <span className="w-6 h-6 rounded bg-primary/10 text-primary flex items-center justify-center text-xs">1</span>
                                    Primary Information
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="md:col-span-2">
                                        <Input label="Full Name" placeholder="e.g. John Doe" />
                                    </div>
                                    <Input label="Mobile Number" placeholder="+1 (555) 000-0000" type="tel" />
                                    <Input label="Email ID" placeholder="john@example.com" type="email" />
                                    <div className="md:col-span-2">
                                        <Input label="Address" placeholder="Street address, apartment, suite" />
                                    </div>
                                    <Input label="Pincode / Zip" placeholder="Enter zip code" />
                                </div>
                            </div>

                            <div className="w-full h-px bg-slate-100"></div>

                            <div className="space-y-4">
                                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                                    <span className="w-6 h-6 rounded bg-primary/10 text-primary flex items-center justify-center text-xs">2</span>
                                    Dependent Details
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="md:col-span-2">
                                        <Input label="Dependent Name" placeholder="e.g. Jane Doe" />
                                    </div>
                                    <Input label="Dependent Phone Number" placeholder="+1 (555) 000-0000" type="tel" />
                                    <Input label="Dependent Email ID" placeholder="jane@example.com" type="email" />
                                </div>
                            </div>

                            <div className="w-full h-px bg-slate-100"></div>

                            <div className="space-y-4">
                                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                                    <span className="w-6 h-6 rounded bg-primary/10 text-primary flex items-center justify-center text-xs">3</span>
                                    Assignments
                                </h3>
                                <div className="grid grid-cols-1 gap-4">
                                    <Select
                                        label="Assign Service Provider"
                                        options={[
                                            { label: 'Select a provider...', value: '' },
                                            { label: 'Apex Healthcare Partners', value: 'SP-101' },
                                            { label: 'Serenity Senior Solutions', value: 'SP-102' },
                                            { label: 'Guardian Home Care', value: 'SP-103' },
                                        ]}
                                    />
                                    <Select
                                        label="Assign Care Giver"
                                        options={[
                                            { label: 'Select a care giver...', value: '' },
                                            { label: 'Jane Cooper', value: 'CG-01' },
                                            { label: 'Wade Warren', value: 'CG-02' },
                                            { label: 'Esther Howard', value: 'CG-03' },
                                        ]}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="p-6 border-t border-slate-100 bg-slate-50 flex items-center justify-end gap-3">
                            <Button variant="ghost" onClick={() => setIsAddClientOpen(false)}>
                                Cancel
                            </Button>
                            <Button leftIcon={<Check size={18} />}>
                                Save Client
                            </Button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default ClientCom;