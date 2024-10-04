import Lottie from "lottie-react";
import noInfoAnimation from "../../assets/animations/noInfo.json";
import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import useFetch from "../../hooks/useFetch";
import dotLoadingAnimation from "../../assets/animations/dotLoading.json";

function getRandomPastelColor() {
  const r = Math.floor(Math.random() * 127) + 128; // 128 to 255
  const g = Math.floor(Math.random() * 127) + 128; // 128 to 255
  const b = 255; // 255
  return `rgb(${r}, ${g}, ${b})`;
}

function AssetConfiguration(props) {
  const [chartData, setChartData] = useState({
    series: [],
    labels: [],
    sortedData: [],
  });
  // URL 설정
  const url = props.id
    ? `${process.env.REACT_APP_API_URI}/portfolio/stock/${props.id}`
    : `${process.env.REACT_APP_API_URI}/portfolio/stock`;

  // 데이터 가져오기 위한 상태 관리
  const { data, error, loading } = useFetch(url);

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

  const colors = chartData.series.map(() => getRandomPastelColor());

  const options = {
    dataLabels: {
      enabled: false,
    },
    labels: chartData.labels,
    colors: colors,
    plotOptions: {
      pie: {
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
              formatter: function (value) {
                const numericValue = Number(value);
                return numericValue.toLocaleString();
              },
            },
          },
        },
      },
    },
    legend: {
      position: "bottom",
      offsetY: 10, // 라벨을 아래로 이동
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
    <>
      {loading ? (
        <Lottie animationData={dotLoadingAnimation} loop={true} />
      ) : !data || !data.stocks || data.stocks.length === 0 ? (
        <div className="flex flex-col items-center h-screen max-h-[500px]">
          <div className="w-80 h-80">
            <Lottie animationData={noInfoAnimation} loop={true} />
          </div>
          <div className="text-lg text-gray-600">보유한 자산이 없습니다.</div>
        </div>
      ) : error ? (
        <p className="min-h-screen bg-white text-center">
          Error: {error.message}
        </p>
      ) : (
        <div className="flex justify-center">
          <div className="pt-4">
            <Chart
              options={options}
              series={chartData.series}
              type="donut"
              height={350}
              width={370}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default AssetConfiguration;
