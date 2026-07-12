import {
    Plus,
    Users,
    Calendar,
    Bell,
    Download,
    TrendingUp,
    TrendingDown,
    ArrowUpRight
} from 'lucide-react';
import { Button } from '../../ui/Button';

const OverViewCom = () => {
    return (
        <div className="flex flex-col gap-6 max-w-[1400px] mx-auto w-full">
            <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-2">
                <div className="flex flex-col gap-4">
                    <h1 className="text-3xl font-bold text-slate-900 font-heading tracking-tight">
                        Operations Overview
                    </h1>

                    <div className="flex flex-wrap items-center gap-3">
                        <Button leftIcon={<Plus size={16} strokeWidth={2.5} />}>
                            Add Client
                        </Button>
                        <Button
                            variant="ghost"
                            className="bg-white border border-slate-200 text-slate-700 shadow-sm"
                            leftIcon={<Users size={16} />}
                        >
                            Assign Caregiver
                        </Button>
                        <Button
                            variant="ghost"
                            className="bg-white border border-slate-200 text-slate-700 shadow-sm"
                            leftIcon={<Calendar size={16} />}
                        >
                            Schedule Visit
                        </Button>
                        <Button
                            variant="ghost"
                            className="bg-white border border-slate-200 text-slate-700 shadow-sm"
                            leftIcon={<Bell size={16} />}
                        >
                            Send Alert
                        </Button>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
                        <Calendar size={14} />
                        <span>June 23, 2026</span>
                        <span className="text-slate-300">|</span>
                        <span>32 active clients · 12 caregivers</span>
                    </div>
                </div>

                <Button leftIcon={<Download size={18} />}>
                    Export Report
                </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-center">
                    <span className="text-slate-500 text-sm font-medium mb-1">Total Active</span>
                    <span className="text-3xl font-bold text-slate-800">32</span>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-center">
                    <span className="text-slate-500 text-sm font-medium mb-1">On Duty</span>
                    <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-bold text-slate-800">8</span>
                        <span className="text-lg font-medium text-slate-400">/ 12</span>
                    </div>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-center">
                    <span className="text-slate-500 text-sm font-medium mb-1">New This Month</span>
                    <span className="text-3xl font-bold text-slate-800">5</span>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-center relative overflow-hidden">
                    <span className="text-slate-500 text-sm font-medium mb-1">Revenue</span>
                    <div className="flex items-center gap-2">
                        <span className="text-3xl font-bold text-slate-800">$48.2k</span>
                        <div className="flex items-center text-xs font-bold text-emerald-500 bg-emerald-50 px-1.5 py-0.5 rounded">
                            <ArrowUpRight size={12} strokeWidth={3} />
                            12%
                        </div>
                    </div>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-center text-primary">
                    <span className="text-primary/70 text-sm font-medium mb-1">Open Alerts</span>
                    <span className="text-3xl font-bold">5</span>
                </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <h2 className="text-lg font-bold text-slate-800 mb-4">Quick Actions</h2>
                <div className="flex flex-wrap gap-3">
                    {['Add Client', 'Add Caregiver', 'Schedule Visit', 'Generate Invoice', 'Send Alert'].map((action) => (
                        <Button key={action} className="shadow-sm">
                            {action}
                        </Button>
                    ))}
                </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <h2 className="text-lg font-bold text-slate-800 mb-8">Organisation Health</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-slate-100">

                    <div className="flex flex-col items-center justify-center pt-4 md:pt-0">
                        <div className="relative w-24 h-24 mb-4">
                            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                                <circle cx="50" cy="50" r="40" fill="transparent" stroke="#f1f5f9" strokeWidth="8" />
                                <circle cx="50" cy="50" r="40" fill="transparent" stroke="var(--color-primary)" strokeWidth="8" strokeDasharray="251.2" strokeDashoffset="60.28" strokeLinecap="round" />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-xl font-bold text-slate-800">76</span>
                            </div>
                        </div>
                        <h3 className="font-semibold text-slate-700 mb-1">Client Health Avg</h3>
                        <div className="flex items-center gap-1 text-emerald-500 text-sm font-medium">
                            <TrendingUp size={14} />
                            <span>3pts</span>
                        </div>
                    </div>

                    <div className="flex flex-col items-center justify-center pt-8 md:pt-0">
                        <div className="relative w-24 h-24 mb-4">
                            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                                <circle cx="50" cy="50" r="40" fill="transparent" stroke="#f1f5f9" strokeWidth="8" />
                                <circle cx="50" cy="50" r="40" fill="transparent" stroke="var(--color-primary)" strokeWidth="8" strokeDasharray="251.2" strokeDashoffset="27.63" strokeLinecap="round" />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-xl font-bold text-slate-800">89%</span>
                            </div>
                        </div>
                        <h3 className="font-semibold text-slate-700 mb-1">Medication Adherence</h3>
                        <div className="flex items-center gap-1 text-emerald-500 text-sm font-medium">
                            <TrendingUp size={14} />
                            <span>1%</span>
                        </div>
                    </div>

                    <div className="flex flex-col items-center justify-center pt-8 md:pt-0">
                        <div className="relative w-24 h-24 mb-4">
                            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                                <circle cx="50" cy="50" r="40" fill="transparent" stroke="#f1f5f9" strokeWidth="12" />
                                <circle cx="50" cy="50" r="40" fill="transparent" stroke="var(--color-primary)" strokeWidth="12" strokeDasharray="251.2" strokeDashoffset="55.26" strokeLinecap="round" />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-xl font-bold text-slate-800">78%</span>
                            </div>
                        </div>
                        <h3 className="font-semibold text-slate-700 mb-1">Caregiver Utilisation</h3>
                        <div className="flex items-center gap-1 text-rose-500 text-sm font-medium">
                            <TrendingDown size={14} />
                            <span>2%</span>
                        </div>
                    </div>

                </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm overflow-hidden mb-10">
                <div className="mb-6">
                    <h2 className="text-lg font-bold text-slate-800">Revenue Trend</h2>
                    <span className="text-sm font-medium text-slate-500">Jan - Jun 2026</span>
                </div>

                <div className="relative w-full h-[240px]">
                    <div className="absolute inset-0 flex flex-col justify-between text-xs font-medium text-slate-400 pb-6 pr-2 pointer-events-none">
                        <span>$60k</span>
                        <span>$45k</span>
                        <span>$30k</span>
                        <span>$15k</span>
                        <span>$0k</span>
                    </div>

                    <div className="absolute inset-0 ml-10 flex flex-col justify-between pb-6 pointer-events-none">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="w-full border-t border-slate-100 border-dashed"></div>
                        ))}
                    </div>

                    <div className="absolute inset-0 ml-10 mb-6">
                        <svg className="w-full h-full" viewBox="0 0 1000 200" preserveAspectRatio="none">
                            <defs>
                                <linearGradient id="gradientFill" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.15" />
                                    <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0" />
                                </linearGradient>
                            </defs>
                            <path
                                d="M0,80 C200,60 300,90 500,80 C700,70 800,50 1000,40 L1000,200 L0,200 Z"
                                fill="url(#gradientFill)"
                            />
                            <path
                                d="M0,80 C200,60 300,90 500,80 C700,70 800,50 1000,40"
                                fill="none"
                                stroke="var(--color-primary)"
                                strokeWidth="3"
                                strokeLinecap="round"
                            />
                        </svg>
                    </div>

                    <div className="absolute bottom-0 left-10 right-0 flex justify-between text-xs font-medium text-slate-400 px-4">
                        <span>Jan</span>
                        <span>Feb</span>
                        <span>Mar</span>
                        <span>Apr</span>
                        <span>May</span>
                        <span>Jun</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OverViewCom;