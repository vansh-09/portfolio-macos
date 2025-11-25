import useWindowStore from "#store/window";
import { useGSAP } from "@gsap/react";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";

// Ensure Draggable plugin is registered with gsap
try {
  if (gsap && gsap.registerPlugin) gsap.registerPlugin(Draggable);
} catch (err) {
  // ignore registration errors in non-browser environments
}

const WindowWrapper = (Component, windowKey) => {
  const Wrapped = (props) => {
    const { focusWindow, windows, toggleMaximize } = useWindowStore();
    // normalize the window key (some callers used different casing)
    const resolvedKey =
      typeof windowKey === "string" && !windows[windowKey]
        ? windowKey.toLowerCase()
        : windowKey;

    const win = windows[resolvedKey];
    if (!win) {
      // no configuration for this window key — don't render
      return null;
    }

    const { isOpen, zIndex, isMaximized } = win;
    const ref = useRef(null);
    const resizerRef = useRef(null);

    useGSAP(() => {
      const el = ref.current;
      if (!el || !isOpen) return;

      el.style.display = "block";
    }, [isOpen]);

    useGSAP(() => {
      const el = ref.current;
      if (!el || !isOpen) return;

      // create draggable instance with x/y dragging and reasonable bounds
      // only allow dragging when the user drags the window header (like macOS)
      const header = el.querySelector("#window-header") || el;
      const instances = Draggable.create(el, {
        type: "x,y",
        trigger: header,
        edgeResistance: 0.65,
        bounds: document.body,
        inertia: true,
        onPress: () => {
          // if window is maximized, restore it before dragging
          const s = useWindowStore.getState();
          if (s?.windows?.[resolvedKey]?.isMaximized) {
            s.toggleMaximize(resolvedKey);
          }
          focusWindow(resolvedKey);
        },
      });

      const instance = instances && instances[0];
      return () => instance && instance.kill();
    }, [isOpen]);

    // Setup resizer handle to allow resizing from bottom-right corner
    useLayoutEffect(() => {
      const el = ref.current;
      if (!el) return;

      const resizer = document.createElement("div");
      resizer.className = "window-resizer";
      el.appendChild(resizer);

      let startX = 0;
      let startY = 0;
      let startW = 0;
      let startH = 0;
      const minW = 300;
      const minH = 180;

      const onMouseMove = (e) => {
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;
        const newW = Math.max(minW, startW + dx);
        const newH = Math.max(minH, startH + dy);
        el.style.width = `${newW}px`;
        el.style.height = `${newH}px`;
      };

      const onMouseUp = () => {
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
      };

      const onMouseDown = (e) => {
        e.stopPropagation();
        // if maximized, restore first
        const s = useWindowStore.getState();
        if (s?.windows?.[resolvedKey]?.isMaximized) {
          s.toggleMaximize(resolvedKey);
        }

        startX = e.clientX;
        startY = e.clientY;
        const rect = el.getBoundingClientRect();
        startW = rect.width;
        startH = rect.height;
        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
      };

      resizer.addEventListener("mousedown", onMouseDown);

      return () => {
        resizer.removeEventListener("mousedown", onMouseDown);
        try {
          if (resizer.parentNode) resizer.parentNode.removeChild(resizer);
        } catch (err) {}
      };
    }, [isOpen]);

    useLayoutEffect(() => {
      const el = ref.current;
      if (!el) return;

      el.style.display = isOpen ? "block" : "none";

      gsap.fromTo(
        el,
        { scale: 0.8, opacity: 0, y: 40 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: "power3.out",
        }
      );
    }, [isOpen]);

    const baseStyle = { zIndex };
    const maximizedStyle = isMaximized
      ? {
          zIndex,
          top: 0,
          left: 0,
          width: "100dvw",
          height: "100dvh",
          borderRadius: 0,
        }
      : baseStyle;

    return (
      <section
        id={resolvedKey}
        ref={ref}
        style={maximizedStyle}
        className={isMaximized ? "absolute maximized" : "absolute"}
      >
        <Component {...props} />
      </section>
    );
  };

  Wrapped.displayName = `WindowWrapper(${
    Component.displayName || Component.name || "Component"
  })`;

  return Wrapped;
};

export default WindowWrapper;
