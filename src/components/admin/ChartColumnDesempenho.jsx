import Chart from 'react-apexcharts'

const ChartColumn = ({ title, data }) => {
  const options = {
    chart: {
      type: 'bar',
      height: '100%'
    },
    colors: ['rgb(0, 227, 150)'],
    title: { text: title },
    noData: { text: 'Sem dados' },
    plotOptions: {
      bar: {
        colors: {
          ranges: [{
            from: 0,
            to: 49,
            color: 'rgb(255, 69, 96)'
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
      data: data
    },
  ]

  return (
    <Chart options={options} series={series} type="bar" height={'100%'} width={'100%'} />
  )
}

export default ChartColumn