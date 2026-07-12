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
            case 'web': return <div className="flex items-center gap-1.5 px-2.5 py-1 bg-blue-50 text-blue-600 rounded-lg text-[10px] font-bold uppercase tracking-wider"><Monitor size={12} /> Web</div>;
            case 'app': return <div className="flex items-center gap-1.5 px-2.5 py-1 bg-purple-50 text-purple-600 rounded-lg text-[10px] font-bold uppercase tracking-wider"><Smartphone size={12} /> App</div>;
            case 'dashboard': return <div className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 text-slate-600 rounded-lg text-[10px] font-bold uppercase tracking-wider"><LayoutDashboard size={12} /> Dashboard</div>;
            default: return null;
        }
    };

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'booking_request': return <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0"><Calendar size={18} /></div>;
            case 'service_request': return <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0"><FileText size={18} /></div>;
            case 'message': return <div className="w-10 h-10 rounded-full bg-secondary/20 text-primary flex items-center justify-center shrink-0"><MessageSquare size={18} /></div>;
            case 'system_alert': return <div className="w-10 h-10 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center shrink-0"><Bell size={18} /></div>;
            default: return null;
        }
    };

    return (
        <div className="flex flex-col gap-6 max-w-[1400px] mx-auto w-full h-[calc(100vh-140px)]">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 font-heading tracking-tight mb-1">
                        Inbox & Notifications
                    </h1>
                    <p className="text-sm font-medium text-slate-500">
                        Manage cross-portal requests, alerts, and direct messages.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" leftIcon={<Check size={18} />}>
                        Mark All as Read
                    </Button>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-6 h-full overflow-hidden">
                <div className="w-full lg:w-[420px] bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col overflow-hidden shrink-0">
                    <div className="p-5 border-b border-slate-100 flex flex-col gap-4 bg-slate-50/30">
                        <Input
                            placeholder="Search requests or messages..."
                            leftIcon={<Search size={18} />}
                            className="bg-white"
                        />
                        <div className="flex bg-slate-100 p-1 rounded-xl">
                            {(['all', 'requests', 'messages'] as const).map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`flex-1 py-1.5 rounded-lg text-sm font-semibold capitalize transition-all ${activeTab === tab
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
                                className={`p-5 flex gap-4 cursor-pointer transition-all hover:bg-slate-50 relative ${selectedId === notif.id ? 'bg-primary/5' : ''}`}
                            >
                                {selectedId === notif.id && (
                                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r-full"></div>
                                )}
                                {notif.isUnread && (
                                    <div className="absolute top-5 right-5 w-2.5 h-2.5 bg-primary rounded-full ring-4 ring-primary/10"></div>
                                )}

                                {getTypeIcon(notif.type)}

                                <div className="flex-1 min-w-0 pr-4">
                                    <div className="flex items-center justify-between mb-1">
                                        <h4 className={`text-sm truncate pr-2 ${notif.isUnread ? 'font-bold text-slate-900' : 'font-semibold text-slate-700'}`}>
                                            {notif.title}
                                        </h4>
                                    </div>
                                    <p className="text-xs font-medium text-slate-500 line-clamp-2 mb-3 leading-relaxed">
                                        {notif.description}
                                    </p>
                                    <div className="flex items-center justify-between">
                                        {getPortalIcon(notif.portal)}
                                        <span className="text-[11px] font-bold text-slate-400">{notif.time}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex-1 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col overflow-hidden relative">
                    {selectedNotification ? (
                        <>
                            <div className="p-6 border-b border-slate-100 flex items-start justify-between bg-slate-50/50">
                                <div className="flex items-center gap-4">
                                    {getTypeIcon(selectedNotification.type)}
                                    <div>
                                        <div className="flex items-center gap-3 mb-1">
                                            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                                                {selectedNotification.title}
                                            </h2>
                                            {getPortalIcon(selectedNotification.portal)}
                                        </div>
                                        <p className="text-sm font-medium text-slate-500 flex items-center gap-2">
                                            <span>ID: {selectedNotification.id}</span>
                                            <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                                            <span>Received {selectedNotification.time}</span>
                                        </p>
                                    </div>
                                </div>
                                <button className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors">
                                    <MoreVertical size={20} />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto p-6 md:p-10 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-200 [&::-webkit-scrollbar-thumb]:rounded-full">

                                {selectedNotification.type === 'booking_request' && selectedNotification.details && (
                                    <div className="max-w-2xl mx-auto space-y-8">
                                        <div className="bg-primary/5 rounded-2xl p-6 border border-primary/10">
                                            <h3 className="text-primary font-bold mb-4 flex items-center gap-2">
                                                <User size={18} /> Client Information
                                            </h3>
                                            <div className="grid grid-cols-2 gap-y-4">
                                                <div>
                                                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Client Name</div>
                                                    <div className="text-sm font-semibold text-slate-800">{selectedNotification.details.client}</div>
                                                </div>
                                                <div>
                                                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Service Type</div>
                                                    <div className="text-sm font-semibold text-slate-800">{selectedNotification.details.service}</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                                            <h3 className="text-slate-800 font-bold mb-6 flex items-center gap-2">
                                                <Calendar size={18} className="text-secondary" /> Schedule & Location
                                            </h3>
                                            <div className="space-y-5">
                                                <div className="flex items-start gap-4">
                                                    <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-500 shrink-0">
                                                        <Clock size={18} />
                                                    </div>
                                                    <div>
                                                        <div className="text-sm font-bold text-slate-800">{selectedNotification.details.date}</div>
                                                        <div className="text-sm font-medium text-slate-500">{selectedNotification.details.time}</div>
                                                    </div>
                                                </div>
                                                <div className="flex items-start gap-4">
                                                    <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-500 shrink-0">
                                                        <MapPin size={18} />
                                                    </div>
                                                    <div>
                                                        <div className="text-sm font-bold text-slate-800">Service Location</div>
                                                        <div className="text-sm font-medium text-slate-500">{selectedNotification.details.location}</div>
                                                    </div>
                                                </div>
                                                <div className="flex items-start gap-4">
                                                    <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-500 shrink-0">
                                                        <FileText size={18} />
                                                    </div>
                                                    <div>
                                                        <div className="text-sm font-bold text-slate-800">Special Notes</div>
                                                        <div className="text-sm font-medium text-slate-500">{selectedNotification.details.notes}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {selectedNotification.type === 'message' && selectedNotification.details && (
                                    <div className="max-w-2xl mx-auto flex flex-col h-full justify-end min-h-[400px]">
                                        <div className="flex items-start gap-4 mb-6">
                                            <div className="w-10 h-10 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center font-bold shrink-0">
                                                {selectedNotification.details.sender?.charAt(0)}
                                            </div>
                                            <div className="bg-slate-100 rounded-2xl rounded-tl-sm p-4 text-sm font-medium text-slate-700 max-w-[80%] leading-relaxed">
                                                {selectedNotification.details.message}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="p-5 border-t border-slate-100 bg-white">
                                {selectedNotification.type === 'booking_request' && (
                                    <div className="flex items-center justify-end gap-3 max-w-2xl mx-auto">
                                        <Button variant="ghost" className="text-rose-500 hover:bg-rose-50 hover:text-rose-600">
                                            Decline Request
                                        </Button>
                                        <Button variant="secondary">
                                            Modify Schedule
                                        </Button>
                                        <Button leftIcon={<Check size={18} />}>
                                            Approve Booking
                                        </Button>
                                    </div>
                                )}

                                {selectedNotification.type === 'message' && (
                                    <div className="flex items-center gap-3 max-w-2xl mx-auto">
                                        <Input
                                            placeholder="Type your reply..."
                                            className="bg-slate-50 border-transparent"
                                        />
                                        <Button leftIcon={<Reply size={18} />}>
                                            Reply
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center text-slate-400">
                            <MessageSquare size={48} className="mb-4 opacity-20" />
                            <h3 className="text-lg font-bold text-slate-600">Select an item</h3>
                            <p className="text-sm font-medium">Choose a notification or message to view details.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NotificationMessagesCom;