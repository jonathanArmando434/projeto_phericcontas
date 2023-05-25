import Chart from 'react-apexcharts'

const ChartPie = ({ data }) => {
    const options = {
        chart: {
            type: 'donut',
        },
        labels: ['Até 25', '26 - 35', '36 - 45', '46 - 55', '56 - mais'],
        title: {text: 'Faixa Etária'},
        noData: {text: 'Sem dados'},
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: 200
                },
                legend: {
                    position: 'bottom'
                }
            }
        }],
        tooltip: {
            y: {
              formatter: function (val) {
                return val + ' colaboradores'
              }
            }
          }
    }

    const series = data

    return (
        <Chart options={options} series={series} type="donut" height={347.69} width={'100%'}/>
    )
}

export default ChartPie