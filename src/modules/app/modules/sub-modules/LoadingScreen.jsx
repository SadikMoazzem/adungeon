import React from 'react';
import PropTypes from 'prop-types';

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

LoadingScreen.propTypes = {
    loadingMessage: PropTypes.string.isRequired,
};

export default LoadingScreen;
