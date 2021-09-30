import { Fab, Icon } from "native-base";
import React, { useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { MaterialIcons } from "@expo/vector-icons";
import { useLocationContext } from "~app/context";

export const Map = () => {
  const {
    location: { coords, address },
  } = useLocationContext();

  const [region, setRegion] = useState(coords || null);

  if (!Boolean(coords)) {
    return (
      <View
        style={[styles.map, { justifyContent: "center", alignItems: "center" }]}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <>
      <MapView
        style={styles.map}
        initialRegion={{
          ...coords,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        region={
          region
            ? {
                ...region,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }
            : {
                ...coords,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }
        }
      >
        <Marker coordinate={coords} title={"You"} />
      </MapView>
      <Fab
        onPress={() => setRegion(coords)}
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
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#efefef",
    borderRadius: 8,
    fontSize: 16,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  errorText: {
    textAlign: "center",
    marginTop: 5,
    color: "red",
    fontSize: 22,
  },
  map: {
    flex: 1,
  },
});
