import { Avatar, Box, Divider, FlatList, Text, View } from "native-base";
import React, { useState } from "react";
import { RefreshControl, StyleSheet, TouchableOpacity } from "react-native";
import { useQuery } from "react-query";
import { queries } from "~app/api";
import { Loading } from "~app/components";

const count = (products) => products.reduce((acc, cur) => acc + cur.amount, 0);

export const OrdersScreen = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const { data, isError, isLoading, error, refetch } = useQuery(
    ["manager/orders"],
    queries.getAllOrders,
    {
      onSuccess: () => {
        setRefreshing(false);
      },
    }
  );

  const onRefresh = () => {
    setRefreshing(true);
    refetch();
  };

  const renderItem = ({ item: order }) => (
    <>
      <TouchableOpacity
        onPress={() => navigation.navigate("Admin Order", { order })}
        style={styles.orders}
      >
        <Avatar
          bg="transparent"
          source={{
            uri: order.user.avatar,
          }}
          marginRight={3}
        >
          U
        </Avatar>
        <View>
          <Text fontWeight="bold">{order._id}</Text>
          <Text>
            {count(order.products)}{" "}
            {count(order.products) > 1 ? "items" : "item"} - ${order.total}
          </Text>
          {order.paid ? (
            <Box bg="green.500" paddingX={1} alignSelf="flex-start">
              <Text color="#fff" textTransform="uppercase">
                paid
              </Text>
            </Box>
          ) : (
            <Box bg="orange.500" paddingX={1} alignSelf="flex-start">
              <Text color="#fff" textTransform="uppercase">
                cod
              </Text>
            </Box>
          )}
        </View>
      </TouchableOpacity>
      <Divider />
    </>
  );
  return (
    <View bg="#fff" flex={1}>
      {isLoading && <Loading />}
      {isError && <Text color="red.500">Error: {error.message}</Text>}
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  orders: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
});
