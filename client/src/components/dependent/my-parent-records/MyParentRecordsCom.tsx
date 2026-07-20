import { useState } from 'react';
import {
    Search,
    Filter,
    Download,
    Eye,
    FileText,
    Calendar,
    Clock,
    Activity,
    Pill,
    Stethoscope,
    Microscope,
    MoreVertical,
} from 'lucide-react';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import { Badge } from '../../ui/Badge';
import { Select } from '../../ui/Select';

const parentOptions = [
    { label: 'Eleanor Pena (Mother)', value: 'parent-1' },
    { label: 'Ralph Edwards (Father)', value: 'parent-2' }
];

const mockParentData: Record<string, any> = {
    'parent-1': {
        records: [
            { id: 'REC-001', title: 'Comprehensive Blood Panel', type: 'Lab Report', date: 'Jul 15, 2026', provider: 'Vitality Labs', status: 'final' },
            { id: 'REC-002', title: 'Cardiology Follow-up Summary', type: 'Visit Note', date: 'Jul 10, 2026', provider: 'Dr. Sarah Jenkins', status: 'final' },
            { id: 'REC-003', title: 'Lisinopril 10mg Prescription', type: 'Prescription', date: 'Jul 10, 2026', provider: 'Dr. Sarah Jenkins', status: 'active' },
            { id: 'REC-004', title: 'Post-Op Wound Assessment', type: 'Nursing Log', date: 'Jul 05, 2026', provider: 'Apex Healthcare', status: 'final' }
        ],
        appointments: [
            { id: 'APT-1', title: 'Routine Clinical Checkup', provider: 'Dr. Sarah Jenkins', date: 'Jul 22, 2026', time: '10:00 AM', type: 'clinical' },
            { id: 'APT-2', title: 'Physical Therapy Session', provider: 'Serenity Rehab', date: 'Jul 24, 2026', time: '02:30 PM', type: 'therapy' }
        ]
    },
    'parent-2': {
        records: [
            { id: 'REC-005', title: 'Lipid Panel Results', type: 'Lab Report', date: 'Jun 28, 2026', provider: 'City Labs', status: 'final' },
            { id: 'REC-006', title: 'Atorvastatin 20mg', type: 'Prescription', date: 'Jun 20, 2026', provider: 'Dr. Michael Chen', status: 'active' },
            { id: 'REC-007', title: 'Dietary Plan Update', type: 'Visit Note', date: 'Jun 15, 2026', provider: 'Vitality Medical Group', status: 'final' }
        ],
        appointments: [
            { id: 'APT-3', title: 'Dietitian Consultation', provider: 'Vitality Medical Group', date: 'Jul 25, 2026', time: '11:00 AM', type: 'clinical' }
        ]
    }
};

const MyParentRecordsCom = () => {
    const [selectedParentId, setSelectedParentId] = useState('parent-1');
    const [activeTab, setActiveTab] = useState<'all' | 'labs' | 'prescriptions' | 'notes'>('all');

    const activeData = mockParentData[selectedParentId];
    const activeParentLabel = parentOptions.find(p => p.value === selectedParentId)?.label.split(' (')[0] || '';

    const getIconForType = (type: string) => {
        switch (type) {
            case 'Lab Report': return <Microscope size={14} className="text-purple-600" />;
            case 'Visit Note': return <Stethoscope size={14} className="text-blue-600" />;
            case 'Prescription': return <Pill size={14} className="text-emerald-600" />;
            case 'Nursing Log': return <Activity size={14} className="text-rose-600" />;
            case 'Imaging': return <FileText size={14} className="text-amber-600" />;
            default: return <FileText size={14} className="text-slate-600" />;
        }
    };

    const getBgForType = (type: string) => {
        switch (type) {
            case 'Lab Report': return 'bg-purple-50';
            case 'Visit Note': return 'bg-blue-50';
            case 'Prescription': return 'bg-emerald-50';
            case 'Nursing Log': return 'bg-rose-50';
            case 'Imaging': return 'bg-amber-50';
            default: return 'bg-slate-50';
        }
    };

    return (
        <div className="flex flex-col gap-4 max-w-[1400px] mx-auto w-full pb-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 font-heading tracking-tight mb-0 flex items-center gap-2">
                        My Parent Records
                    </h1>
                    <div className="flex items-center gap-2 mt-1.5">
                        <span className="text-xs font-medium text-slate-500">Viewing medical history for:</span>
                        <div className="w-64">
                            <Select
                                options={parentOptions}
                                value={selectedParentId}
                                onChange={(e) => setSelectedParentId(e.target.value)}
                                className="h-8 text-xs py-1"
                            />
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" leftIcon={<Download size={14} />}>
                        Export {activeParentLabel}'s Summary
                    </Button>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-4 mt-2">
                <div className="flex-1 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                    <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-3 bg-slate-50/50">
                        <div className="flex items-center gap-2 w-full sm:w-auto">
                            <div className="w-full sm:w-64">
                                <Input
                                    placeholder="Search records..."
                                    leftIcon={<Search size={16} />}
                                    className="bg-white text-sm h-9"
                                />
                            </div>
                            <Button variant="secondary" size="sm" className="h-9 px-3" leftIcon={<Filter size={14} />}>
                                Filter
                            </Button>
                        </div>
                        <div className="flex bg-slate-100 p-1 rounded-lg w-full sm:w-auto">
                            {(['all', 'labs', 'prescriptions', 'notes'] as const).map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`flex-1 sm:flex-none px-3 py-1 rounded-md text-xs font-semibold capitalize transition-all ${activeTab === tab
                                            ? 'bg-white text-primary shadow-sm'
                                            : 'text-slate-500 hover:text-slate-700'
                                        }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="overflow-x-auto flex-1">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50/50 border-b border-slate-100">
                                    <th className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Document Name</th>
                                    <th className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Type</th>
                                    <th className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Date & Provider</th>
                                    <th className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Status</th>
                                    <th className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {activeData.records.map((record: any) => (
                                    <tr key={record.id} className="hover:bg-slate-50/50 transition-colors group">
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getBgForType(record.type)}`}>
                                                    {getIconForType(record.type)}
                                                </div>
                                                <div>
                                                    <div className="text-xs font-bold text-slate-900">{record.title}</div>
                                                    <div className="text-[10px] font-medium text-slate-500">{record.id}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3">
                                            <span className="text-[10px] font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md">
                                                {record.type}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="text-xs font-bold text-slate-800">{record.date}</div>
                                            <div className="text-[10px] font-medium text-slate-500 truncate max-w-[120px]">{record.provider}</div>
                                        </td>
                                        <td className="px-4 py-3">
                                            {record.status === 'active' ? (
                                                <Badge variant="success" className="text-[9px] px-2 py-0.5">Active</Badge>
                                            ) : (
                                                <Badge variant="secondary" className="text-[9px] px-2 py-0.5 text-slate-600">Final</Badge>
                                            )}
                                        </td>
                                        <td className="px-4 py-3 text-right">
                                            <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button className="p-1.5 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors" title="View Document">
                                                    <Eye size={14} />
                                                </button>
                                                <button className="p-1.5 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors" title="Download">
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

                    <div className="p-3 border-t border-slate-100 flex items-center justify-between text-[10px] font-medium text-slate-500 bg-slate-50/50">
                        <span>Showing {activeData.records.length} records</span>
                        <div className="flex gap-1">
                            <Button variant="ghost" size="sm" disabled className="h-6 text-[10px] px-2">Prev</Button>
                            <Button variant="ghost" size="sm" className="bg-primary/10 text-primary h-6 text-[10px] px-2">1</Button>
                            <Button variant="ghost" size="sm" className="h-6 text-[10px] px-2">Next</Button>
                        </div>
                    </div>
                </div>

                <div className="w-full lg:w-80 flex flex-col gap-4">
                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 flex flex-col">
                        <div className="mb-4">
                            <h2 className="text-sm font-bold text-slate-800">Future Appointments</h2>
                            <span className="text-[10px] font-medium text-slate-500">Upcoming clinical and therapy visits</span>
                        </div>

                        <div className="space-y-3 flex-1">
                            {activeData.appointments.map((apt: any) => (
                                <div key={apt.id} className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex flex-col gap-2">
                                    <div className="flex items-start gap-2.5">
                                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 shadow-sm border border-slate-100 bg-white ${apt.type === 'clinical' ? 'text-blue-500' : 'text-emerald-500'}`}>
                                            {apt.type === 'clinical' ? <Stethoscope size={14} /> : <Activity size={14} />}
                                        </div>
                                        <div>
                                            <div className="text-xs font-bold text-slate-800 leading-tight">{apt.title}</div>
                                            <div className="text-[10px] font-medium text-slate-500 mt-0.5">{apt.provider}</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 pt-2 mt-1 border-t border-slate-100/80">
                                        <div className="flex items-center gap-1 text-[10px] font-semibold text-slate-600">
                                            <Calendar size={12} className="text-slate-400" />
                                            {apt.date}
                                        </div>
                                        <div className="flex items-center gap-1 text-[10px] font-semibold text-slate-600">
                                            <Clock size={12} className="text-slate-400" />
                                            {apt.time}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <Button variant="secondary" size="sm" className="w-full mt-4 h-8 text-xs">
                            View {activeParentLabel}'s Calendar
                        </Button>
                    </div>

                    <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl border border-primary/10 p-4">
                        <h2 className="text-sm font-bold text-slate-800 mb-1">Upload New Record</h2>
                        <p className="text-[10px] font-medium text-slate-500 mb-3">Add external prescriptions or reports for {activeParentLabel}.</p>
                        <div className="border-2 border-dashed border-primary/20 rounded-lg bg-white/50 p-4 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-white transition-colors">
                            <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                                <FileText size={14} />
                            </div>
                            <span className="text-[10px] font-bold text-slate-600">Click to Browse</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyParentRecordsCom;