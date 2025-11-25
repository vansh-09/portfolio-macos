import { Search } from "lucide-react";
import { WindowControls } from "#components";
import WindowWrapper from "#hoc/WindowWrapper.jsx";
import { locations } from "#constants";
import useWindowStore from "#store/window.js";
import clsx from "clsx";

const Finder = () => {
  const { openWindow } = useWindowStore();
  const { activeLocation, setActiveLocation } = useWindowStore();

  const openItem = (item) => {
    if (!item) return;
    if (item.fileType === "pdf") return openWindow("resume", item);
    // folders in constants use `kind: 'folder'`, not fileType
    if (item.kind === "folder" || item.fileType === "folder")
      return setActiveLocation(item);
    if (item.fileType === "url" && item.href)
      return window.open(item.href, "_blank");
    if (item.fileType === "img") return openWindow("imgfile", item);
    if (item.fileType === "txt") return openWindow("txtfile", item);
    // fallback: if it has an href open it, otherwise try to set active location
    if (item.href) return window.open(item.href, "_blank");
    return null;
  };

  const renderList = (name, items) => (
    <div>
      <h3>{name}</h3>
      <ul>
        {items.map((item) => (
          <li
            key={item.id}
            onClick={() => setActiveLocation(item)}
            className={clsx(
              item.id === activeLocation.id ? "active" : "not-active"
            )}
          >
            <img src={item.icon} className="w-4" alt={item.name} />
            <p className="text-sm font-medium truncate">{item.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <>
      <div>
        <div id="window-header">
          <WindowControls target="finder" />
          <Search className="icon" />
        </div>

        <div className="bg-white flex h-full">
          <div className="sidebar">
            {renderList("Favorites", Object.values(locations))}
            {renderList("My Projects", locations.work.children)}
          </div>

          <ul className="content">
            {activeLocation?.children?.map((item) => (
              <li
                key={item.id}
                className={item.position}
                onClick={() => openItem(item)}
              >
                <img src={item.icon} alt={item.name} />
                <p>{item.name}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

const FinderWindow = WindowWrapper(Finder, "finder");

export default FinderWindow;
