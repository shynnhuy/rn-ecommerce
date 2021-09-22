import React from "react";
import {View, ActivityIndicator} from "react-native";

export const Loading = () => {
  return (
    <View
      style={{
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(237, 237, 237, 0.3)",
      }}>
      <ActivityIndicator size="large" color="#36c338" />
    </View>
  );
};
