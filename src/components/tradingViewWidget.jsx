// TradingViewWidget.jsx
import React, { useEffect, useRef, memo } from "react";

function TradingViewWidget(props) {
  const container = useRef();
  console.log("props",props.symbol)

  useEffect(() => {
    if (!props.symbol || props.symbol.trim() === "") {
      console.warn("Invalid symbol:", props.symbol);
      return;
    }
    if (container.current) {
      container.current.innerHTML = "";
    }
    
    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = `
        {
          "width": "370",
          "height": "300",
          "symbol": "${props.symbol}",
          "interval": "60",
          "timezone": "Etc/UTC",
          "theme": "light",
          "style": "1",
          "locale": "en",
          "allow_symbol_change": false,
          "save_image": false,
          "calendar": false,
          "support_host": "https://www.tradingview.com"
        }`;
    container.current.appendChild(script);
  }, [props.symbol]);

  return (
    <div className="tradingview-widget-container" ref={container}>
      <div className="tradingview-widget-container__widget"></div>
      <div className="tradingview-widget-copyright">
        <a
          href="https://www.tradingview.com/"
          rel="noopener nofollow"
          target="_blank"
        >
        </a>
      </div>
    </div>
  );
}

export default memo(TradingViewWidget);
