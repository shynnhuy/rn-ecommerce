import React from "react";
import {Provider as ReduxProvider} from "react-redux";
import {NavigationContainer} from "@react-navigation/native";
import {SafeAreaProvider} from "react-native-safe-area-context";
import {PersistGate} from "redux-persist/integration/react";

import {configureStore} from "./redux/store";
import {LoadingScreen} from "./containers/loading.screen";

const {store, persistor} = configureStore();

export const Provider = ({children}) => {
  return (
    <ReduxProvider store={store}>
      <PersistGate persistor={persistor} loading={<LoadingScreen />}>
        <NavigationContainer>
          <SafeAreaProvider>{children}</SafeAreaProvider>
        </NavigationContainer>
      </PersistGate>
    </ReduxProvider>
  );
};
