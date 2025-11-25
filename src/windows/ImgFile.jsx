import WindowWrapper from "#hoc/WindowWrapper.jsx";
import { WindowControls } from "#components/index.js";
import useWindowStore from "#store/window.js";

const ImgFile = () => {
  const { windows } = useWindowStore();
  const data = windows?.imgfile?.data ?? null;

  return (
    <>
      <div id="window-header">
        <WindowControls target="imgfile" />
        <p>{data?.name ?? "Image"}</p>
      </div>

      <div className="preview">
        {data?.imageUrl ? (
          // imageUrl paths in constants are absolute to /src/assets
          // letting Vite resolve them works fine in an <img>
          <img src={data.imageUrl} alt={data.name} />
        ) : (
          <p className="p-4">No image available</p>
        )}
      </div>
    </>
  );
};

const ImgFileWindow = WindowWrapper(ImgFile, "imgfile");
export default ImgFileWindow;
