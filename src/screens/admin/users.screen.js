import React, { useState } from "react";
import { Avatar, Divider, FlatList } from "native-base";
import {
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useQuery } from "react-query";
import { api } from "~app/api";
import { Loading } from "~app/components";

const fetchUsers = async () => {
  const { result } = await api.get("/manager/users");
  return result;
};

export const UsersScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  const { data, isError, error, isLoading, refetch } = useQuery(
    ["manager/users"],
    fetchUsers,
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
  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Text>{error.message}</Text>;
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
      {Boolean(data) && (
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}
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
