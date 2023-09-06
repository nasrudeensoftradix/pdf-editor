import { useEffect, useRef } from "react";
import PSPDFKit from "pspdfkit";
export default function PdfViewerComponent(props) {
  const containerRef = useRef(null);
  let instance = null;

  useEffect(() => {
    const container = containerRef.current;
    // let PSPDFKit;

    (async function () {
      // PSPDFKit = await import("pspdfkit");
      await PSPDFKit.load({
        toolbarItems: [
          ...PSPDFKit.defaultToolbarItems,
          { type: "content-editor" },
        ],
        // Container where PSPDFKit should be mounted.
        container,
        // The document to open.
        document: props.document,
        // Use the public directory URL as a base URL. PSPDFKit will download its library assets from here.
        baseUrl: `${window.location.protocol}//${window.location.host}/${process.env.PUBLIC_URL}`,
        // Enable the editor option.
      }).then((pdfInstance) => {
        instance = pdfInstance;
      });
    })();

    return () => PSPDFKit && PSPDFKit.unload(container);
  }, [props.document]);

  return (
    <>
      <div ref={containerRef} style={{ width: "100%", height: "100vh" }} />;
    </>
  );
}
