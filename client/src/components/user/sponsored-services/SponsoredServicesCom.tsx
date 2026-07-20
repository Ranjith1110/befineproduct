import { useState } from 'react';
import {
    Calendar,
    Clock,
    FileText,
    Check,
    X,
    AlertCircle,
    ArrowRight,
    Heart,
    MapPin
} from 'lucide-react';
import { Button } from '../../ui/Button';
import { Badge } from '../../ui/Badge';

const mockSponsoredServices = [
    {
        id: 'SS-01',
        name: 'Skilled Nursing Care',
        description: 'Professional nursing care for medical needs and monitoring.',
        used: 2,
        limit: 4,
        provider: 'Apex Healthcare Partners'
    },
    {
        id: 'SS-02',
        name: 'Physical Therapy',
        description: 'In-home physical therapy and rehabilitation sessions.',
        used: 4,
        limit: 4,
        provider: 'Serenity Senior Solutions'
    },
    {
        id: 'SS-03',
        name: 'Daily Living Assistance',
        description: 'Help with daily routines, hygiene, and mobility.',
        used: 8,
        limit: 12,
        provider: 'Guardian Home Care'
    },
    {
        id: 'SS-04',
        name: 'Dietitian Consultation',
        description: 'Nutritional planning and dietary monitoring.',
        used: 1,
        limit: 1,
        provider: 'Vitality Medical Group'
    }
];

const SponsoredServicesCom = () => {
    const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
    const [selectedService, setSelectedService] = useState<any>(null);

    const handleOpenRequest = (service: any) => {
        setSelectedService(service);
        setIsRequestModalOpen(true);
    };

    return (
        <div className="flex flex-col gap-4 max-w-[1400px] mx-auto w-full relative pb-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 font-heading tracking-tight mb-0 flex items-center gap-2">
                        Sponsored Services
                    </h1>
                    <p className="text-xs font-medium text-slate-500 mt-1">
                        Request services included in your current Premium Care Package.
                    </p>
                </div>
                <Badge variant="primary" className="px-3 py-1.5 text-xs">
                    Plan Renewing in 12 Days
                </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {mockSponsoredServices.map((service) => {
                    const isExhausted = service.used >= service.limit;
                    const usagePercentage = (service.used / service.limit) * 100;

                    return (
                        <div key={service.id} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col transition-shadow hover:shadow-md">
                            <div className="p-4 flex-1 flex flex-col">
                                <div className="flex justify-between items-start mb-2 gap-2">
                                    <h3 className="text-base font-bold text-slate-900 leading-tight">
                                        {service.name}
                                    </h3>
                                    {isExhausted ? (
                                        <Badge variant="danger" className="shrink-0 text-[10px]">Limit Reached</Badge>
                                    ) : (
                                        <Badge variant="success" className="shrink-0 text-[10px]">Available</Badge>
                                    )}
                                </div>
                                <p className="text-xs font-medium text-slate-500 line-clamp-2 mb-4">
                                    {service.description}
                                </p>

                                <div className="mt-auto space-y-3">
                                    <div>
                                        <div className="flex justify-between items-end mb-1.5">
                                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Usage Allowance</span>
                                            <span className="text-xs font-bold text-slate-800">
                                                {service.used} <span className="text-slate-400 font-normal">/ {service.limit}</span>
                                            </span>
                                        </div>
                                        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                                            <div
                                                className={`h-full rounded-full transition-all duration-500 ${isExhausted ? 'bg-rose-500' : 'bg-primary'}`}
                                                style={{ width: `${usagePercentage}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-1.5 text-[10px] font-medium text-slate-500 bg-slate-50 p-2 rounded-lg border border-slate-100">
                                        <MapPin size={12} className="text-slate-400" />
                                        Fulfilled by: <span className="font-semibold text-slate-700">{service.provider}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="p-3 bg-slate-50 border-t border-slate-100">
                                {isExhausted ? (
                                    <div className="flex flex-col gap-2">
                                        <div className="flex items-start gap-1.5 text-rose-600 px-1">
                                            <AlertCircle size={14} className="shrink-0 mt-0.5" />
                                            <span className="text-[10px] font-medium leading-tight">
                                                Sponsored limit exhausted. You can continue booking this service via out-of-pocket payment.
                                            </span>
                                        </div>
                                        <Button
                                            variant="secondary"
                                            size="sm"
                                            className="w-full h-8 text-xs bg-white hover:bg-slate-100 border border-slate-200"
                                            rightIcon={<ArrowRight size={14} />}
                                        >
                                            Book via Care Services
                                        </Button>
                                    </div>
                                ) : (
                                    <Button
                                        size="sm"
                                        className="w-full h-8 text-xs"
                                        leftIcon={<Calendar size={14} />}
                                        onClick={() => handleOpenRequest(service)}
                                    >
                                        Request Service
                                    </Button>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            {isRequestModalOpen && selectedService && (
                <>
                    <div
                        className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 transition-opacity"
                        onClick={() => setIsRequestModalOpen(false)}
                    />
                    <div className="fixed inset-y-0 right-0 z-50 w-full md:w-[500px] bg-white shadow-2xl transform transition-transform duration-300 flex flex-col">
                        <div className="flex items-center justify-between p-5 border-b border-slate-100">
                            <div>
                                <h2 className="text-lg font-bold text-slate-900 tracking-tight">Request Sponsored Service</h2>
                                <p className="text-xs font-medium text-slate-500">Schedule a visit for {selectedService.name}.</p>
                            </div>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setIsRequestModalOpen(false)}
                                className="p-1.5 text-slate-400 hover:text-slate-700 bg-slate-50 hover:bg-slate-100 rounded-full"
                            >
                                <X size={18} />
                            </Button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-5 space-y-5 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-200 [&::-webkit-scrollbar-thumb]:rounded-full">
                            <div className="bg-primary/5 rounded-xl p-4 border border-primary/10 flex flex-col gap-3">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Selected Service</div>
                                        <div className="text-sm font-bold text-slate-800">{selectedService.name}</div>
                                    </div>
                                    <Badge variant="primary" className="text-[10px]">Sponsored</Badge>
                                </div>
                                <div className="flex items-center gap-1.5 text-xs font-medium text-slate-600">
                                    <Heart size={14} className="text-primary" />
                                    Available Allowance: <strong className="text-slate-900">{selectedService.limit - selectedService.used} remaining</strong>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                                    <span className="w-5 h-5 rounded bg-primary/10 text-primary flex items-center justify-center text-[10px]">1</span>
                                    Preferred Schedule
                                </h3>
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="flex flex-col gap-1.5 w-full">
                                        <label className="text-xs font-semibold text-slate-700">Select Date</label>
                                        <div className="relative">
                                            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                                                <Calendar size={14} />
                                            </div>
                                            <input
                                                type="date"
                                                className="w-full bg-slate-50 border border-transparent focus:bg-white focus:border-primary/30 rounded-xl focus:ring-4 focus:ring-primary/10 text-xs font-medium text-slate-800 p-2.5 pl-9 h-9"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-1.5 w-full">
                                        <label className="text-xs font-semibold text-slate-700">Preferred Time</label>
                                        <div className="relative">
                                            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                                                <Clock size={14} />
                                            </div>
                                            <input
                                                type="time"
                                                className="w-full bg-slate-50 border border-transparent focus:bg-white focus:border-primary/30 rounded-xl focus:ring-4 focus:ring-primary/10 text-xs font-medium text-slate-800 p-2.5 pl-9 h-9"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="w-full h-px bg-slate-100"></div>

                            <div className="space-y-3">
                                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                                    <span className="w-5 h-5 rounded bg-primary/10 text-primary flex items-center justify-center text-[10px]">2</span>
                                    Additional Information
                                </h3>
                                <div className="flex flex-col gap-1.5 w-full">
                                    <label className="text-xs font-semibold text-slate-700">Special Instructions / Notes</label>
                                    <div className="relative">
                                        <div className="absolute left-3 top-3 text-slate-400 pointer-events-none">
                                            <FileText size={14} />
                                        </div>
                                        <textarea
                                            className="w-full bg-slate-50 border border-transparent focus:bg-white focus:border-primary/30 rounded-xl focus:ring-4 focus:ring-primary/10 text-xs font-medium text-slate-800 placeholder-slate-400 p-2.5 pl-9 resize-none h-24"
                                            placeholder="Provide any specific details or requirements for this visit..."
                                        ></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-end gap-3">
                            <Button variant="ghost" size="sm" onClick={() => setIsRequestModalOpen(false)}>
                                Cancel
                            </Button>
                            <Button size="sm" leftIcon={<Check size={16} />}>
                                Submit Request
                            </Button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default SponsoredServicesCom;