import React from "react";
import { View, Text } from "react-native";

export const useAddress = (location) => {
  const [address, setAddress] = React.useState("");
  React.useEffect(() => {
    const getAddress = async () => {
      try {
        const geoAddress = await reverseGeocodeAsync(location.coords);
        console.log(geoAddress);
        setAddress(
          `${geoAddress[0].street}, ${geoAddress[0].district}, ${geoAddress[0].city}, ${geoAddress[0].region}`
        );
        console.log(
          `${geoAddress[0].name}, ${geoAddress[0].district}, ${geoAddress[0].city}, ${geoAddress[0].region}`
        );
      } catch (error) {
        setAddress("");
      }
    };
    getAddress();
  }, [location]);
  return [address];
};
