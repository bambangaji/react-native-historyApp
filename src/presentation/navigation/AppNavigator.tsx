import React, { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import DetailsScreen from "../screens/DetailsScreen";
import AddPlaceScreen from "../screens/AddPlaceScreen";
import { useDispatch } from "react-redux";
import { PlacesRepositoryImpl } from "../../data/repositories/placesRepositoryImpl";
import { initDb } from "../../services/database";
import { setPlaces } from "../redux/placesSlice";
import { PlacesUseCases } from "../../domain/usecases/placeUseCases";
import { LocationUseCases } from "../../domain/usecases/locationUseCases";
import { LocationRepositoryImpl } from "../../data/repositories/locationRepositoryImpl";
import { setLocations } from "../redux/locationSlice";
// import SettingsScreen from "../screens/SettingsScreen";

export type RootStackParamList = {
  Home: undefined;
  Details: { placeId: number };
  Settings: undefined;
  AddPlace: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("initiliaze?");

    const repoPlace = new PlacesRepositoryImpl();
    const repoLocation = new LocationRepositoryImpl();
    const placeUseCase = new PlacesUseCases(repoPlace);
    const locationUseCase = new LocationUseCases(repoLocation);
    initDb();
    const init = async () => {
      await initDb();
      const places = await placeUseCase.getPlaces();
      const locations = await locationUseCase.getAllLocations();
      // ✅ print ke console
      console.log("Fetched places:", places);
      console.log("Fetched locations:", locations);

      dispatch(setPlaces(places));
      dispatch(setLocations(locations));
    };

    init();
  }, [dispatch]);
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Details" component={DetailsScreen} />
      <Stack.Screen name="AddPlace" component={AddPlaceScreen} />
      {/* <Stack.Screen name="Settings" component={SettingsScreen} /> */}
    </Stack.Navigator>
  );
}
