import { useCallback, useEffect, useMemo, useState, type ChangeEvent, type FormEvent } from 'react';
import { AlertCircle, Archive, Check, CheckCircle2, Edit2, FileText, Filter, IndianRupee, Layers, ListPlus, Minus, Plus, Search, Send, Trash2, X } from 'lucide-react';
import { Button } from '../../../../components/ui/Button';
import { Input } from '../../../../components/ui/Input';
import { Badge } from '../../../../components/ui/Badge';
import { Select } from '../../../../components/ui/Select';
import {
    archiveSubscriptionPlanApi,
    createSubscriptionPlanApi,
    deleteSubscriptionPlanApi,
    getSubscriptionPlanApi,
    getSubscriptionPlansApi,
    publishSubscriptionPlanApi,
    updateSubscriptionPlanApi,
    type CreateSubscriptionPlanPayload,
    type SubscriptionPlan,
    type SubscriptionPlanService,
    type SubscriptionPlanStatus,
    type SubscriptionVisibility,
} from '../../api/subscriptions';
import { getLookupServicesApi } from '../../api/lookupServices';

interface ServiceOption { uuid: string; name: string }
interface ServiceAllocationForm {
    serviceUuid: string;
    includedQuantity: string;
    includedVisits: string;
    includedSessions: string;
    validityDays: string;
}
interface PlanFormState {
    planCode: string;
    name: string;
    description: string;
    billingCycle: string;
    durationMonths: string;
    price: string;
    currency: string;
    isFeatured: boolean;
    isPopular: boolean;
    displayOrder: string;
    visibility: SubscriptionVisibility;
}

const initialForm: PlanFormState = {
    planCode: '', name: '', description: '', billingCycle: 'MONTHLY', durationMonths: '1', price: '', currency: 'INR',
    isFeatured: false, isPopular: false, displayOrder: '0', visibility: 'PUBLIC',
};
const emptyAllocation = (): ServiceAllocationForm => ({ serviceUuid: '', includedQuantity: '0', includedVisits: '0', includedSessions: '0', validityDays: '' });
const isRecord = (value: unknown): value is Record<string, unknown> => typeof value === 'object' && value !== null;
const text = (value: unknown): string => typeof value === 'string' ? value : '';
const numeric = (value: unknown, fallback = 0): number => typeof value === 'number' ? value : Number(value) || fallback;

const toServiceOption = (value: unknown): ServiceOption | null => {
    if (!isRecord(value)) return null;
    const uuid = text(value.uuid);
    const name = text(value.title) || text(value.name);
    return uuid && name ? { uuid, name } : null;
};

const serviceUuid = (service: SubscriptionPlanService): string => service.serviceUuid || service.service?.uuid || '';
const serviceLabel = (service: SubscriptionPlanService, lookup: Map<string, string>): string => (
    service.serviceName || service.name || service.service?.title || service.service?.name || lookup.get(serviceUuid(service)) || serviceUuid(service) || 'Service unavailable'
);

const SubscriptionCom = () => {
    const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
    const [services, setServices] = useState<ServiceOption[]>([]);
    const [search, setSearch] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const [status, setStatus] = useState<SubscriptionPlanStatus | ''>('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [total, setTotal] = useState(0);
    const [isLoadingPlans, setIsLoadingPlans] = useState(true);
    const [isLoadingServices, setIsLoadingServices] = useState(true);
    const [loadError, setLoadError] = useState('');
    const [serviceError, setServiceError] = useState('');
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [editingPlan, setEditingPlan] = useState<SubscriptionPlan | null>(null);
    const [form, setForm] = useState<PlanFormState>(initialForm);
    const [allocations, setAllocations] = useState<ServiceAllocationForm[]>([emptyAllocation()]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [actionUuid, setActionUuid] = useState('');
    const [formError, setFormError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const loadPlans = useCallback(async () => {
        setIsLoadingPlans(true);
        setLoadError('');
        try {
            const result = await getSubscriptionPlansApi({ page, limit: 12, search: debouncedSearch || undefined, status: status || undefined, sortBy: 'displayOrder', sortOrder: 'asc' });
            setPlans(result.items);
            setTotal(result.total);
            setTotalPages(result.totalPages);
        } catch (error) {
            setLoadError(error instanceof Error ? error.message : 'Unable to load subscription plans.');
        } finally {
            setIsLoadingPlans(false);
        }
    }, [debouncedSearch, page, status]);

    useEffect(() => {
        const timeout = window.setTimeout(() => { setDebouncedSearch(search.trim()); setPage(1); }, 350);
        return () => window.clearTimeout(timeout);
    }, [search]);

    useEffect(() => {
        const timeout = window.setTimeout(() => void loadPlans(), 0);
        return () => window.clearTimeout(timeout);
    }, [loadPlans]);

    const loadServices = useCallback(async () => {
        setIsLoadingServices(true);
        setServiceError('');
        try {
            const data = await getLookupServicesApi();
            setServices(data.map((service) => ({ uuid: service.uuid, name: service.name })));
        } catch (error) {
            setServiceError(error instanceof Error ? error.message : 'Unable to load services. Please try again.');
        } finally {
            setIsLoadingServices(false);
        }
    }, []);

    useEffect(() => {
        let active = true;
        getLookupServicesApi()
            .then((data) => { if (active) setServices(data.map(toServiceOption).filter((item): item is ServiceOption => item !== null)); })
            .catch((error: unknown) => { if (active) setServiceError(error instanceof Error ? error.message : 'Unable to load services.'); })
            .finally(() => { if (active) setIsLoadingServices(false); });
        return () => { active = false; };
    }, []);

    useEffect(() => {
        if (!successMessage) return;
        const timeout = window.setTimeout(() => setSuccessMessage(''), 5000);
        return () => window.clearTimeout(timeout);
    }, [successMessage]);

    const serviceLookup = useMemo(() => new Map(services.map((service) => [service.uuid, service.name])), [services]);
    const resetDrawer = () => { setDrawerOpen(false); setEditingPlan(null); setForm(initialForm); setAllocations([emptyAllocation()]); setFormError(''); };
    const openCreate = () => { resetDrawer(); setDrawerOpen(true); };

    const updateForm = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setForm((current) => ({ ...current, [name]: value }));
        setFormError('');
    };

    const updateAllocation = (index: number, field: keyof ServiceAllocationForm, value: string) => {
        setAllocations((current) => current.map((allocation, itemIndex) => itemIndex === index ? { ...allocation, [field]: value } : allocation));
        setFormError('');
    };

    const openEdit = async (plan: SubscriptionPlan) => {
        setActionUuid(plan.uuid);
        setLoadError('');
        try {
            const detail = await getSubscriptionPlanApi(plan.uuid);
            setEditingPlan(detail);
            setForm({
                planCode: detail.planCode || '', name: detail.name || '', description: detail.description || '', billingCycle: detail.billingCycle || 'MONTHLY',
                durationMonths: String(detail.durationMonths || 1), price: String(detail.price ?? ''), currency: detail.currency || 'INR',
                isFeatured: Boolean(detail.isFeatured), isPopular: Boolean(detail.isPopular), displayOrder: String(detail.displayOrder ?? 0), visibility: detail.visibility || 'PUBLIC',
            });
            setAllocations(detail.services?.length ? detail.services.map((service) => ({
                serviceUuid: serviceUuid(service), includedQuantity: String(service.includedQuantity ?? 0), includedVisits: String(service.includedVisits ?? 0),
                includedSessions: String(service.includedSessions ?? 0), validityDays: service.validityDays ? String(service.validityDays) : '',
            })) : [emptyAllocation()]);
            setDrawerOpen(true);
        } catch (error) {
            setLoadError(error instanceof Error ? error.message : 'Unable to load the plan.');
        } finally { setActionUuid(''); }
    };

    const buildPayload = (): CreateSubscriptionPlanPayload | null => {
        const duration = Number(form.durationMonths);
        const price = Number(form.price);
        const displayOrder = Number(form.displayOrder);
        if (form.planCode.trim().length < 2 || form.name.trim().length < 2) { setFormError('Plan code and name must contain at least 2 characters.'); return null; }
        if (!Number.isInteger(duration) || duration < 1 || duration > 120) { setFormError('Duration must be a whole number between 1 and 120 months.'); return null; }
        if (!Number.isFinite(price) || price < 0) { setFormError('Price must be a valid non-negative number.'); return null; }
        if (!/^[A-Za-z]{3}$/.test(form.currency)) { setFormError('Currency must be a 3-letter code.'); return null; }
        if (!Number.isInteger(displayOrder) || displayOrder < 0) { setFormError('Display order must be a non-negative whole number.'); return null; }
        if (allocations.length === 0) { setFormError('Please add and select at least one service.'); return null; }
        if (allocations.some((allocation) => !allocation.serviceUuid)) { setFormError('Please select a service.'); return null; }
        if (new Set(allocations.map((allocation) => allocation.serviceUuid)).size !== allocations.length) { setFormError('A service can only be allocated once.'); return null; }
        const parsedServices = allocations.map((allocation, index) => ({
            serviceUuid: allocation.serviceUuid,
            includedQuantity: numeric(allocation.includedQuantity), includedVisits: numeric(allocation.includedVisits), includedSessions: numeric(allocation.includedSessions),
            ...(allocation.validityDays ? { validityDays: numeric(allocation.validityDays) } : {}), displayOrder: index,
        }));
        if (parsedServices.some((service) => service.includedQuantity < 0 || service.includedVisits < 0 || service.includedSessions < 0 || (service.validityDays !== undefined && service.validityDays < 1))) {
            setFormError('Service allowances must be non-negative, and validity days must be positive when provided.'); return null;
        }
        return {
            planCode: form.planCode.trim(), name: form.name.trim(), description: form.description.trim() || undefined,
            billingCycle: form.billingCycle, durationMonths: duration, price, currency: form.currency.toUpperCase(), isFeatured: form.isFeatured,
            isPopular: form.isPopular, displayOrder, visibility: form.visibility, services: parsedServices,
        };
    };

    const submit = async (event: FormEvent) => {
        event.preventDefault();
        const payload = buildPayload();
        if (!payload || isSubmitting) return;
        setIsSubmitting(true); setFormError('');
        try {
            if (editingPlan) { await updateSubscriptionPlanApi(editingPlan.uuid, payload); setSuccessMessage(`"${payload.name}" updated successfully.`); }
            else { await createSubscriptionPlanApi(payload); setSuccessMessage(`"${payload.name}" created successfully.`); }
            resetDrawer(); await loadPlans();
        } catch (error) { setFormError(error instanceof Error ? error.message : 'Unable to save the plan.'); }
        finally { setIsSubmitting(false); }
    };

    const runAction = async (plan: SubscriptionPlan, action: 'delete' | 'publish' | 'archive') => {
        const prompts = { delete: 'Are you sure you want to delete this subscription plan?', publish: 'Publish this subscription plan?', archive: 'Archive this subscription plan?' };
        if (!window.confirm(prompts[action])) return;
        setActionUuid(plan.uuid); setLoadError('');
        try {
            if (action === 'delete') await deleteSubscriptionPlanApi(plan.uuid);
            if (action === 'publish') await publishSubscriptionPlanApi(plan.uuid, plan.version);
            if (action === 'archive') await archiveSubscriptionPlanApi(plan.uuid, plan.version);
            setSuccessMessage(`${plan.name} ${action === 'delete' ? 'deleted' : `${action}ed`} successfully.`);
            await loadPlans();
        } catch (error) { setLoadError(error instanceof Error ? error.message : `Unable to ${action} the plan.`); }
        finally { setActionUuid(''); }
    };

    return <div className="flex flex-col gap-4 max-w-[1400px] mx-auto w-full relative pb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
            <div><h1 className="text-2xl font-bold text-slate-900 font-heading tracking-tight">Subscriptions & Plans</h1><p className="text-xs font-medium text-slate-500">Create subscription plans and manage service allocations.</p></div>
            <div className="flex items-center gap-2">
                <div className="w-56 hidden md:block"><Input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search plans..." leftIcon={<Search size={16} />} className="bg-white border-transparent shadow-sm text-sm h-9" /></div>
                <Select value={status} onChange={(event) => { setStatus(event.target.value as SubscriptionPlanStatus | ''); setPage(1); }} options={[{ label: 'All statuses', value: '' }, { label: 'Draft', value: 'DRAFT' }, { label: 'Published', value: 'PUBLISHED' }, { label: 'Archived', value: 'ARCHIVED' }]} />
                <Button variant="outline" size="sm" leftIcon={<Filter size={14} />} onClick={() => { setStatus(''); setPage(1); }}>Clear</Button>
                <Button size="sm" leftIcon={<Plus size={16} />} onClick={openCreate}>Create Plan</Button>
            </div>
        </div>

        {successMessage && <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center gap-2 text-xs font-semibold text-emerald-700"><CheckCircle2 size={18} />{successMessage}</div>}
        {loadError && <div className="p-3 bg-rose-50 border border-rose-100 rounded-xl flex items-center gap-2 text-xs font-semibold text-rose-700"><AlertCircle size={18} />{loadError}<Button size="sm" variant="ghost" onClick={() => void loadPlans()}>Retry</Button></div>}

        {isLoadingPlans ? <div className="py-20 text-center text-sm font-semibold text-slate-500">Loading subscription plans...</div> : plans.length === 0 ?
            <div className="bg-white rounded-xl border border-slate-200 p-12 text-center shadow-sm"><FileText size={28} className="mx-auto text-slate-400 mb-3" /><h3 className="font-bold">{debouncedSearch || status ? 'No plans match your search.' : 'No subscription plans found.'}</h3>{!debouncedSearch && !status && <Button className="mt-5" onClick={openCreate}>Create Plan</Button>}</div> :
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">{plans.map((plan) => {
                const count = plan.activeSubscribers ?? plan.subscriberCount ?? plan.subscriptionsCount;
                return <div key={plan.uuid} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col hover:shadow-md transition-shadow">
                    <div className="p-4  border-slate-100 bg-slate-50/50 flex justify-between"><div><h3 className="text-base font-bold text-slate-900">{plan.name}</h3><span className="text-[10px] font-bold text-slate-400 uppercase">ID: {plan.planCode || plan.uuid.slice(0, 8)}</span></div><Badge variant={plan.status === 'PUBLISHED' ? 'success' : plan.status === 'ARCHIVED' ? 'secondary' : 'warning'}>{plan.status}</Badge></div>
                    <div className="p-4 flex-1 flex flex-col gap-4"><div className="flex items-end gap-1"><span className="text-2xl font-black flex items-center"><IndianRupee size={18} />{numeric(plan.price).toLocaleString('en-IN')}</span><span className="text-xs text-slate-500 mb-1">/{plan.billingCycle.toLowerCase()}</span></div>
                        <div className="flex-1 space-y-2"><h4 className="text-xs font-bold text-slate-700 flex gap-1.5"><Layers size={14} />Included Services</h4>{plan.services?.length ? plan.services.map((service, index) => <div key={`${serviceUuid(service)}-${index}`} className="flex justify-between bg-slate-50 px-3 py-2 rounded-lg"><span className="text-xs font-semibold truncate">{serviceLabel(service, serviceLookup)}</span><span className="text-[10px] font-bold text-primary">Qty: {service.includedQuantity ?? 0}</span></div>) : <p className="text-xs italic text-slate-400">No services allocated.</p>}</div>
                        <div className="flex items-center justify-between pt-4"><span className="text-xs text-slate-500">{count === undefined ? 'Subscriber count unavailable' : `${count} active subscribers`}</span><div className="flex gap-1">
                            {plan.status === 'DRAFT' && <button disabled={actionUuid === plan.uuid} onClick={() => void runAction(plan, 'publish')} title="Publish" className="p-1.5 text-slate-400 hover:text-emerald-600"><Send size={14} /></button>}
                            {plan.status !== 'ARCHIVED' && <button disabled={actionUuid === plan.uuid} onClick={() => void runAction(plan, 'archive')} title="Archive" className="p-1.5 text-slate-400 hover:text-amber-600"><Archive size={14} /></button>}
                            <button disabled={actionUuid === plan.uuid} onClick={() => void openEdit(plan)} title="Edit" className="p-1.5 text-slate-400 hover:text-primary"><Edit2 size={14} /></button>
                            <button disabled={actionUuid === plan.uuid} onClick={() => void runAction(plan, 'delete')} title="Delete" className="p-1.5 text-slate-400 hover:text-rose-500"><Trash2 size={14} /></button>
                        </div></div>
                    </div>
                </div>;
            })}</div>}

        {!isLoadingPlans && totalPages > 1 && <div className="flex items-center justify-between text-xs text-slate-500"><span>{total} plans</span><div className="flex gap-2"><Button size="sm" variant="outline" disabled={page <= 1} onClick={() => setPage((value) => value - 1)}>Previous</Button><span className="px-3 py-2">Page {page} of {totalPages}</span><Button size="sm" variant="outline" disabled={page >= totalPages} onClick={() => setPage((value) => value + 1)}>Next</Button></div></div>}

        {drawerOpen && <><div className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40" onClick={() => !isSubmitting && resetDrawer()} /><div className="fixed inset-y-0 right-0 z-50 w-full md:w-[680px] bg-white shadow-2xl flex flex-col">
            <div className="flex justify-between p-5"><div><h2 className="text-lg font-bold">{editingPlan ? 'Edit Subscription Plan' : 'Create Subscription Plan'}</h2><p className="text-xs text-slate-500">Configure plan details and allocated services.</p></div><Button variant="ghost" onClick={() => !isSubmitting && resetDrawer()}><X size={18} /></Button></div>
            {formError && <div className="mx-5 mt-4 p-3 bg-rose-50 border border-rose-100 rounded-lg flex gap-2 text-xs font-semibold text-rose-700"><AlertCircle size={16} />{formError}</div>}
            <form onSubmit={submit} className="flex-1 flex flex-col overflow-hidden"><div className="flex-1 overflow-y-auto p-5 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3"><Input label="Plan Code" name="planCode" value={form.planCode} onChange={updateForm} required /><Input label="Plan Name" name="name" value={form.name} onChange={updateForm} required /><Input label="Price" name="price" type="number" min={0} step="0.01" value={form.price} onChange={updateForm} leftIcon={<IndianRupee size={14} />} required /><Input label="Currency" name="currency" maxLength={3} value={form.currency} onChange={updateForm} required />
                    <Select label="Billing Cycle" name="billingCycle" value={form.billingCycle} onChange={updateForm} options={[{ label: 'Monthly', value: 'MONTHLY' }, { label: 'Quarterly', value: 'QUARTERLY' }, { label: 'Yearly', value: 'YEARLY' }]} /><Input label="Duration (months)" name="durationMonths" type="number" min={1} max={120} value={form.durationMonths} onChange={updateForm} required /><Input label="Display Order" name="displayOrder" type="number" min={0} value={form.displayOrder} onChange={updateForm} required /><Select label="Visibility" name="visibility" value={form.visibility} onChange={(event) => setForm((current) => ({ ...current, visibility: event.target.value as SubscriptionVisibility }))} options={[{ label: 'Public', value: 'PUBLIC' }]} />
                    <div className="md:col-span-2"><label className="text-sm font-semibold text-slate-700">Description</label><textarea name="description" value={form.description} onChange={updateForm} maxLength={10000} className="mt-1 w-full bg-slate-50 rounded-xl p-3 text-sm h-20" /></div>
                    <label className="flex items-center gap-2 text-sm font-semibold"><input type="checkbox" checked={form.isFeatured} onChange={(event) => setForm((current) => ({ ...current, isFeatured: event.target.checked }))} />Featured</label><label className="flex items-center gap-2 text-sm font-semibold"><input type="checkbox" checked={form.isPopular} onChange={(event) => setForm((current) => ({ ...current, isPopular: event.target.checked }))} />Popular</label>
                </div>
                <div className="space-y-3"><div className="flex justify-between"><h3 className="text-xs font-bold uppercase">Allocated Services</h3><Button type="button" variant="outline" size="sm" leftIcon={<ListPlus size={14} />} onClick={() => setAllocations((current) => [...current, emptyAllocation()])}>Add Service</Button></div>
                    {isLoadingServices && <p className="text-xs text-slate-500">Loading services...</p>}{serviceError && <div className="flex items-center gap-2 text-xs text-rose-600"><span>Unable to load services. Please try again.</span><Button type="button" size="sm" variant="ghost" onClick={() => void loadServices()}>Retry</Button></div>}
                    {allocations.map((allocation, index) => <div key={index} className="bg-slate-50 p-3 rounded-xl border grid grid-cols-2 md:grid-cols-5 gap-2 relative">
                        <div className="col-span-2 md:col-span-5"><Select label="Service" value={allocation.serviceUuid} disabled={isLoadingServices || Boolean(serviceError)} onChange={(event) => updateAllocation(index, 'serviceUuid', event.target.value)} options={[{ label: 'Select a service...', value: '' }, ...services.map((service) => ({ label: service.name, value: service.uuid, disabled: allocations.some((item, itemIndex) => itemIndex !== index && item.serviceUuid === service.uuid) }))]} /></div>
                        <Input label="Quantity" type="number" min={0} value={allocation.includedQuantity} onChange={(event) => updateAllocation(index, 'includedQuantity', event.target.value)} /><Input label="Visits" type="number" min={0} value={allocation.includedVisits} onChange={(event) => updateAllocation(index, 'includedVisits', event.target.value)} /><Input label="Sessions" type="number" min={0} value={allocation.includedSessions} onChange={(event) => updateAllocation(index, 'includedSessions', event.target.value)} /><Input label="Validity Days" type="number" min={1} value={allocation.validityDays} onChange={(event) => updateAllocation(index, 'validityDays', event.target.value)} />
                        <Button type="button" variant="ghost" onClick={() => setAllocations((current) => current.filter((_, itemIndex) => itemIndex !== index))}><Minus size={16} /></Button>
                    </div>)}
                </div>
            </div><div className="p-4  bg-slate-50 flex justify-end gap-3"><Button type="button" variant="ghost" disabled={isSubmitting} onClick={resetDrawer}>Cancel</Button><Button type="submit" disabled={isSubmitting || isLoadingServices || Boolean(serviceError)} leftIcon={!isSubmitting ? <Check size={16} /> : undefined}>{isSubmitting ? (editingPlan ? 'Updating...' : 'Creating...') : editingPlan ? 'Save Changes' : 'Save Plan'}</Button></div></form>
        </div></>}
    </div>;
};

export default SubscriptionCom;
