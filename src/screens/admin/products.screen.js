import { Avatar, Divider, FlatList, Button } from "native-base";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useQuery } from "react-query";
import { api } from "~app/api";
import { Loading } from "~app/components";
import { useModal } from "~app/hooks";
import { ProductForm } from "./components/ProductForm";

const fetchProducts = () => api.get("/manager/products");
export const ProductsScreen = ({ navigation }) => {
  const { data, error, isLoading } = useQuery(
    ["manager/products"],
    fetchProducts
  );

  const [modal, openModal, closeModal] = useModal();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button variant="ghost" onPress={openModal}>
          <Text>Create</Text>
        </Button>
      ),
    });
  }, [navigation]);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Text>{error?.message}</Text>;
  }

  const renderItem = ({ item: product }) => (
    <>
      <TouchableOpacity style={styles.product}>
        <Avatar
          bg="transparent"
          source={{
            uri: product.images[0],
          }}
          marginRight={3}
          style={styles.img}
        >
          U
        </Avatar>
        <Text>{product.name}</Text>
      </TouchableOpacity>
      <Divider />
    </>
  );

  return (
    <View>
      <FlatList
        data={data.result}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
      />
      <ProductForm open={modal} onClose={closeModal} />
    </View>
  );
};

const styles = StyleSheet.create({
  product: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  img: {
    resizeMode: "contain",
  },
});
