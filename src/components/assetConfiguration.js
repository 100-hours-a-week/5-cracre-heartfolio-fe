import Chart from "react-apexcharts";

function AssetConfiguration() {
  const series = [44, 55, 41, 17, 15, 50, 43, 17, 15, 59, 41, 17, 15];
  const labels = [
    "종목1",
    "종목2",
    "종목3",
    "종목4",
    "종목5",
    "종목6",
    "종목7",
    "종목8",
    "종목9",
    "종목10",
    "종목11",
    "종목12",
    "종목13",
  ];

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

  const options = {
    dataLabels: {
      enabled: false,
    },
    labels: sortedLabels,
    colors: [
      "#fd8c8c",
      "#feb98b",
      "#fef28b",
      "#d7fe8b",
      "#8bf8fe",
      "#feb98b",
      "#fef28b",
      "#d7fe8b",
      "#8bf8fe",
      "#feb98b",
      "#fef28b",
      "#d7fe8b",
      "#8bf8fe",
    ],
    plotOptions: {
      pie: {
        offsetX: -5, // 도넛 그래프를 왼쪽으로 이동
        donut: {
          labels: {
            show: true,
          },
        },
      },
    },
    legend: {
      position: "right",
      offsetY: -20, // 라벨을 위로 이동
      formatter: function (seriesName, opts) {
        const seriesIndex = opts.seriesIndex;
        const percentage = sortedData[seriesIndex].percentage.toFixed(1);
        return seriesName + ": " + percentage + "%";
      },
    },
  };

  return (
    <div className="mx-auto max-w-[350px]">
      <Chart options={options} series={sortedSeries} type="donut" height={350} />
    </div>
  );
}

export default AssetConfiguration;
