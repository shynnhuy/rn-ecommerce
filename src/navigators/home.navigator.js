import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { CartScreen, HomeScreen } from "../screens/home";
import { PaymentScreen } from "~app/screens/home/payment.screen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Home = createDrawerNavigator();
const Cart = createNativeStackNavigator();

const CartPayment = () => {
  return (
    <Cart.Navigator>
      <Cart.Screen component={CartScreen} name="Cart" />
      <Cart.Screen
        component={PaymentScreen}
        name="Payment"
        options={{ contentStyle: { backgroundColor: "#fff" } }}
      />
    </Cart.Navigator>
  );
};

export const HomeNavigator = () => {
  return (
    <Home.Navigator
      screenOptions={{
        drawerType: "front",
        drawerContentStyle: { backgroundColor: "#fff" },
      }}
    >
      <Home.Screen
        name="Home"
        component={HomeScreen}
        options={{
          drawerIcon: (props) => (
            <MaterialCommunityIcons name="home" {...props} />
          ),
        }}
      />
      <Home.Screen
        name="Shopping Cart"
        component={CartPayment}
        options={{
          headerShown: false,
          drawerIcon: (props) => (
            <MaterialCommunityIcons name="cart-outline" {...props} />
          ),
        }}
      />
    </Home.Navigator>
  );
};
