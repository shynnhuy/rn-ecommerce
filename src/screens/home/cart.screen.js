import React from "react";
import {
  Button,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import {
  actionAddToCart,
  actionEmptyCart,
  actionRemoveFromCart,
} from "~app/redux/shop";
import { CartEmpty } from "./components/CartEmpty";
import { CartItem } from "./components/CartItem";
import { Footer } from "./components/Footer";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

export const CartScreen = ({ navigation }) => {
  const shop = useSelector((state) => state.shop);
  const dispatch = useDispatch();

  const clearCart = () => dispatch(actionEmptyCart());
  const removeFromCart = (item) => dispatch(actionRemoveFromCart(item));
  const addToCart = (item) => dispatch(actionAddToCart(item));

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          <MaterialCommunityIcons name="menu" size={25} />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity onPress={clearCart}>
          <MaterialCommunityIcons name="cart-remove" size={20} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const renderItem = ({ item, index }) => {
    return (
      <CartItem
        item={item}
        lastItem={index + 1 === shop.cart.length}
        removeFromCart={() => removeFromCart(item)}
        addToCart={() => addToCart(item)}
      />
    );
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar style="dark" />
      <View style={{ flex: 4 }}>
        <FlatList
          keyExtractor={(item) => item._id}
          data={shop.cart}
          renderItem={renderItem}
          ListEmptyComponent={<CartEmpty />}
        />
      </View>
      <Footer disabled={!shop.cart.length > 0} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});
