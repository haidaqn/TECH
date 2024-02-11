import { useState, useEffect } from 'react';

export const useDebounce = (value: string, seconds: number): string => {
    const [decounceValue, setDecounceValue] = useState<string>('');
    useEffect(() => {
        const setTimeOutID = setTimeout(() => {
            setDecounceValue(value);
        }, seconds);
        return () => {
            clearTimeout(setTimeOutID);
        };
    }, [value, seconds]);
    return decounceValue;
};
