import Room from './Room';
import KeyError from './KeyError';

import * as maps from './maps';

export default class Maze {
    constructor(mapID) {
        this.mapID = mapID
    }

    get maze() {
        return this.createMaze();
    }

    /**
     * Creates an instance of all of the rooms for the maze
     */
    createMaze() {
        const currentMap = maps[this.mapID];
        const maze = {};

        for (const [roomId, config] of Object.entries(currentMap)) {
            maze[roomId] = new Room(config);
        }
        
        return maze
    }

    /**
     * Checks if the Maze config is valid
     */
    static validateMazeConfig(mapID) {
        console.log('Validating Map')
        // Check if we have the map
        console.log('Checking if map exists...')
        if (!maps[mapID]) {
            throw ReferenceError(`Map with ID ${mapID} does not exist`);
        } else {
            console.log('Found Map!')
        }
        // Make sure the map has valid rooms
        console.log('Checking if all rooms are valid...')
        if (!Room.validateRooms(maps[mapID])) {
            throw new KeyError('Room object is missing keys.');
        } else {
            console.log('Rooms are valid!')
        }
        // Make sure the maze works
        console.log('Checking if maze config works...')
        const exits = Room.checkMapWorks(new Maze(mapID).maze);

        if (exits.exitIds.length === 1) {
            console.log(`Successfully found ${exits.counts[exits.exitIds[0]]} ways to go to the exit room found at ${exits.exitIds[0]}`);
        } else if (exits.exitIds.length > 1) {
            throw ReferenceError('Found more than one exit room!');
        } else {
            throw ReferenceError('No passages to exit found');
        }
    }
}