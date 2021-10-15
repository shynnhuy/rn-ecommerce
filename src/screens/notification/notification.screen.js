import { FlatList, Text, Pressable, View, Divider } from "native-base";
import React, { useState } from "react";
import { RefreshControl, StyleSheet } from "react-native";
import { useMutation, useQuery, useQueryClient } from "react-query";
import moment from "moment";
import { queries } from "~app/api";
import { Loading } from "~app/components";

export const NotificationScreen = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const queryClient = useQueryClient();
  const { data, isError, isLoading, refetch } = useQuery(
    ["notification"],
    queries.getMyNotifications,
    {
      onSuccess: () => {
        setRefreshing(false);
      },
    }
  );
  const { mutate } = useMutation((id) => queries.changeNotificationStatus(id), {
    onSuccess: () => queryClient.invalidateQueries("notification"),
  });

  const onRefresh = () => {
    setRefreshing(true);
    refetch();
  };

  const clickNoti = (id, { path, params }) => {
    mutate(id);
    navigation.navigate(path, params);
  };

  const renderItem = ({ item }) => (
    <>
      <Pressable
        px={3}
        py={2}
        bg={!item.isRead ? "#f2f2f2" : "#fff"}
        onPress={() => clickNoti(item._id, item.data)}
      >
        <Text fontWeight="bold">{item.content}</Text>
        <Text color="#999999">{moment(item.createdAt).fromNow()}</Text>
      </Pressable>
      <Divider />
    </>
  );

  const Empty = () => (
    <View flex={1} alignItems="center">
      <Text fontWeight="500" fontSize="20" color="coolGray.600">
        You don't have any notification
      </Text>
    </View>
  );

  if (isLoading) {
    return <Loading />;
  }

  return (
    <View flex={1} bg="#fff">
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={<Empty />}
      />
    </View>
  );
};

const styles = StyleSheet.create({});
