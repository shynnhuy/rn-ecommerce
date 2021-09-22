import AsyncStorage from "@react-native-async-storage/async-storage";
import {createStore, applyMiddleware} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import createSagaMiddleware from "redux-saga";
import debug from "redux-flipper";

import {rootReducer} from "./reducer";
import {rootSaga} from "./saga";

const sagaMiddleware = createSagaMiddleware();
const createDebugger = debug();
const middleware = [sagaMiddleware, createDebugger];

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};
const reducer = persistReducer(persistConfig, rootReducer);

export const configureStore = () => {
  const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(...middleware)),
  );

  sagaMiddleware.run(rootSaga);
  const persistor = persistStore(store);

  return {store, persistor};
};
