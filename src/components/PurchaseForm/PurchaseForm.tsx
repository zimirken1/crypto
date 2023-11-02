import React, { useState } from 'react';
import { ICrypt } from '../../models/ICrypt';
import Button from '../UI/Button/Button';
import styles from './PurchaseForm.module.scss';
import Input from '../UI/Input/Input';
import { useAmountValidation } from '../../hooks/useAmountValidation';
import { useImageErrorHandler } from '../../hooks/useImageErrorHandler';

interface PurchaseFormProps {
    crypto: ICrypt;
    onSubmit: (amount: number) => void;
}

const PurchaseForm: React.FC<PurchaseFormProps> = ({ crypto, onSubmit }) => {
    const handleImageError = useImageErrorHandler(
        'https://coincap.io/static/logo_mark.png',
    );

    const [amount, setAmount] = useState<string>('1');
    const { error, validate } = useAmountValidation(crypto);

    const handlePurchase = (e: React.FormEvent) => {
        e.preventDefault();
        if (validate(amount)) {
            onSubmit(Number(amount));
        }
    };

    return (
        <div className={styles.purchaseFormContainer}>
            <h2>
                Purchase {crypto.symbol}
                <img
                    height={24}
                    width={24}
                    src={`https://assets.coincap.io/assets/icons/${crypto.symbol.toLowerCase()}@2x.png`}
                    alt={crypto.id}
                    onError={handleImageError}
                />
            </h2>
            <form onSubmit={handlePurchase}>
                <div>
                    <label>Amount:</label>
                    <Input
                        type="number"
                        value={amount}
                        onChange={(value) => {
                            setAmount(value);
                        }}
                    />
                </div>
                {error && <p className={styles.error}>{error}</p>}
                <div>
                    <label>Total:</label>
                    <span>
                        {(
                            Number(crypto.priceUsd) * (Number(amount) || 1)
                        ).toFixed(2)}{' '}
                        USD
                    </span>
                </div>
                <div className={styles.buttonContainer}>
                    <Button text={'Purchase'} type="submit" />
                </div>
            </form>
        </div>
    );
};

export default PurchaseForm;
