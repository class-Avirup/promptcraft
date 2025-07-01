import { useEffect } from "react";

const KofiButton = () => {
  useEffect(() => {
    // Inject the Ko-fi script
    const script = document.createElement("script");
    script.src = "https://storage.ko-fi.com/cdn/scripts/overlay-widget.js";
    script.async = true;
    script.onload = () => {
      if (window.kofiWidgetOverlay) {
        window.kofiWidgetOverlay.draw("zentrigger", {
          type: "floating-chat",
          "floating-chat.donateButton.text": "Support me",
          "floating-chat.donateButton.background-color": "#fcbf47",
          "floating-chat.donateButton.text-color": "#323842",
        });
      }
    };
    document.body.appendChild(script);

    // Optional cleanup if needed
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null; // No visible JSX, it's an overlay
};

export default KofiButton;
