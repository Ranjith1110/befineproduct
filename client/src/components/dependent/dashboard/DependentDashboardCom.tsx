import { useState } from 'react';
import {
  Activity,
  Calendar,
  Heart,
  Home,
  Clock,
  UserCheck,
  ArrowUpRight,
  TrendingUp,
  Shield,
  FileText,
  CheckCircle2,
  Plus,
  X,
  Check
} from 'lucide-react';
import { Badge } from '../../ui/Badge';
import { Button } from '../../ui/Button';
import { Select } from '../../ui/Select';
import { Input } from '../../ui/Input';

const mockParentsData: Record<string, any> = {
  'parent-1': {
    id: 'parent-1',
    name: "Eleanor Pena",
    relation: "Mother",
    planName: "Premium Care Package",
    assignedCoordinator: "Sarah Jenkins",
    assignedCaregiver: "Jane Cooper",
    vitals: {
      bloodPressure: "120/80 mmHg",
      heartRate: "72 bpm",
      spo2: "98%",
      status: "Normal"
    },
    serviceUsage: [
      { name: 'Skilled Nursing Care', used: 3, total: 4, type: 'care' },
      { name: 'Physical Therapy', used: 4, total: 8, type: 'care' },
      { name: 'Daily Living Assistance', used: 6, total: 12, type: 'home' }
    ],
    upcomingVisits: [
      { id: 1, caregiver: 'Jane Cooper', service: 'Skilled Nursing Care', date: 'Today, July 18', time: '09:00 AM', status: 'confirmed' },
      { id: 2, caregiver: 'Wade Warren', service: 'Physical Therapy', date: 'Mon, July 20', time: '11:30 AM', status: 'scheduled' }
    ],
    recentActivities: [
      { id: 1, text: 'Morning vitals recorded successfully', time: '2 hours ago', type: 'vital' },
      { id: 2, text: 'Medication adherence checklist completed', time: '4 hours ago', type: 'medication' }
    ]
  },
  'parent-2': {
    id: 'parent-2',
    name: "Ralph Edwards",
    relation: "Father",
    planName: "Basic Care Package",
    assignedCoordinator: "Michael Chen",
    assignedCaregiver: "Wade Warren",
    vitals: {
      bloodPressure: "135/85 mmHg",
      heartRate: "78 bpm",
      spo2: "96%",
      status: "Elevated"
    },
    serviceUsage: [
      { name: 'Routine Checkup', used: 1, total: 2, type: 'care' },
      { name: 'Light Housekeeping', used: 2, total: 4, type: 'home' }
    ],
    upcomingVisits: [
      { id: 3, caregiver: 'Wade Warren', service: 'Routine Checkup', date: 'Wed, July 22', time: '10:00 AM', status: 'scheduled' }
    ],
    recentActivities: [
      { id: 4, text: 'Dietary consultation notes updated', time: 'Yesterday', type: 'service' }
    ]
  }
};

const parentOptions = [
  { label: 'Eleanor Pena (Mother)', value: 'parent-1' },
  { label: 'Ralph Edwards (Father)', value: 'parent-2' }
];

const availableServices = [
  { label: 'Select a service...', value: '' },
  { label: 'Skilled Nursing Care', value: 'nursing' },
  { label: 'Physical Therapy', value: 'pt' },
  { label: 'Daily Living Assistance', value: 'dla' },
  { label: 'Routine Checkup', value: 'checkup' }
];

const DependentDashboardCom = () => {
  const [selectedParentId, setSelectedParentId] = useState('parent-1');
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);

  const activeData = mockParentsData[selectedParentId];

  return (
    <div className="flex flex-col gap-4 max-w-[1400px] mx-auto w-full pb-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 mb-1">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 font-heading tracking-tight mb-1 flex items-center gap-2">
            Family Overview
          </h1>
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-slate-500">Viewing records for:</span>
            <div className="w-56">
              <Select
                options={parentOptions}
                value={selectedParentId}
                onChange={(e) => setSelectedParentId(e.target.value)}
                className="h-8 text-xs py-1"
              />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex flex-col items-end">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Active Plan</span>
            <Badge variant="success" className="px-2 py-0.5 text-[10px] mt-0.5">
              <Shield size={10} className="mr-1 inline" /> {activeData.planName}
            </Badge>
          </div>
          <Button
            size="sm"
            leftIcon={<Plus size={14} strokeWidth={2.5} />}
            onClick={() => setIsRequestModalOpen(true)}
          >
            Request Service
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
            <Activity size={20} />
          </div>
          <div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Blood Pressure</div>
            <div className="text-lg font-black text-slate-800">{activeData.vitals.bloodPressure}</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
            <Heart size={20} />
          </div>
          <div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Heart Rate</div>
            <div className="text-lg font-black text-slate-800">{activeData.vitals.heartRate}</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <TrendingUp size={20} />
          </div>
          <div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Blood Oxygen (SpO2)</div>
            <div className="text-lg font-black text-slate-800">{activeData.vitals.spo2}</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <UserCheck size={20} />
          </div>
          <div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Vitals Status</div>
            <div className={`text-lg font-black flex items-center gap-1 ${activeData.vitals.status === 'Normal' ? 'text-emerald-600' : 'text-amber-600'}`}>
              {activeData.vitals.status}
              <ArrowUpRight size={14} strokeWidth={3} className={activeData.vitals.status === 'Normal' ? 'text-emerald-500' : 'text-amber-500'} />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col">
          <div className="mb-3">
            <h2 className="text-base font-bold text-slate-800">Service Balance & Usage</h2>
            <span className="text-xs font-medium text-slate-500">Allocated units utilized for {activeData.name}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 flex-1 justify-center content-start">
            {activeData.serviceUsage.map((svc: any, index: number) => (
              <div key={index} className="p-3 bg-slate-50 border border-slate-100 rounded-xl flex flex-col justify-between">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-slate-800">{svc.name}</span>
                    <span className="text-[10px] text-slate-400 font-medium capitalize mt-0.5 flex items-center gap-1">
                      {svc.type === 'care' ? <Heart size={10} className="text-primary" /> : <Home size={10} className="text-secondary" />}
                      {svc.type === 'care' ? 'Care Service' : 'Home Care Service'}
                    </span>
                  </div>
                  <div className="text-right text-xs font-bold text-slate-900">
                    {svc.used} <span className="text-slate-400 font-normal">/ {svc.total}</span>
                  </div>
                </div>
                <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${svc.type === 'care' ? 'bg-primary' : 'bg-secondary'}`}
                    style={{ width: `${(svc.used / svc.total) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col">
          <div className="mb-3">
            <h2 className="text-base font-bold text-slate-800">Assigned Care Team</h2>
            <span className="text-xs font-medium text-slate-500">Primary healthcare professionals</span>
          </div>

          <div className="flex-1 flex flex-col gap-2.5 justify-center">
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs shrink-0">
                  {activeData.assignedCoordinator.charAt(0)}
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-800">{activeData.assignedCoordinator}</div>
                  <div className="text-[10px] font-medium text-slate-500">Care Coordinator</div>
                </div>
              </div>
              <Badge variant="primary" className="text-[9px] py-0.5">SPOC</Badge>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-secondary/20 text-slate-800 flex items-center justify-center font-bold text-xs shrink-0">
                  {activeData.assignedCaregiver.charAt(0)}
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-800">{activeData.assignedCaregiver}</div>
                  <div className="text-[10px] font-medium text-slate-500">Active Caregiver</div>
                </div>
              </div>
              <Badge variant="secondary" className="text-[9px] py-0.5">On Duty</Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm flex flex-col">
          <div className="mb-4">
            <h2 className="text-base font-bold text-slate-800">Upcoming Visits</h2>
            <span className="text-xs font-medium text-slate-500">Scheduled activities for {activeData.name}</span>
          </div>

          <div className="space-y-2.5 flex-1 flex flex-col justify-center">
            {activeData.upcomingVisits.map((visit: any) => (
              <div key={visit.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 gap-2">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center text-slate-500 shrink-0 border border-slate-100">
                    <Clock size={16} className="text-primary" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-800">{visit.service}</div>
                    <div className="text-[10px] font-medium text-slate-500 flex items-center gap-1.5 mt-0.5">
                      <span>Caregiver: {visit.caregiver}</span>
                    </div>
                  </div>
                </div>
                <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-1">
                  <span className="text-xs font-bold text-slate-700">{visit.date}</span>
                  <span className="text-[10px] font-semibold text-primary">{visit.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm flex flex-col">
          <div className="mb-4">
            <h2 className="text-base font-bold text-slate-800">Recent Operational Log</h2>
            <span className="text-xs font-medium text-slate-500">System check-ins and compliance updates</span>
          </div>

          <div className="space-y-3 flex-1 flex flex-col justify-center">
            {activeData.recentActivities.map((activity: any, index: number) => (
              <div key={activity.id} className="relative pl-5 flex items-start gap-2">
                <div className="absolute left-0 top-1 w-2 h-2 rounded-full bg-emerald-500 ring-4 ring-emerald-50"></div>
                {index !== activeData.recentActivities.length - 1 && (
                  <div className="absolute left-[3px] top-4 w-0.5 h-full bg-slate-100"></div>
                )}
                <div className="flex-1 flex justify-between items-baseline gap-3">
                  <p className="text-xs font-semibold text-slate-700 leading-normal flex items-center gap-1.5">
                    {activity.type === 'vital' && <CheckCircle2 size={12} className="text-emerald-500 shrink-0" />}
                    {activity.type === 'medication' && <FileText size={12} className="text-primary shrink-0" />}
                    {activity.type === 'service' && <Calendar size={12} className="text-secondary shrink-0" />}
                    {activity.text}
                  </p>
                  <span className="text-[10px] font-bold text-slate-400 whitespace-nowrap">{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {isRequestModalOpen && (
        <>
          <div
            className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 transition-opacity"
            onClick={() => setIsRequestModalOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 z-50 w-full md:w-[500px] bg-white shadow-2xl transform transition-transform duration-300 flex flex-col">
            <div className="flex items-center justify-between p-5 border-b border-slate-100">
              <div>
                <h2 className="text-lg font-bold text-slate-900 tracking-tight">Request Service</h2>
                <p className="text-xs font-medium text-slate-500">Schedule a visit for your parent.</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsRequestModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 bg-slate-50 hover:bg-slate-100 rounded-full"
              >
                <X size={18} />
              </Button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-5 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-200 [&::-webkit-scrollbar-thumb]:rounded-full">

              <div className="bg-primary/5 rounded-xl p-4 border border-primary/10 flex flex-col gap-3">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Service Beneficiary</div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xs">
                    {activeData.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-800">{activeData.name}</div>
                    <div className="text-[10px] font-medium text-slate-500">{activeData.relation} · {activeData.planName}</div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <span className="w-5 h-5 rounded bg-primary/10 text-primary flex items-center justify-center text-[10px]">1</span>
                  Service Details
                </h3>
                <div className="grid grid-cols-1 gap-3">
                  <Select
                    label="Target Service"
                    options={availableServices}
                  />
                </div>
                <div className="grid grid-cols-2 gap-3 mt-3">
                  <div className="flex flex-col gap-1.5 w-full">
                    <label className="text-xs font-semibold text-slate-700">Preferred Date</label>
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
                    <label className="text-xs font-semibold text-slate-700">Preferred Time</label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                        <Clock size={14} />
                      </div>
                      <input
                        type="time"
                        className="w-full bg-slate-50 border border-transparent focus:bg-white focus:border-primary/30 rounded-xl focus:ring-4 focus:ring-primary/10 text-xs font-medium text-slate-800 p-2.5 pl-9 h-9"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full h-px bg-slate-100"></div>

              <div className="space-y-3">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <span className="w-5 h-5 rounded bg-primary/10 text-primary flex items-center justify-center text-[10px]">2</span>
                  Additional Notes
                </h3>
                <div className="flex flex-col gap-1.5 w-full">
                  <div className="relative">
                    <div className="absolute left-3 top-3 text-slate-400 pointer-events-none">
                      <FileText size={14} />
                    </div>
                    <textarea
                      className="w-full bg-slate-50 border border-transparent focus:bg-white focus:border-primary/30 rounded-xl focus:ring-4 focus:ring-primary/10 text-xs font-medium text-slate-800 placeholder-slate-400 p-2.5 pl-9 resize-none h-20"
                      placeholder={`Provide any specific details or requirements for ${activeData.name}...`}
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-end gap-3">
              <Button variant="ghost" size="sm" onClick={() => setIsRequestModalOpen(false)}>
                Cancel
              </Button>
              <Button size="sm" leftIcon={<Check size={16} />}>
                Submit Request
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DependentDashboardCom;