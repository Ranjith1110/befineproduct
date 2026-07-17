import { useState } from 'react';
import {
    Plus,
    Search,
    Filter,
    ChevronLeft,
    ChevronRight,
    MapPin,
    User,
} from 'lucide-react';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import { Badge } from '../../ui/Badge';

const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const calendarDays = [
    { date: 28, isCurrentMonth: false, events: [] },
    { date: 29, isCurrentMonth: false, events: [] },
    { date: 30, isCurrentMonth: false, events: [] },
    { date: 1, isCurrentMonth: true, events: [{ title: 'Initial Assessment', time: '10:00 AM', type: 'primary' }] },
    { date: 2, isCurrentMonth: true, events: [] },
    { date: 3, isCurrentMonth: true, events: [{ title: 'Routine Checkup', time: '02:30 PM', type: 'secondary' }] },
    { date: 4, isCurrentMonth: true, events: [] },
    { date: 5, isCurrentMonth: true, events: [] },
    { date: 6, isCurrentMonth: true, events: [{ title: 'Therapy Session', time: '09:00 AM', type: 'success' }, { title: 'Consultation', time: '11:00 AM', type: 'primary' }] },
    { date: 7, isCurrentMonth: true, events: [] },
    { date: 8, isCurrentMonth: true, events: [] },
    { date: 9, isCurrentMonth: true, events: [{ title: 'Emergency Visit', time: '01:15 PM', type: 'danger' }] },
    { date: 10, isCurrentMonth: true, events: [] },
    { date: 11, isCurrentMonth: true, events: [] },
    { date: 12, isCurrentMonth: true, events: [] },
    { date: 13, isCurrentMonth: true, events: [{ title: 'Care Plan Review', time: '10:00 AM', type: 'secondary' }] },
    { date: 14, isCurrentMonth: true, events: [] },
    { date: 15, isCurrentMonth: true, events: [] },
    { date: 16, isCurrentMonth: true, events: [{ title: 'Follow-up', time: '03:00 PM', type: 'primary' }] },
    { date: 17, isCurrentMonth: true, events: [] },
    { date: 18, isCurrentMonth: true, events: [] },
    { date: 19, isCurrentMonth: true, events: [] },
    { date: 20, isCurrentMonth: true, events: [{ title: 'Home Visit', time: '11:30 AM', type: 'success' }] },
    { date: 21, isCurrentMonth: true, events: [] },
    { date: 22, isCurrentMonth: true, events: [] },
    { date: 23, isCurrentMonth: true, events: [{ title: 'Initial Assessment', time: '09:00 AM', type: 'primary' }, { title: 'Family Meeting', time: '02:00 PM', type: 'secondary' }] },
    { date: 24, isCurrentMonth: true, events: [] },
    { date: 25, isCurrentMonth: true, events: [] },
    { date: 26, isCurrentMonth: true, events: [] },
    { date: 27, isCurrentMonth: true, events: [{ title: 'Medication Update', time: '10:00 AM', type: 'warning' }] },
    { date: 28, isCurrentMonth: true, events: [] },
    { date: 29, isCurrentMonth: true, events: [] },
    { date: 30, isCurrentMonth: true, events: [] },
    { date: 31, isCurrentMonth: true, events: [{ title: 'Monthly Review', time: '04:00 PM', type: 'primary' }] },
    { date: 1, isCurrentMonth: false, events: [] },
];

const todaySchedule = [
    { id: 1, time: '09:00 AM', title: 'Initial Assessment', client: 'Eleanor Pena', provider: 'Apex Healthcare', type: 'primary' },
    { id: 2, time: '11:00 AM', title: 'Routine Checkup', client: 'Esther Howard', provider: 'Serenity Senior', type: 'secondary' },
    { id: 3, time: '02:00 PM', title: 'Family Meeting', client: 'Ralph Edwards', provider: 'Guardian Care', type: 'success' },
    { id: 4, time: '04:30 PM', title: 'Medication Review', client: 'Albert Flores', provider: 'Vitality Medical', type: 'warning' },
];

const AppointmentsCom = () => {
    const [view, setView] = useState<'day' | 'week' | 'month' | 'year'>('month');

    const getEventStyles = (type: string) => {
        switch (type) {
            case 'primary': return 'bg-primary/10 text-primary border-primary/20';
            case 'secondary': return 'bg-secondary/20 text-slate-800 border-secondary/40';
            case 'success': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
            case 'warning': return 'bg-amber-50 text-amber-700 border-amber-200';
            case 'danger': return 'bg-rose-50 text-rose-700 border-rose-200';
            default: return 'bg-slate-50 text-slate-700 border-slate-200';
        }
    };

    return (
        <div className="flex flex-col gap-4 max-w-[1400px] mx-auto w-full h-[calc(100vh-100px)]">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 font-heading tracking-tight mb-0">
                        Appointments
                    </h1>
                    <p className="text-xs font-medium text-slate-500">
                        Manage and schedule all client and provider visits.
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-56">
                        <Input
                            placeholder="Search appointments..."
                            leftIcon={<Search size={16} />}
                            className="bg-white text-sm h-9"
                        />
                    </div>
                    <Button variant="outline" size="sm" leftIcon={<Filter size={14} />}>
                        Filter
                    </Button>
                    <Button size="sm" leftIcon={<Plus size={16} strokeWidth={2.5} />}>
                        New Appointment
                    </Button>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-4 h-full overflow-hidden">
                <div className="flex-1 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
                    <div className="p-3 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                        <div className="flex items-center gap-3">
                            <h2 className="text-lg font-bold text-slate-800">July 2026</h2>
                            <div className="flex items-center gap-1">
                                <button className="p-1 rounded-md text-slate-400 hover:text-primary hover:bg-white border border-transparent hover:border-slate-200 shadow-sm transition-all">
                                    <ChevronLeft size={18} />
                                </button>
                                <button className="p-1 rounded-md text-slate-400 hover:text-primary hover:bg-white border border-transparent hover:border-slate-200 shadow-sm transition-all">
                                    <ChevronRight size={18} />
                                </button>
                            </div>
                            <Button variant="ghost" size="sm" className="bg-white border border-slate-200 shadow-sm ml-1 h-7 text-xs px-2.5">
                                Today
                            </Button>
                        </div>

                        <div className="flex bg-slate-100 p-1 rounded-lg">
                            {(['day', 'week', 'month', 'year'] as const).map((v) => (
                                <button
                                    key={v}
                                    onClick={() => setView(v)}
                                    className={`px-3 py-1 rounded-md text-xs font-semibold capitalize transition-all ${view === v
                                            ? 'bg-white text-primary shadow-sm'
                                            : 'text-slate-500 hover:text-slate-700'
                                        }`}
                                >
                                    {v}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-200 [&::-webkit-scrollbar-thumb]:rounded-full">
                        <div className="grid grid-cols-7 border-b border-slate-100 bg-white sticky top-0 z-10">
                            {weekDays.map((day) => (
                                <div key={day} className="py-2 text-center text-[10px] font-bold text-slate-500 uppercase tracking-wider border-r border-slate-100 last:border-r-0">
                                    {day}
                                </div>
                            ))}
                        </div>

                        <div className="grid grid-cols-7 auto-rows-[minmax(100px,_1fr)]">
                            {calendarDays.map((day, i) => (
                                <div
                                    key={i}
                                    className={`border-r border-b border-slate-100 p-1.5 transition-colors hover:bg-slate-50/50 flex flex-col gap-1 ${!day.isCurrentMonth ? 'bg-slate-50/30' : ''
                                        }`}
                                >
                                    <div className={`text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full ${day.date === 23 && day.isCurrentMonth
                                            ? 'bg-primary text-white shadow-sm shadow-primary/30'
                                            : day.isCurrentMonth ? 'text-slate-700' : 'text-slate-400'
                                        }`}>
                                        {day.date}
                                    </div>
                                    <div className="flex flex-col gap-1 mt-0.5 overflow-y-auto scrollbar-hide">
                                        {day.events.map((event, index) => (
                                            <div
                                                key={index}
                                                className={`px-2 py-1 rounded-md border text-[10px] font-semibold cursor-pointer transition-transform hover:scale-[1.02] ${getEventStyles(event.type)}`}
                                            >
                                                <div className="truncate">{event.title}</div>
                                                <div className="text-[9px] font-medium opacity-80 mt-0.5">{event.time}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="w-full lg:w-72 flex flex-col gap-4">
                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 flex-1 overflow-hidden flex flex-col">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-bold text-slate-800 text-base">Today's Agenda</h3>
                            <Badge variant="primary">4 Events</Badge>
                        </div>

                        <div className="flex-1 overflow-y-auto pr-2 space-y-4 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-200 [&::-webkit-scrollbar-thumb]:rounded-full">
                            {todaySchedule.map((schedule, index) => (
                                <div key={schedule.id} className="relative pl-5">
                                    <div className="absolute left-0 top-1 w-2 h-2 rounded-full bg-primary ring-4 ring-primary/10"></div>
                                    {index !== todaySchedule.length - 1 && (
                                        <div className="absolute left-[3px] top-4 w-0.5 h-full bg-slate-100"></div>
                                    )}

                                    <div className="flex flex-col gap-0.5">
                                        <span className="text-[10px] font-bold text-primary">{schedule.time}</span>
                                        <div className={`p-2.5 rounded-lg border mt-1 ${getEventStyles(schedule.type)}`}>
                                            <div className="font-bold text-xs mb-1.5">{schedule.title}</div>
                                            <div className="flex items-center gap-1.5 text-[10px] font-medium opacity-80 mb-1">
                                                <User size={10} />
                                                {schedule.client}
                                            </div>
                                            <div className="flex items-center gap-1.5 text-[10px] font-medium opacity-80">
                                                <MapPin size={10} />
                                                {schedule.provider}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <Button variant="secondary" size="sm" className="w-full justify-between" rightIcon={<ChevronRight size={16} />}>
                        View Upcoming Week
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default AppointmentsCom;