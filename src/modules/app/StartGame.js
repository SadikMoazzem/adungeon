import Maze from '../maze/Maze';

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
                                const game = new Maze(mapName);
                                dispatch(appActions.loadMazeGame(game.getMaze));
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
