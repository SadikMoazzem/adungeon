import React from 'react';

import { ENEMY_CONFIGS } from '../../../maze/constants';

export const GameVisual = (props) => {
    const { mazeConfig, gameConfig } = props;

    const getRandomImage = (images) => {
        return images[Math.floor(Math.random() * images.length)];
    };

    return (
        <div className="game-view--visual">
            <img src={mazeConfig.maze[gameConfig.currentRoomId].background} alt="view" className="background" />
            {/* Dynamically render these images */}
            <div className="enemy">
                {mazeConfig.maze[gameConfig.currentRoomId].enemy ? <img src={mazeConfig.maze[gameConfig.currentRoomId].enemyView} /> : ''}
            </div>
            <div className="treasure">
                {mazeConfig.maze[gameConfig.currentRoomId].treasure ? <img src="treasure/gold.png" /> : ''}
            </div>
        </div>
    );
};
