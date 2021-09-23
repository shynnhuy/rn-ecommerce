import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {actionRegister} from "../../redux/auth/auth.actions";
// import {StyleSheet, Text, View} from "react-native";
import {AuthForm} from "./components/AuthForm";
import {Loading} from "../../components";

export const RegisterScreen = () => {
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const register = data => dispatch(actionRegister(data));
  return (
    <>
      <AuthForm
        buttonText="Register"
        onSubmit={register}
        error={auth.error}
        primary
      />
      {auth.loading && <Loading />}
    </>
  );
};
