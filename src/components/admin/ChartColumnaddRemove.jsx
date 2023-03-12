import Chart from 'react-apexcharts'

const ChartColumn = () => {
  const options = {
    chart: {
      type: 'bar',
      height: '100%'
    },
    colors: ['#1cbb8c', '#dc3545'],
    title: { text: 'Admissão vs Demissão' },
    noData: { text: 'Sem dados' },
    plotOptions: {
      bar: {
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
          return "$ " + val + " thousands"
        }
      }
    }
  }

  const series = [
    {
      name: 'Admissão',
      data: [44, 55, 57, 56, 61, 58, 63, 60, 66, 24, 20, 50]
    },
    {
      name: 'Demissão',
      data: [35, 41, 36, 26, 45, 48, 52, 53, 41, 58, 63, 60]
    }
  ]

  return (
    <Chart options={options} series={series} type="bar" height={'100%'} width={'100%'} />
  )
}

export default ChartColumn