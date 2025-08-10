import { useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

interface PreviewProps {
  fileUrl: string;
}

export default function PDFViewer({ fileUrl }: PreviewProps) {
  const [numPages, setNumPages] = useState<number>();
  const [width, setWidth] = useState(window.innerWidth * 0.9);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth * 0.9);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="w-full h-full mx-auto">
      <Document
        file={fileUrl}
        onLoadSuccess={onDocumentLoadSuccess}
        onLoadError={(error) => console.error("Error loading PDF:", error)}
      >
        {Array.from(new Array(numPages), (_, index) => (
          <Page
            key={index + 1}
            pageNumber={index + 1}
            scale={1}
            width={width}
          />
        ))}
      </Document>
    </div>
  );
}
