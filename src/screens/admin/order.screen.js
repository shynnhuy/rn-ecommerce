import {
  Alert,
  Avatar,
  Button,
  CloseIcon,
  FlatList,
  Heading,
  HStack,
  Text,
  View,
  VStack,
} from "native-base";
import React from "react";
import { StyleSheet } from "react-native";
import { useMutation } from "react-query";
import { queries } from "~app/api";

const StatusAlert = ({ status, title }) => (
  <Alert w="100%" status={status}>
    <VStack space={2} flexShrink={1} w="100%">
      <HStack flexShrink={1} space={2} justifyContent="space-between">
        <HStack space={2} flexShrink={1}>
          <Alert.Icon mt="1" />
          <Text fontSize="md" color="coolGray.800">
            {title}
          </Text>
        </HStack>
        <IconButton
          variant="unstyled"
          icon={<CloseIcon size="3" color="coolGray.600" />}
        />
      </HStack>
    </VStack>
  </Alert>
);

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
          <Heading size="xs">Order status:</Heading>
          <Text>{order.status}</Text>
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
      <View>
        {mutation.isError && (
          <StatusAlert status="error" title={mutation.error.message} />
        )}

        {mutation.isSuccess && (
          <StatusAlert status="error" title={"Order's status changed!"} />
        )}
      </View>
      <VStack space={2}>
        <Button.Group>
          <Button
            flex={1}
            variant="outline"
            colorScheme="red"
            onPress={() =>
              mutation.mutate({ _id: order._id, status: "finish" })
            }
          >
            Revoke
          </Button>
          <Button
            flex={1}
            colorScheme="green"
            onPress={() => {
              mutation.mutate({ _id: order._id, status: "shipping" });
            }}
          >
            Ship
          </Button>
        </Button.Group>
      </VStack>
    </View>
  );
};

const styles = StyleSheet.create({});
