import { Spinner } from "native-base";
import React, { useState } from "react";
import {
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import { useMutation, useQuery } from "react-query";
import { SliderBox } from "react-native-image-slider-box";

import { api, queries } from "~app/api";
import { StatusBar } from "expo-status-bar";
import { useDispatch } from "react-redux";
import { actionAddToCart } from "~app/redux/shop";
import { financial } from "~app/utils";
import { AirbnbRating, Rating } from "react-native-ratings";

const fetchProductById = async (id) => {
  // console.log(id);
  return await api.get(`/products/${id}`);
};
export const DetailsScreen = ({ route }) => {
  const { _id } = route.params;

  const [count, setCount] = useState(1);

  const dispatch = useDispatch();

  const { data, isLoading, error } = useQuery(["product", _id], () =>
    fetchProductById(_id)
  );

  const { data: rating, isLoading: isLoadRating } = useQuery(
    ["product-rate", _id],
    () => queries.fetchProductRatingById(_id)
  );

  const { mutate } = useMutation(({ product, value }) =>
    queries.ratingProduct(product, value)
  );

  if (isLoading || !data.result) {
    return <Spinner />;
  }
  const product = data.result;

  const increment = () => setCount(count + 1);
  const decrement = () => count > 1 && setCount(count - 1);

  const addToCart = () => dispatch(actionAddToCart({ product, amount: count }));

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar style="dark" />
      <View style={styles.imgContainer}>
        <SliderBox
          images={product.images}
          resizeMode={"contain"}
          sliderBoxHeight={200}
          ImageComponentStyle={{
            resizeMode: "contain",
            paddingVertical: 15,
          }}
          inactiveDotColor="#444"
          autoplay
          circleLoop
        />
      </View>
      <View style={styles.detailsContainer}>
        <View
          style={{
            marginLeft: 20,
            flexDirection: "row",
            alignItems: "flex-end",
          }}
        >
          <View style={styles.line} />
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>Best choice</Text>
        </View>
        <View
          style={{
            marginLeft: 20,
            marginTop: 20,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 22, fontWeight: "bold", flex: 1 }}>
            {product.name}
          </Text>
          <View
            style={{
              flexDirection: "row",
              flex: 1,
              justifyContent: "flex-end",
            }}
          >
            <View
              style={[
                styles.priceTag,
                {
                  backgroundColor: "red",
                },
              ]}
            >
              <Text
                style={{
                  marginLeft: 15,
                  color: "white",
                  fontWeight: "bold",
                  fontSize: 14,
                }}
              >
                ${financial(product.price.old)}
              </Text>
            </View>
            <View
              style={[
                styles.priceTag,
                {
                  borderTopLeftRadius: 0,
                  borderBottomLeftRadius: 0,
                  paddingRight: 10,
                },
              ]}
            >
              <Text
                style={{
                  marginLeft: 10,
                  color: "white",
                  fontWeight: "bold",
                  fontSize: 14,
                }}
              >
                ${financial(product.price.new)}
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{ paddingHorizontal: 20, marginBottom: 20, marginTop: 10 }}
        >
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>About</Text>
          <Text
            style={{
              color: "grey",
              fontSize: 16,
              lineHeight: 22,
              marginTop: 10,
            }}
          >
            {product.description}
          </Text>
          <View
            style={{
              marginTop: 20,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <TouchableOpacity onPress={decrement} style={styles.borderBtn}>
                <Text style={styles.borderBtnText}>-</Text>
              </TouchableOpacity>
              <Text
                style={{
                  fontSize: 20,
                  marginHorizontal: 10,
                  fontWeight: "bold",
                }}
              >
                {count}
              </Text>
              <TouchableOpacity onPress={increment} style={styles.borderBtn}>
                <Text style={styles.borderBtnText}>+</Text>
              </TouchableOpacity>
            </View>

            {isLoadRating ? (
              <ActivityIndicator />
            ) : (
              <AirbnbRating
                defaultRating={rating || 0}
                onFinishRating={(value) =>
                  mutate({ product: product._id, value })
                }
                showRating={false}
                size={25}
              />
            )}
          </View>

          <TouchableOpacity style={styles.buyBtn} onPress={addToCart}>
            <Text
              style={{
                color: "white",
                fontSize: 18,
                fontWeight: "bold",
              }}
            >
              Add to cart
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  imgContainer: {
    flex: 1,
    marginTop: 20,
  },
  detailsContainer: {
    flex: 2,
    marginHorizontal: 7,
    marginBottom: 7,
    borderRadius: 20,
    marginTop: 30,
    paddingTop: 30,
    backgroundColor: "#F1F1F1",
  },
  line: {
    width: 25,
    height: 2,
    marginBottom: 5,
    marginRight: 3,
    backgroundColor: "#000",
  },
  borderBtn: {
    borderColor: "grey",
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    width: 60,
    height: 40,
  },
  borderBtnText: { fontWeight: "bold", fontSize: 28 },
  buyBtn: {
    marginTop: 15,
    height: 50,
    backgroundColor: "green",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
  },
  priceTag: {
    backgroundColor: "green",
    width: 80,
    height: 40,
    justifyContent: "center",
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
  },
});
