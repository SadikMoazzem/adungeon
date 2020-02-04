import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

import Minimap from './sub-modules/Minimap';
import * as moduleActions from '../actions';
import GameOptions from './sub-modules/GameOptions';
import GameStats from './sub-modules/GameStats';
import { VIEW } from '../constants';
import { GameVisual } from './sub-modules/GameVisual';

const mapStateToProps = (state) => ({
    globalState: state,
    gameConfig: state.app.gameConfig,
    mazeConfig: state.app.mazeConfig,
    playerConfig: state.app.playerConfig,
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(moduleActions, dispatch),
});

const MazeContainer = (props) => {
    const [isOpen, toggleOptions] = useState(false);

    const {
        gameConfig, mazeConfig, playerConfig, actions
    } = props;

    if (playerConfig.health === 0) {
        actions.reset();
        actions.viewUpdate(VIEW.END_GAME_LOSS);
    }

    return (
        <div className="app--maze-container">
            <button type="button" className="option-btn" onClick={() => { console.log('lol'); toggleOptions(!isOpen); }}>
                <FontAwesomeIcon icon={faBars} />
            </button>
            {isOpen ? (
                <div className="game-menu">
                    <div className="exit-btn" onClick={() => { toggleOptions(false); }}>
                        <FontAwesomeIcon icon={faTimes} />
                    </div>
                    <button type="button" onClick={() => { actions.reset(); }}>Reset Game</button>
                </div>
            ) : ''}
            <div className="game">
                <div className="game--view">
                    <GameVisual gameConfig={gameConfig} mazeConfig={mazeConfig} />
                    <div className="game-view--options">
                        <GameOptions />
                    </div>
                </div>
                <div className="game--stats">
                    <div className="game-stats--stats">
                        <GameStats />
                    </div>
                    <div className="game-stats--minimap">
                        <Minimap maze={mazeConfig} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(MazeContainer);
