import { useEffect, useRef, useState } from 'react';
import { AlertCircle, Check, MapPin, X } from 'lucide-react';
import { Button } from '../../../../components/ui/Button';
import { Input } from '../../../../components/ui/Input';
import {
    createProvider,
    getProviderServiceCategories,
    type CreateProviderPayload,
    type ProviderService,
    type ProviderServiceCategory,
} from '../../api/providers';
import { loadGoogleMaps } from '../../../../services/googleMaps/googleMapsLoader';

interface AddressComponent {
    longText?: string;
    long_name?: string;
    types: string[];
}

interface GooglePlace {
    fetchFields: (options: { fields: string[] }) => Promise<void>;
    formattedAddress?: string;
    location?: { lat: () => number; lng: () => number };
    addressComponents?: AddressComponent[];
}

interface PlaceSelectEvent extends Event {
    place?: GooglePlace;
    placePrediction?: { toPlace: () => GooglePlace };
}

interface MapInstance {
    setCenter: (position: Coordinates) => void;
    setZoom: (zoom: number) => void;
}

interface MarkerInstance {
    map: MapInstance | null;
    position: Coordinates | { lat: () => number; lng: () => number };
    addListener: (eventName: string, handler: () => void) => void;
}

interface GoogleMapsApi {
    maps: {
        Map: new (element: HTMLElement, options: Record<string, unknown>) => MapInstance;
        places: {
            PlaceAutocompleteElement: new (options?: Record<string, unknown>) => HTMLElement & { placeholder?: string };
        };
        marker: {
            AdvancedMarkerElement: new (options: Record<string, unknown>) => MarkerInstance;
        };
    };
}

interface Coordinates {
    lat: number;
    lng: number;
}

interface ProviderFormState {
    companyName: string;
    displayName: string;
    registrationNumber: string;
    gstNumber: string;
    licenseNumber: string;
    website: string;
    primaryEmail: string;
    primaryPhone: string;
    contact: {
        spocName: string;
        designation: string;
        email: string;
        phone: string;
    };
    branch: {
        name: string;
        addressLine1: string;
        city: string;
        state: string;
        country: string;
        pincode: string;
        latitude?: number;
        longitude?: number;
    };
    services: ProviderService[];
}

interface ProviderOnboardingModalProps {
    onClose: () => void;
    onSuccess: () => Promise<void>;
    onCategoriesLoaded?: (count: number) => void;
}

const initialFormState: ProviderFormState = {
    companyName: '',
    displayName: '',
    registrationNumber: '',
    gstNumber: '',
    licenseNumber: '',
    website: '',
    primaryEmail: '',
    primaryPhone: '',
    contact: { spocName: '', designation: '', email: '', phone: '' },
    branch: {
        name: 'Primary Branch',
        addressLine1: '',
        city: '',
        state: '',
        country: 'India',
        pincode: '',
        latitude: undefined,
        longitude: undefined,
    },
    services: [],
};

const optional = (value: string): string | undefined => value.trim() || undefined;

const buildCreateProviderPayload = (form: ProviderFormState): CreateProviderPayload => ({
    companyName: form.companyName.trim(),
    displayName: optional(form.displayName),
    registrationNumber: optional(form.registrationNumber),
    gstNumber: optional(form.gstNumber.toUpperCase()),
    licenseNumber: optional(form.licenseNumber),
    website: optional(form.website),
    primaryEmail: form.primaryEmail.trim(),
    primaryPhone: form.primaryPhone.trim(),
    contact: {
        spocName: form.contact.spocName.trim(),
        designation: optional(form.contact.designation),
        email: form.contact.email.trim(),
        phone: form.contact.phone.trim(),
    },
    branch: {
        name: optional(form.branch.name),
        addressLine1: form.branch.addressLine1.trim(),
        city: form.branch.city.trim(),
        state: form.branch.state.trim(),
        country: optional(form.branch.country),
        pincode: form.branch.pincode.trim(),
        latitude: form.branch.latitude,
        longitude: form.branch.longitude,
    },
    services: form.services.map((service) => ({
        name: service.name,
        categoryUuid: service.categoryUuid,
        description: optional(service.description || ''),
    })),
});

const getAddressValue = (components: AddressComponent[], type: string): string => {
    const component = components.find((item) => item.types.includes(type));
    return component?.longText || component?.long_name || '';
};

const ProviderOnboardingModal = ({ onClose, onSuccess, onCategoriesLoaded }: ProviderOnboardingModalProps) => {
    const [form, setForm] = useState<ProviderFormState>(initialFormState);
    const [categories, setCategories] = useState<ProviderServiceCategory[]>([]);
    const [isLoadingCategories, setIsLoadingCategories] = useState(true);
    const [categoryError, setCategoryError] = useState('');
    const [selectedCategoryUuid, setSelectedCategoryUuid] = useState('');
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [submitError, setSubmitError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [mapStatus, setMapStatus] = useState('Loading map...');
    const autocompleteHostRef = useRef<HTMLDivElement>(null);
    const mapHostRef = useRef<HTMLDivElement>(null);
    const mapRef = useRef<MapInstance | null>(null);
    const markerRef = useRef<MarkerInstance | null>(null);

    const loadCategories = async () => {
        setIsLoadingCategories(true);
        setCategoryError('');
        try {
            const data = await getProviderServiceCategories();
            const activeCategories = data.filter((category) => category.isActive !== false);
            setCategories(activeCategories);
            onCategoriesLoaded?.(activeCategories.length);
        } catch {
            setCategoryError('Unable to load service categories. Please try again.');
        } finally {
            setIsLoadingCategories(false);
        }
    };

    useEffect(() => {
        let active = true;
        getProviderServiceCategories()
            .then((data) => {
                if (active) {
                    const activeCategories = data.filter((category) => category.isActive !== false);
                    setCategories(activeCategories);
                    onCategoriesLoaded?.(activeCategories.length);
                }
            })
            .catch(() => {
                if (active) setCategoryError('Unable to load service categories. Please try again.');
            })
            .finally(() => {
                if (active) setIsLoadingCategories(false);
            });
        return () => { active = false; };
    }, [onCategoriesLoaded]);

    useEffect(() => {
        let active = true;
        const autocompleteHost = autocompleteHostRef.current;
        const mapHost = mapHostRef.current;
        if (!autocompleteHost || !mapHost) return;

        loadGoogleMaps()
            .then((googleValue) => {
                if (!active) return;
                const google = googleValue as GoogleMapsApi;
                const map = new google.maps.Map(mapHost, {
                    center: { lat: 20.5937, lng: 78.9629 },
                    zoom: 4,
                    mapId: 'DEMO_MAP_ID',
                    mapTypeControl: false,
                    streetViewControl: false,
                    fullscreenControl: false,
                });
                mapRef.current = map;

                const autocomplete = new google.maps.places.PlaceAutocompleteElement();
                autocomplete.placeholder = 'Search for an address...';
                autocomplete.className = 'block w-full';
                autocompleteHost.replaceChildren(autocomplete);

                autocomplete.addEventListener('gmp-select', (async (event: PlaceSelectEvent) => {
                    const place = event.placePrediction?.toPlace() || event.place;
                    if (!place) return;

                    await place.fetchFields({
                        fields: ['formattedAddress', 'location', 'addressComponents'],
                    });
                    if (!place.location) return;

                    const latitude = place.location.lat();
                    const longitude = place.location.lng();
                    const position = { lat: latitude, lng: longitude };
                    const components = place.addressComponents || [];
                    const street = [
                        getAddressValue(components, 'subpremise'),
                        getAddressValue(components, 'premise'),
                        getAddressValue(components, 'street_number'),
                        getAddressValue(components, 'route'),
                    ].filter(Boolean).join(' ');
                    const city = getAddressValue(components, 'locality')
                        || getAddressValue(components, 'postal_town')
                        || getAddressValue(components, 'administrative_area_level_2');

                    setForm((current) => ({
                        ...current,
                        branch: {
                            ...current.branch,
                            addressLine1: street || place.formattedAddress || '',
                            city,
                            state: getAddressValue(components, 'administrative_area_level_1'),
                            country: getAddressValue(components, 'country'),
                            pincode: getAddressValue(components, 'postal_code'),
                            latitude,
                            longitude,
                        },
                    }));

                    map.setCenter(position);
                    map.setZoom(16);

                    if (!markerRef.current) {
                        const marker = new google.maps.marker.AdvancedMarkerElement({
                            map,
                            position,
                            gmpDraggable: true,
                            title: 'Selected provider location',
                        });
                        marker.addListener('dragend', () => {
                            const markerPosition = marker.position;
                            const lat = typeof markerPosition.lat === 'function' ? markerPosition.lat() : markerPosition.lat;
                            const lng = typeof markerPosition.lng === 'function' ? markerPosition.lng() : markerPosition.lng;
                            setForm((current) => ({
                                ...current,
                                branch: { ...current.branch, latitude: lat, longitude: lng },
                            }));
                        });
                        markerRef.current = marker;
                    } else {
                        markerRef.current.map = map;
                        markerRef.current.position = position;
                    }
                    setMapStatus('');
                }) as EventListener);
                setMapStatus('');
            })
            .catch((error: unknown) => {
                if (active) setMapStatus(error instanceof Error ? error.message : 'Unable to load Google Maps.');
            });

        return () => {
            active = false;
            if (markerRef.current) markerRef.current.map = null;
            autocompleteHost.replaceChildren();
        };
    }, []);

    const setField = (field: keyof ProviderFormState, value: string) => {
        setForm((current) => ({ ...current, [field]: value }));
        setErrors((current) => ({ ...current, [field]: '' }));
    };

    const setContactField = (field: keyof ProviderFormState['contact'], value: string) => {
        setForm((current) => ({ ...current, contact: { ...current.contact, [field]: value } }));
        setErrors((current) => ({ ...current, [`contact.${field}`]: '' }));
    };

    const setBranchField = (field: keyof ProviderFormState['branch'], value: string | number | undefined) => {
        setForm((current) => ({ ...current, branch: { ...current.branch, [field]: value } }));
        setErrors((current) => ({ ...current, [`branch.${field}`]: '' }));
    };

    const addService = (uuid: string) => {
        setSelectedCategoryUuid(uuid);
        const category = categories.find((item) => item.uuid === uuid);
        if (!category || form.services.some((service) => service.categoryUuid === uuid)) return;
        setForm((current) => ({
            ...current,
            services: [...current.services, {
                name: category.name,
                categoryUuid: category.uuid,
                description: category.description || '',
            }],
        }));
        setErrors((current) => ({ ...current, services: '' }));
        setSelectedCategoryUuid('');
    };

    const validate = (): boolean => {
        const next: Record<string, string> = {};
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phonePattern = /^\+?[1-9]\d{7,14}$/;

        if (form.companyName.trim().length < 2) next.companyName = 'Company name is required.';
        if (!emailPattern.test(form.primaryEmail)) next.primaryEmail = 'Enter a valid primary email.';
        if (!phonePattern.test(form.primaryPhone)) next.primaryPhone = 'Enter a valid primary phone number.';
        if (form.contact.spocName.trim().length < 2) next['contact.spocName'] = 'SPOC name is required.';
        if (!emailPattern.test(form.contact.email)) next['contact.email'] = 'Enter a valid SPOC email.';
        if (!phonePattern.test(form.contact.phone)) next['contact.phone'] = 'Enter a valid SPOC phone number.';
        if (form.branch.addressLine1.trim().length < 3) next['branch.addressLine1'] = 'Address is required.';
        if (form.branch.city.trim().length < 2) next['branch.city'] = 'City is required.';
        if (form.branch.state.trim().length < 2) next['branch.state'] = 'State is required.';
        if (!/^\d{6}$/.test(form.branch.pincode)) next['branch.pincode'] = 'Enter a valid 6-digit pincode.';
        if (form.services.length === 0) {
            next.services = 'Select at least one service category.';
        } else if (form.services.some((service) => service.name.trim().length < 2 || !service.categoryUuid)) {
            next.services = 'Each selected category requires an offered service name.';
        }
        if (form.gstNumber && !/^\d{2}[A-Z]{5}\d{4}[A-Z][A-Z\d]Z[A-Z\d]$/.test(form.gstNumber.toUpperCase())) {
            next.gstNumber = 'Enter a valid GST number.';
        }
        if (form.website) {
            try { new URL(form.website); } catch { next.website = 'Enter a valid website URL.'; }
        }

        setErrors(next);
        return Object.keys(next).length === 0;
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!validate() || isSubmitting) return;
        setIsSubmitting(true);
        setSubmitError('');

        try {
            await createProvider(buildCreateProviderPayload(form));
            await onSuccess();
            onClose();
        } catch (error: unknown) {
            setSubmitError(error instanceof Error ? error.message : 'Unable to create provider. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <div className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40" onClick={() => !isSubmitting && onClose()} />
            <div className="fixed inset-y-0 right-0 z-50 w-full md:w-[700px] bg-white shadow-2xl flex flex-col">
                <div className="flex items-center justify-between p-5 border-b border-slate-100">
                    <div>
                        <h2 className="text-lg font-bold text-slate-900 tracking-tight">Onboard Service Provider</h2>
                        <p className="text-xs font-medium text-slate-500">Enter provider, contact, service, and branch details.</p>
                    </div>
                    <Button type="button" variant="ghost" size="sm" disabled={isSubmitting} onClick={onClose} className="p-1.5 rounded-full">
                        <X size={18} />
                    </Button>
                </div>

                {submitError && (
                    <div className="mx-5 mt-4 p-3 bg-rose-50 border border-rose-100 rounded-lg flex gap-2 text-xs font-semibold text-rose-700">
                        <AlertCircle size={16} className="shrink-0" /> {submitError}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="flex-1 flex flex-col overflow-hidden">
                    <div className="flex-1 overflow-y-auto p-5 space-y-5">
                        <section className="space-y-3">
                            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">1. Company Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <Input label="Company Name *" value={form.companyName} error={errors.companyName} onChange={(e) => setField('companyName', e.target.value)} />
                                <Input label="Display Name" value={form.displayName} onChange={(e) => setField('displayName', e.target.value)} />
                                <Input label="Registration Number" value={form.registrationNumber} onChange={(e) => setField('registrationNumber', e.target.value)} />
                                <Input label="GST Number" value={form.gstNumber} error={errors.gstNumber} onChange={(e) => setField('gstNumber', e.target.value)} />
                                <Input label="License Number" value={form.licenseNumber} onChange={(e) => setField('licenseNumber', e.target.value)} />
                                <Input label="Website" type="url" value={form.website} error={errors.website} onChange={(e) => setField('website', e.target.value)} />
                                <Input label="Primary Email *" type="email" value={form.primaryEmail} error={errors.primaryEmail} onChange={(e) => setField('primaryEmail', e.target.value)} />
                                <Input label="Primary Phone *" type="tel" value={form.primaryPhone} error={errors.primaryPhone} onChange={(e) => setField('primaryPhone', e.target.value)} />
                            </div>
                            <div>
                                <label className="text-sm font-semibold text-slate-700 block mb-1.5">Services *</label>
                                <select disabled={isLoadingCategories || Boolean(categoryError)} value={selectedCategoryUuid} onChange={(e) => addService(e.target.value)} className="w-full bg-slate-50 border border-transparent rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-primary/10 disabled:opacity-60">
                                    <option value="">{isLoadingCategories ? 'Loading service categories...' : 'Select a service category...'}</option>
                                    {categories.map((category) => <option key={category.uuid} value={category.uuid}>{category.name}</option>)}
                                </select>
                                {categoryError && <div className="mt-2 flex items-center justify-between gap-3 text-xs font-medium text-rose-600"><span>{categoryError}</span><Button type="button" variant="ghost" size="sm" onClick={() => void loadCategories()}>Retry</Button></div>}
                                {errors.services && <p className="text-xs text-rose-500 mt-1">{errors.services}</p>}
                                <div className="mt-2 space-y-2">
                                    {form.services.map((service, index) => (
                                        <div key={service.categoryUuid} className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                                            <div className="flex items-center justify-between gap-2 mb-2">
                                                <span className="text-xs font-bold text-slate-800">Selected category: {categories.find((category) => category.uuid === service.categoryUuid)?.name || service.categoryUuid}</span>
                                                <button type="button" onClick={() => setForm((current) => ({ ...current, services: current.services.filter((item) => item.categoryUuid !== service.categoryUuid) }))} className="text-slate-400 hover:text-rose-500"><X size={14} /></button>
                                            </div>
                                            <Input label="Offered Service Name *" value={service.name} onChange={(e) => setForm((current) => ({ ...current, services: current.services.map((item, itemIndex) => itemIndex === index ? { ...item, name: e.target.value } : item) }))} />
                                            <Input placeholder="Service description (optional)" value={service.description || ''} onChange={(e) => setForm((current) => ({ ...current, services: current.services.map((item, itemIndex) => itemIndex === index ? { ...item, description: e.target.value } : item) }))} />
                                            <p className="text-[10px] text-slate-400 mt-1">Category UUID: {service.categoryUuid}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>

                        <div className="h-px bg-slate-100" />
                        <section className="space-y-3">
                            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">2. SPOC Details</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <Input label="SPOC Name *" value={form.contact.spocName} error={errors['contact.spocName']} onChange={(e) => setContactField('spocName', e.target.value)} />
                                <Input label="Designation" value={form.contact.designation} onChange={(e) => setContactField('designation', e.target.value)} />
                                <Input label="SPOC Email *" type="email" value={form.contact.email} error={errors['contact.email']} onChange={(e) => setContactField('email', e.target.value)} />
                                <Input label="SPOC Phone *" type="tel" value={form.contact.phone} error={errors['contact.phone']} onChange={(e) => setContactField('phone', e.target.value)} />
                            </div>
                        </section>

                        <div className="h-px bg-slate-100" />
                        <section className="space-y-3">
                            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2"><MapPin size={14} />3. Location</h3>
                            <div>
                                <label className="text-sm font-semibold text-slate-700 block mb-1.5">Search Address</label>
                                <div ref={autocompleteHostRef} className="relative z-[60] min-h-11 rounded-xl bg-slate-50" />
                            </div>
                            <div className="relative h-56 rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
                                <div ref={mapHostRef} className="absolute inset-0" />
                                {mapStatus && <div className="absolute inset-0 z-10 flex items-center justify-center p-4 bg-slate-50 text-center text-xs font-semibold text-slate-600">{mapStatus}<br />You can enter the address manually.</div>}
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <Input label="Branch Name" value={form.branch.name} onChange={(e) => setBranchField('name', e.target.value)} />
                                <div className="md:col-span-2"><Input label="Selected Address *" value={form.branch.addressLine1} error={errors['branch.addressLine1']} onChange={(e) => setBranchField('addressLine1', e.target.value)} /></div>
                                <Input label="City *" value={form.branch.city} error={errors['branch.city']} onChange={(e) => setBranchField('city', e.target.value)} />
                                <Input label="State *" value={form.branch.state} error={errors['branch.state']} onChange={(e) => setBranchField('state', e.target.value)} />
                                <Input label="Country" value={form.branch.country} onChange={(e) => setBranchField('country', e.target.value)} />
                                <Input label="Pincode / Zip *" value={form.branch.pincode} error={errors['branch.pincode']} onChange={(e) => setBranchField('pincode', e.target.value)} />
                                <Input label="Latitude" type="number" step="any" value={form.branch.latitude ?? ''} onChange={(e) => setBranchField('latitude', e.target.value === '' ? undefined : Number(e.target.value))} />
                                <Input label="Longitude" type="number" step="any" value={form.branch.longitude ?? ''} onChange={(e) => setBranchField('longitude', e.target.value === '' ? undefined : Number(e.target.value))} />
                            </div>
                        </section>
                    </div>

                    <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-end gap-3">
                        <Button type="button" variant="ghost" size="sm" disabled={isSubmitting} onClick={onClose}>Cancel</Button>
                        <Button type="submit" size="sm" disabled={isLoadingCategories || Boolean(categoryError)} isLoading={isSubmitting} leftIcon={<Check size={16} />}>
                            {isSubmitting ? 'Saving...' : 'Save Provider'}
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default ProviderOnboardingModal;
