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
          "width": "350",
          "height": "200",
          "symbol": "${props.symbol}",
          "locale": "en",
          "dateRange":"1M",
          "colorTheme":"light",
          "isTransparent":false,
          "autosize":false,
          "largeChartUrl":"",
          "chartOnly":false
        }`;

      scriptRef.current = script;
      container.current.appendChild(script);
    };

    // setTimeout으로 DOM이 준비된 후 초기화
    const timer = setTimeout(initializeWidget, 100);

    return () => {
      clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 클리어
      if (container.current) {
        container.current.innerHTML = "";
      }
      if (scriptRef.current) {
        scriptRef.current.remove();
      }
    };
  }, [props.symbol]);

  return (
    <div className="tradingview-widget-container" ref={container}>
      <div className="tradingview-widget-container__widget"></div>
      <div className="tradingview-widget-copyright">
        <a
          href="https://www.tradingview.com/"
          rel="noopener nofollow"
          target="_blank"
        ></a>
      </div>
    </div>
  );
}

export default memo(TradingViewMini);
