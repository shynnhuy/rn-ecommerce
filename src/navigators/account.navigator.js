import React from 'react'
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {AccountScreen} from "../screens/account";

const Account = createNativeStackNavigator();

export const AccountNavigator = () => {
  return (
    <Account.Navigator>
      <Account.Screen name="Account" component={AccountScreen} />
      {/* <Account.Screen name="Order" component={OrderScreen} /> */}
    </Account.Navigator>
  );
};
