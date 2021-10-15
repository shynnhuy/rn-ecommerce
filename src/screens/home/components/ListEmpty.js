import React from "react";
import { StyleSheet, Text, View } from "react-native";

export const ListEmpty = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Not found any product</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  text: {
    fontWeight: "500",
    fontSize: 20,
    color: "gray",
  },
});
