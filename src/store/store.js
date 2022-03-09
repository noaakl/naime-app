import { createStore } from "redux";
import { combineReducers } from "redux";
import Reduser from "./reduser";

const combinedReducers = combineReducers({ reduser: Reduser });

const store = createStore(
  combinedReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
export default store;
