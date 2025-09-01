import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Place } from "../../domain/entities/place";

interface PlacesState {
  list: Place[];
}

const initialState: PlacesState = {
  list: [],
};

const placesSlice = createSlice({
  name: "places",
  initialState,
  reducers: {
    setPlaces(state, action: PayloadAction<Place[]>) {
      state.list = action.payload;
    },
    markVisited(state, action: PayloadAction<string>) {
      state.list = state.list.map(p =>
        p.id === action.payload ? { ...p, visited: 1 } : p
      );
    },
    unmarkVisited(state, action: PayloadAction<string>) {
      state.list = state.list.map(p =>
        p.id === action.payload ? { ...p, visited: 0 } : p
      );
    },
  },
});

export const { setPlaces, markVisited, unmarkVisited } = placesSlice.actions;
export default placesSlice.reducer;
