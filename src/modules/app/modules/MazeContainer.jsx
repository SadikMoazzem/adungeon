import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Minimap from './sub-modules/Minimap';
import * as moduleActions from '../actions';
import GameOptions from './sub-modules/GameOptions';

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
    const { gameConfig, mazeConfig, playerConfig } = props;
    return (
        <div className="app--maze-container">
            {/* <div className="maze--view">
                <img src={maze.getMaze[1].background} alt="view"/>
            </div>
            <div className="maze--minimap">
                <Minimap maze={maze} />
            </div> */}
            <div className="game">
                <div className="game--view">
                    <div className="game-view--visual">
                        <img src={mazeConfig.getMaze[gameConfig.currentRoomId].background} alt="view" />
                    </div>
                    <div className="game-view--options">
                        <GameOptions currentRoom={mazeConfig.getMaze[gameConfig.currentRoomId]} />
                    </div>
                </div>
                <div className="game--stats">
                    <div className="game-stats--stats">

                    </div>
                    <div className="game-stats--minimap">
                        <Minimap maze={mazeConfig} currentRoomId={gameConfig.currentRoomId} taggedRooms={playerConfig.taggedRooms} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(MazeContainer);
