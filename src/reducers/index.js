import authReducer from "./auth";
import {combineReducers} from "redux";
import roomReducer from "./room";

const reducer = combineReducers({auth: authReducer},{room: roomReducer});

export default reducer;