import * as React from "react";

export interface FrameProps {
  src: string;
  onLoad?: (document: Document) => void;
}

export const Frame: React.FC<FrameProps> = ({ src, onLoad }) => {
  const ref = React.useRef<HTMLIFrameElement>(null);
  React.useEffect(() => {
    if (ref.current) {
      const iframe = ref.current;
      ref.current.onload = () => {
        setTimeout(() => {
          iframe.contentDocument && onLoad && onLoad(iframe.contentDocument);
        }, 1000);
      };
    }
  }, [onLoad]);

  return (
    <div>
      <iframe ref={ref} id="iframe" width={1280} height={1000} src={src} />
    </div>
  );
};
