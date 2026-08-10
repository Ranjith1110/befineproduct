import { NavLink, useNavigate } from 'react-router-dom';
import {
    LayoutDashboard,
    Building2,
    ClipboardList,
    Calendar,
    FileText,
    Receipt,
    X,
    Settings, // <-- Added Settings icon
    LogOut    // <-- Added LogOut icon
} from 'lucide-react';
import { Button } from '../ui/Button';
import { logoutApi } from '../../api/auth'; // Ensure this path matches your project structure

const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/care-manager/dashboard' },
    { name: 'My Service Provider', icon: Building2, path: '/care-manager/my-service-providers' },
    { name: 'Service Request & Status', icon: ClipboardList, path: '/care-manager/service-request-status' },
    { name: 'Appointments', icon: Calendar, path: '/care-manager/appointments' },
    { name: 'Reports', icon: FileText, path: '/care-manager/reports' },
    { name: 'Billing', icon: Receipt, path: '/care-manager/billing' },
    { name: 'Settings', icon: Settings, path: '/care-manager/settings' }, // <-- Added Settings route
];

interface SidebarProps {
    isOpen: boolean;
    toggleSidebar: () => void;
}

export function Sidebar({ isOpen, toggleSidebar }: SidebarProps) {
    const navigate = useNavigate();

    // Dynamically fetch the logged-in user's data from sessionStorage
    const userInfoStr = sessionStorage.getItem('userInfo');
    const user = userInfoStr ? JSON.parse(userInfoStr) : null;
    const displayName = user ? `${user.firstName}` : 'Care Manager';
    const roleDisplay = user?.roles?.includes('CAREMANAGER') || user?.roles?.includes('CARE_MANAGER')
        ? 'Care Manager'
        : 'System Admin';

    const handleLogout = async () => {
        await logoutApi();
        navigate('/'); // Redirect to the login page
    };

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
                    <div className="w-[40px] h-[40px] rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold text-lg shrink-0">
                        {displayName.charAt(0)}
                    </div>
                    <div className="flex flex-col overflow-hidden">
                        <span className="text-[14px] font-semibold text-slate-800 tracking-tight truncate">{displayName}</span>
                        <span className="text-[11px] font-bold text-primary truncate">{roleDisplay}</span>
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

                {/* Logout Button Section */}
                <div className="p-4 border-t border-slate-100 bg-slate-50/50">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-rose-600 hover:bg-rose-50 hover:text-rose-700 font-semibold transition-all duration-200 border border-transparent hover:border-rose-100"
                    >
                        <LogOut size={16} strokeWidth={2.5} />
                        <span className="text-[13px]">Log Out</span>
                    </button>
                </div>
            </aside>
        </>
    );
}