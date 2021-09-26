import React from "react";
import { Provider as ReduxProvider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ToastProvider } from "react-native-toast-notifications";
import { PersistGate } from "redux-persist/integration/react";

import { configureStore } from "./redux/store";
import { Loading } from "./components";

const { store, persistor } = configureStore();

export const Provider = ({ children }) => {
  return (
    <ReduxProvider store={store}>
      <PersistGate persistor={persistor} loading={<Loading />}>
        <ToastProvider>
          <NavigationContainer>
            <SafeAreaProvider>{children}</SafeAreaProvider>
          </NavigationContainer>
        </ToastProvider>
      </PersistGate>
    </ReduxProvider>
  );
};
