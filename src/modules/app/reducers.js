import * as moduleActions from './actions';
import { VIEW } from './constants';

const initialState = {
    currentView: VIEW.MAIN_MENU,
    isOptionsOpen: false,
    loadingMessage: 'Checking Maze Config...',
    errorMessage: '',
    gameLog: ['Game Loaded!'],
    gameConfig: {
        currentRoomId: null,
        mapId: null,
    },
    mazeConfig: {},
    playerConfig: {},
};

export function app(state = initialState, action) {
    switch (action.type) {
        case moduleActions.VIEW_UPDATE:
            return {
                ...state,
                currentView: action.newView,
            };
        case moduleActions.OPTIONS_VIEW_TOGGLE:
            return {
                ...state,
                isOptionsOpen: action.isOpen,
            };
        case moduleActions.LOADING_MESSAGE_UPDATE:
            return {
                ...state,
                loadingMessage: action.message,
            };
        case moduleActions.ERROR_MESSAGE_UPDATE:
            return {
                ...state,
                errorMessage: action.message,
            };
        case moduleActions.GAME_CONFIG_UPDATE:
            return {
                ...state,
                gameConfig: Object.assign({}, state.gameConfig, action.config),
            };
        case moduleActions.MAZE_GAME_LOAD:
            return {
                ...state,
                mazeConfig: action.maze,
            };
        case moduleActions.PLAYER_LOAD:
            return {
                ...state,
                playerConfig: action.player,
            };
        case moduleActions.GAME_LOG_MESSAGE:
            return {
                ...state,
                gameLog: state.gameLog.concat(action.log),
            };
        default:
            return state;
    }
}
