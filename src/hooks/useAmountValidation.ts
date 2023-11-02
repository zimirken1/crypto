import { useState } from 'react';
import { ICrypt } from '../models/ICrypt';
import { useFormatValue } from './useFormatValue';

export const useAmountValidation = (crypto?: ICrypt) => {
    const formatValue = useFormatValue();
    const [error, setError] = useState<string | null>(null);

    const validate = (amount: string): boolean => {
        if (!crypto) {
            setError(null);
            return true;
        }

        const numericAmount = Number(amount);

        if (!Number.isInteger(numericAmount)) {
            setError('Amount should be an integer');
            return false;
        }

        if (numericAmount < 1) {
            setError('Minimum allowed amount is 1');
            return false;
        }

        if (
            crypto.maxSupply !== null &&
            numericAmount > Number(crypto.maxSupply)
        ) {
            setError(
                `Maximum allowed amount is ${formatValue(crypto.maxSupply)}`,
            );
            return false;
        }

        setError(null);
        return true;
    };

    return { error, validate };
};
