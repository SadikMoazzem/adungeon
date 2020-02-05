/**
 * A Factory Function that creates a room Obj
 */
import {
    ENEMY_TYPES, WEAPON_TYPES, ROOM_TYPES, TREASURE_TYPES, BACKGROUNDS,
    DEFAULT_ROOM_ACTIONS, ENEMY_CONFIGS,
} from './constants';

const createRoom = ({
    id, type, passages = {}, enemy = '', enemyView = '', treasure = '', actions = DEFAULT_ROOM_ACTIONS, background = '',
}) => ({
    id,
    type,
    passages,
    enemy,
    enemyView,
    treasure,
    actions,
    background,
    generateRoomItems() {
        const getRandomValue = (Obj) => {
            const keys = Object.keys(Obj);
            return Obj[keys[keys.length * Math.random() << 0]];
        };

        const getRandomImage = (images) => {
            return images[Math.floor(Math.random() * images.length)];
        };

        switch (this.type) {
            case ROOM_TYPES.ENTRANCE:
                this.weapon = Object.keys(WEAPON_TYPES);
                this.background = BACKGROUNDS.ENTRANCE;
                break;
            case ROOM_TYPES.ENEMY:
                this.enemy = getRandomValue(ENEMY_TYPES);
                this.background = BACKGROUNDS.ENEMY;
                this.enemyView = getRandomImage(ENEMY_CONFIGS[this.enemy].view);
                break;
            case ROOM_TYPES.TREASURE:
                this.treasure = getRandomValue(TREASURE_TYPES);
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
    },
    setPassages(passagesObj) {
        this.passages = {
            n: {
                next: passagesObj.north,
                hasBeenChecked: false,
            },
            e: {
                next: passagesObj.east,
                hasBeenChecked: false,
            },
            s: {
                next: passagesObj.south,
                hasBeenChecked: false,
            },
            w: {
                next: passagesObj.west,
                hasBeenChecked: false,
            },
        };
        return this;
    },
    updatePassage(direction, hasBeenChecked = false) {
        if (!this.passages[direction]) console.error('Invalid Direction Provided!');
        this.passages[direction].hasBeenChecked = hasBeenChecked;
        return this;
    },
    setEnemy(enemies) {
        this.enemy = enemies;
        return this;
    },
    setTreasures(treasures) {
        this.treasure = treasures;
        return this;
    },
    removeTreasures() {
        this.treasure = '';
        return this;
    },
    removeEnemies() {
        this.enemy = '';
        return this;
    },
});

export default createRoom;
