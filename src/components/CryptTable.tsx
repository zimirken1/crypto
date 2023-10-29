import React, {useEffect, useMemo, useState} from 'react';
import {useSort} from '../hooks/useSort';
import {ICrypt} from "../models/ICrypt";
import {cryptAPI} from "../services/CryptService";
import {useImageErrorHandler} from '../hooks/useImageErrorHandler';
import {usePagination} from "../hooks/usePagination";
import {useNavigate} from "react-router-dom"
import {useFormatValue} from "../hooks/useFormatValue";
import Button from "./UI/Button/Button";
import Input from "./UI/Input/Input";
import styles from '../styles/CryptTablePage.module.scss';

const ITEMS_PER_PAGE = 15;

const CryptTable: React.FC = () => {
    const navigate = useNavigate();
    const [hasMoreData, setHasMoreData] = useState(true);
    const {page, setPage} = usePagination(1);
    const [search, setSearch] = useState('');
    const handleImageError = useImageErrorHandler("https://coincap.io/static/logo_mark.png");

    const {data: rawCryptocurrencies, error, isLoading} = cryptAPI.useGetCryptocurrenciesQuery({
        limit: ITEMS_PER_PAGE,
        offset: (page - 1) * ITEMS_PER_PAGE,
        search: search
    });

    const cryptocurrencies = useMemo(() => {
        return rawCryptocurrencies && {
            ...rawCryptocurrencies,
            data: rawCryptocurrencies.data.filter((crypt: ICrypt) => {
                return crypt.priceUsd !== null &&
                    crypt.marketCapUsd !== null &&
                    crypt.changePercent24Hr !== null;
            })
        };
    }, [rawCryptocurrencies]);

    useEffect(() => {
        setPage(1);
    }, [search]);

    useEffect(() => {
        if (cryptocurrencies && cryptocurrencies?.data?.length < ITEMS_PER_PAGE) {
            setHasMoreData(false);
        } else {
            setHasMoreData(true);
        }
    }, [cryptocurrencies]);

    const formatValue = useFormatValue();

    const {sortOrder, sortBy, toggleSortOrder, sortFunction} = useSort<ICrypt>();
    const sortedCryptocurrencies = sortOrder !== 'none' && sortBy
        ? [...(cryptocurrencies?.data || [])].sort(sortFunction(sortBy))
        : cryptocurrencies?.data;

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error fetching data</div>;

    return (
        <div className={styles.container}>
            <Input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={setSearch}
            />

            <table>
                <thead>
                <tr>
                    <th>Symbol</th>
                    <th>Logo</th>
                    <th onClick={() => toggleSortOrder('priceUsd')}>
                        Price (USD) {sortBy === 'priceUsd' && (sortOrder === 'ascending' ? '▲' : '▼')}
                    </th>
                    <th onClick={() => toggleSortOrder('marketCapUsd')}>
                        Market Cap (USD) {sortBy === 'marketCapUsd' && (sortOrder === 'ascending' ? '▲' : '▼')}
                    </th>
                    <th onClick={() => toggleSortOrder('changePercent24Hr')}>
                        Change (24h), % {sortBy === 'changePercent24Hr' && (sortOrder === 'ascending' ? '▲' : '▼')}
                    </th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {sortedCryptocurrencies?.map((crypt: ICrypt) => (
                    <tr key={crypt.rank} onClick={() => navigate(`/${crypt.id}`)}>
                        <td>{crypt.symbol}</td>
                        <td>
                            <img height={32} width={32}
                                 src={`https://assets.coincap.io/assets/icons/${crypt.symbol.toLowerCase()}@2x.png`}
                                 alt={crypt.symbol}
                                 onError={handleImageError}
                            />
                        </td>
                        <td>{formatValue(crypt.priceUsd)}</td>
                        <td>{formatValue(crypt.marketCapUsd)}</td>
                        <td>
                            {formatValue(crypt.changePercent24Hr)}
                        </td>
                        <td>
                            <Button text={'Add'}/>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div>
                <Button text={'Previous'} disabled={page === 1} onClick={() => setPage(prev => prev - 1)}/>
                <span>{page}</span>
                <Button text={'Next'} onClick={() => setPage(prev => prev + 1)} disabled={!hasMoreData}/>
            </div>
        </div>
    );
};

export default CryptTable;
