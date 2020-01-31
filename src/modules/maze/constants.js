export const ROOM_TYPES = {
    DEFAULT: 'DEFAULT',
    ENTRANCE: 'ENTRANCE',
    EXIT: 'EXIT',
    TREASURE: 'TREASURE',
    ENEMY: 'ENEMY',
};

export const BACKGROUNDS = {
    DEFAULT: 'dungeon_backgrounds/default.jpg',
    ENTRANCE: 'dungeon_backgrounds/entrance.jpg',
    EXIT: 'dungeon_backgrounds/exit.jpg',
    TREASURE: 'dungeon_backgrounds/treasure',
    ENEMY: 'dungeon_backgrounds/enemy.jpg',
};

export const ENEMY_TYPES = {
    MONSTER: 'MONSTER',
    ALIEN: 'ALIEN',
};

// DPA - Dmg per attack
export const ENEMY_CONFIGS = {
    MONSTER: {
        hp: 40,
        dpa: 10,
        TREASURE: 15,
    },
    ALIEN: {
        hp: 40,
        dpa: 10,
        TREASURE: 10,
    },
};

export const ITEM_TYPES = {
    ENEMY: 'ENEMY_CONFIGS',
    TREASURE: 'TREASURE_TYPES',
    NOTHING: 'NOTHING',
};

export const TREASURE_TYPES = {
    SACK_OF_GOLD: 'SACK_OF_GOLD',
    SACK_OF_SILVER: 'SACK_OF_SILVER',
    SACK_OF_COPPER: 'SACK_OF_COPPER',
    RUBY: 'RUBY',
};

export const TREASURE_CONFIGS = {
    SACK_OF_GOLD: {
        TREASURE: 10,
    },
    SACK_OF_SILVER: {
        TREASURE: 5,
    },
    SACK_OF_COPPER: {
        TREASURE: 3,
    },
    RUBY: {
        TREASURE: 15,
    },
};

export const WEAPON_TYPES = {
    FIST: 'FIST',
    SWORD: 'SWORD',
    MALLET: 'MALLET',
    STICK: 'STICK',
};

export const WEAPON_CONFIGS = {
    FIST: {
        DPA: 5,
    },
    SWORD: {
        DPA: 10,
    },
    MALLET: {
        DPA: 10,
    },
    STICK: {
        DPA: 10,
    },
};

export const PLAYER_ACTIONS = {
    TREASURE_WEALTH_GAIN: 'TREASURE_WEALTH_GAIN',
    MONSTER_WEALTH_GAIN: 'MONSTER_WEALTH_GAIN',
    MONSTER_ATTACK: 'MONSTER_ATTACK',
    MARK_ROOM: 'MARK_ROOM',
    TRAVEL_ROOM: 'TRAVEL_ROOM',
};

export const ACTION_OPTIONS = {
    MOVE_NORTH: {
        view: 'Go North',
        Action: PLAYER_ACTIONS.TRAVEL_ROOM,
    },
    MOVE_SOUTH: {
        view: 'Go South',
        Action: PLAYER_ACTIONS.TRAVEL_ROOM,
    },
    MOVE_EAST: {
        view: 'Go East',
        Action: PLAYER_ACTIONS.TRAVEL_ROOM,
    },
    MOVE_WEST: {
        view: 'Go West',
        Action: PLAYER_ACTIONS.TRAVEL_ROOM,
    },
    TAG_ROOM: {
        view: 'Tag room',
        Action: PLAYER_ACTIONS.MARK_ROOM,
    },
    FIGHT_ENEMY: {
        view: 'Fight Enemy',
        Action: PLAYER_ACTIONS.ENEMY_ATTACK,
    },
    LOOT_ENEMY: {
        view: 'Loot Enemy',
        Action: PLAYER_ACTIONS.ENEMY_WEALTH_GAIN,
    },
    TAKE_TREASURE: {
        view: 'Take Treasure',
        Action: PLAYER_ACTIONS.TREASURE_WEALTH_GAIN,
    },
};

export const DEFAULT_ROOM_ACTIONS = [
    ACTION_OPTIONS.MOVE_NORTH,
    ACTION_OPTIONS.MOVE_SOUTH,
    ACTION_OPTIONS.MOVE_EAST,
    ACTION_OPTIONS.MOVE_WEST,
    ACTION_OPTIONS.TAG_ROOM,
];

export const ENEMY_ROOM_ACTIONS = [
    ACTION_OPTIONS.FIGHT_ENEMY,
    ACTION_OPTIONS.LOOT_ENEMY,
];

export const TREASURE_ROOM_ACTION = [
    ACTION_OPTIONS.TAKE_TREASURE,
];

// Testing configs

export const ROOM_VALIDATION = [
    'roomId', 'north', 'east', 'south', 'west', 'roomType',
];
