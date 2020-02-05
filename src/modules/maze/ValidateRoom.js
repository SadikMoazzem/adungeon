import { ROOM_VALIDATION, ROOM_TYPE_VALIDATION } from './constants';

export default function ValidateRoomsHasKeys(roomObj) {
    // Validation of keys in the room obj
    const missingKeys = [];
    for (const roomId in roomObj) {
        ROOM_VALIDATION.forEach((keyValidation) => {
            if (!(keyValidation in roomObj[roomId])) {
                missingKeys.push(keyValidation);
            }
        });
        if (!ROOM_TYPE_VALIDATION.includes(roomObj[roomId].roomType)) {
            missingKeys.push(roomObj[roomId].roomType);
        }
    }

    console.log(missingKeys)

    return missingKeys.length === 0 && Object.keys(roomObj).length > 0;
}
