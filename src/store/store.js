import { createStore } from "redux";
import { combineReducers } from "redux";
import Reduser from "./reduser";

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const combinedReducers = combineReducers({ reduser: Reduser });

// const store = createStore(
//   combinedReducers,
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
// export default store;



const persistConfig = {
  key: 'root',
  storage: storage,
}
 
const persistedReducer = persistReducer(persistConfig, combinedReducers)
 
// export default () => {
export const store = createStore(persistedReducer)
export const persistor = persistStore(store)
  // return { store, persistor }
// }