import React, { useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { store } from "./src/app/store";
import AppNavigator from "./src/presentation/navigation/AppNavigator";


export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppNavigator  />
      </NavigationContainer>
    </Provider>
  );
}
