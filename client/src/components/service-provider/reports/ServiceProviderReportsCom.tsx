import { useState } from 'react';
import {
    Search,
    Filter,
    FileText,
    Upload,
    Download,
    Eye,
    MoreVertical,
    FilePlus,
    X,
    Check,
    Calendar,
    Users,
    FileUp,
    Microscope,
    Stethoscope,
    Activity
} from 'lucide-react';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import { Badge } from '../../ui/Badge';
import { Select } from '../../ui/Select';

const patientOptions = [
    { label: 'All Patients', value: 'all' },
    { label: 'Eleanor Pena', value: 'pt-1' },
    { label: 'Ralph Edwards', value: 'pt-2' },
    { label: 'Alice Smith', value: 'pt-3' },
    { label: 'Jane Cooper', value: 'pt-4' }
];

const mockReports = [
    {
        id: 'REP-5042',
        patientId: 'pt-1',
        patientName: 'Eleanor Pena',
        title: 'Comprehensive Blood Panel',
        category: 'Lab Result',
        date: 'Jul 20, 2026',
        uploadedBy: 'Apex Labs',
        status: 'new'
    },
    {
        id: 'REP-5043',
        patientId: 'pt-2',
        patientName: 'Ralph Edwards',
        title: 'Physical Therapy Baseline',
        category: 'Therapy Note',
        date: 'Jul 19, 2026',
        uploadedBy: 'Michael Chen, PT',
        status: 'reviewed'
    },
    {
        id: 'REP-5044',
        patientId: 'pt-1',
        patientName: 'Eleanor Pena',
        title: 'Post-Op Wound Assessment',
        category: 'Clinical Note',
        date: 'Jul 15, 2026',
        uploadedBy: 'Sarah Jenkins, RN',
        status: 'reviewed'
    },
    {
        id: 'REP-5045',
        patientId: 'pt-3',
        patientName: 'Alice Smith',
        title: 'Cardiology Follow-up',
        category: 'Specialist Report',
        date: 'Jul 14, 2026',
        uploadedBy: 'Dr. Robert Wilson',
        status: 'action-needed'
    }
];

const ServiceProviderReportsCom = () => {
    const [selectedPatient, setSelectedPatient] = useState('all');
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

    const filteredReports = selectedPatient === 'all'
        ? mockReports
        : mockReports.filter(report => report.patientId === selectedPatient);

    const getIconForCategory = (category: string) => {
        switch (category) {
            case 'Lab Result': return <Microscope size={14} className="text-purple-600" />;
            case 'Clinical Note': return <Stethoscope size={14} className="text-blue-600" />;
            case 'Therapy Note': return <Activity size={14} className="text-emerald-600" />;
            default: return <FileText size={14} className="text-slate-600" />;
        }
    };

    const getBgForCategory = (category: string) => {
        switch (category) {
            case 'Lab Result': return 'bg-purple-50';
            case 'Clinical Note': return 'bg-blue-50';
            case 'Therapy Note': return 'bg-emerald-50';
            default: return 'bg-slate-50';
        }
    };

    return (
        <div className="flex flex-col gap-4 max-w-[1400px] mx-auto w-full relative pb-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 font-heading tracking-tight mb-0 flex items-center gap-2">
                        Patient Reports
                    </h1>
                    <p className="text-xs font-medium text-slate-500 mt-1">
                        Manage, view, and upload medical records and clinical notes for your patients.
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Button
                        size="sm"
                        leftIcon={<Upload size={14} strokeWidth={2.5} />}
                        onClick={() => setIsUploadModalOpen(true)}
                    >
                        Upload Report
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                        <FileText size={20} />
                    </div>
                    <div>
                        <div className="text-xl font-bold text-slate-800">842</div>
                        <div className="text-xs font-medium text-slate-500">Total Documents Managed</div>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center">
                        <FilePlus size={20} />
                    </div>
                    <div>
                        <div className="text-xl font-bold text-slate-800">12</div>
                        <div className="text-xs font-medium text-slate-500">New Reports (This Week)</div>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center">
                        <Activity size={20} />
                    </div>
                    <div>
                        <div className="text-xl font-bold text-slate-800">3</div>
                        <div className="text-xs font-medium text-slate-500">Require Action / Review</div>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden flex flex-col">
                <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-3 bg-slate-50/50">
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                        <div className="w-full sm:w-64 flex items-center gap-2">
                            <span className="text-xs font-bold text-slate-600 whitespace-nowrap"><Users size={14} className="inline mr-1" /> View For:</span>
                            <Select
                                options={patientOptions}
                                value={selectedPatient}
                                onChange={(e) => setSelectedPatient(e.target.value)}
                                className="h-9 text-sm"
                            />
                        </div>
                    </div>
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                        <div className="w-full sm:w-56">
                            <Input
                                placeholder="Search document title..."
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
                                <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Document & ID</th>
                                <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Patient Name</th>
                                <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Date & Uploaded By</th>
                                <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                                <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filteredReports.length > 0 ? filteredReports.map((report) => (
                                <tr key={report.id} className="hover:bg-slate-50/50 transition-colors group">
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${getBgForCategory(report.category)}`}>
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
                                        <div className="text-[10px] font-medium text-slate-500">ID: {report.patientId.toUpperCase()}</div>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
                                            <Calendar size={12} className="text-slate-400" />
                                            {report.date}
                                        </div>
                                        <div className="text-[10px] font-medium text-slate-500 mt-0.5 max-w-[140px] truncate">
                                            By: {report.uploadedBy}
                                        </div>
                                    </td>
                                    <td className="px-4 py-3">
                                        {report.status === 'new' && <Badge variant="primary" className="text-[9px] px-2 py-0.5">New Upload</Badge>}
                                        {report.status === 'reviewed' && <Badge variant="success" className="text-[9px] px-2 py-0.5">Reviewed</Badge>}
                                        {report.status === 'action-needed' && <Badge variant="danger" className="text-[9px] px-2 py-0.5">Action Needed</Badge>}
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
                            )) : (
                                <tr>
                                    <td colSpan={5} className="px-4 py-8 text-center text-xs font-medium text-slate-500">
                                        No reports found for the selected patient.
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

            {isUploadModalOpen && (
                <>
                    <div
                        className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 transition-opacity"
                        onClick={() => setIsUploadModalOpen(false)}
                    />
                    <div className="fixed inset-y-0 right-0 z-50 w-full md:w-[500px] bg-white shadow-2xl transform transition-transform duration-300 flex flex-col">
                        <div className="flex items-center justify-between p-5 border-b border-slate-100">
                            <div>
                                <h2 className="text-lg font-bold text-slate-900 tracking-tight">Upload Medical Report</h2>
                                <p className="text-xs font-medium text-slate-500">Add a new document to a patient's record.</p>
                            </div>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setIsUploadModalOpen(false)}
                                className="p-1.5 text-slate-400 hover:text-slate-700 bg-slate-50 hover:bg-slate-100 rounded-full"
                            >
                                <X size={18} />
                            </Button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-5 space-y-5 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-200 [&::-webkit-scrollbar-thumb]:rounded-full">

                            <div className="space-y-3">
                                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                                    <span className="w-5 h-5 rounded bg-primary/10 text-primary flex items-center justify-center text-[10px]">1</span>
                                    Document Details
                                </h3>
                                <div className="grid grid-cols-1 gap-3">
                                    <Select
                                        label="Target Patient"
                                        options={patientOptions.filter(p => p.value !== 'all')}
                                        defaultValue={selectedPatient !== 'all' ? selectedPatient : ''}
                                    />
                                    <Select
                                        label="Document Category"
                                        options={[
                                            { label: 'Select category...', value: '' },
                                            { label: 'Lab Result / Pathology', value: 'lab' },
                                            { label: 'Clinical Note / Visit Summary', value: 'clinical' },
                                            { label: 'Therapy Progress Report', value: 'therapy' },
                                            { label: 'Prescription / Medication List', value: 'prescription' },
                                        ]}
                                    />
                                    <Input
                                        label="Document Title"
                                        placeholder="e.g., Post-Op Wound Assessment"
                                    />
                                </div>
                            </div>

                            <div className="w-full h-px bg-slate-100"></div>

                            <div className="space-y-3">
                                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                                    <span className="w-5 h-5 rounded bg-primary/10 text-primary flex items-center justify-center text-[10px]">2</span>
                                    File Upload
                                </h3>
                                <div className="border-2 border-dashed border-primary/20 rounded-xl bg-slate-50 hover:bg-primary/5 transition-colors p-6 flex flex-col items-center justify-center gap-3 cursor-pointer">
                                    <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                                        <FileUp size={24} />
                                    </div>
                                    <div className="text-center">
                                        <p className="text-xs font-bold text-slate-700">Click to browse or drag and drop</p>
                                        <p className="text-[10px] font-medium text-slate-500 mt-1">PDF, JPG, or PNG (Max 10MB)</p>
                                    </div>
                                </div>
                            </div>

                            <div className="w-full h-px bg-slate-100"></div>

                            <div className="space-y-3">
                                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                                    <span className="w-5 h-5 rounded bg-primary/10 text-primary flex items-center justify-center text-[10px]">3</span>
                                    Additional Notes (Optional)
                                </h3>
                                <div className="relative">
                                    <div className="absolute left-3 top-3 text-slate-400 pointer-events-none">
                                        <FileText size={14} />
                                    </div>
                                    <textarea
                                        className="w-full bg-slate-50 border border-transparent focus:bg-white focus:border-primary/30 rounded-xl focus:ring-4 focus:ring-primary/10 text-xs font-medium text-slate-800 placeholder-slate-400 p-2.5 pl-9 resize-none h-20"
                                        placeholder="Add any internal clinical notes or instructions regarding this document..."
                                    ></textarea>
                                </div>
                            </div>
                        </div>

                        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-end gap-3">
                            <Button variant="ghost" size="sm" onClick={() => setIsUploadModalOpen(false)}>
                                Cancel
                            </Button>
                            <Button size="sm" leftIcon={<Check size={16} />}>
                                Upload & Save
                            </Button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default ServiceProviderReportsCom;