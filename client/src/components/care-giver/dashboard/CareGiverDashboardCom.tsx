import {
    CalendarClock,
    Clock,
    MapPin,
    AlertCircle,
    Activity,
    ClipboardList,
    TrendingUp,
    UserCircle,
    ArrowUpRight,
} from 'lucide-react';
import { Badge } from '../../ui/Badge';
import { Button } from '../../ui/Button';

const mockCaregiverData = {
    name: "Sarah Jenkins",
    role: "Registered Nurse",
    status: "On-Duty",
    stats: {
        todaysVisits: 4,
        completedVisits: 1,
        pendingTasks: 12,
        weeklyHours: "32.5"
    },
    todaysSchedule: [
        { id: 'VIS-1', time: '09:00 AM', patient: 'Eleanor Pena', service: 'Skilled Nursing Care', location: 'Koramangala', status: 'completed' },
        { id: 'VIS-2', time: '11:30 AM', patient: 'Alice Smith', service: 'Post-Op Wound Care', location: 'Whitefield', status: 'in-progress' },
        { id: 'VIS-3', time: '02:00 PM', patient: 'Robert Fox', service: 'Medication Administration', location: 'Jayanagar', status: 'upcoming' },
        { id: 'VIS-4', time: '04:30 PM', patient: 'Jane Cooper', service: 'Vitals Monitoring', location: 'HSR Layout', status: 'upcoming' }
    ],
    pendingTasks: [
        { id: 'TSK-1', text: 'Administer Lisinopril 10mg', patient: 'Eleanor Pena', time: '09:30 AM', priority: 'high' },
        { id: 'TSK-2', text: 'Change surgical dressing', patient: 'Alice Smith', time: '12:00 PM', priority: 'high' },
        { id: 'TSK-3', text: 'Record post-meal blood sugar', patient: 'Robert Fox', time: '02:30 PM', priority: 'medium' },
        { id: 'TSK-4', text: 'Update weekly care log', patient: 'Jane Cooper', time: '05:00 PM', priority: 'low' }
    ],
    patientAlerts: [
        { id: 'ALT-1', patient: 'Alice Smith', alert: 'Reported mild pain at incision site', time: '10:15 AM' }
    ]
};

const CareGiverDashboardCom = () => {
    return (
        <div className="flex flex-col gap-4 max-w-[1400px] mx-auto w-full pb-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 mb-1">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 font-heading tracking-tight mb-0 flex items-center gap-2">
                        Welcome back, {mockCaregiverData.name}
                    </h1>
                    <p className="text-xs font-medium text-slate-500 mt-1">
                        Here is your daily schedule, active patient alerts, and pending clinical tasks.
                    </p>
                </div>
                <Badge variant="success" className="px-3 py-1 text-xs">
                    <Activity size={12} className="mr-1.5 inline" /> {mockCaregiverData.status}
                </Badge>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                        <CalendarClock size={20} />
                    </div>
                    <div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Today's Visits</div>
                        <div className="text-lg font-black text-slate-800 flex items-center gap-1">
                            {mockCaregiverData.stats.todaysVisits}
                            <span className="text-[10px] font-bold text-slate-500 ml-1">
                                ({mockCaregiverData.stats.completedVisits} Done)
                            </span>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                        <ClipboardList size={20} />
                    </div>
                    <div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Pending Tasks</div>
                        <div className="text-lg font-black text-slate-800">{mockCaregiverData.stats.pendingTasks}</div>
                    </div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
                        <AlertCircle size={20} />
                    </div>
                    <div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Active Alerts</div>
                        <div className="text-lg font-black text-slate-800 flex items-center gap-1">
                            {mockCaregiverData.patientAlerts.length}
                            {mockCaregiverData.patientAlerts.length > 0 && (
                                <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse ml-1"></span>
                            )}
                        </div>
                    </div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                        <TrendingUp size={20} />
                    </div>
                    <div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Weekly Hours</div>
                        <div className="text-lg font-black text-slate-800">{mockCaregiverData.stats.weeklyHours}h</div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="lg:col-span-2 bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col">
                    <div className="flex justify-between items-center mb-4">
                        <div>
                            <h2 className="text-base font-bold text-slate-800">Today's Itinerary</h2>
                            <span className="text-xs font-medium text-slate-500">Your scheduled visits and locations</span>
                        </div>
                        <Button variant="outline" size="sm" className="h-7 text-xs px-2.5">Map View</Button>
                    </div>

                    <div className="flex-1 flex flex-col gap-3">
                        {mockCaregiverData.todaysSchedule.map((visit, index) => (
                            <div key={visit.id} className="relative flex items-start gap-3">
                                <div className="flex flex-col items-center gap-1 mt-1">
                                    <div className={`w-3 h-3 rounded-full shrink-0 ring-4 ${
                                        visit.status === 'completed' ? 'bg-emerald-500 ring-emerald-50' :
                                        visit.status === 'in-progress' ? 'bg-primary ring-primary/10' :
                                        'bg-slate-300 ring-slate-50'
                                    }`}></div>
                                    {index !== mockCaregiverData.todaysSchedule.length - 1 && (
                                        <div className="w-0.5 h-12 bg-slate-100 rounded-full"></div>
                                    )}
                                </div>
                                <div className={`flex-1 p-3 rounded-xl border ${
                                    visit.status === 'in-progress' ? 'bg-primary/5 border-primary/10' : 'bg-slate-50 border-slate-100'
                                } flex flex-col sm:flex-row sm:items-center justify-between gap-3`}>
                                    <div className="flex items-start gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-white shadow-sm border border-slate-100 flex items-center justify-center text-primary shrink-0">
                                            <UserCircle size={20} />
                                        </div>
                                        <div>
                                            <div className="text-sm font-bold text-slate-800">{visit.patient}</div>
                                            <div className="text-[11px] font-bold text-primary mt-0.5">{visit.service}</div>
                                            <div className="flex items-center gap-2 mt-1">
                                                <span className="flex items-center gap-1 text-[10px] font-semibold text-slate-500">
                                                    <Clock size={10} /> {visit.time}
                                                </span>
                                                <span className="flex items-center gap-1 text-[10px] font-semibold text-slate-500">
                                                    <MapPin size={10} /> {visit.location}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 w-full sm:w-auto">
                                        {visit.status === 'completed' && <Badge variant="success" className="text-[9px]">Completed</Badge>}
                                        {visit.status === 'in-progress' && <Badge variant="primary" className="text-[9px]">In Progress</Badge>}
                                        {visit.status === 'upcoming' && <Badge variant="secondary" className="text-[9px]">Upcoming</Badge>}
                                        
                                        {visit.status === 'in-progress' ? (
                                            <Button size="sm" className="h-7 text-[10px] px-3">Mark Complete</Button>
                                        ) : visit.status === 'upcoming' ? (
                                            <Button variant="secondary" size="sm" className="h-7 text-[10px] px-3">Start Visit</Button>
                                        ) : (
                                            <Button variant="ghost" size="sm" className="h-7 text-[10px] px-3">View Log</Button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    {mockCaregiverData.patientAlerts.length > 0 && (
                        <div className="bg-rose-50 border border-rose-100 p-4 rounded-xl shadow-sm flex flex-col gap-3">
                            <div className="flex items-center gap-2 text-rose-600 font-bold text-sm">
                                <AlertCircle size={16} /> Patient Alerts
                            </div>
                            {mockCaregiverData.patientAlerts.map(alert => (
                                <div key={alert.id} className="bg-white p-3 rounded-lg border border-rose-100 shadow-sm flex flex-col gap-1">
                                    <div className="flex justify-between items-start">
                                        <span className="text-xs font-bold text-slate-800">{alert.patient}</span>
                                        <span className="text-[10px] font-semibold text-rose-500">{alert.time}</span>
                                    </div>
                                    <p className="text-[11px] font-medium text-slate-600">{alert.alert}</p>
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col flex-1">
                        <div className="mb-4 flex justify-between items-center">
                            <div>
                                <h2 className="text-base font-bold text-slate-800">Care Tasks</h2>
                                <span className="text-xs font-medium text-slate-500">To-do list for today</span>
                            </div>
                            <Button variant="ghost" size="sm" className="h-7 px-2"><ArrowUpRight size={14} /></Button>
                        </div>

                        <div className="flex-1 flex flex-col gap-2.5">
                            {mockCaregiverData.pendingTasks.map((task) => (
                                <div key={task.id} className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                                    <div className="pt-0.5">
                                        <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary/20 cursor-pointer" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="text-xs font-bold text-slate-800 leading-tight mb-0.5">{task.text}</div>
                                        <div className="flex items-center justify-between mt-1">
                                            <span className="text-[10px] font-semibold text-primary flex items-center gap-1">
                                                <UserCircle size={10} /> {task.patient}
                                            </span>
                                            <span className="text-[9px] font-medium text-slate-400 flex items-center gap-1">
                                                <Clock size={10} /> {task.time}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CareGiverDashboardCom;