import { useCallback, useEffect, useMemo, useState } from 'react';
import {
    Building2,
    CalendarCheck,
    Edit2,
    Filter,
    MoreVertical,
    Plus,
    Search,
    Stethoscope,
    Trash2,
    UploadCloud,
    Users,
} from 'lucide-react';
import { Button } from '../../../../components/ui/Button';
import { Input } from '../../../../components/ui/Input';
import { Badge } from '../../../../components/ui/Badge';
import { getProvidersApi, type ProviderRecord } from '../../api/providers';
import ProviderOnboardingModal from './ProviderOnboardingModal';

const getProviderServices = (provider: ProviderRecord): string[] => (
    (provider.services || []).map((service) => typeof service === 'string' ? service : service.name)
);

const ServicesProvidersCom = () => {
    const [isAddProviderOpen, setIsAddProviderOpen] = useState(false);
    const [providers, setProviders] = useState<ProviderRecord[]>([]);
    const [categoryCount, setCategoryCount] = useState(0);
    const [search, setSearch] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [loadError, setLoadError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const loadProviders = useCallback(async () => {
        setIsLoading(true);
        setLoadError('');
        try {
            setProviders(await getProvidersApi());
        } catch (error: unknown) {
            setLoadError(error instanceof Error ? error.message : 'Unable to load providers.');
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        let active = true;
        getProvidersApi().then((providerData) => {
            if (!active) return;
            setProviders(providerData);
        }).catch((error: unknown) => {
            if (!active) return;
            setLoadError(error instanceof Error ? error.message : 'Unable to load providers.');
        }).finally(() => {
            if (!active) return;
            setIsLoading(false);
        });
        return () => { active = false; };
    }, []);

    useEffect(() => {
        if (!successMessage) return;
        const timeoutId = window.setTimeout(() => setSuccessMessage(''), 4000);
        return () => window.clearTimeout(timeoutId);
    }, [successMessage]);

    const filteredProviders = useMemo(() => {
        const query = search.trim().toLowerCase();
        if (!query) return providers;
        return providers.filter((provider) => {
            const searchable = [
                provider.companyName,
                provider.displayName,
                provider.primaryEmail,
                ...getProviderServices(provider),
            ].filter(Boolean).join(' ').toLowerCase();
            return searchable.includes(query);
        });
    }, [providers, search]);

    const activeProviders = providers.filter((provider) => provider.status?.toUpperCase() === 'ACTIVE').length;
    const totalCaretakers = providers.reduce((total, provider) => total + (provider.caretakersCount || provider.caregiversCount || 0), 0);
    const weeklyAppointments = providers.reduce((total, provider) => total + (provider.upcomingAppointments || 0), 0);

    const handleCreated = async () => {
        await loadProviders();
        setSuccessMessage('Service provider onboarded successfully.');
    };

    return (
        <div className="flex flex-col gap-4 max-w-[1400px] mx-auto w-full relative pb-6">
            {successMessage && (
                <div className="fixed top-5 right-5 z-[80] rounded-xl bg-emerald-600 text-white px-4 py-3 text-sm font-semibold shadow-xl">
                    {successMessage}
                </div>
            )}

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 font-heading tracking-tight">Service Providers</h1>
                    <p className="text-xs font-medium text-slate-500">Onboard providers, manage services, and upload caretakers.</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" leftIcon={<Building2 size={16} />}>Manage Categories</Button>
                    <Button size="sm" leftIcon={<Plus size={16} strokeWidth={2.5} />} onClick={() => setIsAddProviderOpen(true)}>
                        Onboard Provider
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {[
                    { label: 'Total Providers', value: providers.length, icon: <Building2 size={20} />, color: 'bg-primary/10 text-primary' },
                    { label: 'Active Caretakers', value: totalCaretakers || activeProviders, icon: <Users size={20} />, color: 'bg-secondary/20 text-primary' },
                    { label: 'Weekly Appointments', value: weeklyAppointments, icon: <CalendarCheck size={20} />, color: 'bg-emerald-50 text-emerald-600' },
                    { label: 'Service Categories', value: categoryCount, icon: <Stethoscope size={20} />, color: 'bg-purple-50 text-purple-600' },
                ].map((stat) => (
                    <div key={stat.label} className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${stat.color}`}>{stat.icon}</div>
                        <div><div className="text-xl font-bold text-slate-800">{stat.value}</div><div className="text-xs font-medium text-slate-500">{stat.label}</div></div>
                    </div>
                ))}
            </div>

            {loadError && <div className="p-3 rounded-xl bg-rose-50 border border-rose-100 text-xs font-semibold text-rose-700">{loadError}</div>}

            <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden flex flex-col">
                <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-3">
                    <div className="w-full sm:w-80">
                        <Input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search providers or services..." leftIcon={<Search size={16} />} className="bg-slate-50 border-transparent text-sm h-9" />
                    </div>
                    <Button variant="secondary" size="sm" leftIcon={<Filter size={14} />}>Filter List</Button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead><tr className="bg-slate-50/50 border-b border-slate-100">
                            {['Provider Details', 'Offered Services', 'Caretakers', 'Appointments', 'Status', 'Actions'].map((heading) => <th key={heading} className={`px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider ${heading === 'Actions' ? 'text-right' : ''}`}>{heading}</th>)}
                        </tr></thead>
                        <tbody className="divide-y divide-slate-100">
                            {isLoading ? (
                                <tr><td colSpan={6} className="px-4 py-10 text-center text-sm font-medium text-slate-500">Loading providers...</td></tr>
                            ) : filteredProviders.length === 0 ? (
                                <tr><td colSpan={6} className="px-4 py-10 text-center text-sm font-medium text-slate-500">No providers found.</td></tr>
                            ) : filteredProviders.map((provider) => {
                                const name = provider.companyName || provider.displayName || 'Unnamed Provider';
                                const identifier = provider.uuid || String(provider.id || '—');
                                const status = (provider.status || 'PENDING').toUpperCase();
                                return (
                                    <tr key={identifier} className="hover:bg-slate-50/50 transition-colors group">
                                        <td className="px-4 py-3"><div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold">{name.charAt(0).toUpperCase()}</div>
                                            <div><div className="text-sm font-bold text-slate-900">{name}</div><div className="text-xs font-medium text-slate-500">{identifier} · {provider.primaryEmail || 'No email'}</div></div>
                                        </div></td>
                                        <td className="px-4 py-3"><div className="flex flex-wrap gap-1.5">{getProviderServices(provider).map((service) => <span key={service} className="text-[10px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">{service}</span>)}</div></td>
                                        <td className="px-4 py-3"><div className="flex items-center gap-3"><span className="text-xs font-semibold text-slate-700"><Users size={14} className="inline text-slate-400 mr-1" />{provider.caretakersCount || provider.caregiversCount || 0}</span><button className="w-7 h-7 rounded-md bg-primary/5 text-primary hover:bg-primary hover:text-white" title="Upload Caretakers"><UploadCloud size={14} className="mx-auto" /></button></div></td>
                                        <td className="px-4 py-3"><span className="text-xs font-bold text-slate-700"><CalendarCheck size={14} className="inline text-emerald-500 mr-1" />{provider.upcomingAppointments || 0} Upcoming</span></td>
                                        <td className="px-4 py-3"><Badge variant={status === 'ACTIVE' ? 'success' : 'warning'}>{status === 'ACTIVE' ? 'Active' : status}</Badge></td>
                                        <td className="px-4 py-3 text-right"><div className="flex items-center justify-end gap-1">
                                            <button className="p-1.5 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-lg" title="Edit Provider"><Edit2 size={16} /></button>
                                            <button className="p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg" title="Delete Provider"><Trash2 size={16} /></button>
                                            <button className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg"><MoreVertical size={16} /></button>
                                        </div></td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                <div className="p-3 border-t border-slate-100 flex items-center justify-between text-xs font-medium text-slate-500">
                    <span>Showing {filteredProviders.length} of {providers.length} providers</span>
                    <div className="flex gap-1"><Button variant="ghost" size="sm" disabled>Prev</Button><Button variant="ghost" size="sm" className="bg-primary/10 text-primary">1</Button><Button variant="ghost" size="sm" disabled>Next</Button></div>
                </div>
            </div>

            {isAddProviderOpen && <ProviderOnboardingModal onClose={() => setIsAddProviderOpen(false)} onSuccess={handleCreated} onCategoriesLoaded={setCategoryCount} />}
        </div>
    );
};

export default ServicesProvidersCom;
