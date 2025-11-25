import useWindowStore from "#store/window";
import React from "react";

const WindowControls = ({ target }) => {
  const {
    closeWindow,
    minimizeWindow,
    toggleMaximize,
    restoreWindow,
    windows,
  } = useWindowStore();
  // if window is minimized, clicking the close/minimize should restore
  const isMin = windows[target]?.isMinimized;
  return (
    <div id="window-controls">
      <div className="close" onClick={() => closeWindow(target)} />
      <div
        className="minimize"
        onClick={() => (isMin ? restoreWindow(target) : minimizeWindow(target))}
      />
      <div className="maximize" onClick={() => toggleMaximize(target)} />
    </div>
  );
};

export default WindowControls;
