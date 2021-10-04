import React from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import debounce from "lodash.debounce";
import Icon from "react-native-vector-icons/MaterialIcons";

import { actionFilterProducts, selectFilteredProducts } from "~app/redux/shop";
import { SearchBar } from "./components/SearchBar";
import { StatusBar } from "expo-status-bar";
import { Card } from "./components/Card";

export const SearchScreen = ({ navigation, route }) => {
  const { search } = route.params;
  const dispatch = useDispatch();
  const products = useSelector(selectFilteredProducts);
  console.log(products);

  React.useEffect(() => {
    dispatch(actionFilterProducts(search));
  }, [search]);

  const onSearch = (value) => debounceSearch(value);
  const debounceSearch = debounce(function (value) {
    dispatch(actionFilterProducts(value));
  }, 1000);

  const renderItem = ({ item }) => (
    <Card product={item} addToCart={() => dispatch(actionAddToCart(item))} />
  );
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.back}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-back" size={28} />
        </TouchableOpacity>
        <SearchBar value={search} filterProducts={onSearch} />
      </View>

      <View style={styles.content}>
        <FlatList
          data={products}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            marginTop: 10,
            paddingBottom: 50,
          }}
          numColumns={2}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    paddingHorizontal: 10,
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  back: {
    marginRight: 10,
  },
  content: {
    paddingHorizontal: 10,
  },
});
