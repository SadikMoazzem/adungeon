import React from 'react';
import PropTypes from 'prop-types';

const GameVisual = (props) => {
    const { mazeConfig, gameConfig } = props;

    return (
        <div className="game-view--visual">
            <img src={mazeConfig.maze[gameConfig.currentRoomId].background} alt="view" className="background" />
            <div className="enemy">
                {mazeConfig.maze[gameConfig.currentRoomId].enemy ? <img src={mazeConfig.maze[gameConfig.currentRoomId].enemyView} alt="enemy" /> : ''}
            </div>
            <div className="treasure">
                {mazeConfig.maze[gameConfig.currentRoomId].treasure ? <img src="treasure/gold.png" alt="loot" /> : ''}
            </div>
        </div>
    );
};

GameVisual.propTypes = {
    mazeConfig: PropTypes.shape({
        maze: PropTypes.shape({
            enemy: PropTypes.string,
            treasure: PropTypes.string,
        }),
    }).isRequired,
    gameConfig: PropTypes.shape({
        currentRoomId: PropTypes.number,
    }).isRequired,
};

export default GameVisual;
