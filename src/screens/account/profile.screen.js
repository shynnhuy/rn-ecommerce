import React, { useEffect } from "react";
import { Button, Image, StyleSheet, View, Pressable } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";

// import {launchCamera, launchImageLibrary} from "react-native-image-picker";
import * as ImagePicker from "expo-image-picker";

import { actionUpdateAvatar, actionUpdateInfo } from "~redux/auth";
import { Loading } from "~app/components";
import { UserForm } from "./components/UserForm";

export const ProfileScreen = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const updateInfo = (data) => dispatch(actionUpdateInfo(data));

  const [photo, setPhoto] = React.useState(auth.user?.avatar || null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setPhoto(result.uri);
    }
  };

  // const handleChoosePhoto = () => {
  //   // launchCamera({}, console.log);
  //   launchImageLibrary({}, (response) => {
  //     // console.log(response.assets[0]);
  //     if (!response.didCancel) {
  //       setPhoto(response.assets[0]?.uri);
  //     }
  //   });
  // };

  const handleUploadPhoto = () => dispatch(actionUpdateAvatar(photo));

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View
        style={{
          borderTopWidth: 0.5,
          borderColor: "#d4d4d4",
        }}
      >
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 15,
          }}
        >
          <Pressable onPress={pickImage} style={styles.avatar}>
            <Image
              // resizeMode=""
              source={
                Boolean(photo)
                  ? { uri: photo }
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
      {auth.loading && <Loading />}
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
    borderWidth: 1,
    borderColor: "gray",
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
