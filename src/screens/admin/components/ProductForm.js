import {
  Actionsheet,
  Button,
  FormControl,
  HStack,
  Icon,
  Input,
  Modal,
  TextArea,
} from "native-base";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, Text, View } from "react-native";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useModal } from "~app/hooks";

const TextField = ({
  control,
  name,
  label,
  placeholder,
  required = false,
  keyboardType = "default",
  textArea = false,
}) => {
  return (
    <FormControl>
      <FormControl.Label>{label}</FormControl.Label>
      <Controller
        control={control}
        rules={{
          required: required,
        }}
        render={({ field: { onChange, onBlur, value } }) =>
          !textArea ? (
            <Input
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder={placeholder}
              keyboardType={keyboardType}
            />
          ) : (
            <TextArea
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder={placeholder}
              keyboardType={keyboardType}
            />
          )
        }
        name={name}
        defaultValue=""
      />
    </FormControl>
  );
};

export const ProductForm = ({ open, onClose }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [openSheet, setOpenSheet] = React.useState(false);

  let openImagePickerAsync = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    console.log(pickerResult);
  };
  let openCameraAsync = async () => {
    let permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchCameraAsync();
    console.log(pickerResult);
  };
  return (
    <>
      <Modal isOpen={open} onClose={onClose} size="xl">
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>Create product</Modal.Header>
          <Modal.Body>
            <TextField
              control={control}
              name="name"
              label="Name"
              placeholder="Enter product name"
              required
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
              keyboardType="decimal-pad"
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
            <Button onPress={() => setOpenSheet(true)}>Upload images</Button>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button variant="ghost" colorScheme="blueGray" onPress={onClose}>
                Cancel
              </Button>
              <Button onPress={onClose}>Save</Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
      <Actionsheet
        isOpen={openSheet}
        onClose={() => setOpenSheet(false)}
        size="full"
      >
        <Actionsheet.Content>
          <Actionsheet.Item
            onPress={openCameraAsync}
            startIcon={
              <Icon
                as={<MaterialIcons name="share" />}
                color="muted.500"
                mr={3}
              />
            }
          >
            Took photo
          </Actionsheet.Item>
          <Actionsheet.Item
            onPress={openImagePickerAsync}
            startIcon={
              <Icon
                as={<MaterialCommunityIcons name="link" />}
                color="muted.500"
                mr={3}
              />
            }
          >
            Photo gallery
          </Actionsheet.Item>
        </Actionsheet.Content>
      </Actionsheet>
    </>
  );
};

const styles = StyleSheet.create({});
