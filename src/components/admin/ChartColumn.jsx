import Chart from 'react-apexcharts'

const ChartColumn = ({data}) => {
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
          categories: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
        },
        fill: {
          opacity: 1
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return val + " Kwanza"
            }
          }
        }
      }

    const series = [{
        name: 'valor',
        data: data
    }]

    return (
        <Chart options={options} series={series} type="bar" height={'100%'} width={'100%'} />
    )
}

export default ChartColumn