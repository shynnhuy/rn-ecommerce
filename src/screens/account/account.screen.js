import React from "react";
import {TouchableOpacity, StyleSheet, Text, View, Image} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import moment from "moment";

import Img from "../../assets/splash.png";
import {useSelector} from "react-redux";

export const AccountScreen = ({navigation: {navigate}}) => {
  const auth = useSelector(state => state.auth);

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <TouchableOpacity
          style={styles.headerBtn}
          onPress={() => navigate("Setting")}>
          <Ionicons name="cog-outline" size={28} color="gray" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log("Cart")}>
          <Ionicons name="cart-outline" size={28} color="gray" />
        </TouchableOpacity>
      </View>
      <View style={styles.infoContainer}>
        <Image source={Img} style={styles.avatar} />
        <View style={styles.info}>
          <Text style={styles.email}>{auth.user?.email}</Text>
          <Text style={styles.date}>
            Joined {moment(auth.user?.createdAt).format("MMMM YYYY")}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
  },
  header: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomColor: "gray",
    borderBottomWidth: 0.5,
  },
  headerBtn: {
    marginHorizontal: 5,
  },
  infoContainer: {
    flexDirection: "row",
    marginTop: 15,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    borderColor: "#d4d4d4",
    borderRadius: 8,
    borderWidth: 1,
    borderBottomWidth: 3,
  },
  avatar: {
    width: 80,
    height: 80,
  },
  info: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    justifyContent: "space-around",
  },
  email: {
    fontSize: 20,
    color: "gray",
  },
  date: {
    color: "gray",
  },
});
