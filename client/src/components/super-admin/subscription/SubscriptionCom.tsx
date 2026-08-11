import React, { useState, useEffect } from 'react';
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
    Minus,
    AlertCircle,
    CheckCircle2,
    FileText
} from 'lucide-react';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import { Badge } from '../../ui/Badge';
import { Select } from '../../ui/Select';

import {
    createSubscriptionPlanApi,
    getSubscriptionPlansApi,
    updateSubscriptionPlanApi,
    deleteSubscriptionPlanApi
} from '../../../api/super-admin/subscriptions';
import { getServicesApi } from '../../../api/super-admin/services';

const initialFormState = {
    name: '',
    planCode: '',
    description: '',
    price: '',
    billingCycle: 'MONTHLY',
    currency: 'INR',
    isActive: true,
    version: 0
};

const getSafeText = (val: any, defaultText: string): string => {
    if (val === null || val === undefined) return defaultText;
    if (typeof val === 'string') return val;
    if (typeof val === 'number') return val.toString();
    if (typeof val === 'object') {
        if (Array.isArray(val)) return val.length > 0 ? getSafeText(val[0], defaultText) : defaultText;
        return val.name || val.title || val.label || defaultText;
    }
    return defaultText;
};

const getSafePrice = (val: any): number => {
    if (val === null || val === undefined) return 0;
    if (typeof val === 'number') return val;
    if (typeof val === 'string') return Number(val) || 0;
    if (typeof val === 'object') {
        const num = val.amount ?? val.price ?? val.basePrice ?? 0;
        return Number(num) || 0;
    }
    return 0;
};

const extractId = (val: any) => {
    if (!val) return '';
    if (typeof val === 'string') return val;
    if (typeof val === 'object') return val.uuid || val.id || val.code || '';
    return String(val);
};

const SubscriptionCom = () => {
    const [plans, setPlans] = useState<any[]>([]);
    const [availableServices, setAvailableServices] = useState<any[]>([]);
    const [isFetchingData, setIsFetchingData] = useState(true);

    const [isAddPlanOpen, setIsAddPlanOpen] = useState(false);
    const [editingPlan, setEditingPlan] = useState<any | null>(null);
    const [formData, setFormData] = useState(initialFormState);
    const [planServices, setPlanServices] = useState<{ serviceUuid: string, count: number }[]>([{ serviceUuid: '', count: 1 }]);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);

    const loadData = async () => {
        setIsFetchingData(true);
        try {
            const [plansData, servicesData] = await Promise.all([
                getSubscriptionPlansApi().catch(() => []),
                getServicesApi({ limit: 500 }).catch(() => [])
            ]);
            setPlans(plansData);
            setAvailableServices(servicesData);
        } catch (error) {
            console.error("Error loading dashboard data:", error);
        } finally {
            setIsFetchingData(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (submitError) setSubmitError(null);
    };

    const addServiceField = () => {
        setPlanServices([...planServices, { serviceUuid: '', count: 1 }]);
    };

    const removeServiceField = (index: number) => {
        setPlanServices(planServices.filter((_, i) => i !== index));
    };

    const updateServiceField = (index: number, field: 'serviceUuid' | 'count', value: string | number) => {
        const updated = [...planServices];
        updated[index] = { ...updated[index], [field]: value };
        setPlanServices(updated);
    };

    const closeMenuAndModal = () => {
        setIsAddPlanOpen(false);
        setEditingPlan(null);
        setFormData(initialFormState);
        setPlanServices([{ serviceUuid: '', count: 1 }]);
        setSubmitError(null);
    };

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitError(null);
        setSubmitSuccess(null);

        const validAllocatedServices = planServices
            .filter(svc => svc.serviceUuid.trim() !== '' && svc.count > 0)
            .map(svc => ({
                serviceUuid: svc.serviceUuid,
                quantity: Number(svc.count)
            }));

        if (validAllocatedServices.length === 0) {
            setSubmitError("You must allocate at least one valid service to this plan.");
            setIsSubmitting(false);
            return;
        }

        const payload: any = {
            name: formData.name,
            title: formData.name,
            planCode: formData.planCode,
            code: formData.planCode,
            description: formData.description,
            shortDescription: formData.description,
            price: Number(formData.price) || 0,
            basePrice: Number(formData.price) || 0,
            billingCycle: formData.billingCycle.toUpperCase(),
            currency: formData.currency,
            isActive: true,
            allocatedServices: validAllocatedServices,
            services: validAllocatedServices
        };

        if (editingPlan) {
            payload.version = Number(formData.version) || 0;
        }

        try {
            if (editingPlan && editingPlan.resolvedUuid) {
                await updateSubscriptionPlanApi(editingPlan.resolvedUuid, payload);
                setSubmitSuccess(`"${formData.name}" has been successfully updated!`);
            } else {
                await createSubscriptionPlanApi(payload);
                setSubmitSuccess(`"${formData.name}" has been successfully created!`);
            }

            closeMenuAndModal();
            setTimeout(() => setSubmitSuccess(null), 5000);
            await loadData();

        } catch (error: any) {
            console.error('Failed to save plan:', error);
            setSubmitError(error.message || 'An unexpected error occurred while saving the plan.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleEditClick = (plan: any) => {
        const uuid = extractId(plan);
        setEditingPlan({ ...plan, resolvedUuid: uuid });

        setFormData({
            name: getSafeText(plan.name || plan.title, ''),
            planCode: getSafeText(plan.planCode || plan.code, ''),
            description: getSafeText(plan.description || plan.shortDescription, ''),
            price: String(getSafePrice(plan.price || plan.basePrice)),
            billingCycle: getSafeText(plan.billingCycle || plan.interval, 'MONTHLY').toUpperCase(),
            currency: getSafeText(plan.currency, 'INR'),
            isActive: plan.isActive ?? (plan.status === 'active' || plan.status === 'ACTIVE'),
            version: plan.version ?? 0
        });

        const existingServices = Array.isArray(plan.allocatedServices || plan.services)
            ? (plan.allocatedServices || plan.services).map((svc: any) => ({
                serviceUuid: extractId(svc.serviceUuid || svc.service || svc),
                count: Number(svc.quantity || svc.count || 1)
            }))
            : [{ serviceUuid: '', count: 1 }];

        setPlanServices(existingServices.length > 0 ? existingServices : [{ serviceUuid: '', count: 1 }]);
        setIsAddPlanOpen(true);
    };

    const handleDeleteClick = async (uuid: string, name: string) => {
        if (!uuid) {
            alert("Error: Plan ID is missing.");
            return;
        }

        if (!window.confirm(`Are you sure you want to delete "${name}"? This action cannot be undone.`)) {
            return;
        }

        try {
            await deleteSubscriptionPlanApi(uuid);
            setSubmitSuccess(`"${name}" was successfully deleted.`);
            setTimeout(() => setSubmitSuccess(null), 5000);
            await loadData();
        } catch (error: any) {
            console.error("Delete failed:", error);
            alert(error.message || "Failed to delete plan.");
        }
    };

    const getServiceNameByUuid = (uuid: string) => {
        const found = availableServices.find(s => extractId(s) === uuid);
        return found ? getSafeText(found.title || found.name, 'Unknown Service') : 'Unknown Service';
    };

    const serviceOptions = [
        { label: 'Select a service...', value: '' },
        ...availableServices.map(srv => ({
            label: getSafeText(srv.title || srv.name, 'Unnamed Service'),
            value: extractId(srv)
        }))
    ];

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
                            closeMenuAndModal();
                            setIsAddPlanOpen(true);
                        }}
                    >
                        Create Plan
                    </Button>
                </div>
            </div>

            {submitSuccess && (
                <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center justify-between text-xs font-semibold text-emerald-700 animate-in fade-in slide-in-from-top-2 duration-300">
                    <div className="flex items-center gap-2.5">
                        <CheckCircle2 size={18} className="shrink-0 text-emerald-500" />
                        <span>{submitSuccess}</span>
                    </div>
                    <button
                        onClick={() => setSubmitSuccess(null)}
                        className="text-emerald-500 hover:text-emerald-700 transition-colors p-1"
                    >
                        <X size={16} />
                    </button>
                </div>
            )}

            {isFetchingData ? (
                <div className="flex flex-col items-center justify-center py-20 text-slate-500">
                    <svg className="animate-spin h-8 w-8 text-primary mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span className="text-sm font-semibold">Loading Subscription Plans...</span>
                </div>
            ) : plans.length === 0 ? (
                <div className="bg-white rounded-xl border border-slate-200 p-12 flex flex-col items-center justify-center text-center shadow-sm">
                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 mb-4">
                        <FileText size={24} />
                    </div>
                    <h3 className="text-base font-bold text-slate-900 mb-1">No Subscription Plans Found</h3>
                    <p className="text-sm text-slate-500 mb-6 max-w-sm">Create your first subscription tier to start offering bundled services.</p>
                    <Button onClick={() => setIsAddPlanOpen(true)} leftIcon={<Plus size={16} />}>
                        Create First Plan
                    </Button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {plans.map((plan, idx) => {
                        const uuid = extractId(plan) || `plan-${idx}`;
                        const displayName = getSafeText(plan.name || plan.title, 'Unnamed Plan');
                        const displayPrice = getSafePrice(plan.price || plan.basePrice);
                        const displayCycle = getSafeText(plan.billingCycle, 'MONTHLY');
                        const isActive = plan.isActive ?? (plan.status === 'active' || plan.status === 'ACTIVE');

                        const allocatedList = Array.isArray(plan.allocatedServices || plan.services)
                            ? (plan.allocatedServices || plan.services)
                            : [];

                        return (
                            <div key={uuid} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col group hover:shadow-md transition-shadow">
                                <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-start">
                                    <div>
                                        <h3 className="text-base font-bold text-slate-900 leading-tight mb-1 truncate max-w-[180px]">
                                            {displayName}
                                        </h3>
                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                                            ID: {uuid.substring(0, 8)}
                                        </span>
                                    </div>
                                    {isActive ? (
                                        <Badge variant="success">Active</Badge>
                                    ) : (
                                        <Badge variant="secondary">Draft</Badge>
                                    )}
                                </div>

                                <div className="p-4 flex-1 flex flex-col gap-4">
                                    <div className="flex items-end gap-1">
                                        <span className="text-2xl font-black text-slate-900 flex items-center">
                                            <IndianRupee size={18} strokeWidth={3} className="mr-0.5" />
                                            {displayPrice.toLocaleString('en-IN')}
                                        </span>
                                        <span className="text-xs font-medium text-slate-500 mb-1">
                                            /{displayCycle.toLowerCase()}
                                        </span>
                                    </div>

                                    <div className="flex-1 space-y-2">
                                        <h4 className="text-xs font-bold text-slate-700 flex items-center gap-1.5 mb-2">
                                            <Layers size={14} className="text-primary" /> Included Services
                                        </h4>

                                        {allocatedList.length === 0 ? (
                                            <p className="text-xs italic text-slate-400">No services allocated.</p>
                                        ) : (
                                            allocatedList.map((svc: any, i: number) => {
                                                const svcId = extractId(svc.serviceUuid || svc.service || svc);
                                                const svcName = svc.name || getServiceNameByUuid(svcId);
                                                const qty = svc.quantity || svc.count || 1;

                                                return (
                                                    <div key={i} className="flex items-center justify-between bg-slate-50 px-3 py-2 rounded-lg border border-slate-100">
                                                        <span className="text-xs font-semibold text-slate-800 truncate pr-2">
                                                            {svcName}
                                                        </span>
                                                        <div className="flex items-center gap-1 bg-white px-2 py-0.5 rounded text-[10px] font-bold text-primary border border-primary/10 shadow-sm shrink-0">
                                                            <span className="text-slate-400">Qty:</span> {qty}
                                                        </div>
                                                    </div>
                                                );
                                            })
                                        )}
                                    </div>

                                    <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-2">
                                        <span className="text-xs font-medium text-slate-500">
                                            <strong className="text-slate-700">{plan.subscribers || 0}</strong> active subscribers
                                        </span>
                                        <div className="flex items-center gap-1">
                                            <button
                                                onClick={() => handleEditClick(plan)}
                                                className="p-1.5 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors border border-transparent hover:border-primary/20"
                                            >
                                                <Edit2 size={14} />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteClick(uuid, displayName)}
                                                className="p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors border border-transparent hover:border-rose-200"
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {isAddPlanOpen && (
                <>
                    <div
                        className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 transition-opacity"
                        onClick={() => !isSubmitting && closeMenuAndModal()}
                    />
                    <div className="fixed inset-y-0 right-0 z-50 w-full md:w-[600px] bg-white shadow-2xl transform transition-transform duration-300 flex flex-col">
                        <div className="flex items-center justify-between p-5 border-b border-slate-100">
                            <div>
                                <h2 className="text-lg font-bold text-slate-900 tracking-tight">
                                    {editingPlan ? 'Edit Subscription Plan' : 'Create Subscription Plan'}
                                </h2>
                                <p className="text-xs font-medium text-slate-500">
                                    Configure plan details and allocate service counts.
                                </p>
                            </div>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => !isSubmitting && closeMenuAndModal()}
                                className="p-1.5 text-slate-400 hover:text-slate-700 bg-slate-50 hover:bg-slate-100 rounded-full"
                            >
                                <X size={18} />
                            </Button>
                        </div>

                        {submitError && (
                            <div className="mx-5 mt-4 p-3 bg-rose-50 border border-rose-100 rounded-lg flex items-start gap-2.5 text-xs font-semibold text-rose-700">
                                <AlertCircle size={16} className="shrink-0 text-rose-500 mt-0.5" />
                                <span>{submitError}</span>
                            </div>
                        )}

                        <form onSubmit={handleFormSubmit} className="flex-1 flex flex-col overflow-hidden">
                            <div className="flex-1 overflow-y-auto p-5 space-y-6 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-200 [&::-webkit-scrollbar-thumb]:rounded-full">
                                <div className="space-y-3">
                                    <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Plan Details</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        <div className="md:col-span-2">
                                            <Input
                                                label="Plan Name"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                placeholder="e.g. Premium Care Package"
                                                required
                                            />
                                        </div>
                                        <Input
                                            label="Plan Code"
                                            name="planCode"
                                            value={formData.planCode}
                                            onChange={handleInputChange}
                                            placeholder="e.g. PLN-1001"
                                            required
                                        />
                                        <Input
                                            label="Plan Price"
                                            name="price"
                                            value={formData.price}
                                            onChange={handleInputChange}
                                            placeholder="e.g. 15000"
                                            type="number"
                                            leftIcon={<IndianRupee size={14} />}
                                            required
                                        />
                                        <Select
                                            label="Billing Cycle"
                                            name="billingCycle"
                                            value={formData.billingCycle}
                                            onChange={handleInputChange as any}
                                            options={[
                                                { label: 'Monthly', value: 'MONTHLY' },
                                                { label: 'Quarterly', value: 'QUARTERLY' },
                                                { label: 'Annually / Yearly', value: 'YEARLY' },
                                            ]}
                                        />
                                        <div className="md:col-span-2 flex flex-col gap-1.5 w-full">
                                            <label className="text-sm font-semibold text-slate-700">Description</label>
                                            <textarea
                                                name="description"
                                                value={formData.description}
                                                onChange={handleInputChange as any}
                                                className="w-full bg-slate-50 hover:bg-slate-100 border border-transparent focus:bg-white focus:border-primary/30 rounded-xl focus:outline-none focus:ring-4 focus:ring-primary/10 text-sm font-medium text-slate-800 placeholder-slate-400 transition-all p-3 resize-none h-20"
                                                placeholder="Describe the target audience and benefits of this plan..."
                                                required
                                            ></textarea>
                                        </div>
                                    </div>
                                </div>

                                <div className="w-full h-px bg-slate-100"></div>

                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Allocated Services</h3>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            className="h-7 text-xs px-2.5"
                                            leftIcon={<ListPlus size={14} />}
                                            onClick={addServiceField}
                                        >
                                            Add Service
                                        </Button>
                                    </div>

                                    {availableServices.length === 0 && (
                                        <p className="text-[10px] text-amber-500 font-medium">
                                            Warning: You have no Services saved in the system. Create a Service first.
                                        </p>
                                    )}

                                    <div className="space-y-3">
                                        {planServices.map((planSvc, index) => (
                                            <div key={index} className="flex items-start gap-2 bg-slate-50 p-3 rounded-xl border border-slate-100">
                                                <div className="flex-1 grid grid-cols-3 gap-3">
                                                    <div className="col-span-2">
                                                        <Select
                                                            label="Select Service"
                                                            options={serviceOptions}
                                                            value={planSvc.serviceUuid}
                                                            onChange={(e) => updateServiceField(index, 'serviceUuid', e.target.value)}
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
                                                        type="button"
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
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => !isSubmitting && closeMenuAndModal()}
                                    disabled={isSubmitting}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    size="sm"
                                    disabled={isSubmitting}
                                    leftIcon={!isSubmitting ? <Check size={16} /> : undefined}
                                >
                                    {isSubmitting ? 'Saving...' : (editingPlan ? 'Save Changes' : 'Save Plan')}
                                </Button>
                            </div>
                        </form>
                    </div>
                </>
            )}
        </div>
    );
};

export default SubscriptionCom;