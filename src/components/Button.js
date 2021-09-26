import React from "react";
import {Pressable, StyleSheet, Text} from "react-native";

export const Button = ({buttonText, onPress, primary = false}) => {
  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [
        styles.button,
        primary ? styles.primary : styles.secondary,
        {
          borderWidth: pressed ? (primary ? 0 : 1) : 1,
          borderBottomWidth: pressed ? (primary ? 0 : 1) : 3,
          marginTop: pressed ? 34 : 30,
        },
      ]}>
      <Text
        style={[
          styles.text,
          primary ? styles.textPrimary : styles.textSecondary,
        ]}>
        {buttonText}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    marginHorizontal: 10,
    marginVertical: 30,
    paddingVertical: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderBottomWidth: 3,
  },
  primary: {
    backgroundColor: "#36c338",
    borderColor: "#239925",
  },
  secondary: {
    backgroundColor: "#fff",
    borderColor: "#d4d4d4",
  },
  text: {
    alignSelf: "center",
    fontSize: 22,
    fontWeight: "500",
  },
  textPrimary: {
    color: "#fff",
  },
  textSecondary: {
    color: "#36c338",
  },
});
