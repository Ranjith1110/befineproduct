import {
  Users,
  ClipboardList,
  Building2,
  AlertTriangle,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  ShieldAlert,
  Star,
  TrendingUp
} from 'lucide-react';
import { Badge } from '../../ui/Badge';
import { Button } from '../../ui/Button';

const mockManagerData = {
  managerName: "Michael Chang",
  status: "System Active",
  stats: {
    totalPatients: "1,248",
    activeProviders: 24,
    pendingRequests: 156,
    criticalAlerts: 8
  },
  recentRequests: [
    { id: 'REQ-8042', patient: 'Eleanor Pena', service: 'Skilled Nursing Care', provider: 'Apex Healthcare', status: 'assigned', time: '10 mins ago' },
    { id: 'REQ-8043', patient: 'Ralph Edwards', service: 'Physical Therapy', provider: 'Pending Assignment', status: 'pending', time: '25 mins ago' },
    { id: 'REQ-8044', patient: 'Alice Smith', service: 'Post-Op Wound Care', provider: 'Guardian Home Care', status: 'in-progress', time: '1 hour ago' },
    { id: 'REQ-8045', patient: 'Robert Fox', service: 'Daily Living Assistance', provider: 'Pending Assignment', status: 'pending', time: '2 hours ago' }
  ],
  providerPerformance: [
    { id: 'PRV-1', name: 'Apex Healthcare', activeCaregivers: 42, rating: 4.9, status: 'optimal' },
    { id: 'PRV-2', name: 'Guardian Home Care', activeCaregivers: 28, rating: 4.7, status: 'optimal' },
    { id: 'PRV-3', name: 'Serenity Senior Solutions', activeCaregivers: 15, rating: 4.5, status: 'review' },
    { id: 'PRV-4', name: 'Vitality Medical Group', activeCaregivers: 34, rating: 4.8, status: 'optimal' }
  ],
  criticalAlerts: [
    { id: 'ALT-1', patient: 'Jane Cooper', issue: 'Missed vital check (2 hours overdue)', provider: 'Apex Healthcare', severity: 'high' },
    { id: 'ALT-2', patient: 'Wade Warren', issue: 'Caregiver reported no-show at location', provider: 'Serenity Senior', severity: 'critical' },
    { id: 'ALT-3', patient: 'Esther Howard', issue: 'Abnormal BP reading escalated', provider: 'Vitality Medical', severity: 'high' }
  ]
};

const CareManagerDashboardCom = () => {
  return (
    <div className="flex flex-col gap-4 max-w-[1400px] mx-auto w-full pb-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 mb-1">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 font-heading tracking-tight mb-0 flex items-center gap-2">
            Care Operations Dashboard
          </h1>
          <p className="text-xs font-medium text-slate-500 mt-1">
            Monitor global metrics, service provider performance, and patient escalations.
          </p>
        </div>
        <Badge variant="success" className="px-3 py-1 text-xs">
          <CheckCircle2 size={12} className="mr-1.5 inline" /> {mockManagerData.status}
        </Badge>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <Users size={20} />
          </div>
          <div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Total Active Patients</div>
            <div className="text-lg font-black text-slate-800 flex items-center gap-1">
              {mockManagerData.stats.totalPatients}
              <span className="text-[10px] font-bold text-emerald-500 flex items-center bg-emerald-50 px-1.5 py-0.5 rounded ml-1">
                +12% <TrendingUp size={10} className="ml-0.5" />
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
            <Building2 size={20} />
          </div>
          <div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Active Providers</div>
            <div className="text-lg font-black text-slate-800">{mockManagerData.stats.activeProviders}</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <ClipboardList size={20} />
          </div>
          <div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Pending Requests</div>
            <div className="text-lg font-black text-slate-800">{mockManagerData.stats.pendingRequests}</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
            <AlertTriangle size={20} />
          </div>
          <div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Critical Escalations</div>
            <div className="text-lg font-black text-slate-800 flex items-center gap-1">
              {mockManagerData.stats.criticalAlerts}
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse ml-1"></span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-base font-bold text-slate-800">Global Service Requests</h2>
              <span className="text-xs font-medium text-slate-500">Live feed of incoming patient requests and assignments</span>
            </div>
            <Button variant="outline" size="sm" className="h-7 text-xs px-2.5">View All</Button>
          </div>

          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100">
                  <th className="px-3 py-2 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Patient & Service</th>
                  <th className="px-3 py-2 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Assigned Provider</th>
                  <th className="px-3 py-2 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Time</th>
                  <th className="px-3 py-2 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {mockManagerData.recentRequests.map((req) => (
                  <tr key={req.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-3 py-2.5">
                      <div className="text-xs font-bold text-slate-900">{req.patient}</div>
                      <div className="text-[10px] font-medium text-primary">{req.service}</div>
                    </td>
                    <td className="px-3 py-2.5">
                      <div className={`text-[10px] font-semibold ${req.provider.includes('Pending') ? 'text-amber-600' : 'text-slate-700'}`}>
                        {req.provider}
                      </div>
                    </td>
                    <td className="px-3 py-2.5">
                      <div className="flex items-center gap-1 text-[10px] font-medium text-slate-500">
                        <Clock size={10} className="text-slate-400" />
                        {req.time}
                      </div>
                    </td>
                    <td className="px-3 py-2.5">
                      {req.status === 'pending' && <Badge variant="warning" className="text-[9px] px-2 py-0.5">Unassigned</Badge>}
                      {req.status === 'assigned' && <Badge variant="primary" className="text-[9px] px-2 py-0.5">Assigned</Badge>}
                      {req.status === 'in-progress' && <Badge variant="success" className="text-[9px] px-2 py-0.5">In Progress</Badge>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col">
          <div className="mb-4">
            <h2 className="text-base font-bold text-slate-800">Provider Performance</h2>
            <span className="text-xs font-medium text-slate-500">Top active agencies by rating</span>
          </div>

          <div className="flex-1 flex flex-col gap-2.5">
            {mockManagerData.providerPerformance.map((provider) => (
              <div key={provider.id} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-xs shrink-0 border border-indigo-100">
                    <Building2 size={14} />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-800 truncate max-w-[120px]">{provider.name}</div>
                    <div className="text-[10px] font-medium text-slate-500">{provider.activeCaregivers} Active Staff</div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <div className="flex items-center gap-0.5 text-[10px] font-bold text-amber-500">
                    <Star size={10} className="fill-amber-500" /> {provider.rating}
                  </div>
                  {provider.status === 'optimal' ? (
                    <span className="text-[9px] font-semibold text-emerald-600 uppercase tracking-wider">Optimal</span>
                  ) : (
                    <span className="text-[9px] font-semibold text-amber-600 uppercase tracking-wider">Review</span>
                  )}
                </div>
              </div>
            ))}
          </div>
          <Button variant="secondary" size="sm" className="w-full mt-3 h-8 text-xs">Manage Providers</Button>
        </div>
      </div>

      <div className="bg-rose-50 border border-rose-100 p-5 rounded-xl shadow-sm flex flex-col">
        <div className="mb-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <ShieldAlert size={18} className="text-rose-600" />
            <div>
              <h2 className="text-base font-bold text-rose-900">Action Required: Escalations</h2>
              <span className="text-xs font-medium text-rose-700">Critical incidents requiring immediate manager intervention</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {mockManagerData.criticalAlerts.map((alert) => (
            <div key={alert.id} className="bg-white p-3 rounded-xl border border-rose-200 shadow-sm flex flex-col gap-3">
              <div className="flex justify-between items-start border-b border-rose-50 pb-2.5">
                <div>
                  <div className="text-xs font-bold text-slate-900">{alert.patient}</div>
                  <div className="text-[10px] font-semibold text-slate-500 mt-0.5 flex items-center gap-1">
                    <Building2 size={10} /> {alert.provider}
                  </div>
                </div>
                {alert.severity === 'critical' ? (
                  <Badge variant="danger" className="text-[9px] px-1.5 animate-pulse">Critical</Badge>
                ) : (
                  <Badge variant="warning" className="text-[9px] px-1.5 bg-rose-100 text-rose-700 border-transparent">High Priority</Badge>
                )}
              </div>
              <div className="flex-1">
                <p className="text-[11px] font-medium text-rose-800 leading-tight">{alert.issue}</p>
              </div>
              <div className="pt-2 flex gap-2">
                <Button size="sm" className="flex-1 h-7 text-[10px] bg-rose-600 hover:bg-rose-700">Resolve</Button>
                <Button variant="outline" size="sm" className="h-7 px-2 border-rose-200 text-rose-700 hover:bg-rose-50">
                  <ArrowUpRight size={14} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CareManagerDashboardCom;