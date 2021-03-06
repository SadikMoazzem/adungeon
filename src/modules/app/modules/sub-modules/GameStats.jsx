import React, { useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faCoins } from '@fortawesome/free-solid-svg-icons';

const mapStateToProps = (state) => ({
    gameLog: state.app.gameLog,
    playerConfig: state.app.playerConfig,
});

const GameStats = (props) => {
    // Makes a reference to bottom of the logs
    const bottomOfLogs = useRef(null);

    // Using the react hook, we always scroll to the bottom of the div
    useEffect(() => {
        bottomOfLogs.current.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        });
    });

    // Deconstruct only the props we need
    const { gameLog, playerConfig } = props;

    // Render a component based on the current view
    const renderGameLog = [];

    for (const log in gameLog) {
        renderGameLog.push(
            <li key={log}>{gameLog[log]}</li>,
        );
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
                <div
                    style={{ float: 'left', clear: 'both' }}
                    ref={bottomOfLogs}
                />
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
