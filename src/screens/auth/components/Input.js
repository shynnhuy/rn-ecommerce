import React from "react";
import {StyleSheet, TextInput} from "react-native";

export const Input = ({
  style,
  value,
  onChangeText,
  placeholder,
  secure = false,
  type = "default",
}) => {
  return (
    <TextInput
      placeholder={placeholder}
      style={[styles.input, style]}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secure}
      keyboardType={type}
    />
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
