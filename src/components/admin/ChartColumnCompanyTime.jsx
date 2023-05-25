import Chart from 'react-apexcharts'

const ChartColumn = ({ data }) => {
  const options = {
    chart: {
      type: 'bar',
      height: '100%'
    },
    title: { text: 'Tempo de empresa' },
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
      categories: ['Até 1 ano', 'De 2 à 5 anos', 'De 6 à 10 anos', 'De 11 à 20 anos', 'Mais de 20 anos'],
    },
    fill: {
      opacity: 1
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val
        }
      }
    }
  }

  const series = [{
    name: 'Colaboradores',
    data: data
  }]

  return (
    <Chart options={options} series={series} type="bar" height={'100%'} width={'100%'} />
  )
}

export default ChartColumn