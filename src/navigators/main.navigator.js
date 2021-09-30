import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import { HomeNavigator } from "./home.navigator";
import { AccountNavigator } from "./account.navigator";
import { NotificationScreen } from "../screens/notification/notification.screen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MapScreen } from "~app/screens/home/map.screen";
import { AdminNavigator } from "./admin.navigator";

const Main = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const MainNav = () => {
  return (
    <Main.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#36c338",
        tabBarInactiveTintColor: "gray",
      }}
    >
      <Main.Screen
        name="HomeNavigator"
        component={HomeNavigator}
        options={{
          tabBarLabel: "Home",
          headerShown: false,
          tabBarIcon: ({ color, focused, size }) => {
            const iconName = focused ? "home-sharp" : "home-outline";
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        }}
      />
      <Main.Screen
        name="Notification"
        component={NotificationScreen}
        options={{
          tabBarIcon: ({ color, focused, size }) => {
            const iconName = focused
              ? "ios-notifications-sharp"
              : "ios-notifications-outline";
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        }}
      />
      <Main.Screen
        name="AccountNavigator"
        component={AccountNavigator}
        options={{
          tabBarLabel: "Account",
          headerShown: false,
          tabBarIcon: ({ color, focused, size }) => {
            const iconName = focused
              ? "ios-person-circle-sharp"
              : "ios-person-circle-outline";
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        }}
      />
    </Main.Navigator>
  );
};

export const MainNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Main"
        component={MainNav}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Admin"
        component={AdminNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Address" component={MapScreen} />
    </Stack.Navigator>
  );
};
