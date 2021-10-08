import {
  Avatar,
  Button,
  FlatList,
  Heading,
  Text,
  View,
  VStack,
} from "native-base";
import React from "react";
import { StyleSheet } from "react-native";
import { useMutation } from "react-query";
import { queries } from "~app/api";

export const OrderScreen = ({ route }) => {
  const { order } = route.params;

  const mutation = useMutation(({ _id, status }) =>
    queries.changeOrderStatus(_id, status)
  );

  const Footer = () => {
    return (
      <View my={2} justifyContent="space-between" flexDirection="row">
        <Text fontWeight="bold">Total:</Text>
        <Text>${order.total}</Text>
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
    <View
      flex={1}
      bg="#fff"
      paddingX="3"
      paddingY="2"
      justifyContent="space-between"
    >
      <VStack space={3}>
        <View>
          <Heading size="xs">Order ID:</Heading>
          <Text>{order._id}</Text>
        </View>
        <View>
          <Heading size="xs">Shipping Address:</Heading>
          <Text>{order.address}</Text>
        </View>
        <View>
          <Heading size="xs">Shipping Method:</Heading>
          <Text>{order.paid ? "Cart Payment" : "Cash On Delivery"}</Text>
        </View>
        <View>
          <Heading size="xs">
            Order {order.products.length > 1 ? "products" : "product"}
          </Heading>
          <FlatList
            data={order.products}
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
            ListFooterComponent={<Footer />}
          />
        </View>
      </VStack>
      {mutation.isError ? (
        <Text>An error occurred: {mutation.error.message}</Text>
      ) : null}

      {mutation.isSuccess ? <Text>Order's status changed!</Text> : null}
      <Button.Group>
        <Button
          flex={1}
          variant="outline"
          colorScheme="red"
          onPress={() =>
            mutation.mutate({ _id: order._id, status: "shipping" })
          }
        >
          Ship
        </Button>
        <Button
          flex={1}
          colorScheme="green"
          onPress={() => mutation.mutate({ _id: order._id, status: "finish" })}
        >
          Finish
        </Button>
      </Button.Group>
    </View>
  );
};

const styles = StyleSheet.create({});
