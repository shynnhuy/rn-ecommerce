import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

export const CartItem = ({ item, lastItem, removeFromCart, addToCart }) => {
  const {
    containerStyle,
    lastItemStyle,
    imageStyle,
    textStyle,
    counterStyle,
    priceStyle,
  } = styles;

  return (
    <View style={lastItem ? lastItemStyle : containerStyle}>
      <Image source={{ uri: item.images[0] }} style={imageStyle} />
      <View style={textStyle}>
        <Text style={{ color: "#2e2f30" }}>{item.name}</Text>
        <View style={{ flexDirection: "row" }}>
          <View style={priceStyle}>
            <Text
              style={{
                color: "#2e2f30",
                fontSize: 12,
                textDecorationLine: "line-through",
                textDecorationStyle: "solid",
              }}
            >
              ${item.price.old}
            </Text>
          </View>
          <View style={priceStyle}>
            <Text style={{ color: "#2e2f30", fontSize: 12 }}>
              ${item.price.new}
            </Text>
          </View>
        </View>
      </View>

      <View style={counterStyle}>
        <Icon.Button
          name="ios-remove"
          size={25}
          iconStyle={{ marginRight: 0 }}
          onPress={removeFromCart}
        />

        <Text>{item.amount}</Text>

        <Icon.Button
          name="ios-add"
          size={25}
          iconStyle={{ marginRight: 0 }}
          onPress={addToCart}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    flexDirection: "row",
    flex: 1,
    borderBottomWidth: 1,
    borderColor: "#e2e2e2",
    padding: 10,
    paddingLeft: 15,
    backgroundColor: "#fff",
  },
  lastItemStyle: {
    flexDirection: "row",
    flex: 1,
    padding: 10,
    paddingLeft: 15,
    backgroundColor: "#fff",
  },
  imageStyle: {
    width: 50,
    height: 50,
    marginRight: 20,
  },
  textStyle: {
    flex: 2,
    justifyContent: "center",
  },
  priceStyle: {
    backgroundColor: "#ddd",
    width: 40,
    alignItems: "center",
    marginTop: 3,
    borderRadius: 3,
    marginRight: 5,
  },
  counterStyle: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
});