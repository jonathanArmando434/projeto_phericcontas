import { useState } from 'react'

import { MdOutlineFilterList, MdDoneOutline } from 'react-icons/md'
import { BiTrash } from 'react-icons/bi'
import { FiLoader } from 'react-icons/fi'
import { CgClipboard } from 'react-icons/cg'
import './Dashboard.css'

import PageTitle from '../../components/admin/PageTitle'
import TaskIndicator from '../../components/admin/ TaskIndicator'
import ChartColumn from '../../components/admin/ChartColumn'
import ChartPie from '../../components/admin/ChartPie'
import DashboardMember from '../../components/admin/DashboardMember'
import Loading from '../../components/Loading'

const Dashboard = () => {
    const [value, setValue] = useState({ finish: { qtd: 14212, percent: -3.65 }, canceled: { qtd: 14212 }, inProgress: { qtd: 14212 }, total: { qtd: 14212 } })
    const [series, setSeries] = useState([44, 55, 41, 30])
    const [data, setData] = useState([44, 55, 57, 56, 61, 58, 63, 60, 66, 24, 20])
    return (
        <main className="admin-dashboard admin-content">
            <div className="admin-container-fluid admin-p-0">
                <div className="admin-row">
                    <PageTitle title={'Painel de análise'} />

                    <div className="admin-row">
                        <TaskIndicator title={'Tarefas Finalidas'} value={value.finish} since={'Desde a última semana'} about={2} Icon={MdDoneOutline} />
                        <TaskIndicator title={'Tarefas Canceladas'} value={value.canceled} since={'Desde a última semana'} about={3} Icon={BiTrash} />
                        <TaskIndicator title={'Tarefas Em progresso'} value={value.inProgress} since={'Desde a última semana'} about={1} Icon={FiLoader} />
                        <TaskIndicator title={'Total'} value={value.total} since={'Desde a última semana'} Icon={CgClipboard} />
                        <div className="admin-col-12">
                            <div className="admin-row">
                                <div className="admin-col-6 admin-card admin-flex-fill" style={{ padding: 'auto' }}>
                                    <div className="admin-card-content admin-chart">
                                        <ChartPie series={series} />
                                    </div>
                                </div>

                                <div className="admin-col-6 admin-card admin-flex-fill">
                                    <div className="admin-card-content admin-chart">
                                        <ChartColumn data={data} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Dashboard