import React from "react";
import {Button, Image, StyleSheet, View} from "react-native";
import {ScrollView} from "react-native-gesture-handler";
import {useDispatch, useSelector} from "react-redux";
import {actionUpdateInfo} from "../../redux/auth";
import {UserForm} from "./components/UserForm";

export const ProfileScreen = () => {
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const updateInfo = data => dispatch(actionUpdateInfo(data));
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View
        style={{
          borderTopWidth: 0.5,
          borderColor: "#d4d4d4",
        }}>
        <View
          style={{
            alignItems: "center",
            marginBottom: 15,
          }}>
          <View style={styles.avatar}>
            <Image
              source={require("../../assets/splash.png")}
              style={styles.image}
            />
          </View>
          <Button style={styles.avatarBtn} title="Change profile picture" />
        </View>
        <UserForm {...auth.user} onSubmit={updateInfo} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 100,
    overflow: "hidden",
    padding: 5,
    marginVertical: 10,
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
  },
  avatarBtn: {
    marginBottom: 10,
  },
});
