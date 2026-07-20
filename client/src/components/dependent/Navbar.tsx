import { Menu, Search, Bell } from 'lucide-react';
import { Input } from '../ui/Input';

interface NavbarProps {
    toggleSidebar: () => void;
}

export function Navbar({ toggleSidebar }: NavbarProps) {
    return (
        <header className="bg-slate-50/80 backdrop-blur-md h-[64px] flex items-center justify-between px-4 lg:px-6 sticky top-0 z-30 border-b border-slate-200/60">
            <div className="flex items-center gap-3">
                <button
                    onClick={toggleSidebar}
                    className="lg:hidden p-1.5 rounded-xl text-slate-500 hover:bg-white hover:text-primary hover:shadow-sm transition-all"
                >
                    <Menu size={20} />
                </button>
                <div className="hidden sm:block">
                    <h1 className="text-xl font-bold text-slate-800 tracking-tight">
                        Dependent Dashboard
                    </h1>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <div className="hidden md:block w-64">
                    <Input
                        placeholder="Search services or records..."
                        leftIcon={<Search size={16} />}
                        className="rounded-full bg-white hover:bg-white focus:bg-white border-slate-200 shadow-sm shadow-slate-200/50 h-9 text-sm"
                    />
                </div>

                <div className="flex items-center gap-3">
                    <button className="relative p-2 rounded-full text-slate-500 hover:text-primary hover:bg-white hover:shadow-sm transition-all">
                        <Bell size={18} />
                        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
                    </button>

                    <button className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm hover:bg-primary/90 shadow-sm shadow-primary/30 transition-all ring-2 ring-white">
                        DP
                    </button>
                </div>
            </div>
        </header>
    );
}