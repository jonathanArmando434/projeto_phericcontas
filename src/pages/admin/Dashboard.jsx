import { MdOutlineFilterList, MdDoneOutline } from 'react-icons/md'
import { BiTrash } from 'react-icons/bi'
import { FiLoader } from 'react-icons/fi'
import { CgClipboard } from 'react-icons/cg'

import Index from "./Index"
import PageTitle from '../../components/admin/PageTitle'
import TaskIndicator from '../../components/admin/ TaskIndicator'

const Dashboard = () => {
    return (
        <Index>
            <main className="admin-dashboard admin-content">
                <div className="admin-container-fluid admin-p-0">
                    <div className="admin-row">
                        <PageTitle title={'Painel'} btnText={'Filtrar'} BtnIcon={MdOutlineFilterList} />

                        <div className="admin-row">
                            <TaskIndicator title={'Tarefas Finalidas'} value={14212} since={'Desde a última semana'} about={2} Icon={MdDoneOutline} />
                            <TaskIndicator title={'Tarefas Canceladas'} value={14212} since={'Desde a última semana'} about={3} Icon={BiTrash} />
                            <TaskIndicator title={'Tarefas Em progresso'} value={14212} since={'Desde a última semana'} about={1} Icon={FiLoader} />
                            <TaskIndicator title={'Total'} value={14212} since={'Desde a última semana'} Icon={CgClipboard} />
                            <div className="admin-col-12">
                                <div className="admin-row">
                                    <div className="admin-col-6 admin-card admin-flex-fill">
                                        <div className="admin-card-header">

                                            <h5 className="admin-card-title admin-mb-0">Controle de Serviços</h5>
                                        </div>
                                        <div className="admin-card-body admin-d-flex">
                                            <div className="admin-align-self-center admin-w-100">
                                                <div className="admin-py-3">
                                                    <div className="admin-chart admin-chart-xs">
                                                        <canvas id="chartjs-dashboard-pie"></canvas>
                                                    </div>
                                                </div>

                                                <table className="admin-table admin-mb-0">
                                                    <thead>
                                                        <tr>
                                                            <th>Serviço</th>
                                                            <th>Número de tarefas</th>
                                                            <th>Faturamento</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td>Contabilidade</td>
                                                            <td className="admin-d-flex">
                                                                4306
                                                                <span className="admin-text-success admin-ms-4"> <i
                                                                    className="admin-mdi admin-mdi-arrow-bottom-right"></i>
                                                                    +6.65% </span>
                                                            </td>
                                                            <td className="">
                                                                4.306,00 KZ
                                                                <span className="admin-text-success admin-ms-4"> <i
                                                                    className="admin-mdi admin-mdi-arrow-bottom-right"></i>
                                                                    +6.65% </span>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>Consultoria</td>
                                                            <td className="">
                                                                4306
                                                                <span className="admin-text-success admin-ms-4"> <i
                                                                    className="admin-mdi admin-mdi-arrow-bottom-right"></i>
                                                                    +6.65% </span>
                                                            </td>
                                                            <td className="">
                                                                4.306,00 KZ
                                                                <span className="admin-text-success admin-ms-4"> <i
                                                                    className="admin-mdi admin-mdi-arrow-bottom-right"></i>
                                                                    +6.65% </span>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>Auditoria</td>
                                                            <td className="">
                                                                4306
                                                                <span className="admin-text-success admin-ms-4"> <i
                                                                    className="admin-mdi admin-mdi-arrow-bottom-right"></i>
                                                                    +6.65% </span>
                                                            </td>
                                                            <td className="">
                                                                4.306,00 KZ
                                                                <span className="admin-text-success admin-ms-4"> <i
                                                                    className="admin-mdi admin-mdi-arrow-bottom-right"></i>
                                                                    +6.65% </span>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="admin-col-6 admin-card admin-flex-fill">
                                        <div className="admin-card-header">

                                            <h5 className="admin-card-title admin-mb-0">Informações Mensais das Tarefas</h5>
                                        </div>
                                        <div className="admin-card-body admin-d-flex admin-w-100">
                                            <div className="admin-align-self-center admin-chart admin-chart-lg">
                                                <canvas id="chartjs-dashboard-bar"></canvas>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </main>
        </Index>
    )
}

export default Dashboard