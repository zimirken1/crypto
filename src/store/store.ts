import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {cryptAPI} from "../services/CryptService";

const rootReducer = combineReducers({
    [cryptAPI.reducerPath]: cryptAPI.reducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(cryptAPI.middleware)
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']