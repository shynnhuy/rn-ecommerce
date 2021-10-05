import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch } from "react-redux";
import { actionFilterByCategory } from "~app/redux/shop";
import { COLORS } from "~app/utils";

export const Categories = ({ categories }) => {
  const [catergoryIndex, setCategoryIndex] = React.useState("all");
  const dispatch = useDispatch();

  const changeCategory = (category) => {
    setCategoryIndex(category);
    dispatch(actionFilterByCategory(category));
  };
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.categoryContainer}
    >
      {[{ code: "all", name: "All products" }, ...categories].map(
        (item, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.8}
            onPress={() => changeCategory(item.code)}
            style={styles.category}
          >
            <Text
              style={[
                styles.categoryText,
                catergoryIndex === item.code && styles.categoryTextSelected,
              ]}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        )
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  categoryContainer: {
    flexDirection: "row",
    marginVertical: 10,
    marginBottom: 15,
  },
  category: {
    marginRight: 10,
  },
  categoryText: { fontSize: 16, color: "grey", fontWeight: "bold" },
  categoryTextSelected: {
    color: COLORS.green,
    paddingBottom: 5,
    borderBottomWidth: 2,
    borderColor: COLORS.green,
  },
});
