import { NavLink } from 'react-router-dom';
import {
    Activity,
    Users,
    Heart,
    Calendar,
    ShieldCheck,
    X
} from 'lucide-react';
import { Button } from '../ui/Button';

const menuItems = [
    { name: 'Overview', icon: Activity, path: '/' },
    { name: 'Clients', icon: Users, path: '/clients' },
    { name: 'Our Services', icon: Heart, path: '/our-services' },
    { name: 'Services Providers', icon: Heart, path: '/services-providers' },
    { name: 'Appointments', icon: Calendar, path: '/appointments' },
    { name: 'Notification Messages', icon: Calendar, path: '/notification-messages' },
    { name: 'Billing', icon: ShieldCheck, path: '/billing' },
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
                className={`fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-slate-100 shadow-[4px_0_24px_rgba(0,0,0,0.02)] transform transition-transform duration-300 ease-in-out flex flex-col ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
                    }`}
            >
                <div className="flex items-center justify-between pt-5 pb-6 px-8">
                    <div className="flex items-center">
                        <img
                            src="/logo.webp"
                            alt="BeFine Logo"
                            className="h-14 w-auto object-contain"
                        />
                    </div>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={toggleSidebar}
                        className="lg:hidden p-1 px-2"
                    >
                        <X size={24} />
                    </Button>
                </div>

                <div className="px-6 py-4 flex items-center gap-4 mb-2">
                    <img
                        src="https://i.pravatar.cc/150?img=47"
                        alt="Ranjith"
                        className="w-[52px] h-[52px] rounded-full object-cover"
                    />
                    <div className="flex flex-col">
                        <span className="text-[17px] font-semibold text-slate-800 tracking-tight">Ranjith</span>
                        <span className="text-[13px] font-bold text-primary">Super Admin</span>
                    </div>
                </div>

                <nav className="flex-1 overflow-y-auto overflow-x-auto px-4 pb-8 space-y-1 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-200 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-slate-300 transition-all">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <NavLink
                                key={item.name}
                                to={item.path}
                                className={({ isActive }) =>
                                    `group flex items-center gap-4 px-4 py-3 rounded transition-all duration-200 min-w-[200px] ${isActive
                                        ? 'bg-primary/10 text-primary'
                                        : 'text-slate-600 hover:bg-primary/10 hover:text-primary'
                                    }`
                                }
                            >
                                {({ isActive }) => (
                                    <>
                                        <Icon
                                            size={20}
                                            strokeWidth={isActive ? 2.5 : 2}
                                            className={isActive ? 'text-primary' : 'text-slate-400 group-hover:text-primary'}
                                        />
                                        <span className={`text-[15px] ${isActive ? 'font-semibold' : 'font-medium'}`}>
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