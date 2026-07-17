import { useState } from 'react';
import {
    Plus,
    Search,
    Filter,
    Edit2,
    Trash2,
    X,
    Check,
    Image as ImageIcon,
    IndianRupee
} from 'lucide-react';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import { Badge } from '../../ui/Badge';
import { Select } from '../../ui/Select';

const mockServices = [
    {
        id: 'SRV-001',
        title: 'Home Care',
        mainCategory: 'Care Services',
        category: 'Specialized',
        description: 'Specialized memory care focusing on safety, routine, and cognitive engagement.',
        price: '₹4,500',
        image: 'https://images.unsplash.com/photo-1576765608511-ff4471676646?w=800&auto=format&fit=crop&q=80',
        status: 'active'
    },
    {
        id: 'SRV-002',
        title: 'Elderly Care',
        mainCategory: 'Home Care Services',
        category: 'Daily Living',
        description: 'Nutritious meal planning, grocery shopping, and cooking based on dietary needs.',
        price: '₹4,000',
        image: 'https://images.unsplash.com/photo-1581579186913-46eaacb94858?w=800&auto=format&fit=crop&q=80',
        status: 'active'
    }
];

const OurServicesCom = () => {
    const [isAddServiceOpen, setIsAddServiceOpen] = useState(false);

    return (
        <div className="flex flex-col gap-4 max-w-[1400px] mx-auto w-full relative pb-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 font-heading tracking-tight mb-0">
                        Our Services
                    </h1>
                    <p className="text-xs font-medium text-slate-500">
                        Manage your catalog of care services, categories, and pricing.
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-56 hidden md:block">
                        <Input
                            placeholder="Search services..."
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
                        onClick={() => setIsAddServiceOpen(true)}
                    >
                        Add New Service
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {mockServices.map((service) => (
                    <div key={service.id} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col group hover:shadow-md transition-shadow">
                        <div className="relative w-full h-36 overflow-hidden bg-slate-100">
                            <img
                                src={service.image}
                                alt={service.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute top-2 left-2">
                                {service.status === 'active' ? (
                                    <Badge variant="success" className="bg-white/90 backdrop-blur-sm">Active</Badge>
                                ) : (
                                    <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm">Inactive</Badge>
                                )}
                            </div>
                            <div className="absolute top-2 right-2 flex flex-col items-end gap-1">
                                <Badge variant="primary" className="bg-white/90 backdrop-blur-sm shadow-sm">{service.mainCategory}</Badge>
                                <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm shadow-sm text-[10px]">{service.category}</Badge>
                            </div>
                        </div>

                        <div className="p-4 flex-1 flex flex-col">
                            <div className="flex justify-between items-start mb-1.5 gap-2">
                                <h3 className="text-base font-bold text-slate-900 leading-tight">
                                    {service.title}
                                </h3>
                            </div>
                            <p className="text-xs font-medium text-slate-500 line-clamp-2 mb-3 flex-1">
                                {service.description}
                            </p>

                            <div className="flex items-center gap-3 py-3 border-y border-slate-100 mb-3 bg-slate-50/50 -mx-4 px-4">
                                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
                                    <div className="w-6 h-6 rounded-md bg-emerald-50 text-emerald-600 flex items-center justify-center">
                                        <IndianRupee size={14} />
                                    </div>
                                    {service.price}
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{service.id}</span>
                                <div className="flex items-center gap-1">
                                    <button className="p-1.5 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors border border-transparent hover:border-primary/20">
                                        <Edit2 size={14} />
                                    </button>
                                    <button className="p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors border border-transparent hover:border-rose-200">
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {isAddServiceOpen && (
                <>
                    <div
                        className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 transition-opacity"
                        onClick={() => setIsAddServiceOpen(false)}
                    />
                    <div className="fixed inset-y-0 right-0 z-50 w-full md:w-[600px] bg-white shadow-2xl transform transition-transform duration-300 flex flex-col">
                        <div className="flex items-center justify-between p-5 border-b border-slate-100">
                            <div>
                                <h2 className="text-lg font-bold text-slate-900 tracking-tight">Add New Service</h2>
                                <p className="text-xs font-medium text-slate-500">Create a new service offering for your catalog.</p>
                            </div>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setIsAddServiceOpen(false)}
                                className="p-1.5 text-slate-400 hover:text-slate-700 bg-slate-50 hover:bg-slate-100 rounded-full"
                            >
                                <X size={18} />
                            </Button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-5 space-y-5 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-200 [&::-webkit-scrollbar-thumb]:rounded-full">

                            <div className="space-y-3">
                                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Service Media</h3>
                                <div className="w-full h-32 rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 hover:bg-slate-100 transition-colors flex flex-col items-center justify-center gap-1.5 cursor-pointer group">
                                    <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                                        <ImageIcon size={20} />
                                    </div>
                                    <span className="text-xs font-bold text-slate-600">Upload Featured Image</span>
                                    <span className="text-[10px] font-medium text-slate-400">JPG, PNG or WEBP (Max 2MB)</span>
                                </div>
                            </div>

                            <div className="w-full h-px bg-slate-100"></div>

                            <div className="space-y-3">
                                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Basic Details</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    <div className="md:col-span-2">
                                        <Input label="Service Title" placeholder="e.g. Professional Nursing Care" />
                                    </div>
                                    <div className="md:col-span-2">
                                        <Select
                                            label="Dashboard Category"
                                            options={[
                                                { label: 'Select dashboard category...', value: '' },
                                                { label: 'Care Services', value: 'Care Services' },
                                                { label: 'Home Care Services', value: 'Home Care Services' }
                                            ]}
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <Select
                                            label="Service Sub-Category"
                                            options={[
                                                { label: 'Select a sub-category...', value: '' },
                                                { label: 'Medical', value: 'medical' },
                                                { label: 'Personal Care', value: 'personal_care' },
                                                { label: 'Rehabilitation', value: 'rehab' },
                                                { label: 'Daily Living', value: 'daily_living' },
                                                { label: 'Specialized', value: 'specialized' },
                                            ]}
                                        />
                                    </div>
                                    <div className="md:col-span-2 flex flex-col gap-1.5 w-full">
                                        <label className="text-sm font-semibold text-slate-700">Description</label>
                                        <textarea
                                            className="w-full bg-slate-50 hover:bg-slate-100 border border-transparent focus:bg-white focus:border-primary/30 rounded-xl focus:outline-none focus:ring-4 focus:ring-primary/10 text-sm font-medium text-slate-800 placeholder-slate-400 transition-all p-3 resize-none h-24"
                                            placeholder="Briefly describe the service offering..."
                                        ></textarea>
                                    </div>
                                </div>
                            </div>

                            <div className="w-full h-px bg-slate-100"></div>

                            <div className="space-y-3">
                                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Pricing</h3>
                                <div className="grid grid-cols-1 gap-3">
                                    <Input
                                        label="Base Price"
                                        placeholder="e.g. 8500"
                                        leftIcon={<IndianRupee size={14} />}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-end gap-3">
                            <Button variant="ghost" size="sm" onClick={() => setIsAddServiceOpen(false)}>
                                Cancel
                            </Button>
                            <Button size="sm" leftIcon={<Check size={16} />}>
                                Save Service
                            </Button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default OurServicesCom;