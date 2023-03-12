import Chart from 'react-apexcharts'

const ChartBar = () => {
  const options = {
    chart: {
      type: 'bar',
      height: 350
    },
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
      categories: ['Ensino Fundamental', 'Ensino Médio', 'Superior Incompleto', 'Superior Completo'],
    }
  }

  const series = [{
    name: 'Nível Académico',
    data: [690, 1100, 1200, 1380]
  }]

  return (
    <Chart options={options} series={series} type="bar" height={'100%'} width={'100%'} />
  )
}

export default ChartBar