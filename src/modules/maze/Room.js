import {
    ENEMY_TYPES, WEAPON_TYPES, ROOM_VALIDATION, ROOM_TYPES, TREASURE_TYPES, BACKGROUNDS
} from './constants';
import KeyError from './KeyError';

export default class Room {
    constructor(roomObj) {
        this.roomId = roomObj.roomId;
        this.roomType = roomObj.roomType;
        this.enemy = [];
        this.treasures = [];
        this.weapons = [];
        this.view = false;
        this.background = '';
        this.config = {
            n: {
                next: roomObj.north,
                hasBeenChecked: false,
            },
            e: {
                next: roomObj.east,
                hasBeenChecked: false,
            },
            s: {
                next: roomObj.south,
                hasBeenChecked: false,
            },
            w: {
                next: roomObj.west,
                hasBeenChecked: false,
            },
        };

        this.renderRoomSettings();
    }

    renderRoomSettings() {
        const getRandomValue = (Obj) => {
            const keys = Object.keys(Obj);
            return Obj[keys[keys.length * Math.random() << 0]];
        };

        switch (this.roomType) {
            case ROOM_TYPES.ENTRANCE:
                this.weapons = Object.keys(WEAPON_TYPES);
                this.background = BACKGROUNDS.ENTRANCE;
                break;
            case ROOM_TYPES.ENEMY:
                this.enemy = getRandomValue(ENEMY_TYPES);
                this.background = BACKGROUNDS.ENEMY;
                break;
            case ROOM_TYPES.TREASURE:
                this.treasures = getRandomValue(TREASURE_TYPES);
                this.background = BACKGROUNDS.TREASURE;
                break;
            case ROOM_TYPES.EXIT:
                this.background = BACKGROUNDS.EXIT;
                break;
            default:
            case ROOM_TYPES.DEFAULT:
                this.background = BACKGROUNDS.DEFAULT;
                break;
        }
    }

    static validateRooms(roomObj) {
        // Validation of keys
        const missingKeys = [];
        for (const roomId in roomObj) {
            ROOM_VALIDATION.forEach((keyValidation) => {
                if (!(keyValidation in roomObj[roomId])) {
                    missingKeys.push(keyValidation);
                }
            });
        }

        return missingKeys.length === 0;
    }

    static checkMapWorks(map) {
        let startId;
        for (const roomId in map) {
            if (map[roomId].roomType === ROOM_TYPES.ENTRANCE) {
                startId = roomId;
            }
        }

        if (!startId) {
            throw new KeyError('Cannot find start room!');
        }

        console.log(`Found Entrance room(s) at ${startId}`);
        const exitID = [];
        const exitIdOccurrences = this.checkRoom(map[startId], map, exitID);
        const exits = this.checkWaysToExit(exitIdOccurrences);

        return exits;
    }

    static checkWaysToExit(exitIdOccurrences) {
        const exitIds = () => {
            return exitIdOccurrences.filter((a, b) => exitIdOccurrences.indexOf(a) === b);
        };
        const counts = {};

        for (let i = 0; i < exitIdOccurrences.length; i += 1) {
            const num = exitIdOccurrences[i];
            counts[num] = counts[num] ? counts[num] + 1 : 1;
        }

        return { exitIds: exitIds(), counts };
    }

    static checkRoom(currentRoom, map, exitID) {
        if (currentRoom.roomType === ROOM_TYPES.EXIT) {
            exitID.push(currentRoom.roomId);
            return exitID;
        } else {
            if (!currentRoom.config.n.hasBeenChecked && currentRoom.config.n.next) {
                map[currentRoom.roomId].config.n.hasBeenChecked = true;
                exitID.concat(this.checkRoom(map[currentRoom.config.n.next], map, exitID));
            }
            if (!currentRoom.config.s.hasBeenChecked && currentRoom.config.s.next) {
                map[currentRoom.roomId].config.s.hasBeenChecked = true;
                exitID.concat(this.checkRoom(map[currentRoom.config.s.next], map, exitID));
            }
            if (!currentRoom.config.e.hasBeenChecked && currentRoom.config.e.next) {
                map[currentRoom.roomId].config.e.hasBeenChecked = true;
                exitID.concat(this.checkRoom(map[currentRoom.config.e.next], map, exitID));
            }
            if (!currentRoom.config.w.hasBeenChecked && currentRoom.config.w.next) {
                map[currentRoom.roomId].config.w.hasBeenChecked = true;
                exitID.concat(this.checkRoom(map[currentRoom.config.w.next], map, exitID));
            }
            return exitID;
        }
    }
}
