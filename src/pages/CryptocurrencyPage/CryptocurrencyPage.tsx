import React from 'react';
import CryptInfo from '../../components/CryptInfo/CryptInfo';
import styles from './CryptocurrencyPage.module.scss';

const CryptocurrencyPage: React.FC = () => {
    return (
        <div className={styles.container}>
            <CryptInfo />
        </div>
    );
};

export default CryptocurrencyPage;
