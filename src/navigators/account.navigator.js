import React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {AccountScreen, ProfileScreen, SettingScreen} from "../screens/account";

const Account = createNativeStackNavigator();

export const AccountNavigator = () => {
  return (
    <Account.Navigator>
      <Account.Screen
        name="Account"
        component={AccountScreen}
        options={{headerShown: false}}
      />
      <Account.Screen name="Setting" component={SettingScreen} />
      <Account.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          contentStyle: {backgroundColor: "#fff"},
          headerTitleAlign: "center",
          headerShadowVisible: false,
        }}
      />
    </Account.Navigator>
  );
};
