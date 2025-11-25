import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
gsap.registerPlugin(Draggable);

import { Navbar, Welcome, Dock } from "#components";
import {
  Safari,
  Terminal,
  Resume,
  Finder,
  ImgFile,
  TxtFile,
  Contact,
} from "#windows";

const App = () => {
  return (
    <main>
      <Navbar />
      <Welcome />
      <Dock />

      <Terminal />
      <Safari />
      <Resume />
      <Finder />
      <ImgFile />
      <TxtFile />
      <Contact />
    </main>
  );
};

export default App;
