import React from "react";
import { Provider as ReduxProvider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ToastProvider } from "react-native-toast-notifications";
import { NativeBaseProvider } from "native-base";
import { PersistGate } from "redux-persist/integration/react";

import { configureStore } from "./redux/store";
import { Loading } from "./components";
import { StripeProvider } from "@stripe/stripe-react-native";
import { LocationProvider } from "./context/location.context";

const { store, persistor } = configureStore();

export const Provider = ({ children }) => {
  return (
    <ReduxProvider store={store}>
      <PersistGate persistor={persistor} loading={<Loading />}>
        <NativeBaseProvider>
          <ToastProvider>
            <NavigationContainer>
              <StripeProvider publishableKey="pk_test_51JeMNvCQ0GIWHF67o9tM2hNxRJeh4IXwaeLf22HcxutlFiT7GzuiO3S1QnsAEgrfFTpljKG6b2GxIdViIGrvjntE00bS7xUptf">
                <LocationProvider>
                  <SafeAreaProvider>{children}</SafeAreaProvider>
                </LocationProvider>
              </StripeProvider>
            </NavigationContainer>
          </ToastProvider>
        </NativeBaseProvider>
      </PersistGate>
    </ReduxProvider>
  );
};
