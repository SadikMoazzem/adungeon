import Maze from '../maze/Maze';
import PlayerFactory from '../maze/PlayerFactory';

import { VIEW } from './constants';
import * as appActions from './actions';

export default function StartGame(dispatch, mapName, playerName) {
    dispatch(appActions.toggleOptionsView(false));
    dispatch(appActions.updateGameConfig({ mapId: mapName }));
    dispatch(appActions.viewUpdate(VIEW.LOADING));

    Maze.checkIfMapExists(mapName)
        .then((mapExists) => {
            dispatch(appActions.updateLoadingMessage(mapExists.msg));
            Maze.validateRooms(mapName)
                .then((roomsAreValid) => {
                    dispatch(appActions.updateLoadingMessage(roomsAreValid.msg));
                    Maze.validateMaze(mapName)
                        .then((mazeIsValid) => {
                            dispatch(appActions.updateLoadingMessage(mazeIsValid.msg));
                            setTimeout(() => {
                                dispatch(appActions.updateLoadingMessage('Starting Game'));
                                setTimeout(() => {
                                    const game = new Maze(mapName);
                                    game.createMaze();
                                    const startRoom = game.getStartRoom;
                                    const player = PlayerFactory({ name: playerName });
                                    dispatch(appActions.loadMazeGame(game));
                                    dispatch(appActions.updateGameConfig({ currentRoomId: startRoom }));
                                    dispatch(appActions.loadPlayer(player));
                                    dispatch(appActions.viewUpdate(VIEW.GAME_VIEW));
                                }, 1000);
                            }, 1500);
                        });
                });
        })
        .catch((err) => {
            console.error(err.message);
            dispatch(appActions.viewUpdate(VIEW.ERROR));
            dispatch(appActions.updateErrorMessage(err.message));
        });
}
