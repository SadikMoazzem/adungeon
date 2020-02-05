export const ROOM_TYPES = {
    DEFAULT: 'DEFAULT',
    ENTRANCE: 'ENTRANCE',
    EXIT: 'EXIT',
    TREASURE: 'TREASURE',
    ENEMY: 'ENEMY',
};

export const BACKGROUNDS = [
    'dungeon_backgrounds/background_1.jpg',
    'dungeon_backgrounds/background_2.jpg',
    'dungeon_backgrounds/background_3.jpg',
    'dungeon_backgrounds/background_4.jpg',
    'dungeon_backgrounds/background_5.jpg',
];

export const ITEM_TYPES = {
    ENEMY: 'ENEMY_CONFIGS',
    TREASURE: 'TREASURE_TYPES',
    NOTHING: 'NOTHING',
};

export const TREASURE_TYPES = {
    SACK_OF_GOLD: 'SACK_OF_GOLD',
    SACK_OF_SILVER: 'SACK_OF_SILVER',
    RUBY: 'RUBY',
};

export const TREASURE_CONFIGS = {
    SACK_OF_GOLD: {
        TREASURE: 10,
    },
    SACK_OF_SILVER: {
        TREASURE: 5,
    },
    RUBY: {
        TREASURE: 15,
    },
};

export const TREASURE_BACKGROUNDS = {
    [TREASURE_TYPES.RUBY]: 'treasure/ruby.png',
    [TREASURE_TYPES.SACK_OF_GOLD]: 'treasure/gold.png',
    [TREASURE_TYPES.SACK_OF_SILVER]: 'treasure/silver.png',
};

export const PLAYER_ACTIONS = {
    WEALTH_GAIN: 'WEALTH_GAIN',
    MONSTER_ATTACK: 'MONSTER_ATTACK',
    MARK_ROOM: 'MARK_ROOM',
    TRAVEL_ROOM: 'TRAVEL_ROOM',
};

export const PLAYER_FIGHT = {
    FIGHT_ENEMY_SLICE: 'FIGHT_ENEMY_SLICE',
    FIGHT_ENEMY_WHACK: 'FIGHT_ENEMY_WHACK',
    FIGHT_ENEMY_STAB: 'FIGHT_ENEMY_STAB',
    FIGHT_ENEMY_BASH: 'FIGHT_ENEMY_BASH',
};

export const ACTION_OPTIONS = {
    MOVE_NORTH: {
        view: 'Move Up',
        action: PLAYER_ACTIONS.TRAVEL_ROOM,
        direction: 'n',
    },
    MOVE_SOUTH: {
        view: 'Move Down',
        action: PLAYER_ACTIONS.TRAVEL_ROOM,
        direction: 's',
    },
    MOVE_EAST: {
        view: 'Move Right',
        action: PLAYER_ACTIONS.TRAVEL_ROOM,
        direction: 'e',
    },
    MOVE_WEST: {
        view: 'Move Left',
        action: PLAYER_ACTIONS.TRAVEL_ROOM,
        direction: 'w',
    },
    TAG_ROOM: {
        view: 'Tag room',
        action: PLAYER_ACTIONS.MARK_ROOM,
    },
    TAKE_TREASURE: {
        view: 'Take Treasure',
        action: PLAYER_ACTIONS.WEALTH_GAIN,
    },
    FIGHT_ENEMY_SLICE: {
        view: 'Slice Enemy',
        action: PLAYER_FIGHT.FIGHT_ENEMY_SLICE,
    },
    FIGHT_ENEMY_WHACK: {
        view: 'Whack Enemy',
        action: PLAYER_FIGHT.FIGHT_ENEMY_WHACK,
    },
    FIGHT_ENEMY_STAB: {
        view: 'Stab Enemy',
        action: PLAYER_FIGHT.FIGHT_ENEMY_STAB,
    },
    FIGHT_ENEMY_BASH: {
        view: 'Bash Enemy',
        action: PLAYER_FIGHT.FIGHT_ENEMY_BASH,
    },
};

export const ACTION_TIPS = {
    Move: 'Move to another room',
    Tag: 'Save the room',
    Fight: 'Fight the monster',
    Loot: 'Take the loot',
};

export const DEFAULT_ROOM_ACTIONS = {
    Move: [
        ACTION_OPTIONS.MOVE_NORTH,
        ACTION_OPTIONS.MOVE_SOUTH,
        ACTION_OPTIONS.MOVE_EAST,
        ACTION_OPTIONS.MOVE_WEST,
    ],
    Tag: [
        ACTION_OPTIONS.TAG_ROOM,
    ],
    Fight: [
        ACTION_OPTIONS.FIGHT_ENEMY_BASH,
        ACTION_OPTIONS.FIGHT_ENEMY_SLICE,
        ACTION_OPTIONS.FIGHT_ENEMY_STAB,
        ACTION_OPTIONS.FIGHT_ENEMY_WHACK,
    ],
    Loot: [
        ACTION_OPTIONS.TAKE_TREASURE,
    ],
};

export const ENEMY_TYPES = {
    MONSTER: 'MONSTER',
    GHOST: 'GHOST',
};

// DPA - Dmg per attack
export const ENEMY_CONFIGS = {
    MONSTER: {
        dpa: 10,
        defeatedBy: PLAYER_FIGHT.FIGHT_ENEMY_BASH,
        view: ['enemies/monster_1.png', 'enemies/monster_2.png'],
    },
    GHOST: {
        dpa: 10,
        defeatedBy: PLAYER_FIGHT.FIGHT_ENEMY_SLICE,
        view: ['enemies/ghost_1.png', 'enemies/ghost_2.png'],
    },
};

// Testing configs
export const ROOM_VALIDATION = [
    'roomId', 'north', 'east', 'south', 'west', 'roomType',
];

export const ROOM_TYPE_VALIDATION = [
    'DEFAULT', 'ENTRANCE', 'EXIT', 'TREASURE', 'ENEMY',
];
