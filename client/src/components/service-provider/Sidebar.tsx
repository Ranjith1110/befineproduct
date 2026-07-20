import { NavLink } from 'react-router-dom';
import {
    LayoutDashboard,
    ClipboardList,
    Calendar,
    Users,
    ShieldCheck,
    X
} from 'lucide-react';
import { Button } from '../ui/Button';

const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/service-provider/dashboard' },
    { name: 'My Care Giver', icon: ClipboardList, path: '/service-provider/my-caregiver' },
    { name: 'Service Request and Status', icon: ClipboardList, path: '/service-provider/service-requests-status' },
    { name: 'Appointments', icon: Calendar, path: '/service-provider/appointments' },
    { name: 'Reports', icon: Users, path: '/service-provider/reports' },
    { name: 'Billing', icon: ShieldCheck, path: '/service-provider/billing' },
];

interface SidebarProps {
    isOpen: boolean;
    toggleSidebar: () => void;
}

export function Sidebar({ isOpen, toggleSidebar }: SidebarProps) {
    return (
        <>
            {isOpen && (
                <div
                    className="fixed inset-0 z-40 bg-slate-900/20 backdrop-blur-sm lg:hidden transition-opacity"
                    onClick={toggleSidebar}
                />
            )}

            <aside
                className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-100 shadow-[4px_0_24px_rgba(0,0,0,0.02)] transform transition-transform duration-300 ease-in-out flex flex-col ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
                    }`}
            >
                <div className="flex items-center justify-between pt-4 pb-4 px-5">
                    <div className="flex items-center">
                        <img
                            src="/logo.webp"
                            alt="BeFine Logo"
                            className="h-10 w-auto object-contain"
                        />
                    </div>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={toggleSidebar}
                        className="lg:hidden p-1 px-1.5 h-auto"
                    >
                        <X size={20} />
                    </Button>
                </div>

                <div className="px-5 py-3 flex items-center gap-3 mb-1">
                    <img
                        src="https://i.pravatar.cc/150?img=11"
                        alt="Provider Profile"
                        className="w-[40px] h-[40px] rounded-full object-cover"
                    />
                    <div className="flex flex-col">
                        <span className="text-[14px] font-semibold text-slate-800 tracking-tight truncate w-36">Apex Healthcare</span>
                        <span className="text-[11px] font-bold text-primary">Service Provider</span>
                    </div>
                </div>

                <nav className="flex-1 overflow-y-auto overflow-x-auto px-3 pb-6 space-y-0.5 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-200 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-slate-300 transition-all">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <NavLink
                                key={item.name}
                                to={item.path}
                                className={({ isActive }) =>
                                    `group flex items-center gap-3 px-3 py-2.5 rounded transition-all duration-200 min-w-[180px] ${isActive
                                        ? 'bg-primary/10 text-primary'
                                        : 'text-slate-600 hover:bg-primary/10 hover:text-primary'
                                    }`
                                }
                            >
                                {({ isActive }) => (
                                    <>
                                        <Icon
                                            size={18}
                                            strokeWidth={isActive ? 2.5 : 2}
                                            className={isActive ? 'text-primary' : 'text-slate-400 group-hover:text-primary'}
                                        />
                                        <span className={`text-[13px] ${isActive ? 'font-semibold' : 'font-medium'}`}>
                                            {item.name}
                                        </span>
                                    </>
                                )}
                            </NavLink>
                        );
                    })}
                </nav>
            </aside>
        </>
    );
}