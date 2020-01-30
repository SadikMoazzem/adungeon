import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as moduleActions from '../actions';
import MainMenu from './MainMenu';
import OptionsMenu from './sub-modules/OptionsMenu';
import LoadingScreen from './sub-modules/LoadingScreen';
import ErrorScreen from './sub-modules/ErrorScreen';

import { VIEW } from '../constants';

const mapStateToProps = (state) => ({
    view: state.app.currentView,
    isOptionsOpen: state.app.isOptionsOpen,
    loadingMessage: state.app.loadingMessage,
    errorMessage: state.app.errorMessage,
    globalState: state,
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(moduleActions, dispatch),
});

const App = (props) => {
    // DEBUG ONLY
    console.log(props.globalState);

    const { view, isOptionsOpen, loadingMessage, errorMessage, actions } = props;
    // Render a component based on the current view
    let renderView = '';
    switch (view) {
        case VIEW.ERROR:
            renderView = <ErrorScreen errorMessage={errorMessage} viewUpdate={actions.viewUpdate} />;
            break;
        case VIEW.LOADING:
            renderView = <LoadingScreen loadingMessage={loadingMessage} />;
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

export default connect(mapStateToProps, mapDispatchToProps)(App);
