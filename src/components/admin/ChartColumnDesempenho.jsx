import Chart from 'react-apexcharts'

const ChartColumn = ({title}) => {
  const options = {
    chart: {
      type: 'bar',
      height: '100%'
    },
    colors: ['#1cbb8c'],
    title: { text: title },
    noData: { text: 'Sem dados' },
    plotOptions: {
      bar: {
        colors: {
          ranges: [{
            from: 0,
            to: 49,
            color: '#dc3545'
          }]
        },
        horizontal: false,
        columnWidth: '35%',
        endingShape: 'rounded'
      },
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent']
    },
    xaxis: {
      categories: ['Jan', 'Mar', 'Fev', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    },
    fill: {
      opacity: 1
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val + " %"
        }
      }
    }
  }

  const series = [
    {
      name: 'Desempenho',
      data: [44, 55, 57, 56, 61, 58, 63, 60, 66, 24, 20, 50]
    },
  ]

  return (
    <Chart options={options} series={series} type="bar" height={'100%'} width={'100%'} />
  )
}

export default ChartColumn