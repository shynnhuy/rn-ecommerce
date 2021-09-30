import React, { useState } from "react";
import { Alert, StyleSheet, View, Keyboard } from "react-native";
import { CardField, useConfirmPayment } from "@stripe/stripe-react-native";
import { Button, useToast, Input, Icon, FormControl, Radio } from "native-base";
import { Entypo } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { api } from "~app/api";
import { useLocationContext } from "~app/context";
import { userSelector } from "~app/redux/auth";
import { selectCartTotal } from "~app/redux/shop";

const CreditPayment = ({ email, submit }) => {
  const [card, setCard] = useState();
  const total = useSelector(selectCartTotal);

  const { confirmPayment, loading } = useConfirmPayment();

  const toast = useToast();

  const onPayment = async () => {
    Keyboard.dismiss();

    const billingDetails = {
      email: email,
    };

    try {
      const { result } = await api.post("/order/payment-intent", {
        price: total,
      });
      const { paymentIntent, error } = await confirmPayment(result, {
        type: "Card",
        billingDetails: billingDetails,
      });
      if (error) {
        toast.show("Error");
        console.log(error);
      } else if (Boolean(paymentIntent)) {
        toast.show("Payment successfully");
        submit();
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
      <Button onPress={onPayment}>{`Pay $${total} and Place Order`}</Button>
    </View>
  );
};

export const PaymentScreen = ({ navigation: { navigate } }) => {
  const user = useSelector(userSelector);
  const [fullName, setFullName] = useState("");
  const [paymentMethod, setPaymentMethod] = useState(0);

  const {
    location: { address },
  } = useLocationContext();

  const placeOrder = () => {
    if (!fullName || !address) {
      Alert.alert("Please fill all input.");
      return;
    }
    try {
      Alert.alert("PLACE ORDER");
    } catch (error) {
      Alert.alert("Error");
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
        <CreditPayment email={user.email} submit={placeOrder} />
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
  card: {
    backgroundColor: "#efefef",
  },
  cardContainer: {
    height: 50,
    marginVertical: 20,
  },
});
