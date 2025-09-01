import { configureStore } from "@reduxjs/toolkit";
import placesReducer from "../../presentation/redux/placesSlice";
import locationsReducer from "../../presentation/redux/locationSlice";

export const store = configureStore({
  reducer: {
    places: placesReducer,
    locations: locationsReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
