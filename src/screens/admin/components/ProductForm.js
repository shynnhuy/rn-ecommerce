import {
  Actionsheet,
  Button,
  FormControl,
  HStack,
  Icon,
  Input,
  Modal,
  ScrollView,
  TextArea,
  VStack,
  View,
} from "native-base";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Image, StyleSheet } from "react-native";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useQuery } from "react-query";
import { queries } from "~app/api";
import { TextField } from "./TextField";
import { SelectField } from "./Select";

export const ProductForm = ({ open, onClose, chooseImage }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { data, isError, isLoading } = useQuery(
    ["manager/categories"],
    queries.getCategories
  );

  console.log(data);

  const [images, setImages] = React.useState([]);

  let openImagePickerAsync = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (!pickerResult.cancelled) {
      setImages([...images, pickerResult.uri]);
    }
  };

  const onSubmit = (data) => console.log({ ...data, images });
  return (
    <View justifyContent="space-between" flex={1}>
      <VStack space={3}>
        <TextField
          control={control}
          name="name"
          label="Name"
          placeholder="Enter product name"
          required
        />
        <SelectField
          control={control}
          name="category"
          placeholder="Choose category"
          label="Category"
          items={data}
        />
        <TextField
          control={control}
          name="price"
          label="Price"
          placeholder="Enter product price"
          required
          keyboardType="decimal-pad"
        />
        <TextField
          control={control}
          name="discount"
          label="Discount"
          placeholder="Enter product discount"
          keyboardType="number-pad"
          required
        />
        <TextField
          control={control}
          name="description"
          label="Description"
          placeholder="Enter product description"
          required
          textArea
        />

        <Button onPress={openImagePickerAsync}>Upload images</Button>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {images.length > 0 &&
            images.map((image) => (
              <Image
                source={{ uri: image }}
                style={{ width: 100, height: 100, marginRight: 5 }}
              />
            ))}
        </ScrollView>
      </VStack>
      <Button.Group space={2}>
        <Button
          flex={1}
          variant="outline"
          colorScheme="blueGray"
          onPress={onClose}
        >
          Cancel
        </Button>
        <Button flex={1} colorScheme="green" onPress={handleSubmit(onSubmit)}>
          Create
        </Button>
      </Button.Group>
    </View>
  );
};

const styles = StyleSheet.create({});
