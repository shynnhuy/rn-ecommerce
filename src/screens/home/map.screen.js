import { Input } from "native-base";
import React, { useLayoutEffect } from "react";
import { Button, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  setUserAddress,
  setUserCoords,
  useLocationContext,
} from "~app/context";
import { useLocation } from "~app/hooks";
import { Map } from "./components/Map";

export const MapScreen = ({ navigation }) => {
  const {
    location: { address },
    dispatch,
  } = useLocationContext();

  const setCoords = (coords) => dispatch(setUserCoords(coords));
  const setAddress = (address) => dispatch(setUserAddress(address));

  const [error] = useLocation(setCoords, setAddress);
  // const [region, setRegion] = useState(location || null);

  // console.log(address);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button title="OK" onPress={() => navigation.pop()} />
      ),
    });
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <Input
        placeholder="Enter your address"
        style={styles.input}
        value={address}
        onChangeText={setAddress}
      />
      <Map />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
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
