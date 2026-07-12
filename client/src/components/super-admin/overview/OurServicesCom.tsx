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
        category: 'Specialized',
        description: 'Specialized memory care focusing on safety, routine, and cognitive engagement.',
        price: '₹4,500',
        image: 'https://images.unsplash.com/photo-1576765608511-ff4471676646?w=800&auto=format&fit=crop&q=80',
        status: 'active'
    },
    {
        id: 'SRV-002',
        title: 'Elderly Care',
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
        <div className="flex flex-col gap-8 max-w-[1400px] mx-auto w-full relative">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 font-heading tracking-tight mb-1">
                        Our Services
                    </h1>
                    <p className="text-sm font-medium text-slate-500">
                        Manage your catalog of care services, categories, and pricing.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="w-64 hidden md:block">
                        <Input
                            placeholder="Search services..."
                            leftIcon={<Search size={18} />}
                            className="bg-white border-transparent shadow-sm"
                        />
                    </div>
                    <Button variant="outline" leftIcon={<Filter size={18} />}>
                        Filter
                    </Button>
                    <Button
                        leftIcon={<Plus size={18} strokeWidth={2.5} />}
                        onClick={() => setIsAddServiceOpen(true)}
                    >
                        Add New Service
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockServices.map((service) => (
                    <div key={service.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col group hover:shadow-md transition-shadow">
                        <div className="relative w-full h-48 overflow-hidden bg-slate-100">
                            <img
                                src={service.image}
                                alt={service.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute top-3 left-3">
                                {service.status === 'active' ? (
                                    <Badge variant="success" className="bg-white/90 backdrop-blur-sm">Active</Badge>
                                ) : (
                                    <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm">Inactive</Badge>
                                )}
                            </div>
                            <div className="absolute top-3 right-3">
                                <Badge variant="primary" className="bg-white/90 backdrop-blur-sm shadow-sm">{service.category}</Badge>
                            </div>
                        </div>

                        <div className="p-5 flex-1 flex flex-col">
                            <div className="flex justify-between items-start mb-2 gap-2">
                                <h3 className="text-lg font-bold text-slate-900 leading-tight">
                                    {service.title}
                                </h3>
                            </div>
                            <p className="text-sm font-medium text-slate-500 line-clamp-2 mb-4 flex-1">
                                {service.description}
                            </p>

                            <div className="flex items-center gap-4 py-4 border-y border-slate-100 mb-4 bg-slate-50/50 -mx-5 px-5">
                                <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                                    <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                                        <IndianRupee size={16} />
                                    </div>
                                    {service.price}
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{service.id}</span>
                                <div className="flex items-center gap-2">
                                    <button className="p-2 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors border border-transparent hover:border-primary/20">
                                        <Edit2 size={16} />
                                    </button>
                                    <button className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors border border-transparent hover:border-rose-200">
                                        <Trash2 size={16} />
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
                        <div className="flex items-center justify-between p-6 border-b border-slate-100">
                            <div>
                                <h2 className="text-xl font-bold text-slate-900 tracking-tight">Add New Service</h2>
                                <p className="text-sm font-medium text-slate-500">Create a new service offering for your catalog.</p>
                            </div>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setIsAddServiceOpen(false)}
                                className="p-2 text-slate-400 hover:text-slate-700 bg-slate-50 hover:bg-slate-100 rounded-full"
                            >
                                <X size={20} />
                            </Button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6 space-y-8 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-200 [&::-webkit-scrollbar-thumb]:rounded-full">

                            <div className="space-y-4">
                                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Service Media</h3>
                                <div className="w-full h-48 rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 hover:bg-slate-100 transition-colors flex flex-col items-center justify-center gap-2 cursor-pointer group">
                                    <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                                        <ImageIcon size={24} />
                                    </div>
                                    <span className="text-sm font-bold text-slate-600">Upload Featured Image</span>
                                    <span className="text-xs font-medium text-slate-400">JPG, PNG or WEBP (Max 2MB)</span>
                                </div>
                            </div>

                            <div className="w-full h-px bg-slate-100"></div>

                            <div className="space-y-4">
                                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Basic Details</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="md:col-span-2">
                                        <Input label="Service Title" placeholder="e.g. Professional Nursing Care" />
                                    </div>
                                    <div className="md:col-span-2">
                                        <Select
                                            label="Service Category"
                                            options={[
                                                { label: 'Select a category...', value: '' },
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
                                            className="w-full bg-slate-50 hover:bg-slate-100 border border-transparent focus:bg-white focus:border-primary/30 rounded-xl focus:outline-none focus:ring-4 focus:ring-primary/10 text-sm font-medium text-slate-800 placeholder-slate-400 transition-all p-4 resize-none h-28"
                                            placeholder="Briefly describe the service offering..."
                                        ></textarea>
                                    </div>
                                </div>
                            </div>

                            <div className="w-full h-px bg-slate-100"></div>

                            <div className="space-y-4">
                                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Pricing</h3>
                                <div className="grid grid-cols-1 gap-4">
                                    <Input
                                        label="Base Price"
                                        placeholder="e.g. 8500"
                                        leftIcon={<IndianRupee size={16} />}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="p-6 border-t border-slate-100 bg-slate-50 flex items-center justify-end gap-3">
                            <Button variant="ghost" onClick={() => setIsAddServiceOpen(false)}>
                                Cancel
                            </Button>
                            <Button leftIcon={<Check size={18} />}>
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