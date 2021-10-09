import React from "react";
import { Alert } from "react-native";
import { useSelector } from "react-redux";
import { registerForPushNotificationsAsync } from "~app/utils";
import { tokenSelector } from "~redux/auth";
import { AuthNavigator } from "./auth.navigator";
import { MainNavigator } from "./main.navigator";

const RootNavigator = () => {
  const token = useSelector(tokenSelector);
  return Boolean(token) ? <MainNavigator /> : <AuthNavigator />;
};

export default RootNavigator;
