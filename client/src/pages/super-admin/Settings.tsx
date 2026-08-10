import { SuperAdminLayout } from "../../layouts/SuperAdminLayout";
import ChangePassword from "../auth/ChangePassword";

const Settings = () => {
    return (
        <SuperAdminLayout>
            <div className="flex flex-col gap-4 max-w-[1400px] mx-auto w-full pb-6">
                <div className="flex flex-col mb-4">
                    <h1 className="text-2xl font-bold text-slate-900 font-heading tracking-tight">
                        Account Settings
                    </h1>
                    <p className="text-sm font-medium text-slate-500">
                        Manage your profile, security preferences, and notifications.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column: Navigation/Tabs (for future expansion) */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden flex flex-col p-2 space-y-1">
                            <button className="w-full flex items-center justify-start px-4 py-2.5 rounded-lg text-sm font-semibold bg-primary/10 text-primary transition-colors">
                                Security & Password
                            </button>
                            <button className="w-full flex items-center justify-start px-4 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors cursor-not-allowed opacity-50">
                                Profile Details (Coming Soon)
                            </button>
                            <button className="w-full flex items-center justify-start px-4 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors cursor-not-allowed opacity-50">
                                Notifications (Coming Soon)
                            </button>
                        </div>
                    </div>

                    {/* Right Column: Active Content */}
                    <div className="lg:col-span-2">
                        <ChangePassword />
                    </div>
                </div>
            </div>
        </SuperAdminLayout>
    );
};

export default Settings;