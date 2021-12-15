import { combineReducers } from "redux"
import authReducer from "./auth/authReducer"
import errorReducer from "./error/errorReducer"

const rootReducer = combineReducers({
    error: errorReducer,
    auth:authReducer,
})

export default rootReducer