import * as moduleActions from './actions';
import { VIEW } from './constants';
import * as mazeConfig from '../maze/constants';

export default function PlayerActionHandler(dispatch, actionType, data = {}, mazeObj = {}, playerObj = {}) {
    if (!(actionType in mazeConfig.PLAYER_ACTIONS)) {
        console.error('Invalid actionType passed');
    }

    switch (actionType) {
        case mazeConfig.PLAYER_ACTIONS.TRAVEL_ROOM: {
            if (mazeObj[data.roomId].enemy) {
                dispatch(moduleActions.logGame('Cannot leave until enemy is defeated!'));
                return;
            }

            if (!mazeObj[data.roomId].passages[data.direction].next) {
                dispatch(moduleActions.logGame('You cannot go this way!'));
                return;
            }

            // Change the value of the current room
            dispatch(moduleActions.updateGameConfig({ currentRoomId: data.nextRoomId }));
            dispatch(moduleActions.logGame('Player moved to a room'));

            const newRoomObj = mazeObj[data.nextRoomId];
            if (newRoomObj.type === mazeConfig.ROOM_TYPES.ENEMY) {
                dispatch(moduleActions.logGame('There is a Enemy in this room, defeat it to carry on.'));
            }

            if (newRoomObj.type === mazeConfig.ROOM_TYPES.TREASURE) {
                dispatch(moduleActions.logGame('There is treasure in this room.'));
            }

            if (newRoomObj.type === mazeConfig.ROOM_TYPES.EXIT) {
                dispatch(moduleActions.logGame('You have found the exit'));
                dispatch(moduleActions.viewUpdate(VIEW.END_GAME_VICTORY));
            }

            break;
        }
        case mazeConfig.PLAYER_ACTIONS.MARK_ROOM:
            if (playerObj.wealth > 0) {
                dispatch(moduleActions.tagRoom(data.roomId));
                dispatch(moduleActions.logGame('Saved room to map! Paid 1 gold'));
            } else {
                dispatch(moduleActions.logGame('You have no gold to tag room with'));
            }
            break;
        case mazeConfig.PLAYER_ACTIONS.WEALTH_GAIN:
            dispatch(moduleActions.lootRoom(data.value, data.roomId));
            break;
        default:
            break;
    }
}
