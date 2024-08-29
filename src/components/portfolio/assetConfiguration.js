import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";

function getRandomPastelColor() {
  const r = Math.floor(Math.random() * 127) + 128; // 128 to 255
  const g = Math.floor(Math.random() * 127) + 128; // 128 to 255
  const b = 255; // 255
  return `rgb(${r}, ${g}, ${b})`;
}

function AssetConfiguration() {
  const token = localStorage.getItem("access_token");
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const [chartData, setChartData] = useState({
    series: [],
    labels: [],
    sortedData: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://heartfolio.site/api/portfolio/stock",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const result = await response.json();
        
        // 데이터가 빈 객체인지 확인하고, 데이터가 있는 경우와 없는 경우를 처리
        if (Object.keys(result).length === 0 || !result.stocks) {
          setData({});
        } else {
          setData(result);
        }

        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData(); // 컴포넌트가 마운트될 때 데이터 가져오기
  }, [token]); // 빈 배열을 전달하여 이 효과가 한 번만 실행되도록 설정

  console.log("assetConfiguration : ", data?.stocks);

  useEffect(() => {
    if (data && data.stocks && data.stocks.length > 0) {
      const series = data.stocks.map((stock) => stock.evalPrice);
      const labels = data.stocks.map((stock) => stock.stockName);
  
      // 전체 합계 계산
      const total = series.reduce((acc, value) => acc + value, 0);
  
      // percentage를 기준으로 series와 labels를 정렬
      const sortedData = series
        .map((value, index) => ({
          label: labels[index],
          value,
          percentage: (value / total) * 100,
        }))
        .sort((a, b) => b.percentage - a.percentage); // percentage 기준으로 내림차순 정렬
  
      // 정렬된 데이터를 기반으로 새로운 series와 labels 생성
      const sortedSeries = sortedData.map((data) => data.value);
      const sortedLabels = sortedData.map((data) => data.label);
  
      setChartData({
        series: sortedSeries,
        labels: sortedLabels,
        sortedData: sortedData,
      });
    }
  }, [data]);
  

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>There was an error loading the data: {error.message}</p>;
  }

  if (!data || !data.stocks || data.stocks.length === 0) {
    return <p>아직 거래한 내역이 없습니다.</p>;
  }

  const colors = chartData.series.map(() => getRandomPastelColor());

  const options = {
    dataLabels: {
      enabled: false,
    },
    labels: chartData.labels,
    colors: colors,
    plotOptions: {
      pie: {
        offsetX: -5, // 도넛 그래프를 왼쪽으로 이동
        donut: {
          labels: {
            show: true,
            name: {
              show: true,
              fontSize: "15px",
            },
            value: {
              show: true,
              fontSize: "15px",
              offsetY: -3,
            },
          },
        },
      },
    },
    legend: {
      position: "right",
      offsetY: -20, // 라벨을 위로 이동
      formatter: function (seriesName, opts) {
        const seriesIndex = opts.seriesIndex;
        const percentage =
          chartData.sortedData[seriesIndex].percentage.toFixed(1);
        return seriesName + ": " + percentage + "%";
      },
    },
    tooltip: {
      enabled: false,
    },
  };

  return (
    <div className="mx-auto max-w-[350px] py-4">
      <Chart
        options={options}
        series={chartData.series}
        type="donut"
        height={350}
      />
    </div>
  );
}

export default AssetConfiguration;
