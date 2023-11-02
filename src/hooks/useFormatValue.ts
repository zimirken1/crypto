import { useCallback } from 'react';

export const useFormatValue = () => {
    const formatValue = useCallback((value: string | null | undefined) => {
        if (value === null || value === undefined) return '-';
        const numberValue = parseFloat(value);
        if (numberValue === 0) {
            return '0.00';
        }
        return numberValue.toFixed(2);
    }, []);

    return formatValue;
};
