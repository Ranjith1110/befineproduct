import React, { useState } from 'react';
import {
    Lock,
    Eye,
    EyeOff,
    AlertCircle,
    CheckCircle2,
    Save
} from 'lucide-react';

import { Button } from '../../../components/ui/Button';
import { changePasswordApi } from '../api/authApi';


const ChangePassword = () => {
    const [formData, setFormData] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    // Visibility toggles
    const [showOld, setShowOld] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    // Submission states
    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear alerts when user starts typing
        if (errorMessage) setErrorMessage(null);
        if (successMessage) setSuccessMessage(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Frontend Validation
        if (formData.newPassword !== formData.confirmPassword) {
            setErrorMessage("New passwords do not match.");
            return;
        }

        if (formData.newPassword.length < 8) {
            setErrorMessage("New password must be at least 8 characters long.");
            return;
        }

        setIsLoading(true);
        setErrorMessage(null);
        setSuccessMessage(null);

        try {
            await changePasswordApi({
                oldPassword: formData.oldPassword,
                newPassword: formData.newPassword,
                confirmPassword: formData.confirmPassword
            });

            setSuccessMessage("Your password has been successfully updated.");

            // Clear the form on success
            setFormData({
                oldPassword: '',
                newPassword: '',
                confirmPassword: ''
            });

        } catch (error: any) {
            console.error('Change password failed:', error);
            setErrorMessage(error.message || 'Failed to update password. Please verify your current password.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm max-w-md">
            <div className="mb-6">
                <h2 className="text-lg font-bold text-slate-900 tracking-tight">Change Password</h2>
                <p className="text-xs font-medium text-slate-500 mt-1">
                    Update your account password to maintain security.
                </p>
            </div>

            {/* Error Banner */}
            {errorMessage && (
                <div className="mb-5 p-3 bg-rose-50 border border-rose-100 rounded-lg flex items-start gap-2.5 text-xs font-semibold text-rose-700">
                    <AlertCircle size={16} className="shrink-0 text-rose-500 mt-0.5" />
                    <span>{errorMessage}</span>
                </div>
            )}

            {/* Success Banner */}
            {successMessage && (
                <div className="mb-5 p-3 bg-emerald-50 border border-emerald-100 rounded-lg flex items-center gap-2.5 text-xs font-semibold text-emerald-700">
                    <CheckCircle2 size={16} className="shrink-0 text-emerald-500" />
                    <span>{successMessage}</span>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">

                {/* Current Password */}
                <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700">Current Password</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Lock size={16} className="text-slate-400" />
                        </div>
                        <input
                            type={showOld ? "text" : "password"}
                            name="oldPassword"
                            value={formData.oldPassword}
                            onChange={handleChange}
                            placeholder="Enter current password"
                            className="w-full pl-9 pr-10 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowOld(!showOld)}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                        >
                            {showOld ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                    </div>
                </div>

                <div className="w-full h-px bg-slate-100 my-4"></div>

                {/* New Password */}
                <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700">New Password</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Lock size={16} className="text-slate-400" />
                        </div>
                        <input
                            type={showNew ? "text" : "password"}
                            name="newPassword"
                            value={formData.newPassword}
                            onChange={handleChange}
                            placeholder="Enter new password"
                            className="w-full pl-9 pr-10 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowNew(!showNew)}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                        >
                            {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                    </div>
                </div>

                {/* Confirm New Password */}
                <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700">Confirm New Password</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Lock size={16} className="text-slate-400" />
                        </div>
                        <input
                            type={showConfirm ? "text" : "password"}
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Re-enter new password"
                            className="w-full pl-9 pr-10 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirm(!showConfirm)}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                        >
                            {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                    </div>
                </div>

                <div className="pt-2">
                    <Button
                        type="submit"
                        className="w-full justify-center py-2.5"
                        disabled={isLoading}
                        leftIcon={!isLoading ? <Save size={16} /> : undefined}
                    >
                        {isLoading ? 'Updating...' : 'Save New Password'}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default ChangePassword;
