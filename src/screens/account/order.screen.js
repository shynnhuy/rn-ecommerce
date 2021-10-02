import { Box, FlatList, HStack, VStack, Text } from "native-base";
import React from "react";
import { StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useSelector } from "react-redux";
import { selectOrderByStatus } from "~app/redux/auth";
import { financial } from "~app/utils";

export const OrderScreen = ({ navigation, route }) => {
  const { title } = route.params;

  const orders = useSelector((state) => selectOrderByStatus(state, title));

  const renderItem = ({ item }) => {
    const count = item.products?.reduce((acc, cur) => acc + cur.amount, 0);
    return (
      <Box borderBottomWidth="1" pl="4" pr="5" py="2">
        <HStack space={3} justifyContent="space-between">
          <VStack>
            <Text
              _dark={{
                color: "warmGray.50",
              }}
              color="coolGray.800"
              bold
            >
              {item.name}
            </Text>
            <Text
              color="coolGray.600"
              _dark={{
                color: "warmGray.200",
              }}
            >
              {item.address}
            </Text>
            <Text
              color="coolGray.600"
              _dark={{
                color: "warmGray.200",
              }}
            >
              {count} {count > 1 ? "items" : "item"} - ${financial(item.total)}
            </Text>
          </VStack>
          <Text>{item.status}</Text>
        </HStack>
      </Box>
    );
  };

  return (
    <SafeAreaView>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={28} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={orders}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
      />
    </SafeAreaView>
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
