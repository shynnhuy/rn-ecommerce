import React, { useEffect } from "react";
import { FlatList, StyleSheet, TextInput, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { IconButton, Icon } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";

import { Loading } from "~app/components";
import {
  actionFetchProducts,
  actionAddToCart,
  selectCartCount,
} from "~redux/shop";
import { HeaderCart } from "./components/HeaderCart";
import { Card } from "./components/Card";
import { SearchBar } from "./components/SearchBar";
import { StatusBar } from "expo-status-bar";
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
    <Card
      product={item}
      addToCart={() => dispatch(actionAddToCart({ product: item }))}
    />
  );
  // const renderItem = ({ item }) => (
  //   <Product {...item} addToCart={() => dispatch(actionAddToCart(item))} />
  // );

  const onSearch = (search) => navigation.navigate("Search", { search });

  if (shop.loading) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <View style={{ marginVertical: 15, flexDirection: "row" }}>
        <SearchBar onSearch={onSearch} />
        <IconButton
          onPress={() => console.log("Filter")}
          variant="solid"
          bg="green.600"
          _pressed={{
            bg: "green.400",
          }}
          style={styles.sortBtn}
          icon={
            <Icon as={MaterialIcons} name="sort" size={30} color={"#fff"} />
          }
        />
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
  sortBtn: {
    marginLeft: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
