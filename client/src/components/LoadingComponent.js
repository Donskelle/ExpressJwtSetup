import React from 'react';

import { CircularProgress } from 'material-ui/Progress';


const LoadingComponent = ({ pastDelay, error }) => {
    // Handle the loading state
    if (pastDelay) {
        return <CircularProgress size={50} />;
    }
    // Handle the error state
    else if (error) {
        return <div>Ein Fehler ist passiert.</div>;
    }
    else {
        return null;
    }
};

export default LoadingComponent;