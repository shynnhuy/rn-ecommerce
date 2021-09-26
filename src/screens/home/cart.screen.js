import React from "react";
import {StyleSheet, Text, View} from "react-native";
import {TouchableOpacity} from "react-native-gesture-handler";

export const CartScreen = ({navigation: {navigate}}) => {
  return (
    <View>
      <Text>Cart Screen</Text>
      <TouchableOpacity onPress={() => navigate("Setting")}>
        <Text>Test Setting</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({});
