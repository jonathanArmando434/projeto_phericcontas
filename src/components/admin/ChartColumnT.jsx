import Chart from 'react-apexcharts'

const ChartColumn = () => {
    const options = {
        chart: {
          type: 'bar',
          height: '100%'
        },
        title: {text: 'Ganhos mensais'},
        noData: {text: 'Sem dados'},
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
          categories: ['Janeiro', 'Fevereiro', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Noveembro', 'Dezembro'],
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

    const series = [{
        name: 'Net Profit',
        data: [44, 55, 57, 56, 61, 58, 63, 60, 66, 24, 20]
    }]

    return (
        <Chart options={options} series={series} type="bar" height={'100%'} width={'100%'} />
    )
}

export default ChartColumn