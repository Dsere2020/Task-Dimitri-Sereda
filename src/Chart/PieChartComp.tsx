import Chart from "react-apexcharts";
interface Address {
  street: string;
  fetchData: FetchData;
  city: string;
}
interface FetchData {
  address: Address;
}
interface Props {
  fetchData: FetchData[];

  city: string;
}

interface ChartData {
  name: string;
  value: number;
}
interface CityFilter {
  address: Address;
}

const PieChartComp = ({ fetchData }: Props) => {
  const cityFilter = fetchData.map((i: CityFilter) => i.address.city);
  const noRepeatCity = new Set(cityFilter);

  const chartData: ChartData[] = [];

  noRepeatCity.forEach((city: string) => {
    chartData.push({
      name: city,
      value: 0,
    });
  });

  fetchData.forEach((item) => {
    chartData.forEach((chartDataItem, index): void => {
      if (item.address.city === chartDataItem.name) {
        chartData.splice(index, 1, {
          name: chartDataItem.name,
          value: chartDataItem.value + 1,
        });
      }
    });
  });

  const state = {
    chartOptions: {
      labels: chartData.map((item) => {
        return item.name;
      }),
    },
    series: chartData.map((item) => {
      return item.value;
    }),
  };

  return (
    <div>
      <Chart
        data={chartData}
        type="donut"
        width={400}
        height={400}
        options={state.chartOptions}
        series={state.series}
      ></Chart>
    </div>
  );
};

export default PieChartComp;
