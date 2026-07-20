import { useState } from 'react';
import {
    Plus,
    Search,
    Filter,
    Edit2,
    MoreVertical,
    UserCheck,
    Users,
    Activity,
    Shield,
    X,
    Check
} from 'lucide-react';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import { Badge } from '../../ui/Badge';
import { Select } from '../../ui/Select';

const mockCaregivers = [
    {
        id: 'CG-001',
        name: 'Sarah Jenkins',
        role: 'Registered Nurse',
        email: 'sarah.j@example.com',
        phone: '+1 (555) 123-4567',
        status: 'active',
        assignedPatients: 3,
        avatar: 'https://i.pravatar.cc/150?img=5'
    },
    {
        id: 'CG-002',
        name: 'Michael Chen',
        role: 'Physical Therapist',
        email: 'm.chen@example.com',
        phone: '+1 (555) 987-6543',
        status: 'active',
        assignedPatients: 5,
        avatar: 'https://i.pravatar.cc/150?img=11'
    },
    {
        id: 'CG-003',
        name: 'Jessica Walsh',
        role: 'Care Aide',
        email: 'j.walsh@example.com',
        phone: '+1 (555) 456-7890',
        status: 'inactive',
        assignedPatients: 0,
        avatar: 'https://i.pravatar.cc/150?img=9'
    },
    {
        id: 'CG-004',
        name: 'Robert Wilson',
        role: 'Registered Nurse',
        email: 'r.wilson@example.com',
        phone: '+1 (555) 234-5678',
        status: 'active',
        assignedPatients: 2,
        avatar: 'https://i.pravatar.cc/150?img=12'
    }
];

const MyCareGiverCom = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCaregiver, setEditingCaregiver] = useState<any>(null);

    const handleOnboard = () => {
        setEditingCaregiver(null);
        setIsModalOpen(true);
    };

    const handleEdit = (caregiver: any) => {
        setEditingCaregiver(caregiver);
        setIsModalOpen(true);
    };

    return (
        <div className="flex flex-col gap-4 max-w-[1400px] mx-auto w-full relative pb-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 font-heading tracking-tight mb-0">
                        My Caregivers
                    </h1>
                    <p className="text-xs font-medium text-slate-500">
                        Onboard, manage, and track the status of your healthcare staff.
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-56 hidden md:block">
                        <Input
                            placeholder="Search caregivers..."
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
                        onClick={handleOnboard}
                    >
                        Onboard Caregiver
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                        <Users size={20} />
                    </div>
                    <div>
                        <div className="text-xl font-bold text-slate-800">42</div>
                        <div className="text-xs font-medium text-slate-500">Total Caregivers</div>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                        <UserCheck size={20} />
                    </div>
                    <div>
                        <div className="text-xl font-bold text-slate-800">38</div>
                        <div className="text-xs font-medium text-slate-500">Active Status</div>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                        <Activity size={20} />
                    </div>
                    <div>
                        <div className="text-xl font-bold text-slate-800">24</div>
                        <div className="text-xs font-medium text-slate-500">Currently On-Duty</div>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center">
                        <Shield size={20} />
                    </div>
                    <div>
                        <div className="text-xl font-bold text-slate-800">4</div>
                        <div className="text-xs font-medium text-slate-500">Inactive Status</div>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden flex flex-col">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/50 border-b border-slate-100">
                                <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Caregiver Profile</th>
                                <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Role & Designation</th>
                                <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Contact Details</th>
                                <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                                <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {mockCaregivers.map((caregiver) => (
                                <tr key={caregiver.id} className="hover:bg-slate-50/50 transition-colors group">
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-3">
                                            <img src={caregiver.avatar} alt={caregiver.name} className="w-8 h-8 rounded-full object-cover border border-slate-200" />
                                            <div>
                                                <div className="text-sm font-bold text-slate-900">{caregiver.name}</div>
                                                <div className="text-[10px] font-medium text-slate-500">{caregiver.id}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="text-xs font-semibold text-slate-800">{caregiver.role}</div>
                                        <div className="text-[10px] font-medium text-slate-500">{caregiver.assignedPatients} Assigned Patients</div>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="text-xs font-semibold text-slate-700 mb-0.5">{caregiver.phone}</div>
                                        <div className="text-[10px] font-medium text-slate-500">{caregiver.email}</div>
                                    </td>
                                    <td className="px-4 py-3">
                                        {caregiver.status === 'active' ? (
                                            <Badge variant="success" className="text-[10px] px-2 py-0.5">Active</Badge>
                                        ) : (
                                            <Badge variant="secondary" className="text-[10px] px-2 py-0.5">Inactive</Badge>
                                        )}
                                    </td>
                                    <td className="px-4 py-3 text-right">
                                        <div className="flex items-center justify-end gap-1">
                                            <button
                                                onClick={() => handleEdit(caregiver)}
                                                className="p-1.5 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                                                title="Edit Caregiver"
                                            >
                                                <Edit2 size={14} />
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
                    <span>Showing 1 to 4 of 42 caregivers</span>
                    <div className="flex gap-1">
                        <Button variant="ghost" size="sm" disabled className="h-7 text-xs px-2">Prev</Button>
                        <Button variant="ghost" size="sm" className="bg-primary/10 text-primary h-7 text-xs px-2.5">1</Button>
                        <Button variant="ghost" size="sm" className="h-7 text-xs px-2.5">2</Button>
                        <Button variant="ghost" size="sm" className="h-7 text-xs px-2">Next</Button>
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <>
                    <div
                        className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 transition-opacity"
                        onClick={() => setIsModalOpen(false)}
                    />
                    <div className="fixed inset-y-0 right-0 z-50 w-full md:w-[600px] bg-white shadow-2xl transform transition-transform duration-300 flex flex-col">
                        <div className="flex items-center justify-between p-5 border-b border-slate-100">
                            <div>
                                <h2 className="text-lg font-bold text-slate-900 tracking-tight">
                                    {editingCaregiver ? 'Edit Caregiver Profile' : 'Onboard Caregiver'}
                                </h2>
                                <p className="text-xs font-medium text-slate-500">
                                    {editingCaregiver ? 'Update the details and status of this staff member.' : 'Add a new healthcare professional to your roster.'}
                                </p>
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

                            <div className="space-y-3">
                                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                                    <span className="w-5 h-5 rounded bg-primary/10 text-primary flex items-center justify-center text-[10px]">1</span>
                                    Professional Information
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    <div className="md:col-span-2">
                                        <Input
                                            label="Full Name"
                                            placeholder="e.g. Sarah Jenkins"
                                            defaultValue={editingCaregiver?.name}
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <Select
                                            label="Role / Designation"
                                            defaultValue={editingCaregiver?.role || ''}
                                            options={[
                                                { label: 'Select a role...', value: '' },
                                                { label: 'Registered Nurse', value: 'Registered Nurse' },
                                                { label: 'Physical Therapist', value: 'Physical Therapist' },
                                                { label: 'Care Aide', value: 'Care Aide' },
                                                { label: 'Dietitian', value: 'Dietitian' },
                                            ]}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="w-full h-px bg-slate-100"></div>

                            <div className="space-y-3">
                                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                                    <span className="w-5 h-5 rounded bg-primary/10 text-primary flex items-center justify-center text-[10px]">2</span>
                                    Contact Details
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    <Input
                                        label="Mobile Number"
                                        placeholder="+1 (555) 000-0000"
                                        type="tel"
                                        defaultValue={editingCaregiver?.phone}
                                    />
                                    <Input
                                        label="Email ID"
                                        placeholder="caregiver@example.com"
                                        type="email"
                                        defaultValue={editingCaregiver?.email}
                                    />
                                </div>
                            </div>

                            <div className="w-full h-px bg-slate-100"></div>

                            <div className="space-y-3">
                                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                                    <span className="w-5 h-5 rounded bg-primary/10 text-primary flex items-center justify-center text-[10px]">3</span>
                                    System Status
                                </h3>
                                <div className="grid grid-cols-1 gap-3">
                                    <Select
                                        label="Caregiver Status"
                                        defaultValue={editingCaregiver?.status || 'active'}
                                        options={[
                                            { label: 'Active', value: 'active' },
                                            { label: 'Inactive / Suspended', value: 'inactive' },
                                        ]}
                                    />
                                    <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 mt-1">
                                        <p className="text-[11px] font-medium text-slate-500">
                                            Setting a caregiver to <strong className="text-slate-700">Inactive</strong> will prevent them from being assigned to new service requests. Existing appointments must be manually reassigned.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-end gap-3">
                            <Button variant="ghost" size="sm" onClick={() => setIsModalOpen(false)}>
                                Cancel
                            </Button>
                            <Button size="sm" leftIcon={<Check size={16} />}>
                                {editingCaregiver ? 'Save Changes' : 'Complete Onboarding'}
                            </Button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default MyCareGiverCom;