import React from "react";
import {StyleSheet, Text, TextInput, View} from "react-native";

export const Input = ({
  label,
  placeholder,
  value,
  onChangeText,
  keyboardType = "default",
  disabled = false,
}) => {
  return (
    <View style={styles.inpContainer}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        placeholder={placeholder || label}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        editable={!disabled}
        caretHidden={disabled}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inpContainer: {
    flex: 1,
    marginVertical: 5,
  },
  label: {
    color: "gray",
    textTransform: "capitalize",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#d4d4d4",
    borderRadius: 8,
    paddingHorizontal: 15,
  },
});
