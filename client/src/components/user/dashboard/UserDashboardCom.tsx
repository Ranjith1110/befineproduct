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
  CheckCircle2
} from 'lucide-react';
import { Badge } from '../../ui/Badge';

const mockClientData = {
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
    { name: 'Physical Therapy Session', used: 4, total: 8, type: 'care' },
    { name: 'Daily Living Assistance', used: 6, total: 12, type: 'home' },
    { name: 'Light Housekeeping', used: 1, total: 2, type: 'home' }
  ],
  upcomingVisits: [
    { id: 1, caregiver: 'Jane Cooper', service: 'Skilled Nursing Care', date: 'Today, July 18', time: '09:00 AM', status: 'confirmed' },
    { id: 2, caregiver: 'Wade Warren', service: 'Physical Therapy Session', date: 'Mon, July 20', time: '11:30 AM', status: 'scheduled' }
  ],
  recentActivities: [
    { id: 1, text: 'Morning vitals recorded successfully', time: '2 hours ago', type: 'vital' },
    { id: 2, text: 'Medication adherence checklist completed', time: '4 hours ago', type: 'medication' },
    { id: 3, text: 'Physical Therapy home assignment validated', time: 'Yesterday', type: 'service' }
  ]
};

const DashboardCom = () => {
  return (
    <div className="flex flex-col gap-4 max-w-[1400px] mx-auto w-full pb-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 mb-1">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 font-heading tracking-tight mb-0">
            Welcome Back, Eleanor
          </h1>
          <p className="text-xs font-medium text-slate-500">
            Active Plan: <span className="font-semibold text-primary">{mockClientData.planName}</span>
          </p>
        </div>
        <Badge variant="success" className="px-3 py-1 text-xs">
          <Shield size={12} className="mr-1 inline" /> Covered Plan Active
        </Badge>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
            <Activity size={20} />
          </div>
          <div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Blood Pressure</div>
            <div className="text-lg font-black text-slate-800">{mockClientData.vitals.bloodPressure}</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
            <Heart size={20} />
          </div>
          <div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Heart Rate</div>
            <div className="text-lg font-black text-slate-800">{mockClientData.vitals.heartRate}</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <TrendingUp size={20} />
          </div>
          <div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Blood Oxygen (SpO2)</div>
            <div className="text-lg font-black text-slate-800">{mockClientData.vitals.spo2}</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <UserCheck size={20} />
          </div>
          <div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Vitals Status</div>
            <div className="text-lg font-black text-emerald-600 flex items-center gap-1">
              {mockClientData.vitals.status}
              <ArrowUpRight size={14} strokeWidth={3} className="text-emerald-500" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col">
          <div className="mb-3">
            <h2 className="text-base font-bold text-slate-800">Service Balance & Usage</h2>
            <span className="text-xs font-medium text-slate-500">Allocated units utilized this billing cycle</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 flex-1 justify-center">
            {mockClientData.serviceUsage.map((svc, index) => (
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
                  {mockClientData.assignedCoordinator.charAt(0)}
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-800">{mockClientData.assignedCoordinator}</div>
                  <div className="text-[10px] font-medium text-slate-500">Care Coordinator</div>
                </div>
              </div>
              <Badge variant="primary" className="text-[9px] py-0.5">SPOC</Badge>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-secondary/20 text-slate-800 flex items-center justify-center font-bold text-xs shrink-0">
                  {mockClientData.assignedCaregiver.charAt(0)}
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-800">{mockClientData.assignedCaregiver}</div>
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
            <span className="text-xs font-medium text-slate-500">Scheduled home health activities</span>
          </div>

          <div className="space-y-2.5 flex-1 flex flex-col justify-center">
            {mockClientData.upcomingVisits.map((visit) => (
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
            {mockClientData.recentActivities.map((activity, index) => (
              <div key={activity.id} className="relative pl-5 flex items-start gap-2">
                <div className="absolute left-0 top-1 w-2 h-2 rounded-full bg-emerald-500 ring-4 ring-emerald-50"></div>
                {index !== mockClientData.recentActivities.length - 1 && (
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
    </div>
  );
};

export default DashboardCom;