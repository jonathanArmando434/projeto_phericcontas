import { MdOutlineFilterList, MdDoneOutline } from 'react-icons/md'
import { BiTrash } from 'react-icons/bi'
import { FiLoader } from 'react-icons/fi'
import { CgClipboard } from 'react-icons/cg'
import './Dashboard.css'

import Index from "./Index"
import PageTitle from '../../components/admin/PageTitle'
import TaskIndicator from '../../components/admin/ TaskIndicator'
import ChartLine from '../../components/admin/ChartColumn'
import ChartPie from '../../components/admin/ChartPie'
import DashboardRH from '../../components/admin/DashboardRH'

const Dashboard = () => {
    return (
        <Index>
            <main className="admin-dashboard admin-content">
                <div className="admin-container-fluid admin-p-0">
                    <div className="admin-row">
                        <PageTitle title={'Painel de análise'} btnText={'Filtrar'} BtnIcon={MdOutlineFilterList} />

                        <div className="admin-row  admin-d-none">
                            <TaskIndicator title={'Tarefas Finalidas'} value={14212} since={'Desde a última semana'} about={2} Icon={MdDoneOutline} />
                            <TaskIndicator title={'Tarefas Canceladas'} value={14212} since={'Desde a última semana'} about={3} Icon={BiTrash} />
                            <TaskIndicator title={'Tarefas Em progresso'} value={14212} since={'Desde a última semana'} about={1} Icon={FiLoader} />
                            <TaskIndicator title={'Total'} value={14212} since={'Desde a última semana'} Icon={CgClipboard} />
                            <div className="admin-col-12">
                                <div className="admin-row">
                                    <div className="admin-col-6 admin-card admin-flex-fill" style={{padding: 'auto'}}>
                                        <div className="admin-card-content admin-chart">
                                            <ChartPie />
                                        </div>
                                    </div>

                                    <div className="admin-col-6 admin-card admin-flex-fill">
                                        <div className="admin-card-content admin-chart">
                                            <ChartLine />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <DashboardRH />

                    </div>
                </div>                
            </main>
        </Index>
    )
}

export default Dashboard