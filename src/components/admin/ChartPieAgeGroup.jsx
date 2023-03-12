import Chart from 'react-apexcharts'

const ChartPie = () => {
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
        }]
    }

    const series = [44, 55, 41, 56, 78]

    return (
        <Chart options={options} series={series} type="donut" height={347.69} width={'100%'}/>
    )
}

export default ChartPie