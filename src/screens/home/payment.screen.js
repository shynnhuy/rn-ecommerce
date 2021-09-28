import { CardField, useConfirmPayment } from "@stripe/stripe-react-native";
import { Button, useToast } from "native-base";
import React, { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, View } from "react-native";
import { api } from "~app/api";

export const PaymentScreen = () => {
  const [card, setCard] = useState();
  const [email, setEmail] = useState("");
  const { confirmPayment, loading } = useConfirmPayment();
  const toast = useToast();

  const onPayment = async () => {
    if (!card?.complete) {
      Alert.alert("Please enter your card details");
      return;
    }

    const billingDetails = {
      email,
    };

    try {
      const { result } = await api.post("/payment/intent");
      const { paymentIntent, error } = await confirmPayment(result, {
        type: "Card",
        billingDetails: billingDetails,
      });
      if (error) {
        toast.show("Error");
        console.log(error);
      } else if (Boolean(paymentIntent)) {
        toast.show("Payment successfully");
        console.log("SUCCESS ", paymentIntent);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      <CardField
        postalCodeEnabled
        placeholder={{ number: "4242 4242 4242 4242" }}
        style={styles.cardContainer}
        cardStyle={styles.card}
        onCardChange={(details) => setCard(details)}
      />
      <Button onPress={onPayment}>Pay $200</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    margin: 20,
  },
  input: {
    backgroundColor: "#efefef",
    borderRadius: 8,
    fontSize: 20,
    height: 50,
    padding: 10,
  },
  card: {
    backgroundColor: "#efefef",
  },
  cardContainer: {
    height: 50,
    marginVertical: 30,
  },
});
