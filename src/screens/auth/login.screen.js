import React from "react";

import {StyleSheet} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {Loading} from "../../components";
import {actionLogin} from "../../redux/auth";
import {AuthForm} from "./components/AuthForm";

export const LoginScreen = () => {
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const login = data => dispatch(actionLogin(data));

  return (
    <>
      <AuthForm buttonText="Login" onSubmit={login} error={auth.error} />
      {auth.loading && <Loading />}
    </>
  );
};

const styles = StyleSheet.create({});
