import React from 'react';
import { ICrypt } from '../../../models/ICrypt';
import { cryptAPI } from '../../../services/CryptService';
import { useFormatValue } from '../../../hooks/useFormatValue';
import styles from './Navbar.module.scss';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
    const formatValue = useFormatValue();

    const { data, error, isLoading } = cryptAPI.useGetCryptocurrenciesQuery({
        limit: 3,
        offset: 0,
    });

    const topCryptos: ICrypt[] = data ? data.data : [];

    return (
        <nav className={styles.navbar}>
            <Link to="/">
                <h1>CryptoTracker</h1>
            </Link>
            <div className={styles.cryptos}>
                {isLoading && <span>Loading...</span>}
                {error && <span>Error fetching top cryptos</span>}
                {topCryptos.map((crypto) => (
                    <div key={crypto.id} className={styles.crypto}>
                        <strong>{crypto.symbol}</strong>: $
                        {formatValue(crypto.priceUsd)}
                    </div>
                ))}
            </div>
        </nav>
    );
};

export default Navbar;
