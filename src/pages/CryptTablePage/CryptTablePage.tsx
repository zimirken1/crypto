import React from 'react';
import CryptTable from '../../components/CryptTable/CryptTable';
import styles from './CryptTablePage.module.scss';
import Portfolio from '../../components/Portfolio/Portfolio';

const CryptTablePage: React.FC = () => {
    return (
        <div className={styles.container}>
            <CryptTable />
            <Portfolio />
        </div>
    );
};

export default CryptTablePage;
