import { Button, Icon, Input } from "native-base";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export const OrderScreen = () => {
  const user = useSelector(userSelector);

  const {
    location: { address },
  } = useLocationContext();

  return (
    <View style={styles.container}>
      <Input
        placeholder="Address"
        overflow="visible"
        value={address}
        InputRightElement={
          <Button roundedLeft="0" onPress={() => navigate("Address")}>
            <Icon
              as={<Entypo name="chevron-right" />}
              color="white"
              size="sm"
            />
          </Button>
        }
      />
      <Input
        style={styles.input}
        placeholder="E-mail"
        keyboardType="email-address"
        autoCapitalize="none"
        value={user.email}
        isDisabled
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
    marginVertical: 30,
  },
  input: {
    marginVertical: 30,
    fontSize: 20,
    marginBottom: 30,
  },
});
