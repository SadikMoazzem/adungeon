import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandPointLeft } from '@fortawesome/free-solid-svg-icons';

import { VIEW } from '../../constants';

const ErrorScreen = (props) => {
    const { errorMessage, viewUpdate } = props;
    return (
        <div className="error-container">
            <div className="back-btn" onClick={() => viewUpdate(VIEW.MAIN_MENU)}>
                <FontAwesomeIcon icon={faHandPointLeft} />
            </div>
            <div className="spinner">
                <div className="lds-heart"><div></div></div>
            </div>
            <p>
                { errorMessage }
            </p>
        </div>
    );
};

export default ErrorScreen;
