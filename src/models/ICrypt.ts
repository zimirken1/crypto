export interface ICrypt {
    id: string;
    rank: string;
    symbol: string;
    name: string;
    supply: string;
    maxSupply: string | null;
    marketCapUsd: string;
    volumeUsd24Hr: string;
    priceUsd: string;
    changePercent24Hr: string;
    vwap24Hr: string;
    explorer: string;
}

export interface ICryptResponse {
    data: ICrypt[];
    timestamp: number;
}

export interface ISingleCryptResponse {
    data: ICrypt;
    timestamp: number;
}
