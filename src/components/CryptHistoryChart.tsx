import React from 'react';
import { Line } from 'react-chartjs-2';
import { cryptAPI } from '../services/CryptService';
import { Chart, CategoryScale, LinearScale, LineController, LineElement, PointElement } from 'chart.js';

Chart.register(CategoryScale, LinearScale, LineController, LineElement, PointElement);

interface CryptHistoryChartProps {
    id: string;
    interval: string;
    start: string;
    end: string;
}

const CryptHistoryChart: React.FC<CryptHistoryChartProps> = ({ id, interval, start, end }) => {
    const { data, error, isLoading } = cryptAPI.useGetCryptocurrencyHistoryQuery({
        id,
        interval,
        start,
        end
    });

    function formatDateBasedOnInterval(date: Date, interval: string): string {
        if (interval === 'm30') {
            return `${date.getHours()}:${date.getMinutes() < 10 ? '0' : ''}${date.getMinutes()}`;
        }
        return date.toLocaleDateString();
    }

    const chartData = {
        labels: data?.data.map(entry => formatDateBasedOnInterval(new Date(entry.date), interval)) || [],
        datasets: [
            {
                label: 'Price (USD)',
                data: data?.data.map(entry => parseFloat(entry.priceUsd)) || [],
                fill: false,
                backgroundColor: 'rgb(75, 192, 192)',
                borderColor: 'rgba(75, 192, 192, 0.2)',
            }
        ]
    };

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error fetching data</p>;

    return (
        <div>
            <Line data={chartData} />
        </div>
    );
};

export default CryptHistoryChart;
