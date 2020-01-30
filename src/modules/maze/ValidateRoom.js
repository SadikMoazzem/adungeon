import { ROOM_VALIDATION } from './constants';

export default function ValidateRoomsHasKeys(roomObj) {
    // Validation of keys in the room obj
    const missingKeys = [];
    for (const roomId in roomObj) {
        ROOM_VALIDATION.forEach((keyValidation) => {
            if (!(keyValidation in roomObj[roomId])) {
                missingKeys.push(keyValidation);
            }
        });
    }

    return missingKeys.length === 0;
}
