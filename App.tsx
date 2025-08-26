import React, { useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { store } from "./src/app/store";
import HomeScreen from "./src/presentation/screens/HomeScreen";
import DetailsScreen from "./src/presentation/screens/DetailsScreen";
import { GetPlaces } from "./src/domain/usecases/getPlaces";
import { PlacesRepositoryImpl } from "./src/data/repositories/placesRepositoryImpl";
import { setPlaces } from "./src/presentation/redux/placesSlice";

const Stack = createNativeStackNavigator();

function RootNavigator() {
  const dispatch = useDispatch();

  useEffect(() => {
    const repo = new PlacesRepositoryImpl();
    const usecase = new GetPlaces(repo);

    usecase.execute().then((places) => dispatch(setPlaces(places)));
  }, [dispatch]);

  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Details" component={DetailsScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </Provider>
  );
}
