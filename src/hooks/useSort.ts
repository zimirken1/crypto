import {useState} from "react";

type SortOrder = 'ascending' | 'descending' | 'none';
type SortBy = 'priceUsd' | 'marketCapUsd' | 'changePercent24Hr';

interface UseSortProps<T> {
    initialSortBy?: SortBy;
}

export const useSort = <T extends object>(props?: UseSortProps<T>) => {
    const [sortOrder, setSortOrder] = useState<SortOrder>('none');
    const [sortBy, setSortBy] = useState<SortBy | undefined>(props?.initialSortBy);

    const sortFunction = (sortKey: keyof T) => (a: T, b: T): number => {
        if (sortOrder === 'none' || !sortBy) return 0;

        const valueA = parseFloat((a[sortKey] || 0) as unknown as string);
        const valueB = parseFloat((b[sortKey] || 0) as unknown as string);

        return sortOrder === 'ascending' ? valueA - valueB : valueB - valueA;
    };

    const toggleSortOrder = (column: SortBy) => {
        if (sortBy !== column) {
            setSortBy(column);
            setSortOrder('ascending');
        } else {
            setSortOrder(prev => prev === 'ascending' ? 'descending' : 'ascending');
        }
    };

    return { sortOrder, sortBy, toggleSortOrder, sortFunction };
};
