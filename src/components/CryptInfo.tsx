import React, { useState } from "react";
import {Link, useParams} from "react-router-dom";
import { cryptAPI } from "../services/CryptService";
import { useImageErrorHandler } from "../hooks/useImageErrorHandler";
import { useFormatValue } from "../hooks/useFormatValue";
import CryptHistoryChart from "./CryptHistoryChart";
import Select from "./UI/Select/Select";
import Button from "./UI/Button/Button";

const CryptInfo: React.FC = () => {
    const { id } = useParams<{ id?: string }>();
    const formatValue = useFormatValue();
    const handleImageError = useImageErrorHandler("https://coincap.io/static/logo_mark.png");

    const { data, error, isLoading } = id ? cryptAPI.useGetSingleCryptocurrencyQuery({ id }) : {
        data: undefined,
        error: undefined,
        isLoading: false,
    };

    const {
        name,
        symbol,
        rank,
        priceUsd,
        supply,
        marketCapUsd,
        maxSupply,
    } = data?.data || {};

    const [selectedDaysAgo, setSelectedDaysAgo] = useState(1);
    const [startDate, setStartDate] = useState<string>(getUnixTimeForDaysAgo(1));

    function getUnixTimeForDaysAgo(daysAgo: number): string {
        const time = Date.now() - (daysAgo * 24 * 60 * 60 * 1000);
        return time.toString();
    }

    // function handleSelectChange(e: React.ChangeEvent<HTMLSelectElement>) {
    //     const daysAgo = Number(e.target.value);
    //     setSelectedDaysAgo(daysAgo);
    //     setStartDate(getUnixTimeForDaysAgo(daysAgo));
    // }

    const endTime = Date.now().toString();

    function getIntervalBasedOnDays(daysAgo: number): string {
        if (daysAgo === 1) return 'm30';
        if (daysAgo <= 7) return 'h2';
        return 'd1';
    }

    const interval = getIntervalBasedOnDays(selectedDaysAgo);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error fetching data</div>;

    return (
        <div>
            {symbol && (
                <div>
                    <img height={32} width={32}
                         src={`https://assets.coincap.io/assets/icons/${symbol.toLowerCase()}@2x.png`}
                         alt={symbol}
                         onError={handleImageError}
                    />
                    <h2>{name} ({symbol})</h2>
                    <p>Rank: {rank}</p>
                    <p>Price: ${formatValue(priceUsd || null)}</p>
                    <p>Supply: {formatValue(supply || null)}</p>
                    <p>MarketCapUSD: ${formatValue(marketCapUsd || null)}</p>
                    <p>MaxSupply: {formatValue(maxSupply || null)}</p>
                    <Link to="/">
                        <Button text="Back to Home" />
                    </Link>
                </div>
            )}
            <div>
                <label htmlFor="startDate-select">Start Date: </label>
                <Select
                    options={[
                        { value: '1', label: '1 Day Ago' },
                        { value: '7', label: '7 Days Ago' },
                        { value: '30', label: '1 Month Ago' }
                    ]}
                    value={selectedDaysAgo.toString()}
                    onChange={(value) => {
                        const daysAgo = Number(value);
                        setSelectedDaysAgo(daysAgo);
                        setStartDate(getUnixTimeForDaysAgo(daysAgo));
                    }}
                />
            </div>
            <CryptHistoryChart id={`${id}`} interval={interval} start={startDate} end={endTime} />
        </div>
    );
};

export default CryptInfo;
