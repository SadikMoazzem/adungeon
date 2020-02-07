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
        case moduleActions.GAME_RESET:
            return {
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
        case moduleActions.ROOM_TAG: {
            const updatedPlayer = Object.assign({}, state.playerConfig);
            updatedPlayer.updateWealth(-1);
            updatedPlayer.addTaggedRoom(action.roomId);
            return {
                ...state,
                playerConfig: Object.assign({}, state.playerConfig, updatedPlayer)
            };
        }
        case moduleActions.ROOM_LOOT: {
            const updatedRooms = Object.assign({}, state.mazeConfig.maze);
            updatedRooms[action.roomId.toString()].removeTreasures();
            const updatedMaze = state.mazeConfig.updateMaze(updatedRooms);
            return {
                ...state,
                playerConfig: Object.assign({}, state.playerConfig, state.playerConfig.updateWealth(action.value)),
                mazeConfig: updatedMaze,
            };
        }
        case moduleActions.PLAYER_HEALTH_UPDATE: {
            return {
                ...state,
                playerConfig: Object.assign({}, state.playerConfig, state.playerConfig.updateHealth(action.health))
            };
        }
        case moduleActions.PLAYER_MONSTER_DEFEAT: {
            const updatedRooms = Object.assign({}, state.mazeConfig.maze);
            updatedRooms[action.roomId.toString()].removeEnemies();
            const updatedMaze = state.mazeConfig.updateMaze(updatedRooms);
            return {
                ...state,
                mazeConfig: updatedMaze,
            };
        }
        default:
            return state;
    }
}
