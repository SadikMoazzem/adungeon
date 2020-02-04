import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import * as moduleActions from '../../actions';
import StartGame from '../../StartGame';
import { maps } from '../../../maze/maps';

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(moduleActions, dispatch),
    dispatch,
});

const OptionsMenu = (props) => {
    const { dispatch, actions } = props;

    // Create State to control the view of the component
    const [playerName, updatePlayerName] = useState('');
    const [mapChoice, updateMapChoice] = useState('');

    return (
        <div className="app--options-menu">
            <div className="exit-btn" onClick={() => { actions.toggleOptionsView(false); }}>
                <FontAwesomeIcon icon={faTimes} />
            </div>
            <Dropdown options={maps} onChange={(e) => updateMapChoice(e.value)} value={mapChoice} placeholder="Select a map to play" />
            <button type="button" onClick={() => { StartGame(dispatch, mapChoice, playerName); }}>Start Game</button>
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
