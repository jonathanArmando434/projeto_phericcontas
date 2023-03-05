import { Link } from 'react-router-dom'
import { TbClipboardPlus } from 'react-icons/tb'

import Index from "./Index"
import PageTitle from '../../components/admin/PageTitle'
import BtnFilter from '../../components/admin/BtnFilter'

const Tasks = () => {
    return (
        <Index>
            <main className="admin-content">
                <div className="admin-container-fluid admin-p-0">
                    <div className="admin-row">
                        <PageTitle title={'Lista de tarefas'} btnText={'Adicionar Tarefa'} BtnIcon={TbClipboardPlus} link={true} path={"/admin/nova-tarefa"} />

                        <div className="admin-col-12 admin-d-flex admin-my-5 admin-menu-list">
                            <a href='#' className="active admin-btn admin-btn-nav admin-mx-3">Todos</a>
                            <a href='#' className="admin-btn admin-btn-nav admin-mx-3">Solicitados</a>
                            <a href='#' className="admin-btn admin-btn-nav admin-mx-3">Finalisados</a>
                            <a href='#' className="admin-btn admin-btn-nav admin-mx-3">Em Progresso</a>
                            <a href='#' className="admin-btn admin-btn-nav admin-mx-3">Cancelados</a>
                        </div>
                        {/* <BtnFilter items={['Todos', 'Solicitados', 'Finalisados', 'Em progresso', 'Cancelados']} /> */}
                        <div className="admin-col-12 admin-d-flex">
                            <div className="admin-card admin-flex-fill">
                                <table className="admin-table admin-table-hover admin-my-0">
                                    <thead>
                                        <tr>
                                            <th>Serviço</th>
                                            <th className="admin-d-none admin-d-xl-table-cell">Data de Início</th>
                                            <th className="admin-d-none admin-d-xl-table-cell">
                                                Data de Finalização
                                            </th>
                                            <th>Estado</th>
                                            <th className="admin-d-none admin-d-md-table-cell">
                                                Funcionário Responsável
                                            </th>
                                            <th className="admin-d-none admin-d-md-table-cell">Cliente</th>
                                            <th className="admin-d-none admin-d-md-table-cell">Ações</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Project Apollo</td>
                                            <td className="admin-d-none admin-d-xl-table-cell">01/01/2021</td>
                                            <td className="admin-d-none admin-d-xl-table-cell">31/06/2021</td>
                                            <td>
                                                <span className="admin-badge admin-bg-success">Finalisado</span>
                                            </td>
                                            <td className="admin-d-none admin-d-md-table-cell">Vanessa Tucker</td>
                                            <td className="admin-d-none admin-d-md-table-cell">Vanessa Tucker</td>
                                            <td className="admin-d-none admin-d-md-table-cell">
                                                <a href="#" className="admin-tab-done">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width={24}
                                                        height={24}
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth={2}
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        className="admin-feather admin-feather-check-square admin-align-middle admin-me-2"
                                                    >
                                                        <polyline points="9 11 12 14 22 4" />
                                                        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                                                    </svg>
                                                </a>
                                                <a href="#" className="admin-tab-cancel">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width={24}
                                                        height={24}
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth={2}
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        className="admin-feather admin-feather-x-square admin-align-middle"
                                                    >
                                                        <rect
                                                            x={3}
                                                            y={3}
                                                            width={18}
                                                            height={18}
                                                            rx={2}
                                                            ry={2}
                                                        />
                                                        <line x1={9} y1={9} x2={15} y2={15} />
                                                        <line x1={15} y1={9} x2={9} y2={15} />
                                                    </svg>
                                                </a>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </Index>
    )
}

export default Tasks