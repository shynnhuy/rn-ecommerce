import { View } from "native-base";
import React from "react";
import { StyleSheet } from "react-native";
import { ProductForm } from "./components/ProductForm";

export const ProductScreen = () => {
  return (
    <View paddingX={5} paddingY={3} bg="#fff" flex={1}>
      <ProductForm />
    </View>
  );
};

const styles = StyleSheet.create({});
