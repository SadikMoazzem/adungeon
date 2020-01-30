import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandPointLeft } from '@fortawesome/free-solid-svg-icons';
import * as moduleActions from '../actions';
import { VIEW } from '../constants';

const mapStateToProps = (state) => ({
    view: state.app.currentView,
    globalState: state,
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(moduleActions, dispatch),
});

const MainMenu = (props) => {
    // Create State to control the view of the component
    const { view, actions } = props;

    // Render a component based on the current view
    let renderOptions = '';
    switch (view) {
        case VIEW.OPTIONS_MENU:
            renderOptions = (
                <div className="main-menu--options">
                    <div className="menu-option"
                        onClick={() => actions.toggleOptionsView(true)}
                    >
                        Start
                        <div className="menu-option--sub-text">
                            Start a new game
                        </div>
                    </div>
                    <div className="menu-option">
                        Load
                        <div className="menu-option--sub-text">
                            Load a saved game
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
                    Campaign
                        <div className="menu-option--sub-text">
                            Play a Campaign game
                        </div>
                    </div>
                    <div className="menu-option">
                        Settings
                        <div className="menu-option--sub-text">
                            View Settings
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
                <img src='android-chrome-512x512.png' alt='logo' />
            </div>
            { renderOptions }
        </div>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(MainMenu);
