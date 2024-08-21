import Chart from "react-apexcharts";
function getRandomPastelColor() {
  const r = Math.floor(Math.random() * 127) + 128; // 128 to 255
  const g = Math.floor(Math.random() * 127) + 128; // 128 to 255
  const b = 255; // 255
  return `rgb(${r}, ${g}, ${b})`;
}
function AssetConfiguration(props) {
  const series = props.data.data.stocks.map((stock) => stock.percentage);
  const labels = props.data.data.stocks.map((stock) => stock.stockName);

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
  const colors = sortedSeries.map(() => getRandomPastelColor());

  const options = {
    dataLabels: {
      enabled: false,
    },
    labels: sortedLabels,
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
        const percentage = sortedData[seriesIndex].percentage.toFixed(1);
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
        series={sortedSeries}
        type="donut"
        height={350}
      />
    </div>
  );
}

export default AssetConfiguration;
