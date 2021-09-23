import React from "react";
import {View, Text, StyleSheet} from "react-native";
import {useDispatch} from "react-redux";
import {Button} from "../../components";
import {clearError} from "../../redux/auth";

const ViewItem = ({text, btnText, style, primary, action}) => {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.text}>{text}</Text>
      <Button buttonText={btnText} onPress={action} primary={primary} />
    </View>
  );
};
const Divider = () => {
  return <View style={styles.divider} />;
};

export const AuthScreen = ({navigation: {navigate}}) => {
  const dispatch = useDispatch();

  const navigateTo = path => {
    dispatch(clearError());
    navigate(path);
  };

  return (
    <View style={[styles.container, {justifyContent: "center"}]}>
      <ViewItem
        text="Already have an account?"
        btnText="Login"
        style={{justifyContent: "flex-end"}}
        action={() => navigateTo("Login")}
        primary
      />
      <Divider />
      <ViewItem
        text="Don't have an account?"
        btnText="Register"
        action={() => navigateTo("Register")}
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
});
