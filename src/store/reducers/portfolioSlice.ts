import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IPortfolioItem {
    id: string;
    symbol: string;
    amount: number;
    totalCost: number;
}

interface PortfolioState {
    items: IPortfolioItem[];
}

const initialState: PortfolioState = {
    items: JSON.parse(localStorage.getItem('portfolio') || '[]'),
};

const portfolioSlice = createSlice({
    name: 'portfolio',
    initialState,
    reducers: {
        addToPortfolio: (
            state,
            action: PayloadAction<{ crypto: any; amount: number }>,
        ) => {
            const { crypto, amount } = action.payload;
            const priceUsd =
                typeof crypto.priceUsd === 'string'
                    ? parseFloat(crypto.priceUsd)
                    : crypto.priceUsd;

            const existingCoin = state.items.find(
                (item) => item.id === crypto.id,
            );

            if (existingCoin) {
                existingCoin.amount += amount;
                existingCoin.totalCost += priceUsd * amount;
            } else {
                state.items.push({
                    id: crypto.id,
                    symbol: crypto.symbol,
                    amount,
                    totalCost: priceUsd * amount,
                });
            }

            localStorage.setItem('portfolio', JSON.stringify(state.items));
        },
        removeFromPortfolio: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter(
                (item) => item.id !== action.payload,
            );
            localStorage.setItem('portfolio', JSON.stringify(state.items));
        },
    },
});

export const { addToPortfolio, removeFromPortfolio } = portfolioSlice.actions;

export default portfolioSlice.reducer;
