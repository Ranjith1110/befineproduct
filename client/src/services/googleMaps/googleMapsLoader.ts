import { ENV } from '../../config/env';

interface GoogleMapsWindow extends Window {
    google?: unknown;
    __befineGoogleMapsReady?: () => void;
}

const SCRIPT_ID = 'befine-google-maps-script';
let googleMapsPromise: Promise<unknown> | null = null;

export const loadGoogleMaps = (): Promise<unknown> => {
    if (!ENV.GOOGLE_MAPS_API_KEY) {
        return Promise.reject(new Error('Google Maps configuration is missing.'));
    }

    const mapsWindow = window as GoogleMapsWindow;
    if (mapsWindow.google) return Promise.resolve(mapsWindow.google);
    if (googleMapsPromise) return googleMapsPromise;

    googleMapsPromise = new Promise((resolve, reject) => {
        mapsWindow.__befineGoogleMapsReady = () => {
            if (mapsWindow.google) {
                resolve(mapsWindow.google);
            } else {
                reject(new Error('Unable to load Google Maps.'));
            }
            delete mapsWindow.__befineGoogleMapsReady;
        };

        const existingScript = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;
        if (existingScript) {
            existingScript.addEventListener('error', () => reject(new Error('Unable to load Google Maps.')), { once: true });
            return;
        }

        const script = document.createElement('script');
        script.id = SCRIPT_ID;
        script.async = true;
        script.defer = true;
        script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(ENV.GOOGLE_MAPS_API_KEY)}&loading=async&libraries=places,marker&callback=__befineGoogleMapsReady`;
        script.onerror = () => {
            googleMapsPromise = null;
            reject(new Error('Unable to load Google Maps.'));
        };
        document.head.appendChild(script);
    });

    return googleMapsPromise;
};
