import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Mail,
    Lock,
    Eye,
    EyeOff,
    ShieldCheck,
    ArrowRight,
    AlertCircle,
    CheckCircle2,
    ArrowLeft
} from 'lucide-react';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { loginApi, forgotPasswordApi } from '../../api/auth';

type ViewState = 'login' | 'forgot-password' | 'forgot-success';

const Login = () => {
    const navigate = useNavigate();

    // UI State
    const [view, setView] = useState<ViewState>('login');
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    // Form State
    const [formData, setFormData] = useState({
        emailOrUsername: '',
        password: '',
        resetEmail: ''
    });
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (errorMessage) setErrorMessage(null);
    };

    const switchView = (newView: ViewState) => {
        setView(newView);
        setErrorMessage(null);
        setFormData(prev => ({ ...prev, password: '' })); // clear password on view switch
    };

    // --- DYNAMIC ROLE ROUTING LOGIC ---
    const getDashboardRoute = (roles: string[]): string => {
        const roleStr = roles.join(',').toUpperCase();

        if (roleStr.includes('ADMIN') || roleStr.includes('SUPERADMIN')) {
            return '/super-admin/overview';
        }
        if (roleStr.includes('CAREMANAGER') || roleStr.includes('CARE_MANAGER')) {
            return '/care-manager/dashboard';
        }
        if (roleStr.includes('CAREGIVER') || roleStr.includes('CARE_GIVER')) {
            return '/care-giver/dashboard';
        }
        if (roleStr.includes('PROVIDER') || roleStr.includes('SERVICE_PROVIDER') || roleStr.includes('PROVIDERADMIN')) {
            return '/service-provider/dashboard';
        }
        if (roleStr.includes('DEPENDENT')) {
            return '/dependent/dashboard';
        }
        if (roleStr.includes('CLIENT') || roleStr.includes('USER')) {
            return '/user/dashboard';
        }

        return ''; // Unknown role
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMessage(null);

        try {
            const response = await loginApi({
                emailOrUsername: formData.emailOrUsername,
                password: formData.password
            });

            // Extract roles and determine navigation path
            const userRoles = response.data?.roles || [];

            if (userRoles.length === 0) {
                throw new Error("Access denied. No roles assigned to this account.");
            }

            const targetRoute = getDashboardRoute(userRoles);

            if (!targetRoute) {
                throw new Error("Unrecognized user role. Please contact support.");
            }

            // Route user dynamically based on their role
            navigate(targetRoute);

        } catch (error: any) {
            console.error('Login failed:', error);
            setErrorMessage(error.message || 'Failed to authenticate. Please check your credentials.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleForgotPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMessage(null);

        try {
            await forgotPasswordApi(formData.resetEmail);
            switchView('forgot-success');
        } catch (error: any) {
            console.error('Forgot password failed:', error);
            setErrorMessage(error.message || 'Failed to send reset link. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full bg-slate-50 flex items-center justify-center p-4 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-64 bg-primary/5 pointer-events-none"></div>
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="w-full max-w-md bg-white rounded-2xl border border-slate-100 shadow-xl relative z-10 overflow-hidden transition-all duration-300">
                <div className="h-1.5 w-full bg-primary"></div>

                <div className="p-8">
                    {/* Dynamic Header */}
                    <div className="flex flex-col items-center text-center mb-8">
                        <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-4 shadow-sm border border-primary/20">
                            {view === 'forgot-success' ? (
                                <CheckCircle2 size={24} strokeWidth={2.5} className="text-emerald-500" />
                            ) : (
                                <ShieldCheck size={24} strokeWidth={2.5} />
                            )}
                        </div>
                        <h1 className="text-2xl font-bold text-slate-900 font-heading tracking-tight mb-1">
                            {view === 'login' ? 'BeFine Portal' : 'Reset Password'}
                        </h1>
                        <p className="text-sm font-medium text-slate-500">
                            {view === 'login' && 'Sign in to access your secure dashboard.'}
                            {view === 'forgot-password' && 'Enter your email to receive a password reset link.'}
                            {view === 'forgot-success' && 'We have sent a secure recovery link to your inbox.'}
                        </p>
                    </div>

                    {/* Error Banner */}
                    {errorMessage && (
                        <div className="mb-5 p-3.5 bg-rose-50 border border-rose-200 rounded-xl flex items-center gap-2.5 text-xs font-semibold text-rose-700">
                            <AlertCircle size={16} className="shrink-0 text-rose-500" />
                            <span>{errorMessage}</span>
                        </div>
                    )}

                    {/* LOGIN VIEW */}
                    {view === 'login' && (
                        <form onSubmit={handleLogin} className="space-y-5 animate-in fade-in zoom-in-95 duration-300">
                            <div className="space-y-4">
                                <Input
                                    label="Email or Username"
                                    name="emailOrUsername"
                                    value={formData.emailOrUsername}
                                    onChange={handleChange}
                                    placeholder="e.g. your@email.com"
                                    type="text"
                                    leftIcon={<Mail size={16} className="text-slate-400" />}
                                    required
                                />

                                <div className="relative">
                                    <div className="flex justify-between items-center mb-1.5">
                                        <label className="block text-xs font-bold text-slate-700">
                                            Password
                                        </label>
                                        <button
                                            type="button"
                                            onClick={() => switchView('forgot-password')}
                                            className="text-xs font-bold text-primary hover:text-primary/80 transition-colors"
                                        >
                                            Forgot password?
                                        </button>
                                    </div>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Lock size={16} className="text-slate-400" />
                                        </div>
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            placeholder="Enter your password"
                                            className="w-full pl-9 pr-10 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                                        >
                                            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <Button
                                type="submit"
                                className="w-full justify-center py-2.5 mt-2"
                                disabled={isLoading}
                                rightIcon={!isLoading ? <ArrowRight size={16} /> : undefined}
                            >
                                {isLoading ? 'Authenticating...' : 'Sign In'}
                            </Button>
                        </form>
                    )}

                    {/* FORGOT PASSWORD VIEW */}
                    {view === 'forgot-password' && (
                        <form onSubmit={handleForgotPassword} className="space-y-5 animate-in fade-in zoom-in-95 duration-300">
                            <Input
                                label="Registered Email Address"
                                name="resetEmail"
                                value={formData.resetEmail}
                                onChange={handleChange}
                                placeholder="name@company.com"
                                type="email"
                                leftIcon={<Mail size={16} className="text-slate-400" />}
                                required
                            />

                            <div className="pt-2 flex flex-col gap-3">
                                <Button
                                    type="submit"
                                    className="w-full justify-center py-2.5"
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Sending Link...' : 'Send Reset Link'}
                                </Button>
                                <Button
                                    type="button"
                                    variant="ghost"
                                    onClick={() => switchView('login')}
                                    className="w-full justify-center py-2.5 text-slate-500 hover:bg-slate-100"
                                    leftIcon={<ArrowLeft size={16} />}
                                >
                                    Back to Login
                                </Button>
                            </div>
                        </form>
                    )}

                    {/* FORGOT PASSWORD SUCCESS VIEW */}
                    {view === 'forgot-success' && (
                        <div className="animate-in fade-in zoom-in-95 duration-300 flex flex-col items-center">
                            <p className="text-sm text-slate-600 text-center mb-6">
                                If an account exists for <span className="font-bold text-slate-900">{formData.resetEmail}</span>, you will receive password reset instructions momentarily.
                            </p>
                            <Button
                                type="button"
                                onClick={() => switchView('login')}
                                className="w-full justify-center py-2.5"
                            >
                                Return to Login
                            </Button>
                        </div>
                    )}

                </div>

                <div className="p-4 bg-slate-50 border-t border-slate-100 text-center">
                    <p className="text-[10px] font-medium text-slate-400">
                        Secure access for BeFine Healthcare Administration.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;