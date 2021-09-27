import React from "react";
import { StyleSheet, Text, View } from "react-native";

export const CartEmpty = () => {
  return (
    <View style={{ paddingVertical: 20, paddingHorizontal: 15 }}>
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          alignSelf: "center",
          textAlign: "center",
        }}
      >
        Your cart is empty. Go shopping something.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({});
