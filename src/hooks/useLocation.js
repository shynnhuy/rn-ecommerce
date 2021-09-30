import {
  getCurrentPositionAsync,
  requestForegroundPermissionsAsync,
  reverseGeocodeAsync,
} from "expo-location";
import { useEffect, useState } from "react";

export const useLocation = (setCoords, setAddress) => {
  const [error, setError] = useState(null);
  // const [location, setLocation] = useState(null);
  // const [address, setAddress] = useState("");

  useEffect(() => {
    const getPosition = async () => {
      try {
        const { status } = await requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setError("Permission to access location was denied");
          return;
        }

        const location = await getCurrentPositionAsync({});
        // setLocation(location);

        setCoords(location.coords);
        const geoAddress = await reverseGeocodeAsync(location.coords);
        // console.log(geoAddress);
        setAddress(
          `${geoAddress[0].name}, ${geoAddress[0].district}, ${geoAddress[0].city}, ${geoAddress[0].region}`
        );
      } catch (err) {
        setError(err);
      }
    };
    getPosition();
  }, []);

  return [error];
};
