import React from "react";
import {Button, Image, StyleSheet, View, Pressable} from "react-native";
import {ScrollView} from "react-native-gesture-handler";
import {useDispatch, useSelector} from "react-redux";
import {launchCamera, launchImageLibrary} from "react-native-image-picker";
import {actionUpdateInfo} from "../../redux/auth";
import {UserForm} from "./components/UserForm";
import {api} from "../../api";

const createFormData = (photo, body = {}) => {
  const data = new FormData();

  data.append("image", {
    name: photo.fileName,
    type: photo.type,
    uri: Platform.OS === "ios" ? photo.uri.replace("file://", "") : photo.uri,
  });
  Object.keys(body).forEach((key) => {
    data.append(key, body[key]);
  });
  return data;
};

export const ProfileScreen = () => {
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const updateInfo = data => dispatch(actionUpdateInfo(data));

  const [photo, setPhoto] = React.useState(null);

  const handleChoosePhoto = () => {
    // launchCamera({}, console.log);
    launchImageLibrary({noData: true}, response => {
      console.log(response.assets[0]);
      if (response) {
        setPhoto(response.assets[0]);
      }
    });
  };

  const handleUploadPhoto = async () => {
    try {
      const res = await api.patch(
        "/auth/avatar",
        createFormData(photo, {userId: auth.user._id}),
      );
      console.log("DATA: ", res);
    } catch (error) {
      console.log("ERROR: ", error.data);
    }
  };

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
            justifyContent: "center",
            marginBottom: 15,
          }}>
          <Pressable onPress={handleChoosePhoto} style={styles.avatar}>
            <Image
              source={
                Boolean(photo)
                  ? {uri: photo.uri}
                  : require("../../assets/splash.png")
              }
              style={styles.image}
            />
          </Pressable>
          {Boolean(photo) && (
            <Button
              onPress={handleUploadPhoto}
              style={styles.avatarBtn}
              title="Upload Image"
            />
          )}
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
