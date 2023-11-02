import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { cryptAPI } from '../services/CryptService';
import portfolioReducer from './reducers/portfolioSlice';

const rootReducer = combineReducers({
    [cryptAPI.reducerPath]: cryptAPI.reducer,
    portfolio: portfolioReducer,
});

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(cryptAPI.middleware),
    });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
