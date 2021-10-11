import React, { useLayoutEffect, useState } from "react";
import { getAccessToken } from "~app/utils";
import { AuthNavigator } from "./auth.navigator";
import { MainNavigator } from "./main.navigator";

const RootNavigator = () => {
  const [token, setToken] = useState(null);
  useLayoutEffect(() => {
    const getToken = async () => {
      try {
        const storageToken = await getAccessToken();
        setToken(storageToken);
      } catch (error) {
        console.log(error);
        setToken(null);
      }
    };
    getToken();
  });
  return Boolean(token) ? <MainNavigator /> : <AuthNavigator />;
};

export default RootNavigator;
