import Chart from 'react-apexcharts'

const ChartPie = ({ series }) => {
    const options = {
        chart: {
            type: 'donut',
        },
        labels: [
            'Organização contabilística',
            'Constituição e legalização de empresas',
            'Consultoria fiscal',
            'Gestão de recursos humanos'
        ],
        title: { text: 'Lucratividade dos Serviçoes' },
        noData: { text: 'Sem dados' },
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

    return (
        <Chart options={options} series={series} type="donut" height={347.69} width={'100%'} />
    )
}

export default ChartPie