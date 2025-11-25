import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { locations } from "#constants";

const DEFAULT_LOCATION = locations.work;

const useLocationStore = create(
  immer((set) => ({
    activelocation: DEFAULT_LOCATION,

    setActiveLocation: (location = null) =>
      set((state) => {
        state.activelocation = location;
      }),
    resetActivecLocation: () =>
      set((state) => {
        state.activelocation = DEFAULT_LOCATION;
      }),
  }))
);

export default useLocationStore;
