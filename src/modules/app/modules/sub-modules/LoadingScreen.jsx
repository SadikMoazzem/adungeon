import React from 'react';

const LoadingScreen = (props) => {
    const { loadingMessage } = props;
    return (
        <div className="loading-container">
            <div className="spinner">
                <div className="lds-grid"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
            </div>
            <p>
                { loadingMessage }
            </p>
        </div>
    );
};

export default LoadingScreen;
