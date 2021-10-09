import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Ionicons from "react-native-vector-icons/Ionicons";
import { HomeNavigator } from "./home.navigator";
import { AccountNavigator } from "./account.navigator";
import { NotificationScreen } from "../screens/notification/notification.screen";
import { AdminNavigator } from "./admin.navigator";

import { MapScreen, DetailsScreen } from "~app/screens/home";
import { SearchScreen } from "~app/screens/home/search.screen";
import { ImagesScreen } from "~app/screens/admin";
import { registerForPushNotificationsAsync } from "~app/utils";
import { Alert } from "react-native";
import { useDispatch } from "react-redux";
import { actionSavePushToken } from "~app/redux/auth";

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
  const dispatch = useDispatch();
  React.useEffect(() => {
    const requestNotification = async () => {
      try {
        const token = await registerForPushNotificationsAsync();
        // Alert.alert("Success", `Token: ${token}`);
        dispatch(actionSavePushToken(token));
      } catch (error) {
        console.log(error);
      }
    };
    requestNotification();
    // return () => {};
  }, []);
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
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Address" component={MapScreen} />
      <Stack.Screen name="Details" component={DetailsScreen} />
      <Stack.Screen name="Images" component={ImagesScreen} />
    </Stack.Navigator>
  );
};
