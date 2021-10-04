import { Center, Icon, Text } from "native-base";
import React from "react";
import { StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";

export const EmptyOrder = () => {
  return (
    <Center>
      <Icon as={<Feather name="archive" />} size="2xl" marginTop={5} />
      <Text fontWeight="bold" fontSize={30}>
        Empty
      </Text>
    </Center>
  );
};

const styles = StyleSheet.create({});
