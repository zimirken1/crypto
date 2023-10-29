import {useState} from "react";

export const usePagination = (initialPage: number) => {
    const [page, setPage] = useState(initialPage);
    return { page, setPage };
}
