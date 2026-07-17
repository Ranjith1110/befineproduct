import {
    Plus,
    Users,
    Calendar,
    Bell,
    Download,
    TrendingUp,
    TrendingDown,
    ArrowUpRight,
    Clock,
    CheckCircle,
    XCircle,
    BarChart,
    PieChart,
    Activity
} from 'lucide-react';
import { Button } from '../../ui/Button';

const OverViewCom = () => {
    return (
        <div className="flex flex-col gap-4 max-w-[1400px] mx-auto w-full pb-6">
            <div className="flex flex-col md:flex-row justify-between items-start gap-3 mb-1">
                <div className="flex flex-col gap-3">
                    <h1 className="text-2xl font-bold text-slate-900 font-heading tracking-tight">
                        Operations & Analytics
                    </h1>

                    <div className="flex flex-wrap items-center gap-2">
                        <Button size="sm" leftIcon={<Plus size={16} strokeWidth={2.5} />}>
                            Add Client
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="bg-white border border-slate-200 text-slate-700 shadow-sm"
                            leftIcon={<Users size={16} />}
                        >
                            Assign Caregiver
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="bg-white border border-slate-200 text-slate-700 shadow-sm"
                            leftIcon={<Calendar size={16} />}
                        >
                            Schedule Visit
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="bg-white border border-slate-200 text-slate-700 shadow-sm"
                            leftIcon={<Bell size={16} />}
                        >
                            Send Alert
                        </Button>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                        <Calendar size={12} />
                        <span>June 23, 2026</span>
                        <span className="text-slate-300">|</span>
                        <span>32 active clients · 12 caregivers</span>
                    </div>
                </div>

                <Button size="sm" leftIcon={<Download size={16} />}>
                    Export Analytics
                </Button>
            </div>

            {/* High-Level Analytical KPIs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col justify-center">
                    <span className="text-slate-500 text-xs font-medium mb-1 flex items-center gap-1.5"><Users size={12}/> Active Clients</span>
                    <span className="text-2xl font-bold text-slate-800">142</span>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col justify-center">
                    <span className="text-slate-500 text-xs font-medium mb-1 flex items-center gap-1.5"><Activity size={12}/> Monthly Bookings</span>
                    <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold text-slate-800">284</span>
                        <div className="flex items-center text-[10px] font-bold text-emerald-500 bg-emerald-50 px-1.5 py-0.5 rounded">
                            <ArrowUpRight size={10} strokeWidth={3} /> 8%
                        </div>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col justify-center">
                    <span className="text-slate-500 text-xs font-medium mb-1 flex items-center gap-1.5"><Calendar size={12}/> Appts. Today</span>
                    <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-bold text-slate-800">24</span>
                        <span className="text-sm font-medium text-slate-400">/ 28</span>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col justify-center relative overflow-hidden">
                    <span className="text-slate-500 text-xs font-medium mb-1 flex items-center gap-1.5"><BarChart size={12}/> Gross Revenue</span>
                    <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-slate-800">$48.2k</span>
                        <div className="flex items-center text-[10px] font-bold text-emerald-500 bg-emerald-50 px-1.5 py-0.5 rounded">
                            <ArrowUpRight size={10} strokeWidth={3} /> 12%
                        </div>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col justify-center text-primary">
                    <span className="text-primary/70 text-xs font-medium mb-1 flex items-center gap-1.5"><Bell size={12}/> Action Required</span>
                    <span className="text-2xl font-bold">5</span>
                </div>
            </div>

            {/* Middle Row: Trend & Appointments Breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Revenue Trend */}
                <div className="lg:col-span-2 bg-white p-5 rounded-xl border border-slate-100 shadow-sm overflow-hidden flex flex-col">
                    <div className="mb-4 flex justify-between items-center">
                        <div>
                            <h2 className="text-base font-bold text-slate-800">Revenue & Bookings Trend</h2>
                            <span className="text-xs font-medium text-slate-500">Jan - Jun 2026</span>
                        </div>
                        <select className="bg-slate-50 border-none text-xs font-semibold text-slate-700 rounded-lg p-1.5 focus:ring-0 cursor-pointer">
                            <option>Monthly</option>
                            <option>Weekly</option>
                        </select>
                    </div>

                    <div className="relative w-full h-[180px] mt-auto">
                        <div className="absolute inset-0 flex flex-col justify-between text-[10px] font-medium text-slate-400 pb-5 pr-2 pointer-events-none">
                            <span>$60k</span>
                            <span>$45k</span>
                            <span>$30k</span>
                            <span>$15k</span>
                            <span>$0k</span>
                        </div>

                        <div className="absolute inset-0 ml-8 flex flex-col justify-between pb-5 pointer-events-none">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div key={i} className="w-full border-t border-slate-100 border-dashed"></div>
                            ))}
                        </div>

                        <div className="absolute inset-0 ml-8 mb-5">
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

                        <div className="absolute bottom-0 left-8 right-0 flex justify-between text-[10px] font-medium text-slate-400 px-4">
                            <span>Jan</span>
                            <span>Feb</span>
                            <span>Mar</span>
                            <span>Apr</span>
                            <span>May</span>
                            <span>Jun</span>
                        </div>
                    </div>
                </div>

                {/* Appointments Analytics */}
                <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm flex flex-col">
                    <div className="mb-4">
                        <h2 className="text-base font-bold text-slate-800">Appointments Analysis</h2>
                        <span className="text-xs font-medium text-slate-500">Current Month Status</span>
                    </div>
                    
                    <div className="flex-1 flex flex-col justify-center gap-3">
                        <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                            <div className="flex items-center gap-2.5">
                                <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center">
                                    <CheckCircle size={14} />
                                </div>
                                <div>
                                    <div className="text-xs font-bold text-slate-800">Completed</div>
                                    <div className="text-[10px] font-medium text-slate-500">Successfully delivered</div>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-sm font-bold text-slate-800">186</div>
                                <div className="text-[10px] font-bold text-emerald-500">72%</div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                            <div className="flex items-center gap-2.5">
                                <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center">
                                    <Clock size={14} />
                                </div>
                                <div>
                                    <div className="text-xs font-bold text-slate-800">Upcoming</div>
                                    <div className="text-[10px] font-medium text-slate-500">Scheduled services</div>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-sm font-bold text-slate-800">54</div>
                                <div className="text-[10px] font-bold text-amber-500">21%</div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                            <div className="flex items-center gap-2.5">
                                <div className="w-7 h-7 rounded-lg bg-rose-100 text-rose-600 flex items-center justify-center">
                                    <XCircle size={14} />
                                </div>
                                <div>
                                    <div className="text-xs font-bold text-slate-800">Cancelled/No-show</div>
                                    <div className="text-[10px] font-medium text-slate-500">Requires follow-up</div>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-sm font-bold text-slate-800">18</div>
                                <div className="text-[10px] font-bold text-rose-500">7%</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Row: Health & Revenue Sources */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                
                {/* Organisation Health */}
                <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm">
                    <h2 className="text-base font-bold text-slate-800 mb-5">Organisation Health</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 divide-y md:divide-y-0 md:divide-x divide-slate-100">

                        <div className="flex flex-col items-center justify-center pt-3 md:pt-0">
                            <div className="relative w-16 h-16 mb-2">
                                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#f1f5f9" strokeWidth="8" />
                                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="var(--color-primary)" strokeWidth="8" strokeDasharray="251.2" strokeDashoffset="60.28" strokeLinecap="round" />
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-sm font-bold text-slate-800">76</span>
                                </div>
                            </div>
                            <h3 className="text-xs font-semibold text-slate-700 mb-0.5">Client Health</h3>
                            <div className="flex items-center gap-1 text-emerald-500 text-[10px] font-medium">
                                <TrendingUp size={12} />
                                <span>3pts</span>
                            </div>
                        </div>

                        <div className="flex flex-col items-center justify-center pt-4 md:pt-0">
                            <div className="relative w-16 h-16 mb-2">
                                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#f1f5f9" strokeWidth="8" />
                                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="var(--color-primary)" strokeWidth="8" strokeDasharray="251.2" strokeDashoffset="27.63" strokeLinecap="round" />
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-sm font-bold text-slate-800">89%</span>
                                </div>
                            </div>
                            <h3 className="text-xs font-semibold text-slate-700 mb-0.5">Meds Adherence</h3>
                            <div className="flex items-center gap-1 text-emerald-500 text-[10px] font-medium">
                                <TrendingUp size={12} />
                                <span>1%</span>
                            </div>
                        </div>

                        <div className="flex flex-col items-center justify-center pt-4 md:pt-0">
                            <div className="relative w-16 h-16 mb-2">
                                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#f1f5f9" strokeWidth="12" />
                                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="var(--color-primary)" strokeWidth="12" strokeDasharray="251.2" strokeDashoffset="55.26" strokeLinecap="round" />
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-sm font-bold text-slate-800">78%</span>
                                </div>
                            </div>
                            <h3 className="text-xs font-semibold text-slate-700 mb-0.5 text-center">CG Utilisation</h3>
                            <div className="flex items-center gap-1 text-rose-500 text-[10px] font-medium">
                                <TrendingDown size={12} />
                                <span>2%</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Revenue by Category */}
                <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm">
                    <div className="mb-4 flex justify-between items-center">
                        <div>
                            <h2 className="text-base font-bold text-slate-800">Revenue by Category</h2>
                            <span className="text-xs font-medium text-slate-500">Service performance</span>
                        </div>
                        <PieChart size={18} className="text-slate-400"/>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <div className="flex justify-between items-end mb-1.5">
                                <span className="text-xs font-bold text-slate-700">Specialized Medical Care</span>
                                <span className="text-xs font-bold text-slate-900">$22.4k</span>
                            </div>
                            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                                <div className="h-full bg-primary rounded-full" style={{ width: '46%' }}></div>
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between items-end mb-1.5">
                                <span className="text-xs font-bold text-slate-700">Daily Living Assistance</span>
                                <span className="text-xs font-bold text-slate-900">$15.1k</span>
                            </div>
                            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                                <div className="h-full bg-secondary rounded-full" style={{ width: '31%' }}></div>
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between items-end mb-1.5">
                                <span className="text-xs font-bold text-slate-700">Rehabilitation Therapy</span>
                                <span className="text-xs font-bold text-slate-900">$8.2k</span>
                            </div>
                            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                                <div className="h-full bg-emerald-500 rounded-full" style={{ width: '17%' }}></div>
                            </div>
                        </div>
                        
                        <div>
                            <div className="flex justify-between items-end mb-1.5">
                                <span className="text-xs font-bold text-slate-700">Other Services</span>
                                <span className="text-xs font-bold text-slate-900">$2.5k</span>
                            </div>
                            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                                <div className="h-full bg-slate-400 rounded-full" style={{ width: '6%' }}></div>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    );
};

export default OverViewCom;