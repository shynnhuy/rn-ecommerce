import React, { useEffect } from "react";
import { FlatList, StyleSheet, TextInput, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Icon from "react-native-vector-icons/MaterialIcons";

import { Loading } from "~app/components";
import {
  actionFetchProducts,
  actionAddToCart,
  selectCartCount,
} from "~redux/shop";
import { HeaderCart } from "./components/HeaderCart";
import { Card } from "./components/Card";
// import { Product } from "./components/Product";

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
    <Card product={item} addToCart={() => dispatch(actionAddToCart(item))} />
  );
  // const renderItem = ({ item }) => (
  //   <Product {...item} addToCart={() => dispatch(actionAddToCart(item))} />
  // );

  if (shop.loading) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <View style={{ marginVertical: 15, flexDirection: "row" }}>
        <View style={styles.searchContainer}>
          <Icon name="search" size={25} style={{ marginLeft: 20 }} />
          <TextInput placeholder="Search" style={styles.input} />
        </View>
        <View style={styles.sortBtn}>
          <Icon name="sort" size={30} color={"#fff"} />
        </View>
      </View>
      <FlatList
        columnWrapperStyle={{ justifyContent: "space-between" }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          marginTop: 10,
          paddingBottom: 50,
        }}
        numColumns={2}
        data={shop.products}
        renderItem={renderItem}
        keyExtractor={(product) => product._id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: "#fff",
  },
  searchContainer: {
    height: 50,
    backgroundColor: "#f1f1f1",
    borderRadius: 10,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    fontSize: 18,
    fontWeight: "bold",
    flex: 1,
    color: "#000",
  },
  sortBtn: {
    marginLeft: 10,
    height: 50,
    width: 50,
    borderRadius: 10,
    backgroundColor: "#00B761",
    justifyContent: "center",
    alignItems: "center",
  },
});
