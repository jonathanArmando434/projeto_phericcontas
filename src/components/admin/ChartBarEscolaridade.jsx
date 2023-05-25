import Chart from 'react-apexcharts'

const ChartBar = ({ data }) => {
  const options = {
    chart: {
      type: 'bar',
      height: 350
    },
    noData: {text: 'Sem dados'},
    title: {text: 'Nível Académico'},
    plotOptions: {
      bar: {
        rowWidth: '15%',
        borderRadius: 4,
        horizontal: true,
      }
    },
    dataLabels: {
      enabled: false
    },
    xaxis: {
      categories: ['Primeiro ciclo do secundário', 'Ensino Médio', 'Superior Incompleto', 'Superior Completo'],
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

export default ChartBar