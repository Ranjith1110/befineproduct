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
        <div className="flex flex-col gap-4 max-w-[1400px] mx-auto w-full pb-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 font-heading tracking-tight mb-0">
                        Billing & Invoices
                    </h1>
                    <p className="text-xs font-medium text-slate-500">
                        Manage payments, subscriptions, and financial records.
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" leftIcon={<Download size={16} />}>
                        Export CSV
                    </Button>
                    <Button size="sm" leftIcon={<Plus size={16} strokeWidth={2.5} />}>
                        Create Invoice
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center gap-4 relative overflow-hidden">
                    <div className="absolute -right-4 -top-4 w-20 h-20 bg-emerald-50 rounded-full opacity-50 pointer-events-none"></div>
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                        <TrendingUp size={20} />
                    </div>
                    <div>
                        <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-0.5">Total Revenue</div>
                        <div className="text-2xl font-black text-slate-800">$124,500</div>
                    </div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center gap-4 relative overflow-hidden">
                    <div className="absolute -right-4 -top-4 w-20 h-20 bg-amber-50 rounded-full opacity-50 pointer-events-none"></div>
                    <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                        <DollarSign size={20} />
                    </div>
                    <div>
                        <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-0.5">Pending Payments</div>
                        <div className="text-2xl font-black text-slate-800">$12,840</div>
                    </div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center gap-4 relative overflow-hidden">
                    <div className="absolute -right-4 -top-4 w-20 h-20 bg-rose-50 rounded-full opacity-50 pointer-events-none"></div>
                    <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
                        <AlertCircle size={20} />
                    </div>
                    <div>
                        <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-0.5">Overdue</div>
                        <div className="text-2xl font-black text-slate-800">$3,450</div>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden flex flex-col">
                <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-3 bg-slate-50/30">
                    <div className="w-full sm:w-80">
                        <Input
                            placeholder="Search invoices by ID or name..."
                            leftIcon={<Search size={16} />}
                            className="bg-white text-sm h-9"
                        />
                    </div>
                    <div className="flex gap-2 w-full sm:w-auto">
                        <Button variant="secondary" size="sm" leftIcon={<Filter size={14} />}>
                            Filter
                        </Button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/50 border-b border-slate-100">
                                <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Invoice ID</th>
                                <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Billed To</th>
                                <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Date</th>
                                <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Amount</th>
                                <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                                <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {mockInvoices.map((invoice) => (
                                <tr key={invoice.id} className="hover:bg-slate-50/50 transition-colors group">
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-500 flex items-center justify-center">
                                                <FileText size={14} />
                                            </div>
                                            <span className="font-bold text-xs text-slate-900">{invoice.id}</span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="font-bold text-xs text-slate-800">{invoice.billedTo}</div>
                                        <div className="text-[10px] font-medium text-slate-500 mt-0.5">{invoice.type}</div>
                                    </td>
                                    <td className="px-4 py-3">
                                        <span className="text-xs font-semibold text-slate-700">{invoice.date}</span>
                                    </td>
                                    <td className="px-4 py-3">
                                        <span className="text-xs font-bold text-slate-900">{invoice.amount}</span>
                                    </td>
                                    <td className="px-4 py-3">
                                        {invoice.status === 'paid' && <Badge variant="success">Paid</Badge>}
                                        {invoice.status === 'pending' && <Badge variant="warning">Pending</Badge>}
                                        {invoice.status === 'overdue' && <Badge variant="danger">Overdue</Badge>}
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
                    <span>Showing 1 to 5 of 84 invoices</span>
                    <div className="flex gap-1">
                        <Button variant="ghost" size="sm" disabled className="h-7 text-xs px-2">Prev</Button>
                        <Button variant="ghost" size="sm" className="bg-primary/10 text-primary h-7 text-xs px-2.5">1</Button>
                        <Button variant="ghost" size="sm" className="h-7 text-xs px-2.5">2</Button>
                        <Button variant="ghost" size="sm" className="h-7 text-xs px-2.5">3</Button>
                        <Button variant="ghost" size="sm" className="h-7 text-xs px-2">Next</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BillingCom;