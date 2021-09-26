import React, { useEffect } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Loading } from "../../components";
import { actionFetchProducts } from "../../redux/shop";
import { Product } from "./components/Product";

export const HomeScreen = () => {
  const dispatch = useDispatch();
  const shop = useSelector((state) => state.shop);

  useEffect(() => {
    dispatch(actionFetchProducts());
  }, []);

  const renderItem = ({ item }) => <Product {...item} />;

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
