/**
 * Returns a function that validates a Maze config and returns the available exits.
 */
import { ROOM_TYPES } from './constants';

function findEntrances(map) {
    let startId;
    for (const roomId in map) {
        if (map[roomId].type === ROOM_TYPES.ENTRANCE) {
            startId = roomId;
        }
    }

    if (!startId) {
        throw ReferenceError('Cannot find start room!');
    }

    return startId;
}

function findWaysToExit(exitIdOccurrences) {
    const exitIds = () => {
        return exitIdOccurrences.filter((a, b) => exitIdOccurrences.indexOf(a) === b);
    };
    const counts = {};

    for (let i = 0; i < exitIdOccurrences.length; i += 1) {
        const num = exitIdOccurrences[i];
        counts[num] = counts[num] ? counts[num] + 1 : 1;
    }

    return { exitIds: exitIds(), counts };
}

function checkRoom(currentRoom, map, exitID) {
    if (currentRoom.type === ROOM_TYPES.EXIT) {
        exitID.push(currentRoom.id);
        return exitID;
    } else {
        if (!currentRoom.passages.n.hasBeenChecked && currentRoom.passages.n.next) {
            map[currentRoom.id].updatePassage('n', true);
            exitID.concat(checkRoom(map[currentRoom.passages.n.next], map, exitID));
        }
        if (!currentRoom.passages.s.hasBeenChecked && currentRoom.passages.s.next) {
            map[currentRoom.id].updatePassage('s', true);

            exitID.concat(checkRoom(map[currentRoom.passages.s.next], map, exitID));
        }
        if (!currentRoom.passages.e.hasBeenChecked && currentRoom.passages.e.next) {
            map[currentRoom.id].updatePassage('e', true);
            exitID.concat(checkRoom(map[currentRoom.passages.e.next], map, exitID));
        }
        if (!currentRoom.passages.w.hasBeenChecked && currentRoom.passages.w.next) {
            map[currentRoom.id].updatePassage('w', true);
            exitID.concat(checkRoom(map[currentRoom.passages.w.next], map, exitID));
        }
        return exitID;
    }
}

export default function ValidateMaze(map) {
    try {
        const startId = findEntrances(map);

        const exitID = [];
        const exitIdOccurrences = checkRoom(map[startId], map, exitID);
        const exits = findWaysToExit(exitIdOccurrences);
        return exits;
    } catch (err) {
        throw ReferenceError(err);
    }
}
