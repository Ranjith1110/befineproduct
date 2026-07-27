import { useState } from 'react';
import {
    Search,
    Filter,
    X,
    Check,
    IndianRupee,
    Calendar,
    Clock,
    FileText,
    MapPin,
    CreditCard,
    ArrowRight,
    ShieldCheck
} from 'lucide-react';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import { Badge } from '../../ui/Badge';

const mockHomeCareServices = [
    {
        id: 'HS-001',
        name: 'Deep House Cleaning',
        category: 'Housekeeping',
        description: 'Comprehensive deep cleaning and sanitization of living spaces to maintain a hygienic environment.',
        price: '1,200',
        isPaid: true,
        image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&auto=format&fit=crop&q=80',
        provider: 'Serenity Senior Solutions'
    },
    {
        id: 'HS-002',
        name: 'Meal Preparation',
        category: 'Daily Living',
        description: 'Customized daily meal prep and cooking based on specific dietary restrictions and health needs.',
        price: '800',
        isPaid: true,
        image: 'https://images.unsplash.com/photo-1556910103-1c02745a872f?w=800&auto=format&fit=crop&q=80',
        provider: 'Guardian Home Care'
    },
    {
        id: 'HS-003',
        name: 'Home Safety Assessment',
        category: 'Consultation',
        description: 'Expert evaluation of home hazards, fall risks, and safety modification recommendations.',
        price: 'Free',
        isPaid: false,
        image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&auto=format&fit=crop&q=80',
        provider: 'Apex Healthcare Partners'
    },
    {
        id: 'HS-004',
        name: 'Grocery & Errands',
        category: 'Support',
        description: 'Assistance with weekly grocery shopping, pharmacy runs, and local essential errands.',
        price: '500',
        isPaid: true,
        image: 'https://images.unsplash.com/photo-1588964895597-cfccd6e2b089?w=800&auto=format&fit=crop&q=80',
        provider: 'Serenity Senior Solutions'
    }
];

const HomeCareServicesCom = () => {
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
    const [selectedService, setSelectedService] = useState<any>(null);

    const handleOpenBooking = (service: any) => {
        setSelectedService(service);
        setIsBookingModalOpen(true);
    };

    return (
        <div className="flex flex-col gap-4 max-w-[1400px] mx-auto w-full relative pb-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 font-heading tracking-tight mb-0 flex items-center gap-2">
                        Home Care Services
                    </h1>
                    <p className="text-xs font-medium text-slate-500 mt-1">
                        Manage and book non-medical support and daily living assistance services.
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-56 hidden md:block">
                        <Input
                            placeholder="Search home care..."
                            leftIcon={<Search size={16} />}
                            className="bg-white border-transparent shadow-sm text-sm h-9"
                        />
                    </div>
                    <Button variant="outline" size="sm" leftIcon={<Filter size={14} />}>
                        Filter
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-2">
                {mockHomeCareServices.map((service) => (
                    <div key={service.id} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col group hover:shadow-md transition-shadow">
                        <div className="relative w-full h-32 overflow-hidden bg-slate-100">
                            <img
                                src={service.image}
                                alt={service.name}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute top-2 right-2">
                                <Badge variant="primary" className="bg-white/90 backdrop-blur-sm shadow-sm text-[9px] uppercase">
                                    {service.category}
                                </Badge>
                            </div>
                        </div>

                        <div className="p-4 flex-1 flex flex-col">
                            <h3 className="text-sm font-bold text-slate-900 leading-tight mb-1.5">
                                {service.name}
                            </h3>
                            <p className="text-[11px] font-medium text-slate-500 line-clamp-2 mb-3 flex-1">
                                {service.description}
                            </p>

                            <div className="flex items-center gap-1.5 text-[10px] font-medium text-slate-500 mb-3">
                                <MapPin size={12} className="text-slate-400" />
                                <span className="truncate">{service.provider}</span>
                            </div>

                            <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                                <div className="flex items-baseline gap-0.5 text-slate-900">
                                    {service.isPaid ? (
                                        <>
                                            <IndianRupee size={12} className="font-bold" />
                                            <span className="text-lg font-black tracking-tight">{service.price}</span>
                                            <span className="text-[10px] font-medium text-slate-400 ml-0.5">/visit</span>
                                        </>
                                    ) : (
                                        <span className="text-sm font-black text-emerald-600 tracking-tight uppercase">Free</span>
                                    )}
                                </div>
                                <Button
                                    size="sm"
                                    className="h-8 text-xs px-3"
                                    rightIcon={<ArrowRight size={14} />}
                                    onClick={() => handleOpenBooking(service)}
                                >
                                    Book
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {isBookingModalOpen && selectedService && (
                <>
                    <div
                        className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 transition-opacity"
                        onClick={() => setIsBookingModalOpen(false)}
                    />
                    <div className="fixed inset-y-0 right-0 z-50 w-full md:w-[500px] bg-white shadow-2xl transform transition-transform duration-300 flex flex-col">
                        <div className="flex items-center justify-between p-5 border-b border-slate-100">
                            <div>
                                <h2 className="text-lg font-bold text-slate-900 tracking-tight">Book Home Care Service</h2>
                                <p className="text-xs font-medium text-slate-500">Schedule {selectedService.name}.</p>
                            </div>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setIsBookingModalOpen(false)}
                                className="p-1.5 text-slate-400 hover:text-slate-700 bg-slate-50 hover:bg-slate-100 rounded-full"
                            >
                                <X size={18} />
                            </Button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-5 space-y-5 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-200 [&::-webkit-scrollbar-thumb]:rounded-full">

                            <div className="flex gap-3 bg-slate-50 rounded-xl p-3 border border-slate-100">
                                <img
                                    src={selectedService.image}
                                    alt={selectedService.name}
                                    className="w-16 h-16 rounded-lg object-cover shadow-sm"
                                />
                                <div className="flex flex-col justify-center">
                                    <div className="text-sm font-bold text-slate-800">{selectedService.name}</div>
                                    <div className="text-[10px] font-medium text-slate-500 mb-1">{selectedService.provider}</div>
                                    {selectedService.isPaid ? (
                                        <div className="flex items-center gap-0.5 text-primary font-bold text-sm">
                                            <IndianRupee size={12} /> {selectedService.price}
                                        </div>
                                    ) : (
                                        <div className="text-sm font-bold text-emerald-600">Complimentary</div>
                                    )}
                                </div>
                            </div>

                            {selectedService.isPaid ? (
                                <div className="bg-amber-50 rounded-xl p-3 border border-amber-100 flex items-start gap-2">
                                    <CreditCard size={14} className="text-amber-600 mt-0.5 shrink-0" />
                                    <p className="text-[11px] font-medium text-amber-800 leading-relaxed">
                                        This is a paid home care service. You will be billed separately for this visit based on the duration and scope of work required.
                                    </p>
                                </div>
                            ) : (
                                <div className="bg-emerald-50 rounded-xl p-3 border border-emerald-100 flex items-start gap-2">
                                    <ShieldCheck size={14} className="text-emerald-600 mt-0.5 shrink-0" />
                                    <p className="text-[11px] font-medium text-emerald-800 leading-relaxed">
                                        This consultation is provided free of charge as part of your onboarding or active subscription benefits.
                                    </p>
                                </div>
                            )}

                            <div className="space-y-3">
                                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                                    <span className="w-5 h-5 rounded bg-primary/10 text-primary flex items-center justify-center text-[10px]">1</span>
                                    Schedule Visit
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
                                    Instructions
                                </h3>
                                <div className="flex flex-col gap-1.5 w-full">
                                    <div className="relative">
                                        <div className="absolute left-3 top-3 text-slate-400 pointer-events-none">
                                            <FileText size={14} />
                                        </div>
                                        <textarea
                                            className="w-full bg-slate-50 border border-transparent focus:bg-white focus:border-primary/30 rounded-xl focus:ring-4 focus:ring-primary/10 text-xs font-medium text-slate-800 placeholder-slate-400 p-2.5 pl-9 resize-none h-20"
                                            placeholder="Provide any specific instructions, allergies, or requirements..."
                                        ></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-end gap-3">
                            <Button variant="ghost" size="sm" onClick={() => setIsBookingModalOpen(false)}>
                                Cancel
                            </Button>
                            <Button size="sm" leftIcon={<Check size={16} />}>
                                {selectedService.isPaid ? 'Confirm & Pay' : 'Confirm Booking'}
                            </Button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default HomeCareServicesCom;