import { SET_ROOM_DATA, CLEAR_ROOM_DATA } from "./roomDataType";

const initialState = {};

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_ROOM_DATA:
            return {
                ...action.data,
            };
        case CLEAR_ROOM_DATA:
            return {};
        default:
            return state;
    }
}
