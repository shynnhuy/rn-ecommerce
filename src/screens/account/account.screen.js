import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import moment from "moment";
import {useSelector} from "react-redux";

import Img from "~app/assets/splash.png";
import { SafeAreaView } from "react-native-safe-area-context";

const UserBox = ({user, onPress}) => (
  <Pressable
    style={({pressed}) => [
      styles.infoContainer,
      {
        borderBottomWidth: pressed ? 1 : 3,
        marginTop: pressed ? 19 : 15,
      },
    ]}
    onPress={onPress}>
    <Image source={Img} style={styles.avatar} />
    <View style={styles.info}>
      <Text style={styles.email}>{user.email}</Text>
      <Text style={styles.date}>
        Joined {moment(user.createdAt).format("MMMM DD, YYYY")}
      </Text>
    </View>
  </Pressable>
);

export const AccountScreen = ({navigation: {navigate}}) => {
  const auth = useSelector(state => state.auth);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.iconContainer}>
        <TouchableOpacity
          style={styles.headerBtn}
          onPress={() => toast.show("Go to cart", {type: "success"})}>
          <Ionicons name="cart-outline" size={28} color="gray" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.headerBtn}
          onPress={() => navigate("Setting")}>
          <Ionicons name="cog-outline" size={28} color="gray" />
        </TouchableOpacity>
      </View>

      {auth.user && (
        <UserBox user={auth.user} onPress={() => navigate("Profile")} />
      )}
    </SafeAreaView>
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
    borderBottomColor: "gray",
    borderBottomWidth: 0.5,
  },
  headerBtn: {
    marginLeft: 15,
  },
  infoContainer: {
    flexDirection: "row",
    marginTop: 15,
    paddingVertical: 10,
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
