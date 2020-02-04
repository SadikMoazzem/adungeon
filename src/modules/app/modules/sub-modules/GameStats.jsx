import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faCoins } from '@fortawesome/free-solid-svg-icons';

const mapStateToProps = (state) => ({
    gameLog: state.app.gameLog,
    playerConfig: state.app.playerConfig,
});

const GameStats = (props) => {
    // Deconstruct the props we need
    const { gameLog, playerConfig } = props;

    // Render a component based on the current view
    const renderGameLog = [];

    for (const log in gameLog) {
        renderGameLog.push(
            <li key={log}>{gameLog[log]}</li>);
    }

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

GameStats.propTypes = {
    gameLog: PropTypes.arrayOf(PropTypes.string).isRequired,
    playerConfig: PropTypes.shape({
        health: PropTypes.number,
        wealth: PropTypes.number,
    }).isRequired,
};

export default connect(mapStateToProps, null)(GameStats);
