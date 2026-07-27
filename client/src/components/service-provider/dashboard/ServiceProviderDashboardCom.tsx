import {
  Users,
  ClipboardList,
  TrendingUp,
  IndianRupee,
  Clock,
  CheckCircle2,
  MapPin,
  ArrowUpRight,
  Building2,
  Calendar,
  Star,
  Activity
} from 'lucide-react';
import { Badge } from '../../ui/Badge';
import { Button } from '../../ui/Button';

const mockProviderData = {
  providerName: "Apex Healthcare",
  status: "Active Partner",
  stats: {
    activeCaregivers: 42,
    pendingRequests: 12,
    completionRate: "98.5%",
    monthlyRevenue: "4,25,000"
  },
  recentRequests: [
    { id: 'REQ-101', patient: 'Eleanor Pena', service: 'Skilled Nursing Care', date: 'Jul 21, 2026', location: 'Koramangala, Bengaluru', status: 'pending' },
    { id: 'REQ-102', patient: 'Ralph Edwards', service: 'Physical Therapy', date: 'Jul 22, 2026', location: 'Indiranagar, Bengaluru', status: 'assigned' },
    { id: 'REQ-103', patient: 'Jane Cooper', service: 'Post-Op Wound Care', date: 'Jul 22, 2026', location: 'Whitefield, Bengaluru', status: 'pending' },
    { id: 'REQ-104', patient: 'Wade Warren', service: 'Overnight Monitoring', date: 'Jul 23, 2026', location: 'Jayanagar, Bengaluru', status: 'assigned' }
  ],
  caregiverStatus: [
    { id: 'CG-1', name: 'Sarah Jenkins', role: 'Registered Nurse', status: 'on-duty', rating: 4.9 },
    { id: 'CG-2', name: 'Michael Chen', role: 'Physical Therapist', status: 'available', rating: 4.8 },
    { id: 'CG-3', name: 'Emily Davis', role: 'Care Aide', status: 'on-duty', rating: 4.7 },
    { id: 'CG-4', name: 'Robert Wilson', role: 'Registered Nurse', status: 'offline', rating: 4.9 }
  ],
  todaysDispatch: [
    { id: 'DSP-1', caregiver: 'Sarah Jenkins', patient: 'Alice Smith', time: '09:00 AM', type: 'Nursing', status: 'in-progress' },
    { id: 'DSP-2', caregiver: 'Emily Davis', patient: 'John Doe', time: '11:30 AM', type: 'Daily Care', status: 'completed' },
    { id: 'DSP-3', caregiver: 'Michael Chen', patient: 'Robert Fox', time: '02:00 PM', type: 'Therapy', status: 'scheduled' }
  ]
};

const ServiceProviderDashboardCom = () => {
  return (
    <div className="flex flex-col gap-4 max-w-[1400px] mx-auto w-full pb-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 mb-1">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 font-heading tracking-tight mb-0 flex items-center gap-2">
            {mockProviderData.providerName} Overview
          </h1>
          <p className="text-xs font-medium text-slate-500 mt-1">
            Monitor your service requests, caregiver dispatch, and operational metrics.
          </p>
        </div>
        <Badge variant="success" className="px-3 py-1 text-xs">
          <CheckCircle2 size={12} className="mr-1 inline" /> {mockProviderData.status}
        </Badge>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <Users size={20} />
          </div>
          <div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Active Caregivers</div>
            <div className="text-lg font-black text-slate-800 flex items-center gap-1">
              {mockProviderData.stats.activeCaregivers}
              <span className="text-[10px] font-bold text-emerald-500 flex items-center bg-emerald-50 px-1.5 py-0.5 rounded">
                +2 <ArrowUpRight size={10} />
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <ClipboardList size={20} />
          </div>
          <div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Pending Requests</div>
            <div className="text-lg font-black text-slate-800">{mockProviderData.stats.pendingRequests}</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <TrendingUp size={20} />
          </div>
          <div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Completion Rate</div>
            <div className="text-lg font-black text-slate-800">{mockProviderData.stats.completionRate}</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
            <IndianRupee size={20} />
          </div>
          <div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">MTD Revenue</div>
            <div className="text-lg font-black text-slate-800">{mockProviderData.stats.monthlyRevenue}</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-base font-bold text-slate-800">Recent Service Requests</h2>
              <span className="text-xs font-medium text-slate-500">Incoming bookings requiring caregiver assignment</span>
            </div>
            <Button variant="outline" size="sm" className="h-7 text-xs px-2.5">View All</Button>
          </div>

          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100">
                  <th className="px-3 py-2 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Patient & Service</th>
                  <th className="px-3 py-2 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Location</th>
                  <th className="px-3 py-2 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Schedule</th>
                  <th className="px-3 py-2 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {mockProviderData.recentRequests.map((req) => (
                  <tr key={req.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-3 py-2.5">
                      <div className="text-xs font-bold text-slate-900">{req.patient}</div>
                      <div className="text-[10px] font-medium text-primary">{req.service}</div>
                    </td>
                    <td className="px-3 py-2.5">
                      <div className="flex items-center gap-1 text-[10px] font-medium text-slate-600">
                        <MapPin size={10} className="text-slate-400" />
                        {req.location}
                      </div>
                    </td>
                    <td className="px-3 py-2.5">
                      <div className="flex items-center gap-1 text-[10px] font-medium text-slate-600">
                        <Calendar size={10} className="text-slate-400" />
                        {req.date}
                      </div>
                    </td>
                    <td className="px-3 py-2.5">
                      {req.status === 'pending' ? (
                        <Badge variant="warning" className="text-[9px] px-2 py-0.5">Unassigned</Badge>
                      ) : (
                        <Badge variant="success" className="text-[9px] px-2 py-0.5">Assigned</Badge>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col">
          <div className="mb-4">
            <h2 className="text-base font-bold text-slate-800">Caregiver Availability</h2>
            <span className="text-xs font-medium text-slate-500">Current status of top staff</span>
          </div>

          <div className="flex-1 flex flex-col gap-2.5">
            {mockProviderData.caregiverStatus.map((cg) => (
              <div key={cg.id} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="relative">
                    <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs shrink-0">
                      {cg.name.charAt(0)}
                    </div>
                    <div className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-white ${cg.status === 'on-duty' ? 'bg-blue-500' : cg.status === 'available' ? 'bg-emerald-500' : 'bg-slate-300'
                      }`}></div>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-800">{cg.name}</div>
                    <div className="text-[10px] font-medium text-slate-500">{cg.role}</div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <div className="flex items-center gap-0.5 text-[10px] font-bold text-amber-500">
                    <Star size={10} className="fill-amber-500" /> {cg.rating}
                  </div>
                  <span className="text-[9px] font-semibold uppercase tracking-wider text-slate-400">
                    {cg.status.replace('-', ' ')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm flex flex-col">
        <div className="mb-4 flex justify-between items-center">
          <div>
            <h2 className="text-base font-bold text-slate-800">Today's Dispatch Log</h2>
            <span className="text-xs font-medium text-slate-500">Live tracking of ongoing field operations</span>
          </div>
          <Button variant="secondary" size="sm" className="h-7 text-xs px-2.5">View Full Schedule</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {mockProviderData.todaysDispatch.map((dispatch) => (
            <div key={dispatch.id} className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex flex-col gap-3">
              <div className="flex justify-between items-start border-b border-slate-100 pb-2.5">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-white shadow-sm flex items-center justify-center text-primary border border-slate-100 shrink-0">
                    <Activity size={14} />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-800">{dispatch.type}</div>
                    <div className="text-[10px] font-medium text-slate-500 flex items-center gap-1">
                      <Clock size={10} /> {dispatch.time}
                    </div>
                  </div>
                </div>
                {dispatch.status === 'in-progress' && <Badge variant="primary" className="text-[9px] px-1.5">Live</Badge>}
                {dispatch.status === 'completed' && <Badge variant="success" className="text-[9px] px-1.5">Done</Badge>}
                {dispatch.status === 'scheduled' && <Badge variant="secondary" className="text-[9px] px-1.5">Next</Badge>}
              </div>
              <div className="flex justify-between items-center text-[11px]">
                <div className="flex flex-col">
                  <span className="font-semibold text-slate-700">{dispatch.caregiver}</span>
                  <span className="text-slate-400 font-medium">Caregiver</span>
                </div>
                <ArrowUpRight size={12} className="text-slate-300" />
                <div className="flex flex-col text-right">
                  <span className="font-semibold text-slate-700">{dispatch.patient}</span>
                  <span className="text-slate-400 font-medium">Patient</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceProviderDashboardCom;