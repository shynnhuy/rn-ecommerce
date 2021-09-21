import React from "react";

import {StyleSheet, Text, View} from "react-native";
import {Input} from "./components/Input";

export const LoginScreen = () => {
  return (
    <View style={styles.container}>
      <Input style={styles.email} />
      <Input style={styles.passwd} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },
  email: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  passwd: {
    borderTopWidth: 0,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
});
