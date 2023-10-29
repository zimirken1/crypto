import React from "react";

export const useImageErrorHandler = (defaultSrc: string) => {
    const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        e.currentTarget.src = defaultSrc;
    };
    return handleError;
}