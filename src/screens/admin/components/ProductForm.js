import { Button, ScrollView, Text, useToast, VStack } from "native-base";
import React from "react";
import { useForm } from "react-hook-form";
import { Image, Platform, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { queries } from "~app/api";
import { TextField } from "./TextField";
import { SelectField } from "./Select";

export const ProductForm = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const queryClient = useQueryClient();
  const toast = useToast();
  const { data } = useQuery(["manager/categories"], queries.getCategories);
  const { mutate, isError, error } = useMutation(queries.createProduct, {
    onSuccess: () => {
      queryClient.invalidateQueries(["manager/products"]);
      reset();
      toast.show({
        status: "success",
        title: "Created",
        description: "Product created successfully",
      });
    },
  });

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

  const onSubmit = (data) => {
    const formData = queries.getFormData(data);
    images.forEach((image) => {
      const file = {
        uri: Platform.OS === "ios" ? image.replace("file://", "") : image,
        name:
          image.filename ||
          Math.floor(Math.random() * Math.floor(999999999)) + ".jpg",
        type: image.type || "image/jpeg",
      };
      formData.append("images", file);
    });
    mutate(formData);
  };
  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      flex={1}
    >
      <VStack space={3}>
        <TextField
          control={control}
          name="name"
          label="Name"
          placeholder="Enter product name"
          required
        />
        <TextField
          control={control}
          name="slug"
          label="Slug"
          placeholder="Enter product slug"
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

        <Button onPress={openImagePickerAsync} colorScheme="secondary">
          Upload images
        </Button>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {images.length > 0 &&
            images.map((image, index) => (
              <Image
                key={index}
                source={{ uri: image }}
                style={{ width: 100, height: 100, marginRight: 5 }}
              />
            ))}
        </ScrollView>
      </VStack>
      {isError ? <Text>An error occurred: {error.message}</Text> : null}

      <Button.Group space={2}>
        <Button flex={1} variant="outline" colorScheme="blueGray">
          Cancel
        </Button>
        <Button flex={1} colorScheme="green" onPress={handleSubmit(onSubmit)}>
          Create
        </Button>
      </Button.Group>
    </ScrollView>
  );
};

const styles = StyleSheet.create({});
