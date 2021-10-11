import { StatusBar } from "expo-status-bar";
import { Heading, Text, VStack, View, FlatList, Avatar } from "native-base";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useQuery } from "react-query";
import { queries } from "~app/api";
import { Loading } from "~app/components";

export const OrderDetail = ({ route, navigation }) => {
  const { _id } = route.params;

  const { data, isLoading, isError } = useQuery(["order", _id], () =>
    queries.getOrder(_id)
  );

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Text>Error</Text>;
  }

  const Footer = () => {
    return (
      <View my={2} justifyContent="space-between" flexDirection="row">
        <Text fontWeight="bold">Total:</Text>
        <Text>${data.total}</Text>
      </View>
    );
  };
  const renderItem = ({ item }) => {
    return (
      <View flexDirection="row" alignItems="center" my={1}>
        <Avatar source={{ uri: item.product.images[0] }} />
        <View marginX={2}>
          <Text fontWeight="bold" numberOfLines={1}>
            {item.product.name}
          </Text>
          <Text>
            ${item.product.price.new} x {item.amount}
          </Text>
        </View>
      </View>
    );
  };

  return (
    data && (
      <SafeAreaView style={{ backgroundColor: "#fff", flex: 1 }}>
        <StatusBar style="dark" />
        <View bg="#fff" paddingX="3" paddingY="2">
          <VStack space={3}>
            <View>
              <Heading size="xs">Order ID:</Heading>
              <Text>{_id}</Text>
            </View>
            <View>
              <Heading size="xs">Order status:</Heading>
              <Text>{data.status}</Text>
            </View>
            <View>
              <Heading size="xs">Shipping Address:</Heading>
              <Text>{data.address}</Text>
            </View>
            <View>
              <Heading size="xs">Shipping Method:</Heading>
              <Text>{data.paid ? "Cart Payment" : "Cash On Delivery"}</Text>
            </View>
            <View>
              <Heading size="xs">
                Order {data.products.length > 1 ? "products" : "product"}
              </Heading>
              <FlatList
                data={data.products}
                renderItem={renderItem}
                keyExtractor={(item) => item._id}
                ListFooterComponent={<Footer />}
              />
            </View>
          </VStack>
        </View>
      </SafeAreaView>
    )
  );
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 10,
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
