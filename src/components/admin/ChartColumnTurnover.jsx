import Chart from 'react-apexcharts'

const ChartColumnTurnover = () => {
  const options = {
    chart: {
      type: 'bar',
      height: 350
    },
    colors: ['#1cbb8c'],
    title: {text: 'Turnover acumulado no ano'},
    plotOptions: {
      bar: {
        colors: {
          ranges: [{
            from: -100,
            to: 0,
            color: '#dc3545'
          }]
        },
        columnWidth: '35%',
      }
    },
    dataLabels: {
      enabled: false,
    },
    yaxis: {
      labels: {
        formatter: function (y) {
          return y.toFixed(0) + "%";
        }
      }
    },
    xaxis: {
      type: 'categories',
      categories: [
        'Jan', 'Mar', 'Fev', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
      ],
      labels: {
        rotate: -90
      }
    }
  }


  const series = [{
    name: 'Turnover',
    data: [43.3, -18.6, 48.6, -41.1, 39.6, -37.6, 43.3, -18.6, 48.6, -41.1, 39.6, -37.6]
  }]

  return (
    <Chart options={options} series={series} type="bar" height={'100%'} width={'100%'} />
  )
}

export default ChartColumnTurnover