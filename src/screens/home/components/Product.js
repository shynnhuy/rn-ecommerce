import React from "react";
import { StyleSheet, Text, View } from "react-native";

export const Product = ({ name, price, description, images }) => {
  return (
    <View>
      <Text>{name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({});
