import React from "react";
import { Avatar, Divider, FlatList } from "native-base";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useQuery } from "react-query";
import { api } from "~app/api";
import { Loading } from "~app/components";

const fetchUsers = () => api.get("/manager/users");

export const UsersScreen = () => {
  const { data, error, isLoading } = useQuery(["manager/users"], fetchUsers);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Text>{error?.message}</Text>;
  }

  const renderItem = ({ item: user }) => (
    <>
      <TouchableOpacity style={styles.user}>
        <Avatar
          bg="cyan.500"
          source={{
            uri: user.avatar,
          }}
          marginRight={3}
        >
          U
        </Avatar>
        <Text>
          {user.email} - {user.role}
        </Text>
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
    </View>
  );
};

const styles = StyleSheet.create({
  user: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
});
