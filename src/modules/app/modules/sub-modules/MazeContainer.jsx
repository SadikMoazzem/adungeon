import React from 'react';

import Maze from '../../../maze/Maze';
import Minimap from './Minimap';

const MazeContainer = () => {
    try {
        Maze.validateMazeConfig('map');
    } catch (e) {
        // Return error message to user
        console.error(e);
    }
    const maze = new Maze('map');
    console.log(maze);
    return (
        <div className="app--maze-container">
            <div className="maze--view">
                <img src={maze.getMaze[1].background} alt="view"/>
            </div>
            <div className="maze--minimap">
                <Minimap maze={maze} />
            </div>
        </div>
    );
};

export default MazeContainer;
