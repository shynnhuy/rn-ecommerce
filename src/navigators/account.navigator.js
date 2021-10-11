import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  AccountScreen,
  ProfileScreen,
  SettingScreen,
} from "../screens/account";
import { OrderScreen } from "~app/screens/account/order.screen";
import { OrderDetail } from "~app/screens/account/order-detail.screen";

const Account = createNativeStackNavigator();
const Order = createNativeStackNavigator();

const OrderNavigator = () => {
  return (
    <Order.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Order.Screen
        name="Account"
        component={AccountScreen}
        options={{
          headerShown: false,
        }}
      />
      <Order.Screen name="Order" component={OrderScreen} />
      {/* <Order.Screen name="View Order" component={OrderDetail} /> */}
    </Order.Navigator>
  );
};

export const AccountNavigator = () => {
  return (
    <Account.Navigator>
      <Account.Screen
        name="Account Navigator"
        component={OrderNavigator}
        options={{ headerShown: false }}
      />
      <Account.Screen name="Setting" component={SettingScreen} />
      <Account.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          contentStyle: { backgroundColor: "#fff" },
          headerTitleAlign: "center",
          headerShadowVisible: false,
        }}
      />
    </Account.Navigator>
  );
};
