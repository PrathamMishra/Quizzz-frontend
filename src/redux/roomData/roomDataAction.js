import { SET_ROOM_DATA, CLEAR_ROOM_DATA } from "./roomDataType";

export const setRoomData = (roomData) => {
    return {
        type: SET_ROOM_DATA,
        data: roomData,
    };
};

export const clearRoomData = () => {
    return {
        type: CLEAR_ROOM_DATA,
    };
};
