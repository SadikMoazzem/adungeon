import { ROOM_TYPES } from './constants';

import KeyError from './KeyError';

function findEntrances(map) {
    let startId;
    for (const roomId in map) {
        if (map[roomId].roomType === ROOM_TYPES.ENTRANCE) {
            startId = roomId;
        }
    }

    if (!startId) {
        throw new KeyError('Cannot find start room!');
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
    if (currentRoom.roomType === ROOM_TYPES.EXIT) {
        exitID.push(currentRoom.roomId);
        return exitID;
    } else {
        if (!currentRoom.config.n.hasBeenChecked && currentRoom.config.n.next) {
            map[currentRoom.roomId].config.n.hasBeenChecked = true;
            exitID.concat(checkRoom(map[currentRoom.config.n.next], map, exitID));
        }
        if (!currentRoom.config.s.hasBeenChecked && currentRoom.config.s.next) {
            map[currentRoom.roomId].config.s.hasBeenChecked = true;
            exitID.concat(checkRoom(map[currentRoom.config.s.next], map, exitID));
        }
        if (!currentRoom.config.e.hasBeenChecked && currentRoom.config.e.next) {
            map[currentRoom.roomId].config.e.hasBeenChecked = true;
            exitID.concat(checkRoom(map[currentRoom.config.e.next], map, exitID));
        }
        if (!currentRoom.config.w.hasBeenChecked && currentRoom.config.w.next) {
            map[currentRoom.roomId].config.w.hasBeenChecked = true;
            exitID.concat(checkRoom(map[currentRoom.config.w.next], map, exitID));
        }
        return exitID;
    }
}

export default function ValidateMaze(map) {
    const startId = findEntrances(map);

    const exitID = [];
    const exitIdOccurrences = checkRoom(map[startId], map, exitID);
    const exits = findWaysToExit(exitIdOccurrences);

    return exits;
}
