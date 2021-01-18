import Chart from 'react-apexcharts';

function HighChart({ data }) {
  const parsedData = JSON.parse(data);
  const options = {
    chart: {
      foreColor: '#400601',
    },
    xaxis: {
      categories: Object.keys(parsedData.data),
    },
    colors: ['#F27405'],
    stroke: {
      curve: 'smooth',
    },
    title: {
      text: parsedData.title,
      align: 'left',
    },
    grid: {
      borderColor: '#D97904',
      strokeDashArray: 7,
      row: {
        colors: ['#D97904', 'transparent'],
        opacity: 0.3,
      },
    },
  };
  const series = [
    {
      name: parsedData.seriesName,
      data: Object.values(parsedData.data),
    },
  ];

  return (
    <div id='chart'>
      <Chart
        options={options}
        series={series}
        type={parsedData.type}
        height={350}
      />
    </div>
  );
}

export default HighChart;
