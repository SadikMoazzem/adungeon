import {
    ENEMY_TYPES, WEAPON_TYPES, ROOM_TYPES, TREASURE_TYPES, BACKGROUNDS,
} from './constants';

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
}
