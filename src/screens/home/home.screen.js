import React, { useEffect, useState } from "react";
import { FlatList, RefreshControl, StyleSheet, View } from "react-native";
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
import { useQuery } from "react-query";
import { api } from "~app/api";
import { Categories } from "./components/Categories";
import { ListEmpty } from "./components/ListEmpty";
import { useModal } from "~app/hooks";
import { Filter } from "./components/Filter";
// import { Product } from "./components/Product";

const fetchCategories = () => api.get("/products/categories");

export const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const shop = useSelector((state) => state.shop);
  const count = useSelector(selectCartCount);
  const [refreshing, setRefreshing] = useState(false);

  const { data, isLoading, error } = useQuery("categories", fetchCategories);

  const [filter, openFilter, closeFilter] = useModal();

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

  const onRefresh = () => {
    setRefreshing(true);
    dispatch(actionFetchProducts(() => setRefreshing(false)));
  };

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
          onPress={openFilter}
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
      <Filter open={filter} onClose={closeFilter} />

      {!isLoading ? (
        error ? null : (
          <Categories categories={data?.result} />
        )
      ) : (
        <Loading />
      )}

      <FlatList
        columnWrapperStyle={{ justifyContent: "space-between" }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          marginTop: 10,
          paddingBottom: 50,
        }}
        numColumns={2}
        data={shop.filteredProducts}
        renderItem={renderItem}
        keyExtractor={(product) => product._id}
        ListEmptyComponent={<ListEmpty />}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: "#fff",
    flex: 1,
  },
  sortBtn: {
    marginLeft: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
