import { useNavigation } from "@react-navigation/core";
import React from "react";
import { View, StyleSheet } from "react-native";
import { Button } from "~app/components";
import { Total } from "./Total";

export const Footer = ({ disabled }) => {
  const { containerStyle } = styles;
  const navigation = useNavigation();
  return (
    <View style={containerStyle}>
      <Total />
      <Button
        buttonText="Go to checkout"
        primary
        onPress={() =>
          disabled
            ? toast.show("Your cart is empty")
            : navigation.navigate("Payment")
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    paddingRight: 15,
    paddingLeft: 15,
    borderTopWidth: 1,
    borderColor: "#e2e2e2",
    justifyContent: "space-around",
  },
});
