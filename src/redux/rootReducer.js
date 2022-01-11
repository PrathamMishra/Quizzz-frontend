import { combineReducers } from "redux";
import authReducer from "./auth/authReducer";
import errorReducer from "./error/errorReducer";
import roomDataReducer from "./roomData/roomDataReducer";

const rootReducer = combineReducers({
    error: errorReducer,
    auth: authReducer,
    roomData: roomDataReducer,
});

export default rootReducer;
