import React from "react";
import { Button, FlatList, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  actionAddToCart,
  actionEmptyCart,
  actionRemoveFromCart,
} from "~app/redux/shop";
import { CartEmpty } from "./components/CartEmpty";
import { CartItem } from "./components/CartItem";
import Footer from "./components/Footer";

export const CartScreen = ({ navigation }) => {
  const shop = useSelector((state) => state.shop);
  const dispatch = useDispatch();

  const clearCart = () => dispatch(actionEmptyCart());
  const removeFromCart = (item) => dispatch(actionRemoveFromCart(item));
  const addToCart = (item) => dispatch(actionAddToCart(item));

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <Button onPress={clearCart} title="Empty Cart" />,
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
    <View style={{ flex: 1 }}>
      <View style={{ flex: 4 }}>
        <FlatList
          keyExtractor={(item) => item._id}
          data={shop.cart}
          renderItem={renderItem}
          ListEmptyComponent={<CartEmpty />}
        />
      </View>
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({});
