import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {ICryptResponse, ISingleCryptResponse} from "../models/ICrypt";
import {IHistoryResponse} from "../models/IHistory";

export const cryptAPI = createApi({
    reducerPath: 'cryptAPI',
    baseQuery: fetchBaseQuery({baseUrl: 'https://api.coincap.io'}),
    tagTypes: ['Crypt'],
    endpoints: (build) => ({
        getCryptocurrencies: build.query<ICryptResponse, { limit: number, offset: number, search?: string }>({
            query: ({ limit = 10, offset = 0, search}) => {
                let params: any = {
                    limit: limit,
                    offset: offset,
                };

                if (search) {
                    params.search = search;
                }

                return {
                    url: `v2/assets`,
                    params: params,
                };
            },
            providesTags: result => ['Crypt']
        }),
        getSingleCryptocurrency: build.query<ISingleCryptResponse, { id: string }>({
            query: ({ id }) => `v2/assets/${id}`,
            providesTags: result => ['Crypt']
        }),
        getCryptocurrencyHistory: build.query<IHistoryResponse, {
            id: string,
            interval: string,
            start: string,
            end: string
        }>({
            query: ({ id, interval, start, end }) => {
                return {
                    url: `v2/assets/${id}/history`,
                    params: {
                        interval: interval,
                        start: start,
                        end: end
                    }
                };
            },
            providesTags: result => ['Crypt']
        })
    })
});
