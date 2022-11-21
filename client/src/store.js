import { applyMiddleware } from "redux";
import configureStore from "redux"
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension"
import rootReducer from "./reducers/reducer";


const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware))

const store = configureStore(rootReducer, composedEnhancer)

export default store