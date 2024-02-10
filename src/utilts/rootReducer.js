// rootReducer.js

import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage/session"; // You can choose different storage options
import appReducer from "./appSlice";
import searchReducer from "./searchSlice";
import chatReducer from "./chatSlice";

const persistConfig = {
  key: "root",
  storage,
  // Other options can be added here, like whitelist, blacklist, etc.
};

const rootReducer = combineReducers({
  app: appReducer,
  search: searchReducer,
  chat: chatReducer,
  // Add other reducers here if you have more slices
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
