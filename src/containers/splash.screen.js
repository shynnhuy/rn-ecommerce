import React, {useEffect, useRef} from "react";
import {
  Animated,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import Logo from "../assets/splash.png";

const SplashScreen = () => {
  const edges = useSafeAreaInsets();
  const startAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    setTimeout(() => {
      Animated.sequence([
        Animated.timing(startAnim, {
          toValue: -Dimensions.get("window").height + (edges.top + 65),
          useNativeDriver: true,
        }),
      ]).start();
    }, 500);
  }, []);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{translateY: startAnim}],
        },
      ]}>
      <Animated.View style={styles.imgContainer}>
        <Image source={Logo} style={styles.img} />

        <Text style={styles.text}>SShop</Text>
      </Animated.View>
    </Animated.View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    position: "absolute",
    backgroundColor: "#4D4A95",
  },
  imgContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  img: {
    width: 150,
    height: 150,
    marginBottom: 15,
  },
  text: {
    fontSize: 25,
    fontWeight: "bold",
    color: "white",
  },
});
