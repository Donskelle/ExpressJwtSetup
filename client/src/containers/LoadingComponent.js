import React from 'react';


const LoadingComponent = ({ isLoading, error }) => {
    // Handle the loading state
    if (isLoading) {
        return <div>Loading...</div>;
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