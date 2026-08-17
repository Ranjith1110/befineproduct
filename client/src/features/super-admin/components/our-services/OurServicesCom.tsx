import React, { useState, useEffect } from 'react';
import {
    Plus,
    Search,
    Filter,
    Edit2,
    Trash2,
    X,
    Check,
    IndianRupee,
    AlertCircle,
    CheckCircle2,
    FileText,
    Clock
} from 'lucide-react';
import { Button } from '../../../../components/ui/Button';
import { Input } from '../../../../components/ui/Input';
import { Badge } from '../../../../components/ui/Badge';
import { Select } from '../../../../components/ui/Select';
import {
    createServiceApi,
    getServicesApi,
    updateServiceApi,
    deleteServiceApi,
    getServiceCategoriesApi,
    publishServiceApi,
    archiveServiceApi,
    type ServiceStatus,
} from '../../api/services';

const initialFormState = {
    title: '',
    serviceCode: '',
    shortDescription: '',
    categoryUuid: '',
    durationMinutes: '60',
    basePrice: '',
    discountType: 'NONE',
    discountValue: '0',
    gstPercent: '0',
    currency: 'INR',
    isActive: true, // <-- ADDED BACK to fix TypeScript error
    thumbnailImage: '', 
    status: 'DRAFT' as ServiceStatus,
    canProviderOffer: true,
    requiresPrescription: false,
    requiresAssessment: false,
    displayOrder: '0',
    isFeatured: false,
    version: 0
};

const DEFAULT_IMAGE = "https://placehold.co/800x400/f8fafc/64748b?text=Service+Image";

const getSafeText = (val: any, defaultText: string): string => {
    if (val === null || val === undefined) return defaultText;
    if (typeof val === 'string') return val;
    if (typeof val === 'number') return val.toString();
    if (typeof val === 'object') {
        if (Array.isArray(val)) return val.length > 0 ? getSafeText(val[0], defaultText) : defaultText;
        if (typeof val.name === 'string') return val.name;
        if (typeof val.title === 'string') return val.title;
        if (typeof val.code === 'string') return val.code;
        if (typeof val.label === 'string') return val.label;
        if (typeof val.value === 'string') return val.value;
    }
    return defaultText;
};

const getSafePrice = (val: any): number => {
    if (val === null || val === undefined) return 0;
    if (typeof val === 'number') return val;
    if (typeof val === 'string') return Number(val) || 0;
    if (typeof val === 'object') {
        if (Array.isArray(val.d) && typeof val.e === 'number' && typeof val.s === 'number' && val.d.length > 0) {
            const digits = String(val.d[0]) + val.d.slice(1).map((part: number) => String(part).padStart(7, '0')).join('');
            const decimalPosition = val.e + 1;
            const decimalText = decimalPosition <= 0
                ? `0.${'0'.repeat(Math.abs(decimalPosition))}${digits}`
                : decimalPosition >= digits.length
                    ? digits.padEnd(decimalPosition, '0')
                    : `${digits.slice(0, decimalPosition)}.${digits.slice(decimalPosition)}`;
            return val.s * Number(decimalText);
        }
        const num = val.amount ?? val.basePrice ?? val.value ?? val.price ?? 0;
        return Number(num) || 0;
    }
    return 0;
};

const formatServiceStatus = (status: unknown): string => {
    if (typeof status !== 'string') return 'Unknown';
    return status.charAt(0) + status.slice(1).toLowerCase();
};

const extractId = (val: any) => {
    if (!val) return '';
    if (typeof val === 'string') return val;
    if (typeof val === 'object') return val.uuid || val.id || val.code || val.name || '';
    return String(val);
};

const OurServicesCom = () => {
    const [services, setServices] = useState<any[]>([]);
    const [categories, setCategories] = useState<any[]>([]);
    const [isFetchingServices, setIsFetchingServices] = useState(true);
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState<ServiceStatus | ''>('');

    const [isAddServiceOpen, setIsAddServiceOpen] = useState(false);
    const [editingService, setEditingService] = useState<any | null>(null);
    const [formData, setFormData] = useState(initialFormState);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);

    const loadData = async (searchValue = search, statusValue = statusFilter) => {
        setIsFetchingServices(true);
        try {
            const [servicesData, categoriesData] = await Promise.all([
                getServicesApi({ search: searchValue || undefined, status: statusValue || undefined, page: 1, limit: 100 }).catch(() => []),
                getServiceCategoriesApi().catch(() => [])
            ]);
            setServices(servicesData);
            setCategories(categoriesData);

            if (categoriesData && categoriesData.length > 0) {
                const firstUuid = categoriesData[0].uuid;
                setFormData(prev => ({
                    ...prev,
                    categoryUuid: categoriesData.some(
                        (category: any) => category.uuid === prev.categoryUuid
                    ) ? prev.categoryUuid : firstUuid
                }));
            }
        } catch (error) {
            console.error("Error loading data:", error);
        } finally {
            setIsFetchingServices(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {
        const timeout = window.setTimeout(() => {
            getServicesApi({ search: search.trim() || undefined, status: statusFilter || undefined, page: 1, limit: 100 })
                .then(setServices)
                .catch((error: unknown) => setSubmitError(error instanceof Error ? error.message : 'Unable to load services.'));
        }, 350);
        return () => window.clearTimeout(timeout);
    }, [search, statusFilter]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (submitError) setSubmitError(null);
    };

    const closeMenuAndModal = () => {
        setIsAddServiceOpen(false);
        setEditingService(null);
        setFormData(initialFormState);
        setSubmitError(null);
    };

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitError(null);
        setSubmitSuccess(null);

        let selectedCategoryUuid = formData.categoryUuid;

        const selectedCategory = categories.find(
            category => category.uuid === selectedCategoryUuid
        );

        if (!selectedCategory) {
            setSubmitError('Please select a valid Service Category.');
            setIsSubmitting(false);
            return;
        }

        selectedCategoryUuid = selectedCategory.uuid;

        // Construct strict payload exactly matching Swagger structure
        const payload: any = {
            serviceCode: formData.serviceCode,
            title: formData.title,
            shortDescription: formData.shortDescription,
            categoryUuid: selectedCategoryUuid,
            tagUuids: [], // Required by backend
            thumbnailImage: formData.thumbnailImage || DEFAULT_IMAGE,
            galleryImages: [], // Required by backend
            basePrice: Number(formData.basePrice) || 0,
            discountType: formData.discountType,
            discountValue: Number(formData.discountValue) || 0,
            gstPercent: Number(formData.gstPercent) || 0,
            currency: formData.currency || 'INR',
            durationMinutes: Number(formData.durationMinutes) || 60,
            isActive: formData.isActive ?? true,
            canProviderOffer: formData.canProviderOffer,
            requiresPrescription: formData.requiresPrescription,
            requiresAssessment: formData.requiresAssessment,
            displayOrder: Number(formData.displayOrder) || 0,
            isFeatured: formData.isFeatured
        };

        if (editingService) {
            payload.version = Number(formData.version) || 0;
        }

        try {
            if (editingService && editingService.resolvedUuid) {
                await updateServiceApi(editingService.resolvedUuid, payload);
                const previousStatus = editingService.status as ServiceStatus;
                if (formData.status !== previousStatus) {
                    if (formData.status === 'PUBLISHED') await publishServiceApi(editingService.resolvedUuid);
                    else if (formData.status === 'ARCHIVED') await archiveServiceApi(editingService.resolvedUuid);
                    else throw new Error('The backend does not provide a lifecycle endpoint to move a service back to Draft.');
                }
                setSubmitSuccess(`"${formData.title}" has been successfully updated!`);
            } else {
                const createdResponse = await createServiceApi(payload);
                const createdUuid = extractId(createdResponse?.data || createdResponse);
                if (formData.status !== 'DRAFT') {
                    if (!createdUuid) throw new Error('Service was created, but its UUID was not returned for the requested lifecycle change.');
                    if (formData.status === 'PUBLISHED') await publishServiceApi(createdUuid);
                    if (formData.status === 'ARCHIVED') await archiveServiceApi(createdUuid);
                }
                setSubmitSuccess(`"${formData.title}" has been successfully created!`);
            }

            closeMenuAndModal();
            setTimeout(() => setSubmitSuccess(null), 5000);
            await loadData();

        } catch (error: any) {
            console.error('Failed to save service:', error);
            setSubmitError(error.message || 'An unexpected error occurred while saving the service.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleEditClick = (service: any) => {
        const uuid = extractId(service);

        setEditingService({ ...service, resolvedUuid: uuid });

        setFormData({
            title: getSafeText(service.title || service.name, ''),
            serviceCode: getSafeText(service.serviceCode || service.code, ''),
            shortDescription: getSafeText(service.shortDescription || service.description, ''),
            categoryUuid: extractId(service.categoryUuid || service.categoryId || service.category) || '',
            durationMinutes: String(getSafePrice(service.durationMinutes || service.duration) || 60),
            basePrice: String(getSafePrice(service.basePrice || service.price)),
            discountType: getSafeText(service.discountType, 'NONE'),
            discountValue: String(getSafePrice(service.discountValue)),
            gstPercent: String(getSafePrice(service.gstPercent)),
            currency: getSafeText(service.currency, 'INR'),
            isActive: service.isActive ?? true,
            thumbnailImage: getSafeText(service.thumbnailImage || service.imageUrl, ''),
            status: (service.status || 'DRAFT') as ServiceStatus,
            canProviderOffer: service.canProviderOffer ?? true,
            requiresPrescription: service.requiresPrescription ?? false,
            requiresAssessment: service.requiresAssessment ?? false,
            displayOrder: String(service.displayOrder ?? 0),
            isFeatured: service.isFeatured ?? false,
            version: service.version ?? 0
        });
        setIsAddServiceOpen(true);
    };

    const handleDeleteClick = async (uuid: string, title: string) => {
        if (!uuid) {
            alert("Error: Service ID is missing.");
            return;
        }

        if (!window.confirm(`Are you sure you want to delete "${title}"? This action cannot be undone.`)) {
            return;
        }

        try {
            await deleteServiceApi(uuid);
            setSubmitSuccess(`"${title}" was successfully deleted.`);
            setTimeout(() => setSubmitSuccess(null), 5000);
            await loadData();
        } catch (error: any) {
            console.error("Delete failed:", error);
            alert(error.message || "Failed to delete service.");
        }
    };

    const getSubCategoryName = (subCat: any): string => {
        if (!subCat) return 'General';
        if (typeof subCat === 'string') return subCat;
        return subCat.name || subCat.title || subCat.code || 'General';
    };

    return (
        <div className="flex flex-col gap-4 max-w-[1400px] mx-auto w-full relative pb-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 font-heading tracking-tight mb-0">
                        Our Services
                    </h1>
                    <p className="text-xs font-medium text-slate-500">
                        Manage your catalog of care services, categories, and pricing.
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-56 hidden md:block">
                        <Input
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                            placeholder="Search services..."
                            leftIcon={<Search size={16} />}
                            className="bg-white border-transparent shadow-sm text-sm h-9"
                        />
                    </div>
                    <Select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value as ServiceStatus | '')} options={[{ label: 'All statuses', value: '' }, { label: 'Draft', value: 'DRAFT' }, { label: 'Published', value: 'PUBLISHED' }, { label: 'Archived', value: 'ARCHIVED' }]} />
                    <Button variant="outline" size="sm" leftIcon={<Filter size={14} />} onClick={() => setStatusFilter('')}>Clear</Button>
                    <Button
                        size="sm"
                        leftIcon={<Plus size={16} strokeWidth={2.5} />}
                        onClick={() => {
                            const defaultCat = categories.length > 0 ? categories[0].uuid : '';
                            setFormData({ ...initialFormState, categoryUuid: defaultCat });
                            setEditingService(null);
                            setIsAddServiceOpen(true);
                        }}
                    >
                        Add New Service
                    </Button>
                </div>
            </div>

            {submitSuccess && (
                <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center justify-between text-xs font-semibold text-emerald-700 animate-in fade-in slide-in-from-top-2 duration-300">
                    <div className="flex items-center gap-2.5">
                        <CheckCircle2 size={18} className="shrink-0 text-emerald-500" />
                        <span>{submitSuccess}</span>
                    </div>
                    <button
                        onClick={() => setSubmitSuccess(null)}
                        className="text-emerald-500 hover:text-emerald-700 transition-colors p-1"
                    >
                        <X size={16} />
                    </button>
                </div>
            )}

            {isFetchingServices ? (
                <div className="flex flex-col items-center justify-center py-20 text-slate-500">
                    <svg className="animate-spin h-8 w-8 text-primary mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span className="text-sm font-semibold">Loading Service Catalog...</span>
                </div>
            ) : services.length === 0 ? (
                <div className="bg-white rounded-xl border border-slate-200 p-12 flex flex-col items-center justify-center text-center shadow-sm">
                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 mb-4">
                        <FileText size={24} />
                    </div>
                    <h3 className="text-base font-bold text-slate-900 mb-1">No Services Found</h3>
                    <p className="text-sm text-slate-500 mb-6 max-w-sm">You haven't added any services to your catalog yet. Create your first service offering to get started.</p>
                    <Button onClick={() => setIsAddServiceOpen(true)} leftIcon={<Plus size={16} />}>
                        Add Your First Service
                    </Button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {services.map((service, idx) => {
                        const rawUuid = service.uuid || service.id;
                        const safeUuid = getSafeText(rawUuid, `service-${idx}`);

                        const displayTitle = getSafeText(service.title || service.name, 'Untitled Service');
                        const displayPrice = getSafePrice(service.effectivePrice ?? service.basePrice ?? service.price);
                        const displayDesc = getSafeText(service.shortDescription || service.description, 'No description provided.');
                        const displaySubCat = getSubCategoryName(service.category || service.categoryUuid || service.categoryId);
                        const displaySubcategory = service.subcategory ? getSubCategoryName(service.subcategory) : '';
                        const displayCode = getSafeText(service.serviceCode, 'N/A');
                        const displayDuration = getSafePrice(service.durationMinutes || service.duration);

                        const serviceStatus = getSafeText(service.status, 'DRAFT').toUpperCase();
                        const imgUrl = getSafeText(service.thumbnailImage || service.imageUrl, DEFAULT_IMAGE);

                        return (
                            <div key={safeUuid} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col group hover:shadow-md transition-shadow">
                                <div className="relative w-full h-36 overflow-hidden bg-slate-100">
                                    <img
                                        src={imgUrl || DEFAULT_IMAGE}
                                        alt={displayTitle}
                                        loading="lazy"
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src = DEFAULT_IMAGE;
                                        }}
                                    />
                                    <div className="absolute top-2 left-2">
                                        <Badge variant={serviceStatus === 'PUBLISHED' ? 'success' : serviceStatus === 'ARCHIVED' ? 'secondary' : 'warning'} className="bg-white/90 backdrop-blur-sm">{formatServiceStatus(serviceStatus)}</Badge>
                                    </div>
                                     <div className="absolute top-2 right-2 flex flex-col items-end gap-1">
                                        <Badge variant="primary" className="bg-white/90 backdrop-blur-sm shadow-sm max-w-[150px] truncate">
                                            {displaySubCat}
                                        </Badge>
                                        {displaySubcategory && <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm shadow-sm max-w-[150px] truncate">{displaySubcategory}</Badge>}
                                        {service.isFeatured === true && <Badge variant="warning" className="bg-white/90 backdrop-blur-sm">Featured</Badge>}
                                    </div>
                                </div>

                                <div className="p-4 flex-1 flex flex-col">
                                    <div className="flex justify-between items-start mb-1.5 gap-2">
                                        <h3 className="text-base font-bold text-slate-900 leading-tight">
                                            {displayTitle}
                                        </h3>
                                    </div>
                                    <p className="text-xs font-medium text-slate-500 line-clamp-2 flex-1">
                                        {displayDesc}
                                    </p>

                                    <div className="flex items-center gap-4 py-3 border-y border-slate-100 mt-3 mb-3 bg-slate-50/50 -mx-4 px-4">
                                        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
                                            <div className="w-6 h-6 rounded-md bg-emerald-50 text-emerald-600 flex items-center justify-center">
                                                <IndianRupee size={14} />
                                            </div>
                                            {displayPrice.toLocaleString('en-IN')}{service.effectivePrice != null ? ' effective' : ''}
                                        </div>
                                        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
                                            <div className="w-6 h-6 rounded-md bg-blue-50 text-blue-600 flex items-center justify-center">
                                                <Clock size={14} />
                                            </div>
                                            {displayDuration} mins
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                                                ID: {safeUuid.substring(0, 8)}
                                            </span>
                                            {displayCode !== 'N/A' && (
                                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                                                    Code: {displayCode}
                                                </span>
                                            )}
                                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{service.isActive === false ? 'Inactive' : 'Active'}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <button
                                                onClick={() => handleEditClick(service)}
                                                className="p-1.5 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors border border-transparent hover:border-primary/20"
                                            >
                                                <Edit2 size={14} />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteClick(safeUuid, displayTitle)}
                                                className="p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors border border-transparent hover:border-rose-200"
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {isAddServiceOpen && (
                <>
                    <div
                        className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 transition-opacity"
                        onClick={() => !isSubmitting && closeMenuAndModal()}
                    />
                    <div className="fixed inset-y-0 right-0 z-50 w-full md:w-[600px] bg-white shadow-2xl transform transition-transform duration-300 flex flex-col">
                        <div className="flex items-center justify-between p-5 border-b border-slate-100">
                            <div>
                                <h2 className="text-lg font-bold text-slate-900 tracking-tight">
                                    {editingService ? 'Edit Service Details' : 'Add New Service'}
                                </h2>
                                <p className="text-xs font-medium text-slate-500">
                                    {editingService ? 'Update the details for this service offering.' : 'Create a new service offering for your catalog.'}
                                </p>
                            </div>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => !isSubmitting && closeMenuAndModal()}
                                className="p-1.5 text-slate-400 hover:text-slate-700 bg-slate-50 hover:bg-slate-100 rounded-full"
                            >
                                <X size={18} />
                            </Button>
                        </div>

                        {submitError && (
                            <div className="mx-5 mt-4 p-3 bg-rose-50 border border-rose-100 rounded-lg flex items-start gap-2.5 text-xs font-semibold text-rose-700">
                                <AlertCircle size={16} className="shrink-0 text-rose-500 mt-0.5" />
                                <span>{submitError}</span>
                            </div>
                        )}

                        <form onSubmit={handleFormSubmit} className="flex-1 flex flex-col overflow-hidden">
                            <div className="flex-1 overflow-y-auto p-5 space-y-5 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-200 [&::-webkit-scrollbar-thumb]:rounded-full">

                                <div className="space-y-3">
                                    <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Service Media</h3>
                                    <Input
                                        label="Thumbnail URL (Optional)"
                                        name="thumbnailImage"
                                        value={formData.thumbnailImage}
                                        onChange={handleInputChange}
                                        placeholder="https://example.com/image.jpg"
                                    />
                                </div>

                                <div className="w-full h-px bg-slate-100"></div>

                                <div className="space-y-3">
                                    <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Basic Details</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        <Input
                                            label="Service Title"
                                            name="title"
                                            value={formData.title}
                                            onChange={handleInputChange}
                                            placeholder="e.g. Professional Nursing Care"
                                            required
                                        />
                                        <Select
                                            label="Status"
                                            name="status"
                                            value={formData.status}
                                            onChange={(event) => setFormData((current) => ({ ...current, status: event.target.value as ServiceStatus }))}
                                            options={[{ label: 'Draft', value: 'DRAFT' }, { label: 'Published', value: 'PUBLISHED' }, { label: 'Archived', value: 'ARCHIVED' }]}
                                        />
                                        <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 pt-7">
                                            <input type="checkbox" checked={formData.isActive} onChange={(event) => setFormData((current) => ({ ...current, isActive: event.target.checked }))} />
                                            Active
                                        </label>
                                        <Input
                                            label="Service Code"
                                            name="serviceCode"
                                            value={formData.serviceCode}
                                            onChange={handleInputChange}
                                            placeholder="e.g. SRV-1001"
                                            required
                                        />
                                        <div className="md:col-span-2">
                                            <label className="text-sm font-semibold text-slate-700 block mb-1.5">Service Category</label>
                                            {categories.length > 0 ? (
                                                <Select
                                                    name="categoryUuid"
                                                    value={formData.categoryUuid}
                                                    onChange={handleInputChange as any}
                                                    options={[
                                                        { label: 'Select a category...', value: '' },
                                                        ...categories.map((cat: any) => ({
                                                            label: cat.name || cat.title || 'Unnamed Category',
                                                            value: cat.uuid
                                                        }))
                                                    ]}
                                                />
                                            ) : (
                                                <p className="text-xs font-medium text-amber-600">
                                                    Service categories could not be loaded. Refresh the page and try again.
                                                </p>
                                            )}
                                        </div>
                                        <div className="md:col-span-2 flex flex-col gap-1.5 w-full">
                                            <label className="text-sm font-semibold text-slate-700">Short Description</label>
                                            <textarea
                                                name="shortDescription"
                                                value={formData.shortDescription}
                                                onChange={handleInputChange as any}
                                                className="w-full bg-slate-50 hover:bg-slate-100 border border-transparent focus:bg-white focus:border-primary/30 rounded-xl focus:outline-none focus:ring-4 focus:ring-primary/10 text-sm font-medium text-slate-800 placeholder-slate-400 transition-all p-3 resize-none h-24"
                                                placeholder="Briefly describe the service offering..."
                                                required
                                            ></textarea>
                                        </div>
                                    </div>
                                </div>

                                <div className="w-full h-px bg-slate-100"></div>

                                <div className="space-y-3">
                                    <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Pricing & Duration</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        <Input
                                            label="Base Price"
                                            name="basePrice"
                                            value={formData.basePrice}
                                            onChange={handleInputChange}
                                            placeholder="e.g. 8500"
                                            type="number"
                                            leftIcon={<IndianRupee size={14} />}
                                            required
                                        />
                                        <Input
                                            label="Duration (Minutes)"
                                            name="durationMinutes"
                                            value={formData.durationMinutes}
                                            onChange={handleInputChange}
                                            placeholder="e.g. 60"
                                            type="number"
                                            leftIcon={<Clock size={14} />}
                                            required
                                        />
                                        <Select label="Discount Type" name="discountType" value={formData.discountType} onChange={handleInputChange as any} options={[{ label: 'None', value: 'NONE' }, { label: 'Percentage', value: 'PERCENTAGE' }, { label: 'Fixed', value: 'FIXED' }]} />
                                        <Input label="Discount Value" name="discountValue" type="number" min={0} value={formData.discountValue} onChange={handleInputChange} />
                                        <Input label="GST Percent" name="gstPercent" type="number" min={0} value={formData.gstPercent} onChange={handleInputChange} />
                                        <Input label="Display Order" name="displayOrder" type="number" min={0} value={formData.displayOrder} onChange={handleInputChange} />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-2">
                                        {([
                                            ['canProviderOffer', 'Providers can offer'],
                                            ['requiresPrescription', 'Requires prescription'],
                                            ['requiresAssessment', 'Requires assessment'],
                                            ['isFeatured', 'Featured service'],
                                        ] as const).map(([field, label]) => <label key={field} className="flex items-center gap-2 text-sm font-semibold text-slate-700"><input type="checkbox" checked={formData[field]} onChange={(event) => setFormData((current) => ({ ...current, [field]: event.target.checked }))} />{label}</label>)}
                                    </div>
                                </div>
                            </div>

                            <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-end gap-3">
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => !isSubmitting && closeMenuAndModal()}
                                    disabled={isSubmitting}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    size="sm"
                                    disabled={isSubmitting}
                                    leftIcon={!isSubmitting ? <Check size={16} /> : undefined}
                                >
                                    {isSubmitting ? (
                                        <span className="flex items-center gap-2">
                                            <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Saving...
                                        </span>
                                    ) : (editingService ? 'Save Changes' : 'Save Service')}
                                </Button>
                            </div>
                        </form>
                    </div>
                </>
            )}
        </div>
    );
};

export default OurServicesCom;
