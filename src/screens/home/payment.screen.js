import React, { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { Button, Input, Icon, FormControl, Radio, useToast } from "native-base";
import { Entypo } from "@expo/vector-icons";
import { useSelector } from "react-redux";

import { CreditPayment } from "./components/CreditPayment";

import { useLocationContext } from "~app/context";

import { userSelector } from "~app/redux/auth";
import { selectCart, selectCartTotal } from "~app/redux/shop";

import { api } from "~app/api";

export const PaymentScreen = ({ navigation: { navigate } }) => {
  const user = useSelector(userSelector);
  const cart = useSelector(selectCart);
  const total = useSelector(selectCartTotal);
  const [fullName, setFullName] = useState("");
  const [paymentMethod, setPaymentMethod] = useState(0);

  const toast = useToast();

  const {
    location: { address },
  } = useLocationContext();

  const placeOrder = async (paid = false) => {
    if (!fullName || !address) {
      Alert.alert("Please fill all input.");
      return;
    }
    try {
      const formatProducts = cart.map((item) => ({
        product: item._id,
        price: item.price.new,
        amount: item.amount,
      }));

      const data = await api.post("/order", {
        name: fullName,
        email: user.email,
        address,
        total,
        products: formatProducts,
        paid,
      });

      toast.show({
        title: "Order success",
        description: data.message,
        status: "success",
      });
    } catch (error) {
      toast.show({
        title: "Order error",
        description: error.message,
        status: "error",
      });
    }
  };

  return (
    <View style={styles.container}>
      <FormControl>
        <FormControl.Label>Fullname</FormControl.Label>
        <Input
          placeholder="Enter your name"
          overflow="visible"
          value={fullName}
          onChangeText={setFullName}
        />
      </FormControl>
      <FormControl style={{ marginTop: 20 }}>
        <FormControl.Label>Address</FormControl.Label>
        <Input
          placeholder="Address"
          overflow="hidden"
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
      </FormControl>
      <FormControl style={{ marginTop: 20 }}>
        <FormControl.Label>Email</FormControl.Label>
        <Input
          style={styles.input}
          placeholder="E-mail"
          keyboardType="email-address"
          autoCapitalize="none"
          value={user.email}
          isDisabled
        />
      </FormControl>
      <FormControl>
        <FormControl.Label>Payment Method</FormControl.Label>
        <Radio.Group value={paymentMethod} onChange={setPaymentMethod}>
          <Radio value={0} my={1}>
            Cash
          </Radio>
          <Radio value={2} my={1}>
            Credit Card
          </Radio>
        </Radio.Group>
      </FormControl>
      {paymentMethod === 0 ? (
        <Button style={styles.btnOrder} onPress={placeOrder}>
          Place Order
        </Button>
      ) : (
        <CreditPayment email={user.email} total={total} submit={placeOrder} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
  input: {
    marginBottom: 20,
  },
  btnOrder: {
    marginTop: 20,
  },
});
