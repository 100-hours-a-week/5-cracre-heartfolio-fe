import Lottie from "lottie-react";
import noInfoAnimation from "../../assets/animations/noInfo.json";
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
      setLoading(true);
      try {
        let response = await fetch(
          `${process.env.REACT_APP_API_URI}/portfolio/stock`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        console.log("First request response:", response);

        if (response.status === 401) {
          // Access token 만료 -> refresh token으로 새 access token 요청
          const refreshToken = localStorage.getItem("refresh_token");
          const refreshResponse = await fetch(
            `${process.env.REACT_APP_API_URI}/auth/refresh-token`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ refreshToken: refreshToken }),
            }
          );

          if (refreshResponse.status === 200) {
            const data = await refreshResponse.json();
            localStorage.setItem("access_token", data.accessToken); // 새 access token 저장

            // 새로운 access token으로 원래 요청 다시 시도
            response = await fetch(
              `${process.env.REACT_APP_API_URI}/portfolio/stock`,
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem(
                    "access_token"
                  )}`, // 새 access token 사용
                  "Content-Type": "application/json",
                },
              }
            );
            console.log(
              "Second request response with new access token:",
              response
            );
          } else {
            // refresh token도 만료되거나 오류가 있으면 로그인 페이지로 이동
            localStorage.removeItem("access_token");
            window.location.href = "/login";
            return;
          }
        }
        let result = null;
        result = await response.json();

        // 데이터가 빈 객체인지 확인하고, 데이터가 있는 경우와 없는 경우를 처리
        if (Object.keys(result).length === 0 || !result.stocks) {
          setData({});
        } else {
          setData(result);
        }

        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchData(); // 컴포넌트가 마운트될 때 데이터 가져오기
  }, [token]);

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
    return <p className="min-h-screen bg-white text-center">Loading...</p>;
  }

  if (error) {
    return (
      <p className="min-h-screen bg-white text-center">
        There was an error loading the data: {error.message}
      </p>
    );
  }

  if (!data || !data.stocks || data.stocks.length === 0) {
    return (
      <div className="flex flex-col items-center h-screen max-h-[500px]">
        <div className="w-80 h-80">
          <Lottie animationData={noInfoAnimation} loop={true} />
        </div>
        <div className="text-lg text-gray-600">거래 내역이 아직 없습니다.</div>
      </div>
    );
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
    <div className="flex justify-center">
      <div className="py-4 pb-11">
        <Chart
          options={options}
          series={chartData.series}
          type="donut"
          height={350}
          width={370}
        />
      </div>
    </div>
  );
}

export default AssetConfiguration;
