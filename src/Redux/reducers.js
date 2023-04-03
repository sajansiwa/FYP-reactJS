import { combineReducers } from "redux";
import authReducer from "./loginSlice";

const rootReducer = combineReducers({
  auth: authReducer,
});

export default rootReducer;
