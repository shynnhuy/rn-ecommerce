import React from "react";
import { Ionicons } from "@expo/vector-icons";

import { Badge, Button, Icon, IconButton } from "native-base";
import { View, Text } from "react-native";
import { useNavigation } from "@react-navigation/core";

export const HeaderCart = ({ cartCount = 0, navigation }) => {
  return (
    <View
      style={{
        marginRight: 15,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Badge
        bg="red.400"
        colorScheme="danger"
        rounded="999px"
        mb={-5}
        mr={-1}
        size="6"
        zIndex={1}
        variant="solid"
        alignSelf="flex-end"
      >
        {cartCount}
      </Badge>
      <IconButton
        onPress={() => navigation.navigate("Shopping Cart")}
        icon={<Icon as={Ionicons} name="cart" />}
        borderRadius="full"
        _icon={{
          color: "green.500",
          size: "md",
        }}
        _hover={{
          bg: "green.600:alpha.20",
        }}
        _ios={{
          _icon: {
            size: "sm",
          },
        }}
      />
    </View>
  );
};
