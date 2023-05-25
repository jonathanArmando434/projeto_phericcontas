import Chart from 'react-apexcharts'

const ChartColumnTurnover = ({ data }) => {
  const options = {
    chart: {
      type: 'bar',
      height: 350
    },
    noData: { text: 'Sem dados' },
    colors: ['rgb(0, 227, 150)'],
    title: {text: 'Turnover acumulado no ano'},
    plotOptions: {
      bar: {
        colors: {
          ranges: [{
            from: 0,
            to: 49,
            color: 'rgb(255, 69, 96)'
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
    data: data
  }]

  return (
    <Chart options={options} series={series} type="bar" height={'100%'} width={'100%'} />
  )
}

export default ChartColumnTurnover