import { Menu, Search, Bell } from 'lucide-react';
import { Input } from '../ui/Input';

interface NavbarProps {
    toggleSidebar: () => void;
}

export function Navbar({ toggleSidebar }: NavbarProps) {
    return (
        <header className="bg-slate-50/80 backdrop-blur-md h-[88px] flex items-center justify-between px-6 lg:px-10 sticky top-0 z-30 border-b border-slate-200/60">
            <div className="flex items-center gap-4">
                <button
                    onClick={toggleSidebar}
                    className="lg:hidden p-2 rounded-xl text-slate-500 hover:bg-white hover:text-primary hover:shadow-sm transition-all"
                >
                    <Menu size={24} />
                </button>
                <div className="hidden sm:block">
                    <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
                        Overview
                    </h1>
                </div>
            </div>

            <div className="flex items-center gap-6">
                <div className="hidden md:block w-72">
                    <Input
                        placeholder="Search here..."
                        leftIcon={<Search size={18} />}
                        className="rounded-full bg-white hover:bg-white focus:bg-white border-slate-200 shadow-sm shadow-slate-200/50"
                    />
                </div>

                <div className="flex items-center gap-4">
                    <button className="relative p-2.5 rounded-full text-slate-500 hover:text-primary hover:bg-white hover:shadow-sm transition-all">
                        <Bell size={20} />
                        <span className="absolute top-2 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
                    </button>

                    <button className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold hover:bg-primary/90 shadow-sm shadow-primary/30 transition-all ring-2 ring-white">
                        SA
                    </button>
                </div>
            </div>
        </header>
    );
}