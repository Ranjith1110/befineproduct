import { useState } from 'react';
import {
    Search,
    Filter,
    FileText,
    Download,
    Eye,
    MoreVertical,
    CheckCircle2,
    Calendar,
    Users,
    Microscope,
    Stethoscope,
    Activity,
    AlertCircle,
    Building2,
    X,
    Check,
    Clock
} from 'lucide-react';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import { Badge } from '../../ui/Badge';
import { Select } from '../../ui/Select';

const patientOptions = [
    { label: 'All Patients', value: 'all' },
    { label: 'Eleanor Pena', value: 'Eleanor Pena' },
    { label: 'Ralph Edwards', value: 'Ralph Edwards' },
    { label: 'Alice Smith', value: 'Alice Smith' },
    { label: 'Jane Cooper', value: 'Jane Cooper' }
];

const statusOptions = [
    { label: 'All Statuses', value: 'all' },
    { label: 'Pending Review', value: 'pending' },
    { label: 'Reviewed / Approved', value: 'reviewed' },
    { label: 'Action Required', value: 'action-needed' }
];

const mockGlobalReports = [
    {
        id: 'REP-9042',
        patientName: 'Eleanor Pena',
        title: 'Comprehensive Blood Panel',
        category: 'Lab Result',
        date: 'Jul 26, 2026',
        time: '10:30 AM',
        uploadedBy: 'Apex Healthcare Partners',
        status: 'pending'
    },
    {
        id: 'REP-9043',
        patientName: 'Ralph Edwards',
        title: 'Physical Therapy Baseline',
        category: 'Therapy Note',
        date: 'Jul 26, 2026',
        time: '02:15 PM',
        uploadedBy: 'Vitality Medical Group',
        status: 'reviewed'
    },
    {
        id: 'REP-9044',
        patientName: 'Alice Smith',
        title: 'Post-Op Wound Assessment',
        category: 'Clinical Note',
        date: 'Jul 25, 2026',
        time: '11:00 AM',
        uploadedBy: 'Guardian Home Care',
        status: 'action-needed'
    },
    {
        id: 'REP-9045',
        patientName: 'Jane Cooper',
        title: 'Incident Report - Fall',
        category: 'Observation',
        date: 'Jul 24, 2026',
        time: '08:45 AM',
        uploadedBy: 'Serenity Senior Solutions',
        status: 'action-needed'
    },
    {
        id: 'REP-9046',
        patientName: 'Eleanor Pena',
        title: 'Weekly Vitals Chart',
        category: 'Clinical Note',
        date: 'Jul 24, 2026',
        time: '04:00 PM',
        uploadedBy: 'Apex Healthcare Partners',
        status: 'reviewed'
    }
];

const CareManagerReportsCom = () => {
    const [selectedPatient, setSelectedPatient] = useState('all');
    const [selectedStatus, setSelectedStatus] = useState('all');
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
    const [selectedReport, setSelectedReport] = useState<any>(null);

    const filteredReports = mockGlobalReports.filter(report => {
        const matchesPatient = selectedPatient === 'all' || report.patientName === selectedPatient;
        const matchesStatus = selectedStatus === 'all' || report.status === selectedStatus;
        return matchesPatient && matchesStatus;
    });

    const getIconForCategory = (category: string) => {
        switch (category) {
            case 'Lab Result': return <Microscope size={14} className="text-purple-600" />;
            case 'Clinical Note': return <Stethoscope size={14} className="text-blue-600" />;
            case 'Therapy Note': return <Activity size={14} className="text-emerald-600" />;
            case 'Observation': return <Eye size={14} className="text-amber-600" />;
            default: return <FileText size={14} className="text-slate-600" />;
        }
    };

    const getBgForCategory = (category: string) => {
        switch (category) {
            case 'Lab Result': return 'bg-purple-50 border-purple-100';
            case 'Clinical Note': return 'bg-blue-50 border-blue-100';
            case 'Therapy Note': return 'bg-emerald-50 border-emerald-100';
            case 'Observation': return 'bg-amber-50 border-amber-100';
            default: return 'bg-slate-50 border-slate-100';
        }
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'pending': return <Badge variant="warning" className="text-[10px] px-2 py-0.5">Pending Review</Badge>;
            case 'reviewed': return <Badge variant="success" className="text-[10px] px-2 py-0.5">Reviewed</Badge>;
            case 'action-needed': return <Badge variant="danger" className="text-[10px] px-2 py-0.5">Action Needed</Badge>;
            default: return <Badge variant="secondary" className="text-[10px] px-2 py-0.5">Unknown</Badge>;
        }
    };

    const handleReviewReport = (report: any) => {
        setSelectedReport(report);
        setIsReviewModalOpen(true);
    };

    return (
        <div className="flex flex-col gap-4 max-w-[1400px] mx-auto w-full relative pb-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 font-heading tracking-tight mb-0 flex items-center gap-2">
                        Global Patient Reports
                    </h1>
                    <p className="text-xs font-medium text-slate-500 mt-1">
                        Review clinical documents, lab results, and incident reports submitted across the network.
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" leftIcon={<Download size={14} />}>
                        Export Registry
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center">
                        <FileText size={20} />
                    </div>
                    <div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Total Documents</div>
                        <div className="text-xl font-bold text-slate-800">4,812</div>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center">
                        <Clock size={20} />
                    </div>
                    <div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Pending Review</div>
                        <div className="text-xl font-bold text-slate-800">42</div>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center">
                        <AlertCircle size={20} />
                    </div>
                    <div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Action Needed</div>
                        <div className="text-xl font-bold text-slate-800">8</div>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                        <CheckCircle2 size={20} />
                    </div>
                    <div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Reviewed (MTD)</div>
                        <div className="text-xl font-bold text-slate-800">846</div>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden flex flex-col">
                <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-3 bg-slate-50/50">
                    <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                        <div className="w-full sm:w-56 flex items-center gap-2">
                            <span className="text-xs font-bold text-slate-600 whitespace-nowrap"><Users size={14} className="inline mr-1" /> Patient:</span>
                            <Select
                                options={patientOptions}
                                value={selectedPatient}
                                onChange={(e) => setSelectedPatient(e.target.value)}
                                className="h-9 text-sm w-full"
                            />
                        </div>
                        <div className="w-full sm:w-56 flex items-center gap-2">
                            <span className="text-xs font-bold text-slate-600 whitespace-nowrap"><Activity size={14} className="inline mr-1" /> Status:</span>
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
                                placeholder="Search report title..."
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
                                <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Document & Title</th>
                                <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Patient & Details</th>
                                <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Uploaded By</th>
                                <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                                <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filteredReports.length > 0 ? filteredReports.map((report) => (
                                <tr key={report.id} className="hover:bg-slate-50/50 transition-colors group">
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-8 h-8 rounded-lg border flex items-center justify-center shrink-0 ${getBgForCategory(report.category)}`}>
                                                {getIconForCategory(report.category)}
                                            </div>
                                            <div>
                                                <div className="text-sm font-bold text-slate-900">{report.title}</div>
                                                <div className="text-[10px] font-bold text-slate-500 mt-0.5 flex items-center gap-1.5">
                                                    <span>{report.id}</span>
                                                    <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                                                    <span className="text-primary">{report.category}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="text-xs font-bold text-slate-800">{report.patientName}</div>
                                        <div className="flex items-center gap-1.5 mt-0.5 text-[10px] font-medium text-slate-500">
                                            <Calendar size={10} className="text-slate-400" />
                                            {report.date} at {report.time}
                                        </div>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
                                            <Building2 size={12} className="text-indigo-500 shrink-0" />
                                            <span className="truncate max-w-[160px]">{report.uploadedBy}</span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3">
                                        {getStatusBadge(report.status)}
                                    </td>
                                    <td className="px-4 py-3 text-right">
                                        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Button 
                                                variant={report.status === 'pending' ? 'secondary' : 'ghost'} 
                                                size="sm" 
                                                className="h-7 text-[10px] px-2.5"
                                                onClick={() => handleReviewReport(report)}
                                            >
                                                {report.status === 'pending' ? 'Review' : 'View Details'}
                                            </Button>
                                            <button className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors">
                                                <MoreVertical size={14} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={5} className="px-4 py-8 text-center text-xs font-medium text-slate-500">
                                        No reports found matching the selected filters.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="p-3 border-t border-slate-100 flex items-center justify-between text-xs font-medium text-slate-500">
                    <span>Showing {filteredReports.length} documents</span>
                    <div className="flex gap-1">
                        <Button variant="ghost" size="sm" disabled className="h-7 text-xs px-2">Prev</Button>
                        <Button variant="ghost" size="sm" className="bg-primary/10 text-primary h-7 text-xs px-2.5">1</Button>
                        <Button variant="ghost" size="sm" className="h-7 text-xs px-2">Next</Button>
                    </div>
                </div>
            </div>

            {isReviewModalOpen && selectedReport && (
                <>
                    <div
                        className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 transition-opacity"
                        onClick={() => setIsReviewModalOpen(false)}
                    />
                    <div className="fixed inset-y-0 right-0 z-50 w-full md:w-[500px] bg-white shadow-2xl transform transition-transform duration-300 flex flex-col">
                        <div className="flex items-center justify-between p-5 border-b border-slate-100">
                            <div>
                                <h2 className="text-lg font-bold text-slate-900 tracking-tight">Report Review</h2>
                                <p className="text-xs font-medium text-slate-500">Manage global status for {selectedReport.id}</p>
                            </div>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setIsReviewModalOpen(false)}
                                className="p-1.5 text-slate-400 hover:text-slate-700 bg-slate-50 hover:bg-slate-100 rounded-full"
                            >
                                <X size={18} />
                            </Button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-5 space-y-5 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-200 [&::-webkit-scrollbar-thumb]:rounded-full">
                            
                            <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 grid grid-cols-2 gap-4">
                                <div className="col-span-2">
                                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Document Title</div>
                                    <div className="text-sm font-bold text-slate-800">{selectedReport.title}</div>
                                </div>
                                <div>
                                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Patient</div>
                                    <div className="text-xs font-bold text-slate-700">{selectedReport.patientName}</div>
                                </div>
                                <div>
                                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Category</div>
                                    <div className="text-xs font-bold text-primary">{selectedReport.category}</div>
                                </div>
                                <div>
                                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Uploaded By</div>
                                    <div className="text-xs font-bold text-indigo-600 truncate">{selectedReport.uploadedBy}</div>
                                </div>
                                <div>
                                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Timestamp</div>
                                    <div className="text-xs font-bold text-slate-700">{selectedReport.date}</div>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                                    <span className="w-5 h-5 rounded bg-primary/10 text-primary flex items-center justify-center text-[10px]">1</span>
                                    Document Preview
                                </h3>
                                <div className="border border-slate-200 rounded-xl bg-slate-50 h-32 flex flex-col items-center justify-center gap-2">
                                    <FileText size={24} className="text-slate-400" />
                                    <span className="text-xs font-semibold text-slate-600">Document preview unavailable</span>
                                    <Button variant="outline" size="sm" className="h-7 text-[10px] px-3 mt-1" leftIcon={<Download size={12} />}>
                                        Download Securely
                                    </Button>
                                </div>
                            </div>

                            <div className="w-full h-px bg-slate-100"></div>

                            <div className="space-y-3">
                                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                                    <span className="w-5 h-5 rounded bg-primary/10 text-primary flex items-center justify-center text-[10px]">2</span>
                                    Manager Review Status
                                </h3>
                                <div className="grid grid-cols-1 gap-3">
                                    <Select
                                        label="Global Document Status"
                                        defaultValue={selectedReport.status}
                                        options={[
                                            { label: 'Pending Review', value: 'pending' },
                                            { label: 'Reviewed / Approved', value: 'reviewed' },
                                            { label: 'Action Required / Flagged', value: 'action-needed' },
                                        ]}
                                    />
                                    <div className="flex flex-col gap-1.5 w-full">
                                        <label className="text-xs font-semibold text-slate-700">Internal Manager Notes (Optional)</label>
                                        <textarea
                                            className="w-full bg-slate-50 border border-transparent focus:bg-white focus:border-primary/30 rounded-xl focus:ring-4 focus:ring-primary/10 text-xs font-medium text-slate-800 placeholder-slate-400 p-2.5 resize-none h-20"
                                            placeholder="Add notes for internal tracking or compliance..."
                                        ></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-end gap-3">
                            <Button variant="ghost" size="sm" onClick={() => setIsReviewModalOpen(false)}>
                                Cancel
                            </Button>
                            <Button size="sm" leftIcon={<Check size={16} />}>
                                Save Assessment
                            </Button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default CareManagerReportsCom;