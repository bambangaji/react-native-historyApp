import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Location } from "../../domain/entities/location";

interface LocationState {
  locations: Location[];
}

const initialState: LocationState = {
  locations: [],
};

const locationSlice = createSlice({
  name: "locations",
  initialState,
  reducers: {
    setLocations(state, action: PayloadAction<Location[]>) {
      state.locations = action.payload;
    },
  },
});

export const { setLocations } = locationSlice.actions;
export default locationSlice.reducer;
