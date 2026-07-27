import { useState } from 'react';
import {
    Search,
    Filter,
    IndianRupee,
    Clock,
    CheckCircle2,
    Building2,
    Eye,
    Download,
    MoreVertical,
    X,
    Check,
    FileUp,
    RefreshCw,
    AlertCircle,
    Calendar
} from 'lucide-react';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import { Badge } from '../../ui/Badge';
import { Select } from '../../ui/Select';

const providerOptions = [
    { label: 'All Providers', value: 'all' },
    { label: 'Apex Healthcare Partners', value: 'Apex Healthcare Partners' },
    { label: 'Guardian Home Care', value: 'Guardian Home Care' },
    { label: 'Serenity Senior Solutions', value: 'Serenity Senior Solutions' },
    { label: 'Vitality Medical Group', value: 'Vitality Medical Group' }
];

const statusOptions = [
    { label: 'All Statuses', value: 'all' },
    { label: 'Pending Payment', value: 'pending' },
    { label: 'Processing', value: 'processing' },
    { label: 'Paid / Settled', value: 'paid' }
];

const mockGlobalInvoices = [
    {
        id: 'INV-SP-8042',
        provider: 'Apex Healthcare Partners',
        patient: 'Eleanor Pena',
        service: 'Skilled Nursing Care (4 Visits)',
        date: 'Jul 26, 2026',
        amount: '10,000',
        status: 'pending'
    },
    {
        id: 'INV-SP-8043',
        provider: 'Vitality Medical Group',
        patient: 'Ralph Edwards',
        service: 'Physical Therapy (8 Sessions)',
        date: 'Jul 25, 2026',
        amount: '14,400',
        status: 'processing'
    },
    {
        id: 'INV-SP-8044',
        provider: 'Guardian Home Care',
        patient: 'Alice Smith',
        service: 'Post-Op Wound Care',
        date: 'Jul 24, 2026',
        amount: '7,500',
        status: 'paid'
    },
    {
        id: 'INV-SP-8045',
        provider: 'Serenity Senior Solutions',
        patient: 'Jane Cooper',
        service: 'Daily Living Assistance',
        date: 'Jul 20, 2026',
        amount: '12,000',
        status: 'paid'
    }
];

const CareManagerBillingCom = () => {
    const [selectedProvider, setSelectedProvider] = useState('all');
    const [selectedStatus, setSelectedStatus] = useState('all');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedInvoice, setSelectedInvoice] = useState<any>(null);

    const filteredInvoices = mockGlobalInvoices.filter(invoice => {
        const matchesProvider = selectedProvider === 'all' || invoice.provider === selectedProvider;
        const matchesStatus = selectedStatus === 'all' || invoice.status === selectedStatus;
        return matchesProvider && matchesStatus;
    });

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'pending': return <Badge variant="warning" className="text-[10px] px-2 py-0.5">Pending</Badge>;
            case 'processing': return <Badge variant="primary" className="text-[10px] px-2 py-0.5">Processing</Badge>;
            case 'paid': return <Badge variant="success" className="text-[10px] px-2 py-0.5">Paid</Badge>;
            default: return <Badge variant="secondary" className="text-[10px] px-2 py-0.5">Unknown</Badge>;
        }
    };

    const handleManageInvoice = (invoice: any) => {
        setSelectedInvoice(invoice);
        setIsModalOpen(true);
    };

    return (
        <div className="flex flex-col gap-4 max-w-[1400px] mx-auto w-full relative pb-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 font-heading tracking-tight mb-0 flex items-center gap-2">
                        Global Billing & Payouts
                    </h1>
                    <p className="text-xs font-medium text-slate-500 mt-1">
                        Manage invoices raised by Service Providers, process payouts, and upload payment proofs.
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" leftIcon={<Download size={14} />}>
                        Export Ledger
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center">
                        <IndianRupee size={20} />
                    </div>
                    <div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Total Network Payables</div>
                        <div className="text-xl font-bold text-slate-800">4,82,500</div>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center">
                        <Clock size={20} />
                    </div>
                    <div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Pending Invoices</div>
                        <div className="text-xl font-bold text-slate-800">84,000</div>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                        <RefreshCw size={20} />
                    </div>
                    <div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Currently Processing</div>
                        <div className="text-xl font-bold text-slate-800">24,400</div>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                        <CheckCircle2 size={20} />
                    </div>
                    <div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Settled (MTD)</div>
                        <div className="text-xl font-bold text-slate-800">3,74,100</div>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden flex flex-col">
                <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-3 bg-slate-50/50">
                    <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                        <div className="w-full sm:w-64 flex items-center gap-2">
                            <span className="text-xs font-bold text-slate-600 whitespace-nowrap"><Building2 size={14} className="inline mr-1" /> Provider:</span>
                            <Select
                                options={providerOptions}
                                value={selectedProvider}
                                onChange={(e) => setSelectedProvider(e.target.value)}
                                className="h-9 text-sm w-full"
                            />
                        </div>
                        <div className="w-full sm:w-48 flex items-center gap-2">
                            <span className="text-xs font-bold text-slate-600 whitespace-nowrap">Status:</span>
                            <Select
                                options={statusOptions}
                                value={selectedStatus}
                                onChange={(e) => setSelectedStatus(e.target.value)}
                                className="h-9 text-sm w-full"
                            />
                        </div>
                    </div>
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                        <div className="w-full sm:w-56">
                            <Input
                                placeholder="Search Invoice ID..."
                                leftIcon={<Search size={16} />}
                                className="bg-white text-sm h-9"
                            />
                        </div>
                        <Button variant="secondary" size="sm" className="h-9 px-3" leftIcon={<Filter size={14} />}>
                            Filter
                        </Button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/50 border-b border-slate-100">
                                <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Invoice Details</th>
                                <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Service Provider</th>
                                <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Amount Billed</th>
                                <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                                <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filteredInvoices.length > 0 ? filteredInvoices.map((invoice) => (
                                <tr key={invoice.id} className="hover:bg-slate-50/50 transition-colors group">
                                    <td className="px-4 py-3">
                                        <div className="text-sm font-bold text-slate-900">{invoice.id}</div>
                                        <div className="text-[10px] font-bold text-primary mt-0.5">{invoice.service}</div>
                                        <div className="flex items-center gap-1.5 mt-0.5 text-[10px] font-medium text-slate-500">
                                            <Calendar size={10} className="text-slate-400" />
                                            Generated: {invoice.date}
                                        </div>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                                            <Building2 size={12} className="text-indigo-500 shrink-0" />
                                            {invoice.provider}
                                        </div>
                                        <div className="text-[10px] font-medium text-slate-500 mt-0.5 ml-4">
                                            Patient: {invoice.patient}
                                        </div>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-0.5 text-sm font-black text-slate-800">
                                            <IndianRupee size={14} />
                                            {invoice.amount}
                                        </div>
                                    </td>
                                    <td className="px-4 py-3">
                                        {getStatusBadge(invoice.status)}
                                    </td>
                                    <td className="px-4 py-3 text-right">
                                        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Button
                                                variant="secondary"
                                                size="sm"
                                                className="h-7 text-[10px] px-2.5"
                                                onClick={() => handleManageInvoice(invoice)}
                                            >
                                                Manage
                                            </Button>
                                            <button className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors" title="Download Original">
                                                <Download size={14} />
                                            </button>
                                            <button className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors">
                                                <MoreVertical size={14} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={5} className="px-4 py-8 text-center text-xs font-medium text-slate-500">
                                        No invoices found matching the selected criteria.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="p-3 border-t border-slate-100 flex items-center justify-between text-xs font-medium text-slate-500">
                    <span>Showing {filteredInvoices.length} invoices</span>
                    <div className="flex gap-1">
                        <Button variant="ghost" size="sm" disabled className="h-7 text-xs px-2">Prev</Button>
                        <Button variant="ghost" size="sm" className="bg-primary/10 text-primary h-7 text-xs px-2.5">1</Button>
                        <Button variant="ghost" size="sm" className="h-7 text-xs px-2">Next</Button>
                    </div>
                </div>
            </div>

            {isModalOpen && selectedInvoice && (
                <>
                    <div
                        className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 transition-opacity"
                        onClick={() => setIsModalOpen(false)}
                    />
                    <div className="fixed inset-y-0 right-0 z-50 w-full md:w-[500px] bg-white shadow-2xl transform transition-transform duration-300 flex flex-col">
                        <div className="flex items-center justify-between p-5 border-b border-slate-100">
                            <div>
                                <h2 className="text-lg font-bold text-slate-900 tracking-tight">Manage Payout</h2>
                                <p className="text-xs font-medium text-slate-500">Update status and upload proof for {selectedInvoice.id}</p>
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

                            <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 grid grid-cols-2 gap-4">
                                <div className="col-span-2">
                                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Service Provider</div>
                                    <div className="text-sm font-bold text-slate-800">{selectedInvoice.provider}</div>
                                </div>
                                <div>
                                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Billed Amount</div>
                                    <div className="flex items-center gap-0.5 text-sm font-black text-indigo-600">
                                        <IndianRupee size={14} />
                                        {selectedInvoice.amount}
                                    </div>
                                </div>
                                <div>
                                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Date Submitted</div>
                                    <div className="text-xs font-bold text-slate-700">{selectedInvoice.date}</div>
                                </div>
                                <div className="col-span-2">
                                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Original Invoice</div>
                                    <Button variant="outline" size="sm" className="h-7 text-[10px] px-3 mt-1" leftIcon={<Eye size={12} />}>
                                        View Provider Document
                                    </Button>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                                    <span className="w-5 h-5 rounded bg-primary/10 text-primary flex items-center justify-center text-[10px]">1</span>
                                    Update Payment Status
                                </h3>
                                <div className="grid grid-cols-1 gap-3">
                                    <Select
                                        label="Current Status"
                                        defaultValue={selectedInvoice.status}
                                        options={[
                                            { label: 'Pending Verification', value: 'pending' },
                                            { label: 'Processing Payout', value: 'processing' },
                                            { label: 'Paid / Settled', value: 'paid' },
                                        ]}
                                    />
                                </div>
                            </div>

                            <div className="w-full h-px bg-slate-100"></div>

                            <div className="space-y-3">
                                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                                    <span className="w-5 h-5 rounded bg-primary/10 text-primary flex items-center justify-center text-[10px]">2</span>
                                    Upload Payment Proof
                                </h3>
                                <div className="border-2 border-dashed border-primary/20 rounded-xl bg-slate-50 hover:bg-primary/5 transition-colors p-6 flex flex-col items-center justify-center gap-3 cursor-pointer">
                                    <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                                        <FileUp size={24} />
                                    </div>
                                    <div className="text-center">
                                        <p className="text-xs font-bold text-slate-700">Upload Bank Receipt or Transaction ID</p>
                                        <p className="text-[10px] font-medium text-slate-500 mt-1">PDF, JPG, or PNG (Max 5MB)</p>
                                    </div>
                                </div>
                                <div className="bg-amber-50 p-3 rounded-lg border border-amber-100 mt-1 flex gap-2">
                                    <AlertCircle size={14} className="text-amber-600 shrink-0 mt-0.5" />
                                    <p className="text-[11px] font-medium text-amber-800">
                                        Payment proof is strictly required when marking an invoice as <strong>Paid / Settled</strong>. This document will be visible to the Service Provider.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-end gap-3">
                            <Button variant="ghost" size="sm" onClick={() => setIsModalOpen(false)}>
                                Cancel
                            </Button>
                            <Button size="sm" leftIcon={<Check size={16} />}>
                                Confirm Update
                            </Button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default CareManagerBillingCom;