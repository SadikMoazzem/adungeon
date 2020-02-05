import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import StartGame from '../../StartGame';
import * as moduleActions from '../../actions';

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(moduleActions, dispatch),
    dispatch,
});

const OptionsMenu = (props) => {
    const { dispatch, actions } = props;

    // Create State to control the view of the component
    const [mapName, updateMapName] = useState('');

    return (
        <div className="app--options-menu">
            <div className="exit-btn" onClick={() => { actions.toggleOptionsView(false); }}>
                <FontAwesomeIcon icon={faTimes} />
            </div>
            <input type="text" onChange={(e) => { updateMapName(e.target.value); }} value={mapName} placeholder="Enter Map Name" />
            <button type="button" onClick={() => { StartGame(dispatch, mapName); }}>Start Game</button>
        </div>
    );
};

OptionsMenu.propTypes = {
    dispatch: PropTypes.func.isRequired,
    actions: PropTypes.shape({
        toggleOptionsView: PropTypes.func,
    }).isRequired,
};

export default connect(null, mapDispatchToProps)(OptionsMenu);
