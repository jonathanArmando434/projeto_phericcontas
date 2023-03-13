import { BiEdit } from 'react-icons/bi'
import { MdOutlinePerson } from 'react-icons/md'
import { AiOutlineCloseSquare } from 'react-icons/ai'

import userNoPhoto from '/src/assets/admin/img/avatars/user-no-photo.png'

import ChartPieAgeGroup from './ChartPieAgeGroup'
import ChartColumnTurnover from './ChartColumnTurnover'
import ChartColumnDesempenho from './ChartColumnDesempenho'
import ChartColumnCompanyTime from './ChartColumnCompanyTime'
import ChartBarEscolaridade from './ChartBarEscolaridade'
import { Link } from 'react-router-dom'

const DashboardRH = () => {
    return (

        <div className="admin-row">
            <div className="admin-col-4 admin-card">
                <div className="admin-card-content admin-p-20">
                    <div className="admin-card-body admin-p-0">
                        <div className="admin-row">
                            <div className={`admin-col admin-p-0 admin-mt-0`}>
                                <h5 className="admin-card-title">Total de tarefas</h5>
                            </div>

                            <div className="admin-col-auto">

                            </div>
                        </div>
                        <span className="admin-h3 admin-mt-1 admin-mb-3">537</span>
                        <div className="admin-mb-0">
                            <span className="admin-text-success" style={{ display: 'hidden' }}> <i
                                className="admin-mdi admin-mdi-arrow-bottom-right"></i>
                                100% </span>
                            <span className="admin-text-muted">das tarefas</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="admin-col-4 admin-card">
                <div className="admin-card-content admin-p-20">
                    <div className="admin-card-body admin-p-0">
                        <div className="admin-row">
                            <div className={`admin-col admin-p-0 admin-mt-0`}>
                                <h5 className="admin-card-title">Tarefas feitas no prazo</h5>
                            </div>

                            <div className="admin-col-auto">

                            </div>
                        </div>
                        <span className="admin-h3 admin-mt-1 admin-mb-3">456</span>
                        <div className="admin-mb-0">
                            <span className="admin-text-danger"> <i
                                className="admin-mdi admin-mdi-arrow-bottom-right"></i>
                                45% </span>
                            <span className="admin-text-muted">das tarefas</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="admin-col-4 admin-card">
                <div className="admin-card-content admin-p-20">
                    <div className="admin-card-body admin-p-0">
                        <div className="admin-row">
                            <div className={`admin-col admin-p-0 admin-mt-0`}>
                                <h5 className="admin-card-title">Tarefas feitas com atraso</h5>
                            </div>

                            <div className="admin-col-auto">

                            </div>
                        </div>
                        <span className="admin-h3 admin-mt-1 admin-mb-3">436</span>
                        <div className="admin-mb-0">
                            <span className="admin-text-danger"> <i
                                className="admin-mdi admin-mdi-arrow-bottom-right"></i>
                                55% </span>
                            <span className="admin-text-muted">das tarefas</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="admin-col-12">
                <div className="admin-row">
                    <div className="admin-col-4 admin-card admin-d-flex admin-flex-fill" style={{
                        alignItems: 'center',
                        paddingTop: '3rem',
                        marginRight: '1.2rem',
                        boxShadow: '0 0 0.875rem 0 rgba(33, 37, 41, .05)',
                        wordWrap: 'break-word',
                        backgroundClip: 'border-box',
                        backgroundColor: '#fff',
                        borderRadius: '.5rem',
                        display: 'flex',
                        flexDirection: 'column',
                        border: '.1rem solid rgba(0, 0, 0, .1)',
                    }}>
                        <div className="card-body text-center">
                            <img src={userNoPhoto} alt="Christina Mason" className="admin-rounded-circle admin-mb-2 admin-no-photo" width="248" height="248" />
                            <h5 className="admin-card-title admin-mt-4">Milicrisney Catuca dos Santos</h5>
                            <div className="admin-text-muted admin-mb-4">Sócio Majoritário</div>

                            <div>
                                <a className="admin-btn admin-me-2 admin-main-btn" href="#"><BiEdit /> Editar</a>
                                <Link to="/admin/perfil" className="admin-btn admin-me-2 admin-main-btn" href="#"><MdOutlinePerson /> Ver Perfil</Link>
                                <a className="admin-btn admin-main-btn" href="#"><AiOutlineCloseSquare /> Demitir</a>
                            </div>
                        </div>
                    </div>

                    <div style={{paddingLeft: 0}} className="admin-col-7 admin-card admin-flex-fill">
                        <div className="admin-card admin-flex-fill admin-bg-fff">
                            <h5 style={{
                                color: '#939ba2',
                                fontSize: '1.48rem',
                                fontWeight: '600',
                                padding: '1.4rem',
                                borderBottom: '1px solid #ced4da'
                            }}
                                className='className="admin-text-muted'>Contrato</h5>
                            <table className="admin-table admin-table-hover admin-my-0">
                                <thead>
                                    <tr>
                                        <th style={{ paddingLeft: '1.2rem' }} className="admin-d-none admin-d-xl-table-cell">Início</th>
                                        <th style={{ paddingLeft: 0 }} className="admin-d-none admin-d-xl-table-cell">
                                            Fim
                                        </th>
                                        <th style={{ paddingLeft: 0 }} className="admin-d-none admin-d-xl-table-cell">Estado</th>
                                        <th style={{ paddingLeft: 0 }} className="admin-d-none admin-d-md-table-cell">
                                            Dias Restante
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td style={{ paddingLeft: '1.2rem' }} className="admin-d-none admin-d-xl-table-cell">01/01/2021</td>
                                        <td className="admin-d-none admin-d-xl-table-cell">31/06/2021</td>
                                        <td>
                                            <span className="admin-badge admin-bg-success">Activo</span>
                                        </td>
                                        <td className="admin-d-none admin-d-md-table-cell">27</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div style={{ height: '48%' }} className="admin-card-content admin-chart">
                            <ChartColumnDesempenho />
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default DashboardRH