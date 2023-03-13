import { BiEdit } from 'react-icons/bi'
import { TbClipboardPlus } from 'react-icons/tb'
import { useState } from 'react'

import Index from "./Index"
import PageTitle from '../../components/admin/PageTitle'

const Tasks = () => {
    const [active, setActive] = useState('all')

    const tasks = [
        {
            id: 1,
            servico: 'Oranização contabilística',
            startDate: '13/03/2023',
            deadline: '13/04/2023',
            endDate: '...',
            status: 'Em progresso',
            responsavel: 'Milly dos Santos',
            cliente: 'Odonto Class',
        },
        {
            id: 2,
            servico: 'Consultoria Fiscal',
            startDate: '07/01/2023',
            deadline: '07/02/2023',
            endDate: '07/02/2023',
            status: 'Finalizado',
            responsavel: 'Jonathan-Armando Coxe Malungo',
            cliente: 'Sabor do Brazil',
        },
        {
            id: 3,
            servico: 'Gestão de recursos humanos',
            startDate: '07/01/2023',
            deadline: '07/02/2023',
            endDate: '07/02/2023',
            status: 'Cancelado',
            responsavel: 'Jonathan-Armando Coxe Malungo',
            cliente: 'Sabor do Brazil',
        }
    ]

    const finishTask = async () => {

    }

    const editTask = async () => {

    }

    const cancelTask = async () => {

    }

    return (
        <Index>
            <main className="admin-content">
                <div className="admin-container-fluid admin-p-0">
                    <div className="admin-row">
                        <PageTitle title={'Lista de tarefas'} btnText={'Adicionar Tarefa'} BtnIcon={TbClipboardPlus} link={true} path={"/admin/nova-tarefa"} />

                        <div className="admin-col-12 admin-d-flex admin-my-5 admin-menu-list">
                            <a onClick={() => setActive('all')} className={active === 'all' ? "admin-btn admin-btn-nav admin-mx-3 active" : "admin-btn admin-btn-nav admin-mx-3"} >Todos</a>
                            <a onClick={() => setActive('done')} className={active === 'done' ? "admin-btn admin-btn-nav admin-mx-3 active" : "admin-btn admin-btn-nav admin-mx-3"}>Finalisados</a>
                            <a onClick={() => setActive('in-pogress')} className={active === 'in-pogress' ? "admin-btn admin-btn-nav admin-mx-3 active" : "admin-btn admin-btn-nav admin-mx-3"}>Em Progresso</a>
                            <a onClick={() => setActive('canceled')} className={active === 'canceled' ? "admin-btn admin-btn-nav admin-mx-3 active" : "admin-btn admin-btn-nav admin-mx-3"}>Cancelados</a>
                        </div>
                        <div className="admin-col-12 admin-d-flex">
                            <div className="admin-card admin-flex-fill admin-bg-fff">
                                <table className="admin-table admin-table-hover admin-my-0">
                                    <thead>
                                        <tr>
                                            <th>Serviço</th>
                                            <th className="admin-d-none admin-d-xl-table-cell">Data de Início</th>
                                            <th className="admin-d-none admin-d-xl-table-cell">Data Limite</th>
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
                                        {
                                            tasks.length > 0 && (
                                                tasks.map(task => {
                                                    <tr key={task.id}>
                                                        <td>{task.servico}</td>
                                                        <td className="admin-d-none admin-d-xl-table-cell">{task.startDate}</td>
                                                        <td className="admin-d-none admin-d-xl-table-cell">{task.deadline}</td>
                                                        <td className="admin-d-none admin-d-xl-table-cell">{task.endDate}</td>
                                                        <td>
                                                            <span className="admin-badge admin-bg-success">{task.status}</span>
                                                        </td>
                                                        <td className="admin-d-none admin-d-md-table-cell">{task.responsavel}</td>
                                                        <td className="admin-d-none admin-d-md-table-cell">{task.cliente}</td>
                                                        <td className="admin-d-none admin-d-md-table-cell">
                                                            <a onClick={finishTask} className="admin-tab-done">
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
                                                            <a onClick={cancelTask} className="admin-tab-cancel">
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
                                                                    className="admin-feather admin-feather-x-square admin-align-middle admin-me-2"
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
                                                            <a onClick={editTask} className="admin-tab-edit">
                                                                <BiEdit />
                                                            </a>
                                                        </td>
                                                    </tr>
                                                })
                                            )
                                        }
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