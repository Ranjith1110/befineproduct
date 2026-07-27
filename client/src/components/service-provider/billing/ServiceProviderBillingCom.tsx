import { useState } from 'react';
import {
    Search,
    Filter,
    Plus,
    Receipt,
    Calendar,
    IndianRupee,
    Download,
    Eye,
    MoreVertical,
    CheckCircle2,
    Clock,
    AlertCircle,
    X,
    Check,
    FileText,
} from 'lucide-react';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import { Badge } from '../../ui/Badge';
import { Select } from '../../ui/Select';

const patientOptions = [
    { label: 'Select a patient...', value: '' },
    { label: 'Eleanor Pena', value: 'pt-1' },
    { label: 'Ralph Edwards', value: 'pt-2' },
    { label: 'Alice Smith', value: 'pt-3' },
    { label: 'Jane Cooper', value: 'pt-4' }
];

const mockInvoices = [
    {
        id: 'INV-2026-081',
        patientName: 'Eleanor Pena',
        service: 'Skilled Nursing Care (4 Visits)',
        dateRange: 'Jul 01 - Jul 15, 2026',
        amount: '10,000',
        status: 'paid',
        generatedOn: 'Jul 16, 2026'
    },
    {
        id: 'INV-2026-082',
        patientName: 'Ralph Edwards',
        service: 'Physical Therapy (8 Sessions)',
        dateRange: 'Jul 01 - Jul 20, 2026',
        amount: '14,400',
        status: 'pending',
        generatedOn: 'Jul 21, 2026'
    },
    {
        id: 'INV-2026-083',
        patientName: 'Alice Smith',
        service: 'Post-Op Wound Care',
        dateRange: 'Jul 18 - Jul 22, 2026',
        amount: '7,500',
        status: 'draft',
        generatedOn: 'Jul 23, 2026'
    },
    {
        id: 'INV-2026-084',
        patientName: 'Jane Cooper',
        service: 'Daily Living Assistance',
        dateRange: 'Jun 15 - Jun 30, 2026',
        amount: '12,000',
        status: 'paid',
        generatedOn: 'Jul 01, 2026'
    }
];

const ServiceProviderBillingCom = () => {
    const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'paid': return <Badge variant="success" className="text-[10px] px-2 py-0.5">Paid</Badge>;
            case 'pending': return <Badge variant="warning" className="text-[10px] px-2 py-0.5">Pending Payment</Badge>;
            case 'draft': return <Badge variant="secondary" className="text-[10px] px-2 py-0.5 text-slate-600">Draft</Badge>;
            default: return <Badge variant="secondary" className="text-[10px] px-2 py-0.5">Unknown</Badge>;
        }
    };

    return (
        <div className="flex flex-col gap-4 max-w-[1400px] mx-auto w-full relative pb-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 font-heading tracking-tight mb-0 flex items-center gap-2">
                        Billing & Invoices
                    </h1>
                    <p className="text-xs font-medium text-slate-500 mt-1">
                        Manage payments, track outstanding dues, and raise new invoices for services provided.
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Button
                        size="sm"
                        leftIcon={<Plus size={16} strokeWidth={2.5} />}
                        onClick={() => setIsInvoiceModalOpen(true)}
                    >
                        Raise Invoice
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                        <IndianRupee size={20} />
                    </div>
                    <div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Total Billed (MTD)</div>
                        <div className="text-xl font-bold text-slate-800">1,42,500</div>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center">
                        <Clock size={20} />
                    </div>
                    <div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Pending Payments</div>
                        <div className="text-xl font-bold text-slate-800">28,400</div>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                        <CheckCircle2 size={20} />
                    </div>
                    <div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Received (MTD)</div>
                        <div className="text-xl font-bold text-slate-800">1,14,100</div>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center">
                        <FileText size={20} />
                    </div>
                    <div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Draft Invoices</div>
                        <div className="text-xl font-bold text-slate-800">4</div>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden flex flex-col">
                <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-3 bg-slate-50/50">
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                        <div className="w-full sm:w-64">
                            <Input
                                placeholder="Search invoice ID or patient..."
                                leftIcon={<Search size={16} />}
                                className="bg-white text-sm h-9"
                            />
                        </div>
                    </div>
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                        <Select
                            options={[
                                { label: 'All Statuses', value: 'all' },
                                { label: 'Paid', value: 'paid' },
                                { label: 'Pending', value: 'pending' },
                                { label: 'Draft', value: 'draft' }
                            ]}
                            className="h-9 text-sm w-36"
                        />
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
                                <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Service Period</th>
                                <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Amount</th>
                                <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                                <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {mockInvoices.map((invoice) => (
                                <tr key={invoice.id} className="hover:bg-slate-50/50 transition-colors group">
                                    <td className="px-4 py-3">
                                        <div className="text-sm font-bold text-slate-900">{invoice.patientName}</div>
                                        <div className="text-[10px] font-bold text-primary mt-0.5">{invoice.service}</div>
                                        <div className="text-[10px] font-medium text-slate-500 mt-0.5">{invoice.id} · Gen: {invoice.generatedOn}</div>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
                                            <Calendar size={12} className="text-slate-400" />
                                            {invoice.dateRange}
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
                                            <button className="p-1.5 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors" title="View Invoice">
                                                <Eye size={14} />
                                            </button>
                                            <button className="p-1.5 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors" title="Download PDF">
                                                <Download size={14} />
                                            </button>
                                            <button className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors">
                                                <MoreVertical size={14} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="p-3 border-t border-slate-100 flex items-center justify-between text-xs font-medium text-slate-500">
                    <span>Showing 1 to 4 of 24 invoices</span>
                    <div className="flex gap-1">
                        <Button variant="ghost" size="sm" disabled className="h-7 text-xs px-2">Prev</Button>
                        <Button variant="ghost" size="sm" className="bg-primary/10 text-primary h-7 text-xs px-2.5">1</Button>
                        <Button variant="ghost" size="sm" className="h-7 text-xs px-2.5">2</Button>
                        <Button variant="ghost" size="sm" className="h-7 text-xs px-2">Next</Button>
                    </div>
                </div>
            </div>

            {isInvoiceModalOpen && (
                <>
                    <div
                        className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 transition-opacity"
                        onClick={() => setIsInvoiceModalOpen(false)}
                    />
                    <div className="fixed inset-y-0 right-0 z-50 w-full md:w-[500px] bg-white shadow-2xl transform transition-transform duration-300 flex flex-col">
                        <div className="flex items-center justify-between p-5 border-b border-slate-100">
                            <div>
                                <h2 className="text-lg font-bold text-slate-900 tracking-tight">Raise New Invoice</h2>
                                <p className="text-xs font-medium text-slate-500">Bill a patient based on services rendered.</p>
                            </div>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setIsInvoiceModalOpen(false)}
                                className="p-1.5 text-slate-400 hover:text-slate-700 bg-slate-50 hover:bg-slate-100 rounded-full"
                            >
                                <X size={18} />
                            </Button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-5 space-y-6 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-200 [&::-webkit-scrollbar-thumb]:rounded-full">

                            <div className="space-y-3">
                                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                                    <span className="w-5 h-5 rounded bg-primary/10 text-primary flex items-center justify-center text-[10px]">1</span>
                                    Patient Information
                                </h3>
                                <Select
                                    label="Select Patient"
                                    options={patientOptions}
                                />
                            </div>

                            <div className="w-full h-px bg-slate-100"></div>

                            <div className="space-y-3">
                                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                                    <span className="w-5 h-5 rounded bg-primary/10 text-primary flex items-center justify-center text-[10px]">2</span>
                                    Service Period (Dates)
                                </h3>
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="flex flex-col gap-1.5 w-full">
                                        <label className="text-xs font-semibold text-slate-700">From Date</label>
                                        <div className="relative">
                                            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                                                <Calendar size={14} />
                                            </div>
                                            <input
                                                type="date"
                                                className="w-full bg-slate-50 border border-transparent focus:bg-white focus:border-primary/30 rounded-xl focus:ring-4 focus:ring-primary/10 text-xs font-medium text-slate-800 p-2.5 pl-9 h-9"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-1.5 w-full">
                                        <label className="text-xs font-semibold text-slate-700">To Date</label>
                                        <div className="relative">
                                            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                                                <Calendar size={14} />
                                            </div>
                                            <input
                                                type="date"
                                                className="w-full bg-slate-50 border border-transparent focus:bg-white focus:border-primary/30 rounded-xl focus:ring-4 focus:ring-primary/10 text-xs font-medium text-slate-800 p-2.5 pl-9 h-9"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 mt-1 flex gap-2">
                                    <AlertCircle size={14} className="text-slate-400 shrink-0 mt-0.5" />
                                    <p className="text-[11px] font-medium text-slate-600">
                                        Select the exact date range for which the services were provided. This helps in accurate record keeping and dispute resolution.
                                    </p>
                                </div>
                            </div>

                            <div className="w-full h-px bg-slate-100"></div>

                            <div className="space-y-3">
                                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                                    <span className="w-5 h-5 rounded bg-primary/10 text-primary flex items-center justify-center text-[10px]">3</span>
                                    Billing Details
                                </h3>
                                <div className="grid grid-cols-1 gap-3">
                                    <Select
                                        label="Service Category"
                                        options={[
                                            { label: 'Select service...', value: '' },
                                            { label: 'Skilled Nursing Care', value: 'nursing' },
                                            { label: 'Physical Therapy', value: 'pt' },
                                            { label: 'Daily Living Assistance', value: 'dla' },
                                            { label: 'Post-Op Care', value: 'post-op' },
                                        ]}
                                    />
                                    <Input
                                        label="Service Description (Appears on Invoice)"
                                        placeholder="e.g., Physical Therapy (8 Sessions)"
                                    />
                                    <div className="flex flex-col gap-1.5 w-full">
                                        <label className="text-xs font-semibold text-slate-700">Total Amount</label>
                                        <div className="relative">
                                            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-800 font-bold pointer-events-none">
                                                <IndianRupee size={14} />
                                            </div>
                                            <input
                                                type="number"
                                                placeholder="0.00"
                                                className="w-full bg-slate-50 border border-transparent focus:bg-white focus:border-primary/30 rounded-xl focus:ring-4 focus:ring-primary/10 text-sm font-bold text-slate-900 p-2.5 pl-8 h-9"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-end gap-3">
                            <Button variant="ghost" size="sm" onClick={() => setIsInvoiceModalOpen(false)}>
                                Cancel
                            </Button>
                            <Button variant="secondary" size="sm">
                                Save as Draft
                            </Button>
                            <Button size="sm" leftIcon={<Check size={16} />}>
                                Generate Invoice
                            </Button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default ServiceProviderBillingCom;