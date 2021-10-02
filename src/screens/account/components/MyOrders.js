import { Badge, Heading, Icon, Spinner } from "native-base";
import React, { useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  Ionicons,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

import { actionFetchOrders, authSelector } from "~app/redux/auth";
import { useNavigation } from "@react-navigation/core";

const OrderItem = ({ count, title, icon }) => {
  const { navigate } = useNavigation();
  return (
    <TouchableOpacity
      style={styles.box}
      onPress={() => navigate("Order", { title })}
    >
      <View>
        {count > 0 && (
          <Badge
            colorScheme="success"
            rounded="999px"
            mb={-4}
            mr={-4}
            alignSelf="flex-end"
          >
            {count}
          </Badge>
        )}
        <Icon size="md" as={icon} />
      </View>
      <Text style={{ textTransform: "capitalize", marginTop: 5 }}>{title}</Text>
    </TouchableOpacity>
  );
};

export const MyOrders = ({ loading, orders = [] }) => {
  const counting = (status) => {
    return orders.reduce((acc, cur) => cur.status === status && acc + 1, 0);
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Spinner accessibilityLabel="Loading orders" />
        <Heading color="primary.500" fontSize="md">
          Loading
        </Heading>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <OrderItem
        title="pending"
        count={counting("pending")}
        icon={<Ionicons name="wallet-outline" />}
      />
      <OrderItem
        title="shipping"
        count={counting("shipping")}
        icon={<FontAwesome5 name="shipping-fast" />}
      />
      <OrderItem
        title="finish"
        count={counting("finish")}
        icon={<Ionicons name="receipt-outline" />}
      />
      <OrderItem
        title="report"
        count={0}
        icon={<MaterialCommunityIcons name="sticker-check-outline" />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginTop: 15,
    paddingVertical: 10,
    paddingHorizontal: 5,
    backgroundColor: "#fff",
    borderColor: "#d4d4d4",
    borderRadius: 8,
    borderWidth: 1,
    borderBottomWidth: 3,
  },
  box: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
