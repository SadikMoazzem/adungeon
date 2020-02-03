import RoomFactory from './RoomFactory';
import KeyError from './KeyError';

import * as maps from './maps';
import { ROOM_TYPES } from './constants';
import ValidateMaze from './ValidateMaze';
import ValidateRoomsHasKeys from './ValidateRoom';

export default class Maze {
    constructor(mapID) {
        this.mapID = mapID;
        this.config = maps[this.mapID].config;
    }

    get getMaze() {
        return this.createMaze();
    }

    get getStartRoom() {
        return this.findStartRoom();
    }


    findStartRoom() {
        const startIds = [];
        for (const roomId in this.getMaze) {
            if (this.getMaze[roomId].type === ROOM_TYPES.ENTRANCE) {
                startIds.push(roomId);
            }
        }

        return startIds[Math.floor(Math.random() * startIds.length)];
    }

    /**
     * Gets a room object by ID
     */
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
            maze[roomId] = RoomFactory({ id: roomId, type: config.roomType });
            maze[roomId].generateRoomItems();
            maze[roomId].setPassages(config);
        }

        return maze;
    }

    /**
     * Validation split into promises so we can simulate loading
     */
    static checkIfMapExists(mapID) {
        const promise = new Promise((res, err) => {
            setTimeout(() => {
                if (!maps[mapID]) {
                    err(ReferenceError('Map does not exist'));
                } else {
                    res({ msg: 'Map Found' });
                }
            }, 1000);
        });
        return promise;
    }

    static validateRooms(mapID) {
        const promise = new Promise((res, err) => {
            setTimeout(() => {
                if (!ValidateRoomsHasKeys(maps[mapID].schema)) {
                    err(new KeyError('Room object is missing keys.'));
                } else {
                    res({ msg: 'Rooms are valid!' });
                }
            }, 1000);
        });
        return promise;
    }

    static validateMaze(mapID) {
        const promise = new Promise((res, err) => {
            setTimeout(() => {
                const exits = ValidateMaze(new Maze(mapID).getMaze);

                if (exits.exitIds.length === 1) {
                    console.log(`Successfully found ${exits.counts[exits.exitIds[0]]} ways to go to the exit room found at ${exits.exitIds[0]}`);
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
