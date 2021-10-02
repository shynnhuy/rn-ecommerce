import { Icon } from "native-base";
import React from "react";
import { TouchableOpacity } from "react-native";
import { Entypo } from "@expo/vector-icons";

const { createBottomTabNavigator } = require("@react-navigation/bottom-tabs");
const { DashboardScreen, UsersScreen } = require("~app/screens/admin");

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

export const AdminNavigator = () => {
  return (
    <Admin.Navigator>
      <Admin.Screen
        name="Admin Dashboard"
        component={DashboardScreen}
        options={({ navigation }) => ({
          headerTitle: "Dashboard",
          tabBarLabel: "Dashboard",
          headerLeft: (props) => (
            <BackButton {...props} navigation={navigation} />
          ),
        })}
      />
      <Admin.Screen
        name="Admin Users"
        component={UsersScreen}
        options={({ navigation }) => ({
          headerTitle: "Users",
          tabBarLabel: "Dashboard",
          headerLeft: (props) => (
            <BackButton {...props} navigation={navigation} />
          ),
        })}
      />
    </Admin.Navigator>
  );
};
