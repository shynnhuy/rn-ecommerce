import React, {useEffect} from "react";
import {FlatList, StyleSheet, Text, View} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {Loading} from "../../components";
import {actionFetchProducts} from "../../redux/product";

export const HomeScreen = () => {
  const dispatch = useDispatch();
  const shop = useSelector(state => state.shop);

  useEffect(() => {
    dispatch(actionFetchProducts());
  }, []);

  const renderItem = ({item}) => (
    <Text>
      {item._id} - {item.name}
    </Text>
  );

  if (shop.loading) {
    return <Loading />;
  }

  return (
    <View>
      <Text>Home Screen</Text>
      <FlatList
        data={shop.products}
        keyExtractor={product => product._id}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({});
