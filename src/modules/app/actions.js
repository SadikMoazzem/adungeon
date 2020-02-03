export const GAME_RESET = 'GAME_RESET';
export const VIEW_UPDATE = 'VIEW_UPDATE';
export const OPTIONS_VIEW_TOGGLE = 'OPTIONS_VIEW_TOGGLE';
export const LOADING_MESSAGE_UPDATE = 'LOADING_MESSAGE_UPDATE';
export const ERROR_MESSAGE_UPDATE = 'ERROR_MESSAGE_UPDATE';
export const GAME_CONFIG_UPDATE = 'GAME_CONFIG_UPDATE';
export const MAZE_GAME_LOAD = 'MAZE_GAME_LOAD';
export const PLAYER_LOAD = 'PLAYER_LOAD';
export const GAME_LOG_MESSAGE = 'GAME_LOG_MESSAGE';
export const ROOM_TAG = 'ROOM_TAG';
export const ROOM_LOOT = 'ROOM_LOOT';

export function reset() {
    return {
        type: GAME_RESET,
    };
}

export function viewUpdate(newView) {
    return {
        type: VIEW_UPDATE,
        newView,
    };
}

export function toggleOptionsView(isOpen) {
    return {
        type: OPTIONS_VIEW_TOGGLE,
        isOpen,
    };
}

export function updateLoadingMessage(message) {
    return {
        type: LOADING_MESSAGE_UPDATE,
        message,
    };
}

export function updateErrorMessage(message) {
    return {
        type: ERROR_MESSAGE_UPDATE,
        message,
    };
}

export function updateGameConfig(config) {
    return {
        type: GAME_CONFIG_UPDATE,
        config,
    };
}

export function loadMazeGame(maze, mazeObj) {
    return {
        type: MAZE_GAME_LOAD,
        maze,
        mazeObj,
    };
}

export function loadPlayer(player) {
    return {
        type: PLAYER_LOAD,
        player,
    };
}

export function logGame(message) {
    return {
        type: GAME_LOG_MESSAGE,
        log: message,
    };
}

export function tagRoom(roomId) {
    return {
        type: ROOM_TAG,
        roomId,
    };
}

export function lootRoom(value, roomId) {
    return {
        type: ROOM_LOOT,
        value,
        roomId,
    };
}
