import { useNavigation } from "@react-navigation/core";
import { IconButton, Image, Icon } from "native-base";
import React from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { COLORS, financial } from "~app/utils";

const width = Dimensions.get("window").width / 2 - 30;

export const Card = ({ product, addToCart }) => {
  const { navigate } = useNavigation();
  //   console.log(product.images[0]);
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => navigate("Details", { _id: product._id })}
    >
      <View style={styles.card}>
        {/* <View style={{ alignItems: "flex-end" }}>
          <View
            style={{
              width: 30,
              height: 30,
              borderRadius: 20,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: product.like
                ? "rgba(245, 42, 42,0.2)"
                : "rgba(0,0,0,0.2) ",
            }}
          >
            <Icon
              name="favorite"
              size={18}
              color={true ? COLORS.red : COLORS.black}
            />
          </View>
        </View> */}

        <View
          style={{
            height: 100,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            source={{ uri: product.images[0] }}
            alt={`${product.name} image`}
            resizeMode="contain"
            style={{ resizeMode: "contain" }}
            size={100}
          />
        </View>

        <Text
          style={{
            fontWeight: "bold",
            fontSize: 17,
            marginTop: 15,
            marginHorizontal: 5,
          }}
        >
          {product.name}
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 5,
            paddingVertical: 5,
            marginHorizontal: 5,
          }}
        >
          <Text style={{ fontSize: 19, fontWeight: "400" }}>
            ${financial(product.price?.new)}
          </Text>
          <IconButton
            onPress={addToCart}
            icon={<Icon as={Feather} name="shopping-cart" />}
            _icon={{
              color: "green.500",
              size: "sm",
            }}
          />
          {/* <View
            style={{
              height: 25,
              width: 25,
              backgroundColor: COLORS.green,
              borderRadius: 5,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{ fontSize: 22, color: COLORS.white, fontWeight: "bold" }}
            >
              +
            </Text>
          </View> */}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    // height: 225,
    backgroundColor: COLORS.light,
    width,
    marginHorizontal: 2,
    borderRadius: 10,
    marginBottom: 20,
    padding: 5,
  },
});
