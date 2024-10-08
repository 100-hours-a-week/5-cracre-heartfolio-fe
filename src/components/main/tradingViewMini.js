import React, { useEffect, useRef, memo } from "react";

function TradingViewMini(props) {
  const container = useRef();
  const scriptRef = useRef(null);

  useEffect(() => {
    if (!props.symbol || props.symbol.trim() === "") {
      console.warn("Invalid symbol:", props.symbol);
      return;
    }

    const initializeWidget = () => {
      if (!container.current) return;

      container.current.innerHTML = "";

      const script = document.createElement("script");
      script.src =
        "https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js";
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = `
        {
          "symbol": "${props.symbol}",
          "locale": "en",
          "dateRange":"1D",
          "colorTheme":"light",
          "isTransparent":false,
          "autosize":false
        }`;

      scriptRef.current = script;
      container.current.appendChild(script);
    };

    const timer = setTimeout(initializeWidget, 100);

    return () => {
      clearTimeout(timer);
      if (container.current) {
        container.current.innerHTML = "";
      }
      if (scriptRef.current) {
        scriptRef.current.remove();
      }
    };
  }, [props.symbol]);

  return (
    <div className="tradingview-widget-container w-[175px] h-full w-full pointer-events-none" ref={container}>
      <div className="tradingview-widget-container__widget"></div>
    </div>
  );
}

export default memo(TradingViewMini);
