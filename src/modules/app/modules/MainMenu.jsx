import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandPointLeft } from '@fortawesome/free-solid-svg-icons';

import StartGame from '../StartGame';
import * as moduleActions from '../actions';
import { VIEW } from '../constants';

const mapStateToProps = (state) => ({
    view: state.app.currentView,
    globalState: state,
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(moduleActions, dispatch),
    dispatch,
});

const MainMenu = (props) => {
    // Deconstruct the props provided to component
    const { view, actions, dispatch } = props;

    // Render a component based on the current view
    let renderOptions = '';
    switch (view) {
        case VIEW.OPTIONS_MENU:
            renderOptions = (
                <div className="main-menu--options">
                    <div
                        className="menu-option"
                        onClick={() => actions.toggleOptionsView(true)}
                    >
                        New Map
                        <div className="menu-option--sub-text">
                            Play with a new map
                        </div>
                    </div>
                    <div
                        className="menu-option"
                        onClick={() => StartGame(dispatch, 'fractured_crypt')}
                    >
                        Fractured Crypt
                        <div className="menu-option--sub-text">
                            Preset Game
                        </div>
                    </div>
                    <div
                        className="menu-option"
                        onClick={() => StartGame(dispatch, 'ruthless_serpent')}
                    >
                        Ruthless Serpent
                        <div className="menu-option--sub-text">
                            Preset Game
                        </div>
                    </div>
                </div>
            );
            break;
        default:
        case VIEW.MAIN_MENU:
            renderOptions = (
                <div className="main-menu--options">
                    <div
                        className="menu-option"
                        onClick={() => actions.viewUpdate(VIEW.OPTIONS_MENU)}
                    >
                    Start
                        <div className="menu-option--sub-text">
                            Start a game
                        </div>
                    </div>
                </div>
            );
            break;
    }

    return (
        <div className="app--main-menu">
            { view === VIEW.OPTIONS_MENU ? (
                <div className="back-btn" onClick={() => actions.viewUpdate(VIEW.MAIN_MENU)}>
                    <FontAwesomeIcon icon={faHandPointLeft} />
                </div>
            ) : ''}
            <div className="main-menu--image">
                <img src="android-chrome-512x512.png" alt="logo" />
            </div>
            { renderOptions }
        </div>
    );
};

MainMenu.propTypes = {
    dispatch: PropTypes.func.isRequired,
    actions: PropTypes.shape({
        viewUpdate: PropTypes.func,
        toggleOptionsView: PropTypes.func,
    }).isRequired,

    view: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(MainMenu);
