import React from "react";
import {StyleSheet, Text, View} from "react-native";
import {useDispatch} from "react-redux";

import {Button} from "~app/components";
import {actionLogout} from "~redux/auth";

export const SettingScreen = () => {
  const dispatch = useDispatch();
  return (
    <View styles={styles.container}>
      <Button
        buttonText="Logout"
        primary
        onPress={() => dispatch(actionLogout())}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
});
