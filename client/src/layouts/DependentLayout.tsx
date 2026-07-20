import { useState } from 'react';
import { Sidebar } from '../components/dependent/Sidebar';
import { Navbar } from '../components/dependent/Navbar';

interface DependentLayoutProps {
    children: React.ReactNode;
}

export function DependentLayout({ children }: DependentLayoutProps) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    return (
        <div className="min-h-screen bg-gray-50 flex">
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

            <div className="flex-1 flex flex-col lg:pl-64 min-w-0 transition-all duration-300">
                <Navbar toggleSidebar={toggleSidebar} />

                <main className="flex-1 p-4 lg:p-8 overflow-x-hidden">
                    {children}
                </main>
            </div>
        </div>
    );
}