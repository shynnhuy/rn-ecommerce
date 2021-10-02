import React from "react";
import {
  StyleSheet,
  Text,
  Pressable,
  View,
  TouchableOpacity,
} from "react-native";
import { SliderBox } from "react-native-image-slider-box";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";

export const Product = ({
  _id,
  name,
  price,
  description,
  images,
  category,
  addToCart,
  addToWishlist,
}) => {
  const { navigate } = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigate("Details", { _id })}
      style={styles.product}
    >
      <SliderBox
        images={images}
        ImageComponentStyle={{
          borderRadius: 15,
        }}
        resizeMode={"contain"}
        circleLoop
      />
      <View style={styles.content}>
        <View style={styles.contentHead}>
          <Text style={styles.name}>{name}</Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={styles.oldPrice}>{price.old}$</Text>
            <Text style={styles.newPrice}>{price.new}$</Text>
          </View>
        </View>
        <Text style={styles.category}>In {category?.name}</Text>
        <Text style={styles.description}>{description}</Text>
        <View style={styles.action}>
          <Pressable
            onPress={addToCart}
            style={({ pressed }) => [
              styles.button,
              pressed
                ? { backgroundColor: "#36c338" }
                : { backgroundColor: "#fff" },
            ]}
          >
            {({ pressed }) => (
              <Ionicons
                name={pressed ? "cart-sharp" : "cart-outline"}
                size={30}
                color={pressed ? "#fff" : "#36c338"}
              />
            )}
          </Pressable>
          <Pressable
            style={({ pressed }) => [
              styles.button,
              pressed
                ? { backgroundColor: "red" }
                : { backgroundColor: "#fff" },
            ]}
          >
            {({ pressed }) => (
              <Ionicons
                name={pressed ? "heart-sharp" : "heart-outline"}
                size={30}
                color={pressed ? "#fff" : "red"}
              />
            )}
          </Pressable>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  product: {
    backgroundColor: "#fff",
    borderRadius: 15,
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowColor: "black",
    shadowOffset: {
      height: 0,
      width: 0,
    },
    marginBottom: 15,
  },
  content: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  contentHead: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  oldPrice: {
    textDecorationLine: "line-through",
    textDecorationStyle: "solid",
    marginRight: 5,
  },
  newPrice: {
    fontSize: 16,
    fontWeight: "400",
  },
  category: { color: "gray" },
  description: {
    marginTop: 5,
  },
  action: {
    alignSelf: "center",
    flexDirection: "row",
    marginTop: 10,
  },
  button: {
    borderWidth: 1,
    borderColor: "gray",
    paddingVertical: 5,
    paddingHorizontal: 20,
    marginHorizontal: 5,
    borderRadius: 8,
  },
});
