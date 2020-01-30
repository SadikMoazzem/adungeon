export const VIEW_UPDATE = 'VIEW_UPDATE';
export const OPTIONS_VIEW_TOGGLE = 'OPTIONS_VIEW_TOGGLE';
export const LOADING_MESSAGE_UPDATE = 'LOADING_MESSAGE_UPDATE';
export const ERROR_MESSAGE_UPDATE = 'ERROR_MESSAGE_UPDATE';
export const GAME_CONFIG_UPDATE = 'GAME_CONFIG_UPDATE';
export const MAZE_GAME_LOAD = 'MAZE_GAME_LOAD';

export function viewUpdate(newView) {
    return {
        type: 'VIEW_UPDATE',
        newView,
    };
}

export function toggleOptionsView(isOpen) {
    return {
        type: 'OPTIONS_VIEW_TOGGLE',
        isOpen,
    };
}

export function updateLoadingMessage(message) {
    return {
        type: 'LOADING_MESSAGE_UPDATE',
        message,
    };
}

export function updateErrorMessage(message) {
    return {
        type: 'ERROR_MESSAGE_UPDATE',
        message,
    };
}

export function updateGameConfig(config) {
    return {
        type: 'GAME_CONFIG_UPDATE',
        config,
    };
}

export function loadMazeGame(maze) {
    return {
        type: 'MAZE_GAME_LOAD',
        maze,
    };
}
