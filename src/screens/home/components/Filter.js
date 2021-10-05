import React from "react";
import { Button, Divider, Modal, Text, VStack } from "native-base";
import { Slider } from "~app/components";
import { View } from "react-native";

export const Filter = ({ open, onClose }) => {
  return (
    <Modal isOpen={open} onClose={onClose}>
      <Modal.Content maxWidth="400px">
        <Modal.CloseButton />
        <Modal.Header>Products Filter</Modal.Header>
        <Modal.Body>
          <VStack space="2">
            <Text>Price range</Text>
            <Slider from={0} to={2000} />
            {/* <Divider /> */}
          </VStack>
          {/* <View>
            <Text>Price range</Text>
            <Slider from={0} to={2000} />
            <Divider />
          </View> */}
        </Modal.Body>
        <Modal.Footer>
          <Button.Group space={2}>
            <Button variant="ghost" colorScheme="blueGray" onPress={onClose}>
              Cancel
            </Button>
            <Button
              onPress={onClose}
              bg="green.600"
              _pressed={{ bg: "green.700" }}
            >
              Save
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

// const styles = StyleSheet.create({});r
