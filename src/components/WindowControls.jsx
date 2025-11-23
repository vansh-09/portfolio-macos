const WindowControls = ({ target }) => {
  const { closeWindow } = useWindowStore();
  return <div id="window-controls">
    <div className="close" onClick={() => closeWindow(target)} />
    <div className="minimize" onClick={closeWindow} />
    <div className="maximize" onClick={closeWindow} />
  </div>;
};

export default WindowControls;
WindowControls;
