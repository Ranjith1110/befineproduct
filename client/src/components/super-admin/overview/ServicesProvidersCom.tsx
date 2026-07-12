import { useState } from 'react';
import {
    Plus,
    Search,
    Filter,
    Edit2,
    Trash2,
    MoreVertical,
    Building2,
    UploadCloud,
    CalendarCheck,
    Stethoscope,
    Users,
    X,
    Check
} from 'lucide-react';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import { Badge } from '../../ui/Badge';

const mockProviders = [
    {
        id: 'SP-101',
        name: 'Apex Healthcare Partners',
        email: 'contact@apexhealth.com',
        status: 'active',
        services: ['Nursing', 'Physical Therapy'],
        caretakersCount: 45,
        upcomingAppointments: 12,
        logo: 'A'
    },
    {
        id: 'SP-102',
        name: 'Serenity Senior Solutions',
        email: 'hello@serenitysenior.com',
        status: 'active',
        services: ['Companionship', 'Housekeeping', 'Meal Prep'],
        caretakersCount: 28,
        upcomingAppointments: 5,
        logo: 'S'
    },
    {
        id: 'SP-103',
        name: 'Vitality Medical Group',
        email: 'support@vitalitymed.com',
        status: 'pending',
        services: ['Specialized Care', 'Nursing'],
        caretakersCount: 0,
        upcomingAppointments: 0,
        logo: 'V'
    },
    {
        id: 'SP-104',
        name: 'Guardian Home Care',
        email: 'info@guardiancare.com',
        status: 'active',
        services: ['Dementia Care', 'Mobility Assistance'],
        caretakersCount: 62,
        upcomingAppointments: 18,
        logo: 'G'
    }
];

const ServicesProvidersCom = () => {
    const [isAddProviderOpen, setIsAddProviderOpen] = useState(false);

    return (
        <div className="flex flex-col gap-8 max-w-[1400px] mx-auto w-full relative">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 font-heading tracking-tight mb-1">
                        Service Providers
                    </h1>
                    <p className="text-sm font-medium text-slate-500">
                        Onboard providers, manage services, and upload caretakers.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" leftIcon={<Building2 size={18} />}>
                        Manage Categories
                    </Button>
                    <Button
                        leftIcon={<Plus size={18} strokeWidth={2.5} />}
                        onClick={() => setIsAddProviderOpen(true)}
                    >
                        Onboard Provider
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                        <Building2 size={24} />
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-slate-800">24</div>
                        <div className="text-sm font-medium text-slate-500">Total Providers</div>
                    </div>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-secondary/20 text-primary flex items-center justify-center">
                        <Users size={24} />
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-slate-800">135</div>
                        <div className="text-sm font-medium text-slate-500">Active Caretakers</div>
                    </div>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                        <CalendarCheck size={24} />
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-slate-800">35</div>
                        <div className="text-sm font-medium text-slate-500">Weekly Appointments</div>
                    </div>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center">
                        <Stethoscope size={24} />
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-slate-800">12</div>
                        <div className="text-sm font-medium text-slate-500">Service Categories</div>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col">
                <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="w-full sm:w-96">
                        <Input
                            placeholder="Search providers or services..."
                            leftIcon={<Search size={18} />}
                            className="bg-slate-50 border-transparent"
                        />
                    </div>
                    <Button variant="secondary" leftIcon={<Filter size={16} />}>
                        Filter List
                    </Button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/50 border-b border-slate-100">
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Provider Details</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Offered Services</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Caretakers</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Appointments</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {mockProviders.map((provider) => (
                                <tr key={provider.id} className="hover:bg-slate-50/50 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-lg shadow-sm">
                                                {provider.logo}
                                            </div>
                                            <div>
                                                <div className="font-bold text-slate-900">{provider.name}</div>
                                                <div className="text-xs font-medium text-slate-500">{provider.id} · {provider.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-wrap gap-1.5">
                                            {provider.services.map((service, index) => (
                                                <span key={index} className="text-xs font-semibold text-slate-600 bg-slate-100 px-2 py-1 rounded-md">
                                                    {service}
                                                </span>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="flex items-center gap-1.5 text-sm font-semibold text-slate-700">
                                                <Users size={16} className="text-slate-400" />
                                                {provider.caretakersCount}
                                            </div>
                                            <button
                                                className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/5 text-primary hover:bg-primary hover:text-white transition-colors"
                                                title="Upload Caretakers"
                                            >
                                                <UploadCloud size={16} />
                                            </button>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                                                <CalendarCheck size={16} />
                                            </div>
                                            <span className="text-sm font-bold text-slate-700">{provider.upcomingAppointments} <span className="font-medium text-slate-500 text-xs">Upcoming</span></span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        {provider.status === 'active' ? (
                                            <Badge variant="success">Active</Badge>
                                        ) : (
                                            <Badge variant="warning">Onboarding</Badge>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button className="p-2 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors" title="Edit Provider">
                                                <Edit2 size={16} />
                                            </button>
                                            <button className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors" title="Delete Provider">
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
                    <span>Showing 1 to 4 of 24 providers</span>
                    <div className="flex gap-1">
                        <Button variant="ghost" size="sm" disabled>Previous</Button>
                        <Button variant="ghost" size="sm" className="bg-primary/10 text-primary">1</Button>
                        <Button variant="ghost" size="sm">2</Button>
                        <Button variant="ghost" size="sm">Next</Button>
                    </div>
                </div>
            </div>

            {/* Slide-over Form Panel */}
            {isAddProviderOpen && (
                <>
                    <div
                        className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 transition-opacity"
                        onClick={() => setIsAddProviderOpen(false)}
                    />
                    <div className="fixed inset-y-0 right-0 z-50 w-full md:w-[600px] bg-white shadow-2xl transform transition-transform duration-300 flex flex-col">
                        <div className="flex items-center justify-between p-6 border-b border-slate-100">
                            <div>
                                <h2 className="text-xl font-bold text-slate-900 tracking-tight">Onboard Service Provider</h2>
                                <p className="text-sm font-medium text-slate-500">Enter the core details to register a new provider.</p>
                            </div>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setIsAddProviderOpen(false)}
                                className="p-2 text-slate-400 hover:text-slate-700 bg-slate-50 hover:bg-slate-100 rounded-full"
                            >
                                <X size={20} />
                            </Button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6 space-y-8 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-200 [&::-webkit-scrollbar-thumb]:rounded-full">

                            <div className="space-y-4">
                                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                                    <span className="w-6 h-6 rounded bg-primary/10 text-primary flex items-center justify-center text-xs">1</span>
                                    Company Information
                                </h3>
                                <div className="grid grid-cols-1 gap-4">
                                    <Input label="Company Name" placeholder="e.g. Apex Healthcare Partners" />
                                    <Input label="Service List" placeholder="e.g. Nursing, Physical Therapy, Companionship (Comma separated)" />
                                </div>
                            </div>

                            <div className="w-full h-px bg-slate-100"></div>

                            <div className="space-y-4">
                                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                                    <span className="w-6 h-6 rounded bg-primary/10 text-primary flex items-center justify-center text-xs">2</span>
                                    SPOC Details
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="md:col-span-2">
                                        <Input label="SPOC Name" placeholder="e.g. Jane Doe" />
                                    </div>
                                    <Input label="SPOC Contact Number" placeholder="+1 (555) 000-0000" type="tel" />
                                    <Input label="SPOC Email ID" placeholder="jane@example.com" type="email" />
                                </div>
                            </div>

                            <div className="w-full h-px bg-slate-100"></div>

                            <div className="space-y-4">
                                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                                    <span className="w-6 h-6 rounded bg-primary/10 text-primary flex items-center justify-center text-xs">3</span>
                                    Location
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="md:col-span-2">
                                        <Input label="Address" placeholder="Street address, building, floor" />
                                    </div>
                                    <Input label="Pincode / Zip" placeholder="Enter zip code" />
                                </div>
                            </div>
                        </div>

                        <div className="p-6 border-t border-slate-100 bg-slate-50 flex items-center justify-end gap-3">
                            <Button variant="ghost" onClick={() => setIsAddProviderOpen(false)}>
                                Cancel
                            </Button>
                            <Button leftIcon={<Check size={18} />}>
                                Save Provider
                            </Button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default ServicesProvidersCom;