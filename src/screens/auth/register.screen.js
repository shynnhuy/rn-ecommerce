import React from "react";
import {useDispatch} from "react-redux";
import {actionRegister} from "../../redux/auth/auth.actions";
// import {StyleSheet, Text, View} from "react-native";
import {AuthForm} from "./components/AuthForm";
import {Loading} from "../../components";

export const RegisterScreen = () => {
  const loading = useSelector(state => state.auth.loading);
  const dispatch = useDispatch();
  const register = data => dispatch(actionRegister(data));
  return (
    <>
      <AuthForm buttonText="Register" onSubmit={register} primary />
      {loading && <Loading />}
    </>
  );
};
