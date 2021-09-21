import React from "react";
import {View, Text, StyleSheet, Pressable} from "react-native";

const ViewItem = ({text, btnText, style, primary, action}) => {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.text}>{text}</Text>
      <Pressable
        onPress={action}
        style={({pressed}) => [
          styles.button,
          primary ? styles.buttonPrimary : styles.buttonSecondary,
          {
            borderWidth: pressed ? (primary ? 0 : 1) : 1,
            borderBottomWidth: pressed ? (primary ? 0 : 1) : 3,
            marginTop: pressed ? 34 : 30,
          },
        ]}>
        <Text style={primary ? styles.btnTextPrimary : styles.btnText}>
          {btnText}
        </Text>
      </Pressable>
    </View>
  );
};
const Divider = () => {
  return <View style={styles.divider} />;
};

export const AuthScreen = ({navigation: {navigate}}) => {
  const login = () => navigate("Login");
  const register = () => navigate("Register");

  return (
    <View style={[styles.container, {justifyContent: "center"}]}>
      <ViewItem
        text="Already have an account?"
        btnText="Login"
        style={{justifyContent: "flex-end"}}
        action={login}
        primary
      />
      <Divider />
      <ViewItem
        text="Don't have an account?"
        btnText="Register"
        action={register}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  divider: {
    alignSelf: "stretch",
    borderWidth: 0.5,
    borderColor: "black",
    marginHorizontal: 10,
  },
  text: {
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: 28,
    marginTop: 30,
    color: "#414141",
  },
  button: {
    marginHorizontal: 10,
    marginVertical: 30,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderBottomWidth: 3,
  },
  buttonPrimary: {
    backgroundColor: "#36c338",
    borderColor: "#239925",
  },
  buttonSecondary: {
    borderColor: "#d4d4d4",
  },
  btnText: {
    alignSelf: "center",
    color: "#36c338",
  },
  btnTextPrimary: {
    alignSelf: "center",
    color: "#fff",
  },
});
