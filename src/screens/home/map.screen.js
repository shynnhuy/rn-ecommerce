import { Fab, Icon } from "native-base";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView from "react-native-maps";
import { MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

export const MapScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>map.screen</Text>
      <MapView style={styles.container} />
      <Fab
        borderRadius="full"
        colorScheme="red"
        right={5}
        bottom={5}
        icon={
          <Icon
            color="white"
            as={<MaterialIcons name="my-location" />}
            size="4"
          />
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
