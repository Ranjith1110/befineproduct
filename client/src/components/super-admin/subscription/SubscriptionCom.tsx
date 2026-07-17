import { useState } from 'react';
import {
    Plus,
    Search,
    Filter,
    Edit2,
    Trash2,
    X,
    Check,
    IndianRupee,
    Layers,
    ListPlus,
    Minus
} from 'lucide-react';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import { Badge } from '../../ui/Badge';
import { Select } from '../../ui/Select';

const availableServices = [
    { label: 'Select a service...', value: '' },
    { label: 'Nursing Care', value: 'nursing_care' },
    { label: 'Physical Therapy', value: 'physical_therapy' },
    { label: 'Companionship', value: 'companionship' },
    { label: 'Housekeeping', value: 'housekeeping' },
    { label: 'Dementia Care', value: 'dementia_care' },
];

const mockPlans = [
    {
        id: 'PLN-001',
        name: 'Basic Care Package',
        price: '₹12,000',
        billingCycle: 'Monthly',
        status: 'active',
        subscribers: 45,
        services: [
            { name: 'Nursing Care', count: 4 },
            { name: 'Companionship', count: 2 },
        ]
    },
    {
        id: 'PLN-002',
        name: 'Premium Rehabilitation',
        price: '₹28,500',
        billingCycle: 'Monthly',
        status: 'active',
        subscribers: 18,
        services: [
            { name: 'Physical Therapy', count: 8 },
            { name: 'Nursing Care', count: 4 },
            { name: 'Housekeeping', count: 2 },
        ]
    },
    {
        id: 'PLN-003',
        name: 'Dementia Support Plan',
        price: '₹35,000',
        billingCycle: 'Monthly',
        status: 'draft',
        subscribers: 0,
        services: [
            { name: 'Dementia Care', count: 12 },
            { name: 'Companionship', count: 8 },
            { name: 'Nursing Care', count: 4 },
        ]
    }
];

const SubscriptionCom = () => {
    const [isAddPlanOpen, setIsAddPlanOpen] = useState(false);
    const [planServices, setPlanServices] = useState([{ service: '', count: 1 }]);

    const addServiceField = () => {
        setPlanServices([...planServices, { service: '', count: 1 }]);
    };

    const removeServiceField = (index: number) => {
        setPlanServices(planServices.filter((_, i) => i !== index));
    };

    const updateServiceField = (index: number, field: 'service' | 'count', value: string | number) => {
        const updated = [...planServices];
        updated[index] = { ...updated[index], [field]: value };
        setPlanServices(updated);
    };

    return (
        <div className="flex flex-col gap-4 max-w-[1400px] mx-auto w-full relative pb-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 font-heading tracking-tight mb-0">
                        Subscriptions & Plans
                    </h1>
                    <p className="text-xs font-medium text-slate-500">
                        Create subscription plans and manage service allocations.
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-56 hidden md:block">
                        <Input
                            placeholder="Search plans..."
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
                        onClick={() => {
                            setPlanServices([{ service: '', count: 1 }]);
                            setIsAddPlanOpen(true);
                        }}
                    >
                        Create Plan
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {mockPlans.map((plan) => (
                    <div key={plan.id} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col group hover:shadow-md transition-shadow">
                        <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-start">
                            <div>
                                <h3 className="text-base font-bold text-slate-900 leading-tight mb-1">
                                    {plan.name}
                                </h3>
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{plan.id}</span>
                            </div>
                            {plan.status === 'active' ? (
                                <Badge variant="success">Active</Badge>
                            ) : (
                                <Badge variant="secondary">Draft</Badge>
                            )}
                        </div>

                        <div className="p-4 flex-1 flex flex-col gap-4">
                            <div className="flex items-end gap-1">
                                <span className="text-2xl font-black text-slate-900">{plan.price}</span>
                                <span className="text-xs font-medium text-slate-500 mb-1">/{plan.billingCycle.toLowerCase()}</span>
                            </div>

                            <div className="flex-1 space-y-2">
                                <h4 className="text-xs font-bold text-slate-700 flex items-center gap-1.5 mb-2">
                                    <Layers size={14} className="text-primary" /> Included Services
                                </h4>
                                {plan.services.map((svc, idx) => (
                                    <div key={idx} className="flex items-center justify-between bg-slate-50 px-3 py-2 rounded-lg border border-slate-100">
                                        <span className="text-xs font-semibold text-slate-800">{svc.name}</span>
                                        <div className="flex items-center gap-1 bg-white px-2 py-0.5 rounded text-[10px] font-bold text-primary border border-primary/10 shadow-sm">
                                            <span className="text-slate-400">Qty:</span> {svc.count}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-2">
                                <span className="text-xs font-medium text-slate-500">
                                    <strong className="text-slate-700">{plan.subscribers}</strong> active subscribers
                                </span>
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

            {isAddPlanOpen && (
                <>
                    <div
                        className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 transition-opacity"
                        onClick={() => setIsAddPlanOpen(false)}
                    />
                    <div className="fixed inset-y-0 right-0 z-50 w-full md:w-[600px] bg-white shadow-2xl transform transition-transform duration-300 flex flex-col">
                        <div className="flex items-center justify-between p-5 border-b border-slate-100">
                            <div>
                                <h2 className="text-lg font-bold text-slate-900 tracking-tight">Create Subscription Plan</h2>
                                <p className="text-xs font-medium text-slate-500">Configure plan details and allocate service counts.</p>
                            </div>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setIsAddPlanOpen(false)}
                                className="p-1.5 text-slate-400 hover:text-slate-700 bg-slate-50 hover:bg-slate-100 rounded-full"
                            >
                                <X size={18} />
                            </Button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-5 space-y-6 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-200 [&::-webkit-scrollbar-thumb]:rounded-full">
                            <div className="space-y-3">
                                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Plan Details</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    <div className="md:col-span-2">
                                        <Input label="Plan Name" placeholder="e.g. Premium Care Package" />
                                    </div>
                                    <Input
                                        label="Plan Price"
                                        placeholder="e.g. 15000"
                                        leftIcon={<IndianRupee size={14} />}
                                    />
                                    <Select
                                        label="Billing Cycle"
                                        options={[
                                            { label: 'Monthly', value: 'monthly' },
                                            { label: 'Quarterly', value: 'quarterly' },
                                            { label: 'Yearly', value: 'yearly' },
                                        ]}
                                    />
                                    <div className="md:col-span-2 flex flex-col gap-1.5 w-full">
                                        <label className="text-sm font-semibold text-slate-700">Description</label>
                                        <textarea
                                            className="w-full bg-slate-50 hover:bg-slate-100 border border-transparent focus:bg-white focus:border-primary/30 rounded-xl focus:outline-none focus:ring-4 focus:ring-primary/10 text-sm font-medium text-slate-800 placeholder-slate-400 transition-all p-3 resize-none h-20"
                                            placeholder="Describe the target audience and benefits of this plan..."
                                        ></textarea>
                                    </div>
                                </div>
                            </div>

                            <div className="w-full h-px bg-slate-100"></div>

                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Allocated Services</h3>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="h-7 text-xs px-2.5"
                                        leftIcon={<ListPlus size={14} />}
                                        onClick={addServiceField}
                                    >
                                        Add Service
                                    </Button>
                                </div>

                                <div className="space-y-3">
                                    {planServices.map((planSvc, index) => (
                                        <div key={index} className="flex items-start gap-2 bg-slate-50 p-3 rounded-xl border border-slate-100">
                                            <div className="flex-1 grid grid-cols-3 gap-3">
                                                <div className="col-span-2">
                                                    <Select
                                                        label="Select Service"
                                                        options={availableServices}
                                                        value={planSvc.service}
                                                        onChange={(e) => updateServiceField(index, 'service', e.target.value)}
                                                    />
                                                </div>
                                                <div className="col-span-1">
                                                    <Input
                                                        type="number"
                                                        label="Count"
                                                        min={1}
                                                        value={planSvc.count}
                                                        onChange={(e) => updateServiceField(index, 'count', parseInt(e.target.value) || 1)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="pt-7">
                                                <Button
                                                    variant="ghost"
                                                    className="text-rose-500 hover:bg-rose-100 p-2 h-9 w-9"
                                                    onClick={() => removeServiceField(index)}
                                                    disabled={planServices.length === 1}
                                                >
                                                    <Minus size={16} />
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-end gap-3">
                            <Button variant="ghost" size="sm" onClick={() => setIsAddPlanOpen(false)}>
                                Cancel
                            </Button>
                            <Button size="sm" leftIcon={<Check size={16} />}>
                                Save Plan
                            </Button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default SubscriptionCom;