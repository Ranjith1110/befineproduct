import React, { useState, useEffect } from 'react';
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
    Check,
    AlertCircle,
    CheckCircle2
} from 'lucide-react';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import { Badge } from '../../ui/Badge';
import { Select } from '../../ui/Select';

import {
    createCareManagerApi,
    getCareManagersApi,
    updateCareManagerApi,
    deleteCareManagerApi,
    getServiceProvidersApi
} from '../../../api/super-admin/careManagers';

const initialFormState = {
    firstName: '',
    lastName: '',
    email: '',
    mobileNumber: '',
    password: '',
    providerUuid: '',
    isActive: true,
    version: 0
};

// --- SAFE DATA EXTRACTORS ---
const getSafeText = (val: any, defaultText: string): string => {
    if (val === null || val === undefined) return defaultText;
    if (typeof val === 'string') return val;
    if (typeof val === 'number') return val.toString();
    if (typeof val === 'object') {
        if (Array.isArray(val)) return val.length > 0 ? getSafeText(val[0], defaultText) : defaultText;
        return val.name || val.title || val.firstName || defaultText;
    }
    return defaultText;
};

const extractId = (val: any) => {
    if (!val) return '';
    if (typeof val === 'string') return val;
    if (typeof val === 'object') return val.uuid || val.id || val.code || '';
    return String(val);
};

const getInitials = (first: string, last: string) => {
    const f = first ? first.charAt(0).toUpperCase() : '';
    const l = last ? last.charAt(0).toUpperCase() : '';
    return (f + l) || 'CM';
};

const CareManagerCom = () => {
    const [managers, setManagers] = useState<any[]>([]);
    const [providers, setProviders] = useState<any[]>([]);
    const [isFetchingData, setIsFetchingData] = useState(true);

    const [isAddManagerOpen, setIsAddManagerOpen] = useState(false);
    const [editingManager, setEditingManager] = useState<any | null>(null);
    const [formData, setFormData] = useState(initialFormState);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);

    const loadData = async () => {
        setIsFetchingData(true);
        try {
            const [managersData, providersData] = await Promise.all([
                getCareManagersApi().catch(() => []),
                getServiceProvidersApi().catch(() => [])
            ]);
            setManagers(managersData);
            setProviders(providersData);
        } catch (error) {
            console.error("Error loading dashboard data:", error);
        } finally {
            setIsFetchingData(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (submitError) setSubmitError(null);
    };

    const closeMenuAndModal = () => {
        setIsAddManagerOpen(false);
        setEditingManager(null);
        setFormData(initialFormState);
        setSubmitError(null);
    };

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitError(null);
        setSubmitSuccess(null);

        // Build Payload with strict mapping for validation rules
        const payload: any = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            mobile: formData.mobileNumber, // <-- FIXED: Strict 'mobile' mapping
            mobileNumber: formData.mobileNumber, // Fallback
            phone: formData.mobileNumber, // Fallback
            isActive: formData.isActive,
            status: formData.isActive ? 'ACTIVE' : 'INACTIVE'
        };

        if (formData.providerUuid) {
            payload.providerUuid = formData.providerUuid;
        }

        if (!editingManager && formData.password) {
            payload.password = formData.password;
        }

        if (editingManager) {
            payload.version = Number(formData.version) || 0;
        }

        try {
            if (editingManager && editingManager.resolvedUuid) {
                await updateCareManagerApi(editingManager.resolvedUuid, payload);
                setSubmitSuccess(`"${formData.firstName}" has been successfully updated!`);
            } else {
                await createCareManagerApi(payload);
                setSubmitSuccess(`"${formData.firstName}" has been successfully onboarded!`);
            }

            closeMenuAndModal();
            setTimeout(() => setSubmitSuccess(null), 5000);
            await loadData();

        } catch (error: any) {
            console.error('Failed to save Care Manager:', error);
            setSubmitError(error.message || 'An unexpected error occurred while saving.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleEditClick = (manager: any) => {
        const uuid = extractId(manager);
        setEditingManager({ ...manager, resolvedUuid: uuid });

        let fName = getSafeText(manager.firstName, '');
        let lName = getSafeText(manager.lastName, '');
        
        if (!fName && manager.name) {
            const parts = manager.name.split(' ');
            fName = parts[0] || '';
            lName = parts.slice(1).join(' ') || '';
        }

        setFormData({
            firstName: fName,
            lastName: lName,
            email: getSafeText(manager.email, ''),
            // Safely grab the phone number from whichever property the backend returned
            mobileNumber: getSafeText(manager.mobile || manager.mobileNumber || manager.phone, ''),
            password: '', 
            providerUuid: extractId(manager.providerUuid || manager.assignedProvider || manager.provider) || '',
            isActive: manager.isActive ?? (manager.status === 'active' || manager.status === 'ACTIVE'),
            version: manager.version ?? 0
        });

        setIsAddManagerOpen(true);
    };

    const handleDeleteClick = async (uuid: string, name: string) => {
        if (!uuid) {
            alert("Error: Manager ID is missing.");
            return;
        }

        if (!window.confirm(`Are you sure you want to remove ${name}? This action cannot be undone.`)) {
            return;
        }

        try {
            await deleteCareManagerApi(uuid);
            setSubmitSuccess(`${name} was successfully removed.`);
            setTimeout(() => setSubmitSuccess(null), 5000);
            await loadData();
        } catch (error: any) {
            console.error("Delete failed:", error);
            alert(error.message || "Failed to remove Care Manager. The record may have already been deleted.");
        }
    };

    const providerOptions = [
        { label: 'Select a Service Provider...', value: '' },
        ...providers.map(p => ({
            label: getSafeText(p.name || p.companyName, 'Unnamed Provider'),
            value: extractId(p)
        }))
    ];

    const getProviderName = (uuid: string) => {
        if (!uuid) return 'Internal / Unassigned';
        const p = providers.find(prov => extractId(prov) === uuid);
        return p ? getSafeText(p.name || p.companyName, 'Unknown Provider') : 'Unknown Provider';
    };

    const activeManagersCount = managers.filter(m => m.isActive || m.status === 'ACTIVE' || m.status === 'active').length;

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
                        onClick={() => {
                            closeMenuAndModal();
                            setIsAddManagerOpen(true);
                        }}
                    >
                        Onboard Manager
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

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                        <UserCheck size={20} />
                    </div>
                    <div>
                        <div className="text-xl font-bold text-slate-800">{activeManagersCount}</div>
                        <div className="text-xs font-medium text-slate-500">Active Managers</div>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-secondary/20 text-primary flex items-center justify-center">
                        <Building2 size={20} />
                    </div>
                    <div>
                        <div className="text-xl font-bold text-slate-800">{providers.length}</div>
                        <div className="text-xs font-medium text-slate-500">Mapped Providers</div>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center">
                        <PhoneCall size={20} />
                    </div>
                    <div>
                        <div className="text-xl font-bold text-slate-800">--</div>
                        <div className="text-xs font-medium text-slate-500">Active Follow-ups</div>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                        <Activity size={20} />
                    </div>
                    <div>
                        <div className="text-xl font-bold text-slate-800">--%</div>
                        <div className="text-xs font-medium text-slate-500">Completion Rate</div>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden flex flex-col">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[900px]">
                        <thead>
                            <tr className="bg-slate-50/50 border-b border-slate-100">
                                <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Manager Details</th>
                                <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Contact Info</th>
                                <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Assigned Provider</th>
                                <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                                <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {isFetchingData ? (
                                <tr>
                                    <td colSpan={5} className="px-4 py-10 text-center">
                                        <div className="flex items-center justify-center gap-2 text-sm font-medium text-slate-500">
                                            <svg className="animate-spin h-5 w-5 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Loading managers...
                                        </div>
                                    </td>
                                </tr>
                            ) : managers.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-4 py-10 text-center text-sm font-medium text-slate-500">
                                        No Care Managers found. Click "Onboard Manager" to add one.
                                    </td>
                                </tr>
                            ) : (
                                managers.map((manager, idx) => {
                                    const uuid = extractId(manager) || `cm-${idx}`;
                                    const fName = getSafeText(manager.firstName, '');
                                    const lName = getSafeText(manager.lastName, '');
                                    const displayName = fName || lName ? `${fName} ${lName}` : getSafeText(manager.name, 'Unnamed');
                                    
                                    const providerUuid = extractId(manager.providerUuid || manager.assignedProvider || manager.provider);
                                    const displayProvider = getProviderName(providerUuid);

                                    const isActive = manager.isActive ?? (manager.status === 'active' || manager.status === 'ACTIVE');

                                    return (
                                        <tr key={uuid} className="hover:bg-slate-50/50 transition-colors group">
                                            <td className="px-4 py-3">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs border border-primary/20 shrink-0">
                                                        {getInitials(fName, lName)}
                                                    </div>
                                                    <div>
                                                        <div className="text-sm font-bold text-slate-900">{displayName}</div>
                                                        <div className="text-[10px] font-medium text-slate-500">ID: {uuid.substring(0, 8)}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="text-xs font-semibold text-slate-700 mb-0.5">
                                                    {getSafeText(manager.mobile || manager.mobileNumber || manager.phone, 'No Phone')}
                                                </div>
                                                <div className="text-[10px] font-medium text-slate-500 truncate max-w-[150px]">
                                                    {getSafeText(manager.email, 'No Email')}
                                                </div>
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="flex items-center gap-1.5">
                                                    <Building2 size={14} className="text-primary" />
                                                    <span className="text-xs font-semibold text-slate-800">{displayProvider}</span>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3">
                                                {isActive ? (
                                                    <Badge variant="success">Active</Badge>
                                                ) : (
                                                    <Badge variant="secondary">Inactive</Badge>
                                                )}
                                            </td>
                                            <td className="px-4 py-3 text-right">
                                                <div className="flex items-center justify-end gap-1">
                                                    <button 
                                                        onClick={() => handleEditClick(manager)}
                                                        className="p-1.5 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors" 
                                                        title="Edit Manager"
                                                    >
                                                        <Edit2 size={14} />
                                                    </button>
                                                    <button 
                                                        onClick={() => handleDeleteClick(uuid, displayName)}
                                                        className="p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors" 
                                                        title="Remove Manager"
                                                    >
                                                        <Trash2 size={14} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="p-3 border-t border-slate-100 flex items-center justify-between text-xs font-medium text-slate-500">
                    <span>Showing {managers.length > 0 ? 1 : 0} to {managers.length} of {managers.length} managers</span>
                    <div className="flex gap-1">
                        <Button variant="ghost" size="sm" disabled className="h-7 text-xs px-2">Prev</Button>
                        <Button variant="ghost" size="sm" disabled={managers.length === 0} className="bg-primary/10 text-primary h-7 text-xs px-2.5">1</Button>
                        <Button variant="ghost" size="sm" disabled className="h-7 text-xs px-2">Next</Button>
                    </div>
                </div>
            </div>

            {isAddManagerOpen && (
                <>
                    <div
                        className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 transition-opacity"
                        onClick={() => !isSubmitting && closeMenuAndModal()}
                    />
                    <div className="fixed inset-y-0 right-0 z-50 w-full md:w-[600px] bg-white shadow-2xl transform transition-transform duration-300 flex flex-col">
                        <div className="flex items-center justify-between p-5 border-b border-slate-100">
                            <div>
                                <h2 className="text-lg font-bold text-slate-900 tracking-tight">
                                    {editingManager ? 'Edit Care Manager' : 'Onboard Care Manager'}
                                </h2>
                                <p className="text-xs font-medium text-slate-500">
                                    {editingManager ? 'Update profile information and assignments.' : 'Create profile and assign a service provider.'}
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
                            <div className="flex-1 overflow-y-auto p-5 space-y-5 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-200 [&::-webkit-scrollbar-thumb]:rounded-full">

                                <div className="space-y-3">
                                    <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                                        <span className="w-5 h-5 rounded bg-primary/10 text-primary flex items-center justify-center text-[10px]">1</span>
                                        Primary Information
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        <Input 
                                            label="First Name" 
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleInputChange}
                                            placeholder="e.g. Sarah" 
                                            required 
                                        />
                                        <Input 
                                            label="Last Name" 
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleInputChange}
                                            placeholder="e.g. Jenkins" 
                                            required 
                                        />
                                        <Input 
                                            label="Mobile Number" 
                                            name="mobileNumber"
                                            value={formData.mobileNumber}
                                            onChange={handleInputChange}
                                            placeholder="+1 (555) 000-0000" 
                                            type="tel" 
                                            required 
                                        />
                                        <Input 
                                            label="Email ID" 
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            placeholder="sarah@example.com" 
                                            type="email" 
                                            required 
                                        />
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
                                            name="providerUuid"
                                            value={formData.providerUuid}
                                            onChange={handleInputChange as any}
                                            options={providerOptions}
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
                                        <Input 
                                            label={editingManager ? "New Password (Leave blank to keep)" : "Temporary Password"}
                                            name="password"
                                            value={formData.password}
                                            onChange={handleInputChange}
                                            type="password" 
                                            placeholder="••••••••" 
                                            required={!editingManager} 
                                        />
                                        <Select
                                            label="Account Status"
                                            name="isActive"
                                            value={formData.isActive ? 'true' : 'false'}
                                            onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.value === 'true' }))}
                                            options={[
                                                { label: 'Active', value: 'true' },
                                                { label: 'Inactive / Pending', value: 'false' },
                                            ]}
                                        />
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
                                    {isSubmitting ? 'Saving...' : (editingManager ? 'Save Changes' : 'Save Care Manager')}
                                </Button>
                            </div>
                        </form>
                    </div>
                </>
            )}
        </div>
    );
};

export default CareManagerCom;