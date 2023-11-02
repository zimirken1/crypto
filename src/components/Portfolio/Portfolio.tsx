import React, { useState } from 'react';
import { useAppSelector } from '../../hooks/redux';
import { cryptAPI } from '../../services/CryptService';
import Modal from '../UI/Modal/Modal';
import PortfolioList from '../PortfolioList/PortfolioList';
import styles from './Portfolio.module.scss';
import { useFormatValue } from '../../hooks/useFormatValue';

const POLLING_INTERVAL = Number(process.env.REACT_APP_POLLING_INTERVAL);

const Portfolio: React.FC = () => {
    const formatValue = useFormatValue();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };
    const portfolio = useAppSelector((state) => state.portfolio.items);

    const coinIds = portfolio.map((item) => item.id).join(',');

    const { data: currentCryptos } =
        cryptAPI.useGetMultipleCryptocurrenciesQuery(
            {
                ids: coinIds,
            },
            {
                pollingInterval: POLLING_INTERVAL,
            },
        );

    let originalValue = 0;
    let totalValue = 0;

    portfolio.forEach((item) => {
        originalValue += item.totalCost;
        const currentCrypto = currentCryptos?.data.find(
            (crypto) => crypto.id === item.id,
        );
        if (currentCrypto) {
            const currentPrice = parseFloat(currentCrypto.priceUsd);
            totalValue += item.amount * currentPrice;
        }
    });

    const differenceValue = totalValue - originalValue;
    const differencePercentage = originalValue > 0
        ? formatValue(((differenceValue / originalValue) * 100).toString())
        : '0.00';

    const getValueClass = (value: number) => {
        return value >= 0 ? styles.positiveChange : styles.negativeChange;
    };

    return (
        <>
            <Modal show={isModalOpen} onClose={handleCloseModal}>
                <PortfolioList />
            </Modal>
            <div
                onClick={handleOpenModal}
                className={styles.portfolioContainer}
            >
                <h2>Your Portfolio</h2>
                <p>
                    {formatValue(totalValue.toString())} USD
                    <span className={getValueClass(differenceValue)}>
                        {differenceValue >= 0
                            ? ` +${formatValue(differenceValue.toString())} `
                            : ` ${formatValue(differenceValue.toString())} `}
                        ({differencePercentage} %)
                    </span>
                </p>
            </div>
        </>
    );
};

export default Portfolio;
