import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Minimap from './sub-modules/Minimap';
import * as moduleActions from '../actions';

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
    const { gameConfig, mazeConfig } = props;
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

                    </div>
                </div>
                <div className="game--stats">
                    <div className="game-stats--stats">

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
