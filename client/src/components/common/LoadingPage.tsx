import { useEffect, useState } from 'react';

export const LoadingPage = () => {
    const [showLoading, setShowLoading] = useState(false);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setShowLoading(true);
        }, 2000);

        return () => clearTimeout(timeoutId);
    }, []);

    return (
        <div
            className={`h-screen w-screen fixed z-20 flex justify-center items-center top-0 left-0 ${
                showLoading ? 'loading-page' : ''
            } dark:bg-[hsl(var(--background))] bg-white`}
        >
            <div className="spinner">
                <div className="spinner-item"></div>
                <div className="spinner-item"></div>
                <div className="spinner-item"></div>
            </div>
        </div>
    );
};
