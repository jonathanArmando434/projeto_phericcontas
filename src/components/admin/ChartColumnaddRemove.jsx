import Chart from 'react-apexcharts'

const ChartColumn = ({ dataAdmission, dataDemission }) => {
  const options = {
    chart: {
      type: 'bar',
      height: '100%'
    },
    colors: ['rgb(0, 227, 150)', 'rgb(255, 69, 96)'],
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
          return val + " %"
        }
      }
    }
  }

  const series = [
    {
      name: 'Admissão',
      data: dataAdmission
    },
    {
      name: 'Demissão',
      data: dataDemission
    }
  ]

  return (
    <Chart options={options} series={series} type="bar" height={'100%'} width={'100%'} />
  )
}

export default ChartColumn