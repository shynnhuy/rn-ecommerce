import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "../../../components";
import { Input } from "./Input";

export const UserForm = ({ onSubmit, ...props }) => {
  const [username, setUsername] = useState(props.username || "");
  const [email, setEmail] = useState(props.email || "");
  const [age, setAge] = useState(props.age || null);

  const submit = () => onSubmit({ username, age });

  return (
    <View style={styles.form}>
      <Input
        label="Username"
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <Input
        label="Email"
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        disabled={true}
      />
      <Input
        label="Age"
        placeholder="Age"
        value={age?.toString()}
        onChangeText={setAge}
        keyboardType="number-pad"
      />
      <Button buttonText="Update" primary onPress={submit} />
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderTopWidth: 0.5,
    borderColor: "#d4d4d4",
  },
});
