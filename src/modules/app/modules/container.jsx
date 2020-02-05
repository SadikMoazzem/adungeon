import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import MazeContainer from './MazeContainer';
import MainMenu from './MainMenu';
import OptionsMenu from './sub-modules/OptionsMenu';
import LoadingScreen from './sub-modules/LoadingScreen';
import ErrorScreen from './sub-modules/ErrorScreen';
import EndScreen from './sub-modules/EndScreen';

import * as moduleActions from '../actions';
import { VIEW } from '../constants';

const mapStateToProps = (state) => ({
    view: state.app.currentView,
    playerConfig: state.app.playerConfig,
    isOptionsOpen: state.app.isOptionsOpen,
    loadingMessage: state.app.loadingMessage,
    errorMessage: state.app.errorMessage,
    globalState: state.app,
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(moduleActions, dispatch),
});

const App = (props) => {
    // DEBUG ONLY
    console.log(props.globalState);

    const {
        view, isOptionsOpen, loadingMessage, errorMessage, playerConfig, actions
    } = props;

    // Render a component based on the current view
    let renderView = '';
    switch (view) {
        case VIEW.GAME_VIEW:
            renderView = <MazeContainer />;
            break;
        case VIEW.ERROR:
            renderView = <ErrorScreen errorMessage={errorMessage} viewUpdate={actions.viewUpdate} />;
            break;
        case VIEW.LOADING:
            renderView = <LoadingScreen loadingMessage={loadingMessage} />;
            break;
        case VIEW.END_GAME_VICTORY:
            renderView = <EndScreen message={'YOU WON'} resetGame={actions.reset} wealth={playerConfig.wealth} />;
            break;
        case VIEW.END_GAME_LOSS:
            renderView = <EndScreen message={'YOU DIED'} resetGame={actions.reset} wealth={playerConfig.wealth} />;
            break;
        default:
        case VIEW.MAIN_MENU || VIEW.OPTIONS_MENU:
            renderView = <MainMenu />;
            break;
    }

    return (
        <div className="app">
            { view === VIEW.MAIN_MENU || view === VIEW.OPTIONS_MENU ? (
                <header>
                    aDungeon
                    <span className="sub-text">
                        By Sadik Moazzem
                    </span>
                </header>
            ) : ''}
            { renderView }
            { isOptionsOpen ? <OptionsMenu /> : ''}
        </div>
    );
};

App.propTypes = {
    actions: PropTypes.shape({
        viewUpdate: PropTypes.func,
        reset: PropTypes.func,
    }).isRequired,

    view: PropTypes.string.isRequired,
    isOptionsOpen: PropTypes.bool.isRequired,
    loadingMessage: PropTypes.string.isRequired,
    errorMessage: PropTypes.string.isRequired,
    playerConfig: PropTypes.shape({
        wealth: PropTypes.number,
    }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
