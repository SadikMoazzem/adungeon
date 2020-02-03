import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Minimap from './sub-modules/Minimap';
import * as moduleActions from '../actions';
import GameOptions from './sub-modules/GameOptions';
import GameStats from './sub-modules/GameStats';

const mapStateToProps = (state) => ({
    globalState: state,
    gameConfig: state.app.gameConfig,
    mazeConfig: state.app.mazeConfig,
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(moduleActions, dispatch),
});

const MazeContainer = (props) => {
    const { gameConfig, mazeConfig } = props;

    return (
        <div className="app--maze-container">
            <div className="game">
                <div className="game--view">
                    <div className="game-view--visual">
                        <img src={mazeConfig.maze[gameConfig.currentRoomId].background} alt="view" className="background" />
                        {/* Dynamically render these images */}
                        <div className="enemy">
                            {mazeConfig.maze[gameConfig.currentRoomId].enemy ? <img src="enemies/monster.png" /> : ''}
                        </div>
                        <div className="treasure">
                            {mazeConfig.maze[gameConfig.currentRoomId].treasure ? <img src="treasure/gold.png" /> : ''}
                        </div>
                    </div>
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
