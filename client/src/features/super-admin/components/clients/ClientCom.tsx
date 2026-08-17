import React, { useState, useEffect, useMemo } from 'react';
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
    X,
    Check,
    AlertCircle,
    CheckCircle2
} from 'lucide-react';
import { Button } from '../../../../components/ui/Button';
import { Input } from '../../../../components/ui/Input';
import { Badge } from '../../../../components/ui/Badge';
import { Select } from '../../../../components/ui/Select';
import { createClientApi, getClientsApi, updateClientApi, deleteClientApi } from '../../api/client';

const initialFormState = {
    firstName: '',
    lastName: '',
    mobileNumber: '',
    email: '',
    address: '',
    pincode: '',
    dependentName: '',
    dependentPhone: '',
    dependentEmail: '',
    serviceProvider: '',
    careGiver: '',
    version: 0
};

const ClientCom = () => {
    const [clients, setClients] = useState<any[]>([]);
    const [isFetchingClients, setIsFetchingClients] = useState(true);

    const [isAddClientOpen, setIsAddClientOpen] = useState(false);
    const [editingClient, setEditingClient] = useState<any | null>(null);
    const [formData, setFormData] = useState(initialFormState);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [submitError, setSubmitError] = useState<string | null>(null);
    const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);

    const [activeActionMenu, setActiveActionMenu] = useState<string | null>(null);

    const loadClients = async () => {
        setIsFetchingClients(true);
        try {
            const data = await getClientsApi();
            setClients(data);
        } catch (error) {
            console.error("Error loading clients:", error);
        } finally {
            setIsFetchingClients(false);
        }
    };

    useEffect(() => {
        loadClients();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (submitError) setSubmitError(null);
    };

    const closeMenuAndModal = () => {
        setIsAddClientOpen(false);
        setEditingClient(null);
        setFormData(initialFormState);
        setSubmitError(null);
        setActiveActionMenu(null);
    };

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitError(null);
        setSubmitSuccess(null);

        // Sanitize Payload: Remove empty optional fields
        const payload: any = { ...formData };
        Object.keys(payload).forEach(key => {
            if (payload[key] === '') {
                delete payload[key];
            }
        });

        // Ensure version is strictly passed correctly based on operation
        if (editingClient) {
            payload.version = Number(formData.version) || 0;
        } else {
            delete payload.version;
        }

        try {
            if (editingClient && editingClient.resolvedUuid) {
                await updateClientApi(editingClient.resolvedUuid, payload);
                setSubmitSuccess(`${formData.firstName} ${formData.lastName} has been successfully updated!`);
            } else {
                await createClientApi(payload);
                setSubmitSuccess(`${formData.firstName} ${formData.lastName} has been successfully onboarded!`);
            }

            closeMenuAndModal();
            setTimeout(() => setSubmitSuccess(null), 5000);
            await loadClients();

        } catch (error: any) {
            console.error('Failed to save client:', error);
            setSubmitError(error.message || 'An unexpected error occurred while saving the client.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleEditClick = (client: any) => {
        const uuid = client.uuid || client.clientUuid || client.id;

        setEditingClient({ ...client, resolvedUuid: uuid });
        setFormData({
            firstName: client.firstName || '',
            lastName: client.lastName || '',
            mobileNumber: client.mobileNumber || '',
            email: client.email || '',
            address: client.address || '',
            pincode: client.pincode || '',
            dependentName: client.dependentName || '',
            dependentPhone: client.dependentPhone || '',
            dependentEmail: client.dependentEmail || '',
            serviceProvider: client.serviceProvider || '',
            careGiver: client.careGiver || '',
            version: client.version ?? 0
        });
        setIsAddClientOpen(true);
        setActiveActionMenu(null);
    };

    const handleDeleteClick = async (uuid: string, name: string) => {
        if (!uuid) {
            alert("Error: Client ID is missing.");
            return;
        }

        if (!window.confirm(`Are you sure you want to delete ${name}? This action cannot be undone.`)) {
            setActiveActionMenu(null);
            return;
        }

        try {
            await deleteClientApi(uuid);
            setSubmitSuccess(`${name} was successfully deleted.`);
            setTimeout(() => setSubmitSuccess(null), 5000);
            await loadClients();
        } catch (error: any) {
            console.error("Delete failed:", error);
            // This will show the ROUTE_NOT_FOUND error smoothly in the UI until the backend fixes it
            alert(error.message || "Failed to delete client.");
        } finally {
            setActiveActionMenu(null);
        }
    };

    const getStageName = (stage: any): string => {
        if (!stage) return 'Initial Contact';
        if (typeof stage === 'string') return stage;
        return stage.name || stage.code || 'Initial Contact';
    };

    const getStatusValue = (status: any): string => {
        if (!status) return 'NEW';
        if (typeof status === 'string') return status.toUpperCase();
        return (status.code || status.name || 'NEW').toUpperCase();
    };

    const getCareGiverName = (cg: any): string | null => {
        if (!cg) return null;
        if (typeof cg === 'string') return cg;
        const fullName = `${cg.firstName || ''} ${cg.lastName || ''}`.trim();
        return fullName || cg.name || cg.username || 'Assigned';
    };

    const dynamicPipelineStages = useMemo(() => {
        const counts = { 'Initial Contact': 0, 'Assessment': 0, 'Care Plan setup': 0, 'Active Care': 0 };

        clients.forEach(client => {
            const stage = getStageName(client.pipelineStage);
            if (stage.toLowerCase().includes('assessment')) counts['Assessment']++;
            else if (stage.toLowerCase().includes('care plan')) counts['Care Plan setup']++;
            else if (stage.toLowerCase().includes('active')) counts['Active Care']++;
            else counts['Initial Contact']++;
        });

        return [
            { name: 'Initial Contact', count: counts['Initial Contact'], color: 'bg-blue-500' },
            { name: 'Assessment', count: counts['Assessment'], color: 'bg-amber-500' },
            { name: 'Care Plan setup', count: counts['Care Plan setup'], color: 'bg-purple-500' },
            { name: 'Active Care', count: counts['Active Care'], color: 'bg-emerald-500' },
        ];
    }, [clients]);

    return (
        <div className="flex flex-col gap-4 max-w-[1400px] mx-auto w-full relative pb-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 font-heading tracking-tight mb-0">
                        Client Management
                    </h1>
                    <p className="text-xs font-medium text-slate-500">
                        Manage client onboarding, assignments, and profiles.
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" leftIcon={<FileText size={16} />}>
                        Export List
                    </Button>
                    <Button
                        size="sm"
                        leftIcon={<Plus size={16} strokeWidth={2.5} />}
                        onClick={() => {
                            setFormData(initialFormState);
                            setEditingClient(null);
                            setIsAddClientOpen(true);
                        }}
                    >
                        Add New Client
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

            <div className="flex flex-col gap-3">
                <h2 className="text-base font-bold text-slate-800">Onboarding Pipeline</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {dynamicPipelineStages.map((stage) => (
                        <div key={stage.name} className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm relative overflow-hidden group">
                            <div className={`absolute top-0 left-0 w-1 h-full ${stage.color}`}></div>
                            <div className="flex justify-between items-start mb-1.5">
                                <span className="text-xs text-slate-600 font-semibold">{stage.name}</span>
                                <div className="p-1 bg-slate-50 rounded-md text-slate-400 hover:text-primary hover:bg-primary/10 transition-colors cursor-pointer">
                                    <ArrowRight size={14} />
                                </div>
                            </div>
                            <div className="flex items-baseline gap-1.5">
                                <span className="text-2xl font-bold text-slate-900">{stage.count}</span>
                                <span className="text-xs font-medium text-slate-400">clients</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-100 shadow-sm flex flex-col overflow-hidden">
                <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-3">
                    <div className="w-full sm:w-96">
                        <Input
                            placeholder="Search clients by name, email or ID..."
                            leftIcon={<Search size={16} />}
                            className="bg-slate-50 border-transparent text-sm h-9"
                        />
                    </div>
                    <Button variant="secondary" size="sm" leftIcon={<Filter size={14} />}>
                        Filter
                    </Button>
                </div>

                {/* RESPONSIVE TABLE WRAPPER FIX */}
                <div className="w-full overflow-x-auto pb-16">
                    <table className="w-full text-left border-collapse min-w-[900px]">
                        <thead>
                            <tr className="bg-slate-50/50 border-b border-slate-100">
                                <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Client Details</th>
                                <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Pipeline Stage</th>
                                <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                                <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Assigned Caretaker</th>
                                <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 relative">
                            {isFetchingClients ? (
                                <tr>
                                    <td colSpan={5} className="px-4 py-10 text-center">
                                        <div className="flex items-center justify-center gap-2 text-sm font-medium text-slate-500">
                                            <svg className="animate-spin h-5 w-5 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Loading clients...
                                        </div>
                                    </td>
                                </tr>
                            ) : clients.length > 0 ? (
                                clients.map((client) => {
                                    const uuid = client.uuid || client.clientUuid || client.id;
                                    const stageName = getStageName(client.pipelineStage);
                                    const statusVal = getStatusValue(client.status);
                                    const cgName = getCareGiverName(client.careGiver);
                                    const isMenuOpen = activeActionMenu === uuid;

                                    return (
                                        <tr key={uuid} className="hover:bg-slate-50/50 transition-colors group relative">
                                            <td className="px-4 py-3">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs border border-primary/20 shrink-0">
                                                        {client.firstName ? client.firstName.charAt(0).toUpperCase() : 'C'}
                                                    </div>
                                                    <div>
                                                        <div className="text-sm font-bold text-slate-900">{client.firstName} {client.lastName}</div>
                                                        <div className="text-xs font-medium text-slate-500">
                                                            {uuid?.substring(0, 8).toUpperCase()} · {client.email}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className="text-xs font-semibold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-full whitespace-nowrap">
                                                    {stageName}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3">
                                                {statusVal === 'ACTIVE' && <Badge variant="success">Active</Badge>}
                                                {statusVal === 'PENDING' && <Badge variant="warning">Pending</Badge>}
                                                {statusVal === 'ONBOARDING' && <Badge variant="info">Onboarding</Badge>}
                                                {statusVal === 'NEW' && <Badge variant="primary">New</Badge>}
                                                {!['ACTIVE', 'PENDING', 'ONBOARDING', 'NEW'].includes(statusVal) && (
                                                    <Badge variant="secondary">{statusVal}</Badge>
                                                )}
                                            </td>
                                            <td className="px-4 py-3">
                                                {cgName ? (
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-6 h-6 rounded-full bg-secondary/20 text-primary flex items-center justify-center font-bold text-xs shrink-0">
                                                            {cgName.charAt(0).toUpperCase()}
                                                        </div>
                                                        <span className="text-xs font-semibold text-slate-700 truncate w-32">{cgName}</span>
                                                    </div>
                                                ) : (
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="text-primary bg-primary/5 hover:bg-primary/10 h-7 text-xs px-2 whitespace-nowrap"
                                                        leftIcon={<UserPlus size={12} />}
                                                        onClick={() => handleEditClick(client)}
                                                    >
                                                        Assign Caretaker
                                                    </Button>
                                                )}
                                            </td>

                                            {/* ACTION MENU */}
                                            <td className="px-4 py-3 text-right relative">
                                                <button
                                                    onClick={() => setActiveActionMenu(isMenuOpen ? null : uuid)}
                                                    className="p-1.5 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                                                >
                                                    <MoreVertical size={16} />
                                                </button>

                                                {/* Dropdown Menu */}
                                                {isMenuOpen && (
                                                    <>
                                                        <div
                                                            className="fixed inset-0 z-10"
                                                            onClick={() => setActiveActionMenu(null)}
                                                        />
                                                        <div className="absolute right-8 top-10 bg-white border border-slate-100 shadow-xl rounded-lg py-1 z-20 w-36 flex flex-col text-left">
                                                            <button
                                                                onClick={() => handleEditClick(client)}
                                                                className="flex w-full items-center gap-2 px-3 py-2 text-xs hover:bg-slate-50 text-slate-700 text-left"
                                                            >
                                                                <UserPlus size={14} /> Assign
                                                            </button>
                                                            <button
                                                                onClick={() => handleEditClick(client)}
                                                                className="flex w-full items-center gap-2 px-3 py-2 text-xs hover:bg-slate-50 text-slate-700 text-left"
                                                            >
                                                                <Edit2 size={14} /> Edit
                                                            </button>
                                                            <button
                                                                onClick={() => handleDeleteClick(uuid, `${client.firstName} ${client.lastName}`)}
                                                                className="flex w-full items-center gap-2 px-3 py-2 text-xs hover:bg-rose-50 text-rose-600 text-left"
                                                            >
                                                                <Trash2 size={14} /> Delete
                                                            </button>
                                                        </div>
                                                    </>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan={5} className="px-4 py-10 text-center text-sm font-medium text-slate-500">
                                        No clients found. Click "Add New Client" to get started.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="p-3 border-t border-slate-100 flex items-center justify-between text-xs font-medium text-slate-500">
                    <span>Showing {clients.length > 0 ? '1' : '0'} to {clients.length} of {clients.length} clients</span>
                    <div className="flex gap-1">
                        <Button variant="ghost" size="sm" disabled className="h-7 text-xs px-2">Prev</Button>
                        <Button variant="ghost" size="sm" disabled={clients.length === 0} className="bg-primary/10 text-primary h-7 text-xs px-2.5">1</Button>
                        <Button variant="ghost" size="sm" disabled className="h-7 text-xs px-2">Next</Button>
                    </div>
                </div>
            </div>

            {/* Slide-out Panel for Add / Edit */}
            {isAddClientOpen && (
                <>
                    <div
                        className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 transition-opacity"
                        onClick={() => !isSubmitting && closeMenuAndModal()}
                    />
                    <div className="fixed inset-y-0 right-0 z-50 w-full md:w-[600px] bg-white shadow-2xl transform transition-transform duration-300 flex flex-col">
                        <div className="flex items-center justify-between p-5 border-b border-slate-100">
                            <div>
                                <h2 className="text-lg font-bold text-slate-900 tracking-tight">
                                    {editingClient ? 'Edit Client Details' : 'Onboard New Client'}
                                </h2>
                                <p className="text-xs font-medium text-slate-500">
                                    {editingClient ? 'Update the client profile information below.' : 'Enter primary details to start onboarding.'}
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
                                            placeholder="e.g. John"
                                            required
                                        />
                                        <Input
                                            label="Last Name"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleInputChange}
                                            placeholder="e.g. Doe"
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
                                            placeholder="john@example.com"
                                            type="email"
                                            required
                                        />
                                        <div className="md:col-span-2">
                                            <Input
                                                label="Address"
                                                name="address"
                                                value={formData.address}
                                                onChange={handleInputChange}
                                                placeholder="Street address, apartment, suite"
                                                required
                                            />
                                        </div>
                                        <Input
                                            label="Pincode / Zip"
                                            name="pincode"
                                            value={formData.pincode}
                                            onChange={handleInputChange}
                                            placeholder="Enter zip code"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="w-full h-px bg-slate-100"></div>

                                <div className="space-y-3">
                                    <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                                        <span className="w-5 h-5 rounded bg-primary/10 text-primary flex items-center justify-center text-[10px]">2</span>
                                        Dependent Details (Optional)
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        <div className="md:col-span-2">
                                            <Input
                                                label="Dependent Name"
                                                name="dependentName"
                                                value={formData.dependentName}
                                                onChange={handleInputChange}
                                                placeholder="e.g. Jane Doe"
                                            />
                                        </div>
                                        <Input
                                            label="Dependent Phone Number"
                                            name="dependentPhone"
                                            value={formData.dependentPhone}
                                            onChange={handleInputChange}
                                            placeholder="+1 (555) 000-0000"
                                            type="tel"
                                        />
                                        <Input
                                            label="Dependent Email ID"
                                            name="dependentEmail"
                                            value={formData.dependentEmail}
                                            onChange={handleInputChange}
                                            placeholder="jane@example.com"
                                            type="email"
                                        />
                                    </div>
                                </div>

                                <div className="w-full h-px bg-slate-100"></div>

                                <div className="space-y-3">
                                    <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                                        <span className="w-5 h-5 rounded bg-primary/10 text-primary flex items-center justify-center text-[10px]">3</span>
                                        Assignments
                                    </h3>
                                    <div className="grid grid-cols-1 gap-3">
                                        <Select
                                            label="Assign Service Provider"
                                            name="serviceProvider"
                                            value={formData.serviceProvider}
                                            onChange={handleInputChange as any}
                                            options={[
                                                { label: 'Select a provider...', value: '' },
                                                { label: 'Apex Healthcare Partners', value: 'SP-101' },
                                                { label: 'Serenity Senior Solutions', value: 'SP-102' },
                                                { label: 'Guardian Home Care', value: 'SP-103' },
                                            ]}
                                        />
                                        <Select
                                            label="Assign Care Giver"
                                            name="careGiver"
                                            value={formData.careGiver}
                                            onChange={handleInputChange as any}
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
                                    {isSubmitting ? (
                                        <span className="flex items-center gap-2">
                                            <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Saving...
                                        </span>
                                    ) : (editingClient ? 'Save Changes' : 'Save Client')}
                                </Button>
                            </div>
                        </form>
                    </div>
                </>
            )}
        </div>
    );
};

export default ClientCom;
