import React from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import { removeFromPortfolio } from '../../store/reducers/portfolioSlice';
import Button from '../UI/Button/Button';
import styles from './PortfolioList.module.scss';
import { useImageErrorHandler } from '../../hooks/useImageErrorHandler';

const PortfolioList: React.FC = () => {
    const handleImageError = useImageErrorHandler(
        'https://coincap.io/static/logo_mark.png',
    );
    const portfolio = useAppSelector((state) => state.portfolio.items);
    const dispatch = useAppDispatch();

    const handleRemove = (id: string) => {
        dispatch(removeFromPortfolio(id));
    };

    return (
        <div>
            <h3 className={styles.header}>Your Coins</h3>
            <div className={styles.portfolioListContainer}>
                <ul className={styles.list}>
                    {portfolio.map((coin) => (
                        <li key={coin.id}>
                            <img
                                height={16}
                                width={16}
                                src={`https://assets.coincap.io/assets/icons/${coin.symbol.toLowerCase()}@2x.png`}
                                alt={coin.symbol}
                                onError={handleImageError}
                            />
                            {coin.symbol}: {coin.amount}
                            <Button
                                onClick={() => handleRemove(coin.id)}
                                text={'Remove'}
                            />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default PortfolioList;
