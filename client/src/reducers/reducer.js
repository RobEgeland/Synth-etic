import { combineRuducers } from "redux";
import userReducer from "./userReducer";


const rootReducer = combineRuducers({
    users: userReducer,
})

export default rootReducer;