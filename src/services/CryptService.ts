import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {ICryptResponse} from "../models/ICrypt";

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
    })
});
