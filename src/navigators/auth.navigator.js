import React from "react";

import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {LoginScreen, RegisterScreen} from "../screens/auth";
import {AuthScreen} from "../screens/auth/auth.screen";

const Auth = createNativeStackNavigator();

export const AuthNavigator = () => {
  return (
    <Auth.Navigator
      initialRouteName="Auth"
      screenOptions={{
        headerShadowVisible: false,
        title: "",
        headerStyle: {
          backgroundColor: "#fff",
        },
      }}>
      <Auth.Screen name="Auth" component={AuthScreen} />
      <Auth.Screen name="Login" component={LoginScreen} />
      <Auth.Screen name="Register" component={RegisterScreen} />
    </Auth.Navigator>
  );
};
