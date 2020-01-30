import Room from './Room';
import KeyError from './KeyError';

import * as maps from './maps';

export default class Maze {
    constructor(mapID) {
        this.mapID = mapID;
        this.config = maps[this.mapID].config;
    }

    get getMaze() {
        return this.createMaze();
    }

    getRoomObj(roomId) {
        if (!this.getMaze[roomId]) {
            console.error(`Room with ID ${roomId} does not exist`);
            return;
        }
        return this.getMaze[roomId];
    }

    /**
     * Creates an instance of all of the rooms for the maze
     */
    createMaze() {
        const currentMap = maps[this.mapID].schema;
        const maze = {};

        for (const [roomId, config] of Object.entries(currentMap)) {
            maze[roomId] = new Room(config);
        }

        return maze;
    }

    static checkIfMapExists(mapID) {
        const promise = new Promise((res, err) => {
            setTimeout(() => {
                if (!maps[mapID]) {
                    err(ReferenceError('Map does not exist'));
                } else {
                    res({ msg: 'Map Found' });
                }
            }, 1300);
        });
        return promise;
    }

    static validateRooms(mapID) {
        const promise = new Promise((res, err) => {
            setTimeout(() => {
                if (!Room.validateRooms(maps[mapID].schema)) {
                    err(new KeyError('Room object is missing keys.'));
                } else {
                    res({ msg: 'Rooms are valid!' });
                }
            }, 1300);
        });
        return promise;
    }

    static validateMaze(mapID) {
        const promise = new Promise((res, err) => {
            setTimeout(() => {
                const exits = Room.checkMapWorks(new Maze(mapID).getMaze);

                if (exits.exitIds.length === 1) {
                    console.log(`Successfully found ${exits.counts[exits.exitIds[0]]} ways to go to the exit room found at ${exits.exitIds[0]}`);
                    res({ msg: 'Validated Maze config' });
                } else if (exits.exitIds.length > 1) {
                    err(ReferenceError('Found more than one exit room!'));
                } else {
                    err(ReferenceError('No passages to exit found'));
                }
            }, 1300);
        });
        return promise;
    }

    /**
     * Checks if the Maze config is valid
     */
    static validateMazeConfig(mapID) {
        console.log('Validating Map');
        // Check if we have the map
        console.log('Checking if map exists...');
        if (!maps[mapID]) {
            throw ReferenceError(`Map with ID ${mapID} does not exist`);
        } else {
            console.log('Found Map!');
        }
        // Make sure the map has valid rooms
        console.log('Checking if all rooms are valid...');
        if (!Room.validateRooms(maps[mapID].schema)) {
            throw new KeyError('Room object is missing keys.');
        } else {
            console.log('Rooms are valid!');
        }
        // Make sure the maze works
        console.log('Checking if maze config works...');
        const exits = Room.checkMapWorks(new Maze(mapID).getMaze);

        if (exits.exitIds.length === 1) {
            console.log(`Successfully found ${exits.counts[exits.exitIds[0]]} ways to go to the exit room found at ${exits.exitIds[0]}`);
        } else if (exits.exitIds.length > 1) {
            throw ReferenceError('Found more than one exit room!');
        } else {
            throw ReferenceError('No passages to exit found');
        }
    }
}
