import React from "react";
import {StyleSheet, TextInput} from "react-native";

export const Input = ({style}) => {
  return (
    <TextInput placeholder="Email address" style={[styles.input, style]} />
  );
};

const styles = StyleSheet.create({
  input: {
    marginHorizontal: 10,
    borderColor: "#d4d4d4",
    borderWidth: 1,
    paddingHorizontal: 10,
  },
});
