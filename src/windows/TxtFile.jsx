import WindowWrapper from "#hoc/WindowWrapper.jsx";
import { WindowControls } from "#components/index.js";
import useWindowStore from "#store/window.js";

const TxtFile = () => {
  const { windows } = useWindowStore();
  const data = windows?.txtfile?.data ?? null;

  return (
    <>
      <div id="window-header">
        <WindowControls target="txtfile" />
        <h2>{data?.name ?? "Text File"}</h2>
      </div>

      <div className="p-4">
        {data?.description ? (
          data.description.map((line, i) => (
            <p key={i} className="mb-2 text-sm text-gray-700">
              {line}
            </p>
          ))
        ) : (
          <p className="text-sm text-gray-600">No content to display.</p>
        )}
      </div>
    </>
  );
};

const TxtFileWindow = WindowWrapper(TxtFile, "txtfile");
export default TxtFileWindow;
