import {useCallback} from "react";

export const useFormatValue = () => {
    const formatValue = useCallback((value: string | null | undefined) => {
        if (value === null || value === undefined) return '-';
        const roundedToTwo = parseFloat(value).toFixed(2);
        if (roundedToTwo === "0.00") {
            return parseFloat(value).toFixed(8);
        }
        return roundedToTwo;
    }, []);

    return formatValue;
};
