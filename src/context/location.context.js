import React, { createContext, useContext } from "react";
import { View, Text } from "react-native";

export const LocationContext = createContext();

const initialState = {
  coords: null,
  address: "",
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case "SET_COORDS":
      return { ...state, coords: payload };
    case "SET_ADDRESS":
      return { ...state, address: payload };
    default:
      return state;
  }
};
export const setUserCoords = (coords) => ({
  type: "SET_COORDS",
  payload: coords,
});
export const setUserAddress = (address) => ({
  type: "SET_ADDRESS",
  payload: address,
});

export const LocationProvider = ({ children }) => {
  const [location, dispatch] = React.useReducer(reducer, initialState);

  return (
    <LocationContext.Provider value={{ location, dispatch }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocationContext = () => useContext(LocationContext);
