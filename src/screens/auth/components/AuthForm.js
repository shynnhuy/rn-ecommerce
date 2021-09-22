import React, {useState} from "react";
import {StyleSheet, Text, View} from "react-native";
import {Button} from "../../../components";
import {Input} from "./Input";

export const AuthForm = ({buttonText, onSubmit, primary = false}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      <Input
        style={styles.email}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        type="email-address"
      />
      <Input
        style={styles.passwd}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secure
      />
      <Button
        buttonText={buttonText}
        onPress={() => onSubmit({email, password})}
        primary={primary}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },
  email: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  passwd: {
    borderTopWidth: 0,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
});
