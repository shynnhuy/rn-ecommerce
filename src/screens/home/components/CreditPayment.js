import { CardField, useConfirmPayment } from "@stripe/stripe-react-native";
import { Button, useToast } from "native-base";
import React, { useState } from "react";
import { Keyboard, StyleSheet, Alert, View } from "react-native";
import { api } from "~app/api";

export const CreditPayment = ({ email, total, submit }) => {
  const [card, setCard] = useState();

  const { confirmPayment, loading } = useConfirmPayment();

  const toast = useToast();

  const onPayment = async () => {
    Keyboard.dismiss();

    if (!card?.complete) {
      Alert.alert("Please enter your credit card");
      return;
    }

    const billingDetails = {
      email: email,
    };

    try {
      const { result } = await api.post("/order/payment-intent", {
        price: total,
      });
      const { paymentIntent, error } = await confirmPayment(result, {
        type: "Card",
        billingDetails,
      });
      if (error) {
        toast.show("Error");
        console.log(error);
      } else if (Boolean(paymentIntent)) {
        submit(1);
        toast.show({
          title: "Payment successfully",
          description: `Successfully paid $${total}`,
          status: "success",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      <CardField
        postalCodeEnabled
        placeholder={{ number: "4242 4242 4242 4242" }}
        style={styles.cardContainer}
        cardStyle={styles.card}
        onCardChange={(details) => setCard(details)}
      />
      <Button
        onPress={onPayment}
        disabled={loading}
        isLoading={loading}
      >{`Pay $${total} and Place Order`}</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#efefef",
  },
  cardContainer: {
    height: 50,
    marginVertical: 20,
  },
});
