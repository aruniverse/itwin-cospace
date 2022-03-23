import { Point3d } from "@itwin/core-geometry";
import { createSlice } from "@reduxjs/toolkit";

export const markerSlice = createSlice({
  name: "marker",
  initialState: [],
  reducers: {
    addMarker: (state: Point3d[], action: { payload: { location: any; }; }) => {
      const { location } = action.payload;
      state.push(location);
    },
    removeMarker: (state: Point3d[], action: { payload: { index: any; }; }) => {
      const { index } = action.payload;
      state.splice(index, 1);
    },
  },
});

export const { addMarker, removeMarker } = markerSlice.actions;
