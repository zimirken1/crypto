import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { cryptAPI } from '../../services/CryptService';
import { useImageErrorHandler } from '../../hooks/useImageErrorHandler';
import { useFormatValue } from '../../hooks/useFormatValue';
import CryptHistoryChart from '../CryptHistoryChart/CryptHistoryChart';
import Select from '../UI/Select/Select';
import Button from '../UI/Button/Button';
import Loader from '../UI/Loader/Loader';
import styles from '../CryptInfo/CryptInfo.module.scss';
import { useAppDispatch } from '../../hooks/redux';
import { addToPortfolio } from '../../store/reducers/portfolioSlice';
import Input from '../UI/Input/Input';
import { useAmountValidation } from '../../hooks/useAmountValidation';
import Modal from '../UI/Modal/Modal';

const CryptInfo: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [cryptoAmount, setCryptoAmount] = useState<string>('1');
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { id } = useParams<{ id?: string }>();
    const formatValue = useFormatValue();
    const handleImageError = useImageErrorHandler(
        'https://coincap.io/static/logo_mark.png',
    );

    const { data, error, isLoading } = id
        ? cryptAPI.useGetSingleCryptocurrencyQuery({ id })
        : {
              data: undefined,
              error: undefined,
              isLoading: false,
          };

    const { error: validationError, validate } = useAmountValidation(
        data?.data,
    );

    const { name, symbol, rank, priceUsd, supply, marketCapUsd, maxSupply } =
        data?.data || {};

    const [selectedDaysAgo, setSelectedDaysAgo] = useState(1);
    const [startDate, setStartDate] = useState<string>(
        getUnixTimeForDaysAgo(1),
    );

    function getUnixTimeForDaysAgo(daysAgo: number): string {
        const time = Date.now() - daysAgo * 24 * 60 * 60 * 1000;
        return time.toString();
    }

    const endTime = Date.now().toString();

    function getIntervalBasedOnDays(daysAgo: number): string {
        if (daysAgo === 1) return 'm30';
        if (daysAgo <= 7) return 'h2';
        return 'd1';
    }

    const handleAddToPortfolio = () => {
        if (data && data.data && validate(cryptoAmount)) {
            const numericAmount = parseFloat(cryptoAmount);
            dispatch(
                addToPortfolio({ crypto: data.data, amount: numericAmount }),
            );
            setIsModalOpen(true);
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleNavigateHome = () => {
        navigate('/');
    };

    const interval = getIntervalBasedOnDays(selectedDaysAgo);

    if (isLoading) return <Loader />;
    if (error) return <div>Error fetching data</div>;

    return (
        <div className={styles.cryptInfoContainer}>
            <Modal show={isModalOpen} onClose={handleCloseModal}>
                <h2>Success!</h2>
                <p>
                    The cryptocurrency has been successfully added to your
                    portfolio.
                </p>
            </Modal>
            {symbol && (
                <div className={styles.cryptInfo}>
                    <img
                        height={64}
                        width={64}
                        src={`https://assets.coincap.io/assets/icons/${symbol.toLowerCase()}@2x.png`}
                        alt={symbol}
                        onError={handleImageError}
                    />
                    <h2>
                        {name} ({symbol})
                    </h2>
                    <p>Rank: {rank}</p>
                    <p>Price: ${formatValue(priceUsd || null)}</p>
                    <p>Supply: {formatValue(supply || null)}</p>
                    <p>MarketCapUSD: ${formatValue(marketCapUsd || null)}</p>
                    <p>MaxSupply: {formatValue(maxSupply || null)}</p>
                    <div>
                        <h2>Amount: </h2>
                        <Input
                            type="number"
                            value={cryptoAmount}
                            onChange={setCryptoAmount}
                            onBlur={() => validate(cryptoAmount)}
                        />
                        {validationError && (
                            <p className={styles.error}>{validationError}</p>
                        )}
                    </div>
                    <div>
                        <Button
                            className={styles.btn}
                            text={'Back'}
                            onClick={handleNavigateHome}
                        />
                        <Button
                            className={styles.btn}
                            text={'Add'}
                            onClick={handleAddToPortfolio}
                        />
                    </div>
                </div>
            )}
            <div className={styles.chartContainer}>
                <div>
                    <label htmlFor="startDate-select">Start Date: </label>
                    <Select
                        options={[
                            { value: '1', label: '1 Day' },
                            { value: '7', label: '7 Days' },
                            { value: '30', label: '1 Month' },
                        ]}
                        value={selectedDaysAgo.toString()}
                        onChange={(value) => {
                            const daysAgo = Number(value);
                            setSelectedDaysAgo(daysAgo);
                            setStartDate(getUnixTimeForDaysAgo(daysAgo));
                        }}
                    />
                </div>
                <div>
                    <CryptHistoryChart
                        id={`${id}`}
                        interval={interval}
                        start={startDate}
                        end={endTime}
                    />
                </div>
            </div>
        </div>
    );
};

export default CryptInfo;
