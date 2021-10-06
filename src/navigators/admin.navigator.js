import { Icon } from "native-base";
import React from "react";
import { TouchableOpacity } from "react-native";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ProductScreen } from "~app/screens/admin/product.screen";

const { createBottomTabNavigator } = require("@react-navigation/bottom-tabs");
const {
  DashboardScreen,
  UsersScreen,
  ProductsScreen,
} = require("~app/screens/admin");

const Admin = createBottomTabNavigator();
const AdminProducts = createNativeStackNavigator();

const BackButton = ({ navigation }) => {
  return (
    <TouchableOpacity
      style={{ marginLeft: 5 }}
      onPress={() => navigation.pop()}
    >
      <Icon as={<Entypo name="chevron-left" />} size="sm" />
    </TouchableOpacity>
  );
};

const generateOptions = (name, icon, navigation = null) => ({
  headerTitle: name,
  tabBarLabel: name,
  tabBarIcon: ({ focused, color, size }) => {
    let iconName = focused ? icon : `${icon}-outline`;
    return <Ionicons name={iconName} size={size} color={color} />;
  },
  headerLeft: (props) =>
    navigation && <BackButton {...props} navigation={navigation} />,
});

const ProductsNavigator = () => {
  return (
    <AdminProducts.Navigator>
      <AdminProducts.Screen name="List Products" component={ProductsScreen} />
      <AdminProducts.Screen name="Admin Product" component={ProductScreen} />
    </AdminProducts.Navigator>
  );
};

export const AdminNavigator = () => {
  return (
    <Admin.Navigator>
      <Admin.Screen
        name="Admin Dashboard"
        component={DashboardScreen}
        options={({ navigation }) =>
          generateOptions("Dashboard", "pie-chart", navigation)
        }
      />
      <Admin.Screen
        name="Admin Users"
        component={UsersScreen}
        options={({ navigation }) => generateOptions("Users", "people")}
      />
      <Admin.Screen
        name="Admin Products"
        component={ProductsNavigator}
        options={({ navigation }) => ({
          ...generateOptions("Products", "layers"),
          headerShown: false,
        })}
      />
    </Admin.Navigator>
  );
};
