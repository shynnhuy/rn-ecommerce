import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { CartScreen, HomeScreen } from "../screens/home";

const Home = createDrawerNavigator();

export const HomeNavigator = () => {
  return (
    <Home.Navigator>
      <Home.Screen
        name="Home"
        component={HomeScreen}
        options={{
          contentStyle: { backgroundColor: "#fff" },
        }}
      />
      <Home.Screen
        name="Cart"
        component={CartScreen}
        options={{
          contentStyle: { backgroundColor: "#fff" },
          headerShadowVisible: false,
        }}
      />
    </Home.Navigator>
  );
};
