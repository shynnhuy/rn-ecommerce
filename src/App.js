import React, {useLayoutEffect} from "react";
import RNBootSplash from "react-native-bootsplash";

import {StyleSheet} from "react-native";
import {Provider} from "./Provider";
import RootNavigator from "./navigators/root.navigator";

export const App = () => {
  
  useLayoutEffect(() => {
    RNBootSplash.hide();
  }, []);

  return (
    <Provider>
      <RootNavigator />
    </Provider>
  );
};

const styles = StyleSheet.create({});
