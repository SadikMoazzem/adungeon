import React, { useState } from 'react';
import { connect } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faCoins  } from '@fortawesome/free-solid-svg-icons';

import * as mazeConfig from '../../../maze/constants';

const mapStateToProps = (state) => ({
    gameLog: state.app.gameLog,
    playerConfig: state.app.playerConfig,
});

const GameStats = (props) => {
    // Create State to control the view of the component
    const { gameLog, playerConfig } = props;

    // Render a component based on the current view
    let renderGameLog = [];

    for (const log in gameLog) {
        renderGameLog.push(
            <li>{gameLog[log]}</li>);
    }

    console.log(renderGameLog);

    return (
        <div className="game-stats">
            <div className="player-stat">
                <div className="health">
                    <FontAwesomeIcon icon={faHeart} />
                    { playerConfig.health }
                </div>
                <div className="wealth">
                    <FontAwesomeIcon icon={faCoins} />
                    { playerConfig.wealth }
                </div>
            </div>
            <ul className="game-log">
                { renderGameLog }
            </ul>
        </div>
    );
};

export default connect(mapStateToProps, null)(GameStats);
