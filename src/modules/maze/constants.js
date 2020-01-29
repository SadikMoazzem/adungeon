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
        gold: 15,
    },
    ALIEN: {
        hp: 40,
        dpa: 10,
        gold: 10,
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

// Testing configs

export const ROOM_VALIDATION = [
    'roomId', 'north', 'east', 'south', 'west', 'roomType',
];
