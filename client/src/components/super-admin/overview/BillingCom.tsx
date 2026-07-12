import {
    Search,
    Filter,
    Download,
    Eye,
    MoreVertical,
    DollarSign,
    TrendingUp,
    FileText,
    AlertCircle,
    Plus
} from 'lucide-react';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import { Badge } from '../../ui/Badge';

const mockInvoices = [
    {
        id: 'INV-2026-001',
        billedTo: 'Eleanor Pena',
        type: 'Client Care Services',
        date: 'Jul 28, 2026',
        amount: '$1,250.00',
        status: 'paid',
    },
    {
        id: 'INV-2026-002',
        billedTo: 'Apex Healthcare Partners',
        type: 'Platform Subscription',
        date: 'Jul 25, 2026',
        amount: '$499.00',
        status: 'pending',
    },
    {
        id: 'INV-2026-003',
        billedTo: 'Serenity Senior Solutions',
        type: 'Service Commission',
        date: 'Jul 15, 2026',
        amount: '$850.00',
        status: 'overdue',
    },
    {
        id: 'INV-2026-004',
        billedTo: 'Ralph Edwards',
        type: 'Specialized Care (PT)',
        date: 'Jul 29, 2026',
        amount: '$320.00',
        status: 'paid',
    },
    {
        id: 'INV-2026-005',
        billedTo: 'Guardian Home Care',
        type: 'Platform Subscription',
        date: 'Aug 01, 2026',
        amount: '$499.00',
        status: 'pending',
    }
];

const BillingCom = () => {
    return (
        <div className="flex flex-col gap-8 max-w-[1400px] mx-auto w-full">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 font-heading tracking-tight mb-1">
                        Billing & Invoices
                    </h1>
                    <p className="text-sm font-medium text-slate-500">
                        Manage payments, subscriptions, and financial records.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" leftIcon={<Download size={18} />}>
                        Export CSV
                    </Button>
                    <Button leftIcon={<Plus size={18} strokeWidth={2.5} />}>
                        Create Invoice
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-5 relative overflow-hidden">
                    <div className="absolute -right-4 -top-4 w-24 h-24 bg-emerald-50 rounded-full opacity-50 pointer-events-none"></div>
                    <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                        <TrendingUp size={28} />
                    </div>
                    <div>
                        <div className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">Total Revenue</div>
                        <div className="text-3xl font-black text-slate-800">$124,500</div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-5 relative overflow-hidden">
                    <div className="absolute -right-4 -top-4 w-24 h-24 bg-amber-50 rounded-full opacity-50 pointer-events-none"></div>
                    <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                        <DollarSign size={28} />
                    </div>
                    <div>
                        <div className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">Pending Payments</div>
                        <div className="text-3xl font-black text-slate-800">$12,840</div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-5 relative overflow-hidden">
                    <div className="absolute -right-4 -top-4 w-24 h-24 bg-rose-50 rounded-full opacity-50 pointer-events-none"></div>
                    <div className="w-14 h-14 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
                        <AlertCircle size={28} />
                    </div>
                    <div>
                        <div className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">Overdue</div>
                        <div className="text-3xl font-black text-slate-800">$3,450</div>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col">
                <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4 bg-slate-50/30">
                    <div className="w-full sm:w-96">
                        <Input
                            placeholder="Search invoices by ID or name..."
                            leftIcon={<Search size={18} />}
                            className="bg-white"
                        />
                    </div>
                    <div className="flex gap-3 w-full sm:w-auto">
                        <Button variant="secondary" leftIcon={<Filter size={16} />}>
                            Filter
                        </Button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/50 border-b border-slate-100">
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Invoice ID</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Billed To</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Amount</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {mockInvoices.map((invoice) => (
                                <tr key={invoice.id} className="hover:bg-slate-50/50 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-500 flex items-center justify-center">
                                                <FileText size={18} />
                                            </div>
                                            <span className="font-bold text-slate-900">{invoice.id}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="font-bold text-slate-800">{invoice.billedTo}</div>
                                        <div className="text-xs font-medium text-slate-500">{invoice.type}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-sm font-semibold text-slate-700">{invoice.date}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-sm font-bold text-slate-900">{invoice.amount}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        {invoice.status === 'paid' && <Badge variant="success">Paid</Badge>}
                                        {invoice.status === 'pending' && <Badge variant="warning">Pending</Badge>}
                                        {invoice.status === 'overdue' && <Badge variant="danger">Overdue</Badge>}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button className="p-2 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors" title="View Invoice">
                                                <Eye size={16} />
                                            </button>
                                            <button className="p-2 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors" title="Download PDF">
                                                <Download size={16} />
                                            </button>
                                            <button className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors">
                                                <MoreVertical size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="p-4 border-t border-slate-100 flex items-center justify-between text-sm font-medium text-slate-500">
                    <span>Showing 1 to 5 of 84 invoices</span>
                    <div className="flex gap-1">
                        <Button variant="ghost" size="sm" disabled>Previous</Button>
                        <Button variant="ghost" size="sm" className="bg-primary/10 text-primary">1</Button>
                        <Button variant="ghost" size="sm">2</Button>
                        <Button variant="ghost" size="sm">3</Button>
                        <Button variant="ghost" size="sm">Next</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BillingCom;