import React, { useEffect } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { Loading } from "~app/components";
import {
  actionFetchProducts,
  actionAddToCart,
  selectCartCount,
} from "~redux/shop";
import { Product } from "./components/Product";
import { HeaderCart } from "./components/HeaderCart";

export const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const shop = useSelector((state) => state.shop);
  const count = useSelector(selectCartCount);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderCart cartCount={count} navigation={navigation} />
      ),
    });
  }, [navigation, count]);

  useEffect(() => {
    dispatch(actionFetchProducts());
  }, []);

  const renderItem = ({ item }) => (
    <Product {...item} addToCart={() => dispatch(actionAddToCart(item))} />
  );

  if (shop.loading) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={shop.products}
        keyExtractor={(product) => product._id}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
});
