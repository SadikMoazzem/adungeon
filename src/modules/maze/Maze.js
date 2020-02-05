import RoomFactory from './RoomFactory';
import KeyError from './KeyError';

import { ROOM_TYPES } from './constants';
import ValidateMaze from './ValidateMaze';
import ValidateRoomsHasKeys from './ValidateRoom';

/**
 * Class that hold the maze and functions needed to creat, update and validate it
 */
export default class Maze {
    constructor(mazeObj) {
        this.config = mazeObj.config;
        this.schema = mazeObj.schema;
        this.maze = {};
    }

    get getStartRoom() {
        return this.findStartRoom();
    }

    /**
     * Finds a room to start the maze from
     */
    findStartRoom() {
        const startIds = [];
        for (const roomId in this.maze) {
            if (this.maze[roomId].type === ROOM_TYPES.ENTRANCE) {
                startIds.push(roomId);
            }
        }

        return startIds[Math.floor(Math.random() * startIds.length)];
    }

    /**
     * Gets a room object by ID
     */
    getRoomObj(roomId) {
        if (!this.maze[roomId]) {
            console.error(`Room with ID ${roomId} does not exist`);
            return;
        }
        return this.maze[roomId];
    }

    /**
     * Creates an instance of all of the rooms for the maze with the previous settings in place
     */
    updateMaze(newMazeObj) {
        const maze = {};

        for (const [roomId, config] of Object.entries(newMazeObj)) {
            maze[roomId] = RoomFactory(config);
        }
        this.maze = maze;

        return this;
    }


    /**
     * Creates an instance of all of the rooms for the maze
     */
    createMaze() {
        const currentMap = this.schema;
        const maze = {};

        for (const [roomId, config] of Object.entries(currentMap)) {
            maze[roomId] = RoomFactory({ id: roomId, type: config.roomType });
            maze[roomId].generateRoomItems();
            maze[roomId].setPassages(config);
        }

        this.maze = maze;
    }

    /**
     * Validation split into promises so we can simulate loading
     */
    static checkIfMapExists(mapName) {
        const promise = new Promise((res, err) => {
            setTimeout(() => {
                fetch(`maps/${mapName}.json`)
                    .then((file) => file.json())
                    .then((map) => {
                        // Add map to state
                        console.log(map);
                        res({ msg: 'Map Found', mapObj: map });
                    })
                    .catch(() => {
                        err(ReferenceError('Map does not exist'));
                    });
            }, 1000);
        });
        return promise;
    }

    static validateRooms(mazeObj) {
        const promise = new Promise((res, err) => {
            setTimeout(() => {
                if (!ValidateRoomsHasKeys(mazeObj.schema)) {
                    err(new KeyError('Room object is missing keys.'));
                } else {
                    res({ msg: 'Rooms are valid!' });
                }
            }, 1000);
        });
        return promise;
    }

    static validateMaze(mazeObj) {
        const promise = new Promise((res, err) => {
            setTimeout(() => {
                const mazeClass = new Maze(mazeObj);
                mazeClass.createMaze();
                const exits = ValidateMaze(mazeClass.maze);

                if (exits.exitIds.length === 1) {
                    console.log(`Successfully found ${exits.counts[exits.exitIds[0]]} way to go to the exit room found at ${exits.exitIds[0]}`);
                    res({ msg: 'Validated Maze config' });
                } else if (exits.exitIds.length > 1) {
                    err(ReferenceError('Found more than one exit room!'));
                } else {
                    err(ReferenceError('No passages to exit found'));
                }
            }, 1000);
        });
        return promise;
    }
}
