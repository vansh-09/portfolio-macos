import { WindowControls } from "#components/index.js";
import WindowWrapper from "#hoc/WindowWrapper.jsx";
import { DownloadIcon } from "lucide-react";
import { pdfjs, Document, Page } from "react-pdf";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

const Resume = () => {
  return (
    <>
      <div id="window-header">
        <WindowControls target="Resume" />
        <h2>Resume.pdf</h2>
        <a
          href="/src/assets/files/resume.pdf"
          download
          className="cursor-pointer"
          title="Download Resume"
        >
          <DownloadIcon />
        </a>
      </div>

      <Document file="/src/assets/files/resume.pdf">
        <Page pageNumber={1} renderTextLayer renderAnnotationLayer />
      </Document>
    </>
  );
};

const ResumeWindow = WindowWrapper(Resume, "Resume");
export default ResumeWindow;
