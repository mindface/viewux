import { useEffect, useState } from 'react';

export function useOpenCv() {
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const script = document.createElement('script');
        script.src = '/js/opencv.js';
        script.async = true;
        script.onload = () => {
            cv.onRuntimeInitialized = () => {
                setIsReady(true);
            };
        };
        document.body.appendChild(script);
    }, []);

    return isReady;
}