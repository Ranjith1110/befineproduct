import { useState } from 'react';
import {
    Search,
    Check,
    Monitor,
    Smartphone,
    LayoutDashboard,
    Calendar,
    Clock,
    MapPin,
    User,
    FileText,
    MessageSquare,
    Bell,
    MoreVertical,
    Reply
} from 'lucide-react';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';

const mockNotifications = [
    {
        id: 'NOT-001',
        type: 'booking_request',
        title: 'New Booking Request',
        description: 'Eleanor Pena requested a Caregiver for Routine Checkup.',
        portal: 'app',
        time: '10 mins ago',
        isUnread: true,
        details: {
            client: 'Eleanor Pena',
            service: 'Routine Checkup - Senior Care',
            date: 'July 28, 2026',
            time: '09:00 AM - 01:00 PM',
            location: '123 Meadow Lane, Springfield',
            notes: 'Requires assistance with mobility and light meal prep.'
        }
    },
    {
        id: 'NOT-002',
        type: 'service_request',
        title: 'Service Modification',
        description: 'Serenity Senior Solutions requested to add Physical Therapy.',
        portal: 'web',
        time: '1 hour ago',
        isUnread: true,
        details: {
            provider: 'Serenity Senior Solutions',
            request: 'Add New Service Category',
            service: 'Physical Therapy (In-home)',
            documents: ['Certification_PT_2026.pdf', 'Service_Agreement_Draft.docx']
        }
    },
    {
        id: 'NOT-003',
        type: 'message',
        title: 'New Message from Caregiver',
        description: 'Jane Cooper: "I have arrived at the client\'s location safely."',
        portal: 'app',
        time: '2 hours ago',
        isUnread: false,
        details: {
            sender: 'Jane Cooper',
            role: 'Active Caregiver',
            message: 'Good morning, just checking in to let you know I have arrived at Eleanor\'s location safely and we are starting the morning routine. No issues to report.'
        }
    },
    {
        id: 'NOT-004',
        type: 'system_alert',
        title: 'Compliance Document Expiring',
        description: 'Guardian Home Care has a license expiring in 15 days.',
        portal: 'dashboard',
        time: 'Yesterday',
        isUnread: false,
        details: {
            provider: 'Guardian Home Care',
            document: 'State Operating License',
            expiry: 'August 12, 2026',
            actionRequired: 'Request renewed license upload from provider.'
        }
    }
];

const NotificationMessagesCom = () => {
    const [activeTab, setActiveTab] = useState<'all' | 'requests' | 'messages'>('all');
    const [selectedId, setSelectedId] = useState<string>('NOT-001');

    const selectedNotification = mockNotifications.find(n => n.id === selectedId);

    const getPortalIcon = (portal: string) => {
        switch (portal) {
            case 'web': return <div className="flex items-center gap-1 px-2 py-0.5 bg-blue-50 text-blue-600 rounded-md text-[9px] font-bold uppercase tracking-wider"><Monitor size={10} /> Web</div>;
            case 'app': return <div className="flex items-center gap-1 px-2 py-0.5 bg-purple-50 text-purple-600 rounded-md text-[9px] font-bold uppercase tracking-wider"><Smartphone size={10} /> App</div>;
            case 'dashboard': return <div className="flex items-center gap-1 px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md text-[9px] font-bold uppercase tracking-wider"><LayoutDashboard size={10} /> Dashboard</div>;
            default: return null;
        }
    };

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'booking_request': return <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0"><Calendar size={14} /></div>;
            case 'service_request': return <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0"><FileText size={14} /></div>;
            case 'message': return <div className="w-8 h-8 rounded-full bg-secondary/20 text-primary flex items-center justify-center shrink-0"><MessageSquare size={14} /></div>;
            case 'system_alert': return <div className="w-8 h-8 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center shrink-0"><Bell size={14} /></div>;
            default: return null;
        }
    };

    return (
        <div className="flex flex-col gap-4 max-w-[1400px] mx-auto w-full h-[calc(100vh-100px)] pb-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 font-heading tracking-tight mb-0">
                        Inbox & Notifications
                    </h1>
                    <p className="text-xs font-medium text-slate-500">
                        Manage cross-portal requests, alerts, and direct messages.
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" leftIcon={<Check size={16} />}>
                        Mark All as Read
                    </Button>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-4 h-full overflow-hidden">
                <div className="w-full lg:w-[380px] bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col overflow-hidden shrink-0">
                    <div className="p-4 border-b border-slate-100 flex flex-col gap-3 bg-slate-50/30">
                        <Input
                            placeholder="Search requests or messages..."
                            leftIcon={<Search size={16} />}
                            className="bg-white text-sm h-9"
                        />
                        <div className="flex bg-slate-100 p-1 rounded-lg">
                            {(['all', 'requests', 'messages'] as const).map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`flex-1 py-1 rounded-md text-xs font-semibold capitalize transition-all ${activeTab === tab
                                        ? 'bg-white text-primary shadow-sm'
                                        : 'text-slate-500 hover:text-slate-700'
                                        }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-200 [&::-webkit-scrollbar-thumb]:rounded-full divide-y divide-slate-50">
                        {mockNotifications.map((notif) => (
                            <div
                                key={notif.id}
                                onClick={() => setSelectedId(notif.id)}
                                className={`p-4 flex gap-3 cursor-pointer transition-all hover:bg-slate-50 relative ${selectedId === notif.id ? 'bg-primary/5' : ''}`}
                            >
                                {selectedId === notif.id && (
                                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r-full"></div>
                                )}
                                {notif.isUnread && (
                                    <div className="absolute top-4 right-4 w-2 h-2 bg-primary rounded-full ring-4 ring-primary/10"></div>
                                )}

                                {getTypeIcon(notif.type)}

                                <div className="flex-1 min-w-0 pr-2">
                                    <div className="flex items-center justify-between mb-0.5">
                                        <h4 className={`text-xs truncate pr-2 ${notif.isUnread ? 'font-bold text-slate-900' : 'font-semibold text-slate-700'}`}>
                                            {notif.title}
                                        </h4>
                                    </div>
                                    <p className="text-[11px] font-medium text-slate-500 line-clamp-2 mb-2 leading-relaxed">
                                        {notif.description}
                                    </p>
                                    <div className="flex items-center justify-between">
                                        {getPortalIcon(notif.portal)}
                                        <span className="text-[10px] font-bold text-slate-400">{notif.time}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex-1 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col overflow-hidden relative">
                    {selectedNotification ? (
                        <>
                            <div className="p-5 border-b border-slate-100 flex items-start justify-between bg-slate-50/50">
                                <div className="flex items-center gap-3">
                                    {getTypeIcon(selectedNotification.type)}
                                    <div>
                                        <div className="flex items-center gap-2 mb-0.5">
                                            <h2 className="text-lg font-bold text-slate-900 tracking-tight">
                                                {selectedNotification.title}
                                            </h2>
                                            {getPortalIcon(selectedNotification.portal)}
                                        </div>
                                        <p className="text-xs font-medium text-slate-500 flex items-center gap-1.5">
                                            <span>ID: {selectedNotification.id}</span>
                                            <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                                            <span>Received {selectedNotification.time}</span>
                                        </p>
                                    </div>
                                </div>
                                <button className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors">
                                    <MoreVertical size={16} />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto p-5 md:p-8 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-200 [&::-webkit-scrollbar-thumb]:rounded-full">

                                {selectedNotification.type === 'booking_request' && selectedNotification.details && (
                                    <div className="max-w-2xl mx-auto space-y-5">
                                        <div className="bg-primary/5 rounded-xl p-5 border border-primary/10">
                                            <h3 className="text-primary font-bold mb-3 flex items-center gap-2 text-sm">
                                                <User size={16} /> Client Information
                                            </h3>
                                            <div className="grid grid-cols-2 gap-y-3">
                                                <div>
                                                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Client Name</div>
                                                    <div className="text-xs font-semibold text-slate-800">{selectedNotification.details.client}</div>
                                                </div>
                                                <div>
                                                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Service Type</div>
                                                    <div className="text-xs font-semibold text-slate-800">{selectedNotification.details.service}</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
                                            <h3 className="text-slate-800 font-bold mb-4 flex items-center gap-2 text-sm">
                                                <Calendar size={16} className="text-secondary" /> Schedule & Location
                                            </h3>
                                            <div className="space-y-4">
                                                <div className="flex items-start gap-3">
                                                    <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-500 shrink-0">
                                                        <Clock size={14} />
                                                    </div>
                                                    <div>
                                                        <div className="text-xs font-bold text-slate-800">{selectedNotification.details.date}</div>
                                                        <div className="text-[10px] font-medium text-slate-500">{selectedNotification.details.time}</div>
                                                    </div>
                                                </div>
                                                <div className="flex items-start gap-3">
                                                    <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-500 shrink-0">
                                                        <MapPin size={14} />
                                                    </div>
                                                    <div>
                                                        <div className="text-xs font-bold text-slate-800">Service Location</div>
                                                        <div className="text-[10px] font-medium text-slate-500">{selectedNotification.details.location}</div>
                                                    </div>
                                                </div>
                                                <div className="flex items-start gap-3">
                                                    <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-500 shrink-0">
                                                        <FileText size={14} />
                                                    </div>
                                                    <div>
                                                        <div className="text-xs font-bold text-slate-800">Special Notes</div>
                                                        <div className="text-[10px] font-medium text-slate-500">{selectedNotification.details.notes}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {selectedNotification.type === 'service_request' && selectedNotification.details && (
                                    <div className="max-w-2xl mx-auto space-y-5">
                                        <div className="bg-primary/5 rounded-xl p-5 border border-primary/10">
                                            <h3 className="text-primary font-bold mb-3 flex items-center gap-2 text-sm">
                                                <FileText size={16} /> Request Details
                                            </h3>
                                            <div className="grid grid-cols-2 gap-y-3">
                                                <div>
                                                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Provider</div>
                                                    <div className="text-xs font-semibold text-slate-800">{selectedNotification.details.provider}</div>
                                                </div>
                                                <div>
                                                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Requested Action</div>
                                                    <div className="text-xs font-semibold text-slate-800">{selectedNotification.details.request}</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
                                            <h3 className="text-slate-800 font-bold mb-4 flex items-center gap-2 text-sm">
                                                <FileText size={16} className="text-secondary" /> Documents & Services
                                            </h3>
                                            <div className="space-y-4">
                                                <div className="flex items-start gap-3">
                                                    <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-500 shrink-0">
                                                        <FileText size={14} />
                                                    </div>
                                                    <div>
                                                        <div className="text-xs font-bold text-slate-800">Target Service</div>
                                                        <div className="text-[10px] font-medium text-slate-500">{selectedNotification.details.service}</div>
                                                    </div>
                                                </div>
                                                <div className="flex items-start gap-3">
                                                    <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-500 shrink-0">
                                                        <FileText size={14} />
                                                    </div>
                                                    <div>
                                                        <div className="text-xs font-bold text-slate-800">Attached Documents</div>
                                                        <div className="flex flex-col gap-1 mt-1">
                                                            {selectedNotification.details.documents?.map((doc, idx) => (
                                                                <span key={idx} className="text-[10px] font-medium text-primary bg-primary/5 px-2 py-1 rounded w-fit">{doc}</span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {selectedNotification.type === 'system_alert' && selectedNotification.details && (
                                    <div className="max-w-2xl mx-auto space-y-5">
                                        <div className="bg-rose-50 rounded-xl p-5 border border-rose-100">
                                            <h3 className="text-rose-600 font-bold mb-3 flex items-center gap-2 text-sm">
                                                <Bell size={16} /> Alert Details
                                            </h3>
                                            <div className="grid grid-cols-2 gap-y-3">
                                                <div>
                                                    <div className="text-[10px] font-bold text-rose-400 uppercase tracking-wider mb-0.5">Provider</div>
                                                    <div className="text-xs font-semibold text-slate-800">{selectedNotification.details.provider}</div>
                                                </div>
                                                <div>
                                                    <div className="text-[10px] font-bold text-rose-400 uppercase tracking-wider mb-0.5">Action Required</div>
                                                    <div className="text-xs font-semibold text-slate-800">{selectedNotification.details.actionRequired}</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
                                            <div className="flex items-start gap-3">
                                                <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-500 shrink-0">
                                                    <Calendar size={14} />
                                                </div>
                                                <div>
                                                    <div className="text-xs font-bold text-slate-800">Expiring Document</div>
                                                    <div className="text-[10px] font-medium text-slate-500">{selectedNotification.details.document} - Due {selectedNotification.details.expiry}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {selectedNotification.type === 'message' && selectedNotification.details && (
                                    <div className="max-w-2xl mx-auto flex flex-col h-full justify-end min-h-[300px]">
                                        <div className="flex items-start gap-3 mb-4">
                                            <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center font-bold shrink-0 text-xs">
                                                {selectedNotification.details.sender?.charAt(0)}
                                            </div>
                                            <div className="bg-slate-100 rounded-xl rounded-tl-sm p-3 text-xs font-medium text-slate-700 max-w-[80%] leading-relaxed">
                                                {selectedNotification.details.message}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="p-4 border-t border-slate-100 bg-white">
                                {selectedNotification.type === 'booking_request' && (
                                    <div className="flex items-center justify-end gap-2 max-w-2xl mx-auto">
                                        <Button variant="ghost" size="sm" className="text-rose-500 hover:bg-rose-50 hover:text-rose-600">
                                            Decline Request
                                        </Button>
                                        <Button variant="secondary" size="sm">
                                            Modify Schedule
                                        </Button>
                                        <Button size="sm" leftIcon={<Check size={16} />}>
                                            Approve Booking
                                        </Button>
                                    </div>
                                )}
                                {selectedNotification.type === 'service_request' && (
                                    <div className="flex items-center justify-end gap-2 max-w-2xl mx-auto">
                                        <Button variant="ghost" size="sm" className="text-rose-500 hover:bg-rose-50 hover:text-rose-600">
                                            Reject Modification
                                        </Button>
                                        <Button size="sm" leftIcon={<Check size={16} />}>
                                            Approve Request
                                        </Button>
                                    </div>
                                )}

                                {selectedNotification.type === 'message' && (
                                    <div className="flex items-center gap-2 max-w-2xl mx-auto">
                                        <Input
                                            placeholder="Type your reply..."
                                            className="bg-slate-50 border-transparent h-9 text-sm"
                                        />
                                        <Button size="sm" leftIcon={<Reply size={16} />}>
                                            Reply
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center text-slate-400">
                            <MessageSquare size={40} className="mb-3 opacity-20" />
                            <h3 className="text-base font-bold text-slate-600">Select an item</h3>
                            <p className="text-xs font-medium">Choose a notification or message to view details.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NotificationMessagesCom;