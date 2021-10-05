import { Icon } from "native-base";
import React from "react";
import { TouchableOpacity } from "react-native";
import { Entypo, Ionicons } from "@expo/vector-icons";

const { createBottomTabNavigator } = require("@react-navigation/bottom-tabs");
const {
  DashboardScreen,
  UsersScreen,
  ProductsScreen,
} = require("~app/screens/admin");

const Admin = createBottomTabNavigator();

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
        component={ProductsScreen}
        options={({ navigation }) => generateOptions("Products", "layers")}
      />
    </Admin.Navigator>
  );
};
