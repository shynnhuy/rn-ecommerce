import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Icon, IconButton } from "native-base";

export const SearchBar = ({ value = "", onSearch, filterProducts }) => {
  const [search, setSearch] = React.useState(value);
  const onChangeSearch = (value) => {
    setSearch(value);
    if (filterProducts) {
      filterProducts(value);
    }
  };

  const handlerChangeSearch = React.useCallback(onChangeSearch, []);
  return (
    <View style={styles.searchContainer}>
      {onSearch && (
        <IconButton
          onPress={() => onSearch(search)}
          icon={<Icon as={MaterialIcons} name="search" />}
          borderRadius="full"
          _icon={{
            color: "green.500",
            size: "md",
          }}
        />
      )}
      <TextInput
        placeholder="Search"
        style={styles.input}
        value={search}
        returnKeyType="search"
        onSubmitEditing={
          filterProducts ? filterProducts : () => onSearch(search)
        }
        onChangeText={handlerChangeSearch}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    height: 50,
    backgroundColor: "#f1f1f1",
    borderRadius: 10,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: "bold",
    flex: 1,
    color: "#000",
  },
});
