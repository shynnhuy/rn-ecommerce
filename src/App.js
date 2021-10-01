import React from "react";
import Toast from "react-native-toast-notifications";
import { StyleSheet } from "react-native";
import { Provider } from "./Provider";
import RootNavigator from "./navigators/root.navigator";

export const App = () => {
  return (
    <>
      <Provider>
        <RootNavigator />
      </Provider>
      <Toast ref={(ref) => (global["toast"] = ref)} />
    </>
  );
};

const styles = StyleSheet.create({});
