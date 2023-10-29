import React from 'react';
import {Link} from "react-router-dom";

const NotFoundPage: React.FC = () => {
    return (
        <>
            This page doesn't exist
            <Link to="/">home</Link>
        </>
    );
};

export default NotFoundPage;