import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useSelector } from "react-redux";
import { selectCartCount, selectCartTotal } from "~app/redux/shop";

export const Total = () => {
  const { containerStyle, goodsStyle, totalStyle } = styles;
  const count = useSelector(selectCartCount);
  const total = useSelector(selectCartTotal);
  return (
    <View style={containerStyle}>
      <View style={goodsStyle}>
        <Icon name="ios-cart" size={20} style={{ marginRight: 8 }} />
        <Text>
          {count} {count > 1 ? "products" : "product"}
        </Text>
      </View>

      <View style={totalStyle}>
        <Text>Total - </Text>
        <Text>${total}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 15,
  },
  goodsStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  totalStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
