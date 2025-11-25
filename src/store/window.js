import { INITIAL_Z_INDEX, WINDOW_CONFIG, locations } from "#constants";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

const useWindowStore = create(
  immer((set) => ({
    // store windows as an object keyed by app id (WINDOW_CONFIG)
    windows: WINDOW_CONFIG,
    // currently active Finder location (folder) shown in the Finder window
    activeLocation:
      locations?.work ?? Object.values(locations ?? {})[0] ?? null,
    setActiveLocation: (location) =>
      set((state) => {
        state.activeLocation = location;
      }),
    nextZIndex: INITIAL_Z_INDEX + 1,
    // open or restore a window
    openWindow: (windowKey, data = null) =>
      set((state) => {
        const win = state.windows[windowKey];
        if (!win) return;
        win.isOpen = true;
        win.isMinimized = false;
        win.zIndex = state.nextZIndex;
        win.data = data ?? win.data;
        state.nextZIndex++;
      }),
    // minimize (hide to dock) but keep state so it can be restored
    minimizeWindow: (windowKey) =>
      set((state) => {
        const win = state.windows[windowKey];
        if (!win) return;
        win.isMinimized = true;
        win.isOpen = false;
      }),
    // restore a minimized window (or open if closed)
    restoreWindow: (windowKey) =>
      set((state) => {
        const win = state.windows[windowKey];
        if (!win) return;
        win.isMinimized = false;
        win.isOpen = true;
        win.zIndex = state.nextZIndex++;
      }),
    closeWindow: (windowKey) =>
      set((state) => {
        const win = state.windows[windowKey];
        if (!win) return;
        win.isOpen = false;
        // reset to the base z-index constant
        win.zIndex = INITIAL_Z_INDEX;
        win.data = null;
        win.isMinimized = false;
        win.isMaximized = false;
      }),
    // toggle maximize/restore
    toggleMaximize: (windowKey) =>
      set((state) => {
        const win = state.windows[windowKey];
        if (!win) return;
        win.isMaximized = !win.isMaximized;
        if (win.isMaximized) {
          // ensure it's visible and on top
          win.isOpen = true;
          win.isMinimized = false;
          win.zIndex = state.nextZIndex++;
        }
      }),
    focusWindow: (windowKey) =>
      set((state) => {
        const win = state.windows[windowKey];
        if (!win) return;
        win.zIndex = state.nextZIndex++;
      }),
  }))
);

export default useWindowStore;
