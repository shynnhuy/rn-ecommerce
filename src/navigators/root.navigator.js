import React from "react";
import {useSelector} from "react-redux";
import {tokenSelector} from "../redux/auth";
import {AuthNavigator} from "./auth.navigator";
import {MainNavigator} from "./main.navigator";

const RootNavigator = () => {
  const token = useSelector(tokenSelector);
  return Boolean(token) ? <MainNavigator /> : <AuthNavigator />;
};

export default RootNavigator;
