import * as moduleActions from './actions';
import { PLAYER_FIGHT, ENEMY_CONFIGS } from '../maze/constants';

export default function PlayerFightHandler(dispatch, action, room) {
    if (!(action in PLAYER_FIGHT)) {
        console.error('Action not found');
    }

    if (!room.enemy) {
        dispatch(moduleActions.logGame('Nothing to fight!'));
        return;
    }

    const enemy = ENEMY_CONFIGS[room.enemy];

    switch (action) {
        case PLAYER_FIGHT.FIGHT_ENEMY_BASH:
            if (enemy.defeatedBy === PLAYER_FIGHT.FIGHT_ENEMY_BASH) {
                dispatch(moduleActions.defeatMonster(room.id));
                dispatch(moduleActions.logGame('You have defeated the monster!'));
            } else {
                dispatch(moduleActions.healthUpdate(enemy.dpa));
                dispatch(moduleActions.logGame('Attack was not effective.'));
                dispatch(moduleActions.logGame(`you took ${enemy.dpa} damage.`));
            }
            break;
        case PLAYER_FIGHT.FIGHT_ENEMY_SLICE:
            if (enemy.defeatedBy === PLAYER_FIGHT.FIGHT_ENEMY_SLICE) {
                dispatch(moduleActions.defeatMonster(room.id));
                dispatch(moduleActions.logGame('You have defeated the monster!'));
            } else {
                dispatch(moduleActions.healthUpdate(enemy.dpa));
                dispatch(moduleActions.logGame('Attack was not effective.'));
                dispatch(moduleActions.logGame(`you took ${enemy.dpa} damage.`));
            }
            break;
        case PLAYER_FIGHT.FIGHT_ENEMY_STAB:
            if (enemy.defeatedBy === PLAYER_FIGHT.FIGHT_ENEMY_STAB) {
                dispatch(moduleActions.defeatMonster(room.id));
                dispatch(moduleActions.logGame('You have defeated the monster!'));
            } else {
                dispatch(moduleActions.healthUpdate(enemy.dpa));
                dispatch(moduleActions.logGame('Attack was not effective.'));
                dispatch(moduleActions.logGame(`you took ${enemy.dpa} damage.`));
            }
            break;
        case PLAYER_FIGHT.FIGHT_ENEMY_WHACK:
            if (enemy.defeatedBy === PLAYER_FIGHT.FIGHT_ENEMY_WHACK) {
                dispatch(moduleActions.defeatMonster(room.id));
                dispatch(moduleActions.logGame('You have defeated the monster!'));
            } else {
                dispatch(moduleActions.healthUpdate(enemy.dpa));
                dispatch(moduleActions.logGame('Attack was not effective.'));
                dispatch(moduleActions.logGame(`you took ${enemy.dpa} damage.`));
            }
            break;
        default:
            break;
    }
}
