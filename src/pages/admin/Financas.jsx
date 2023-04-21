import { MdOutlineFilterList, MdDoneOutline } from 'react-icons/md'
import { BiTrash } from 'react-icons/bi'
import { FiLoader } from 'react-icons/fi'
import { CgClipboard } from 'react-icons/cg'
import { useState } from 'react'

import PageTitle from '../../components/admin/PageTitle'

const Financas = () => {
    const [descricao, setDescricao] = useState('')
    const [valor, setValor] = useState('')
    const [tipo, setTipo] = useState('')

    const handleSubmit = async e => {
        e.preventDefault()
    }

    return (
        <main className="admin-dashboard admin-content">
            <div className="admin-container-fluid admin-p-0">
                <div className="admin-row">
                    <PageTitle title={'Controle de Finanças'} btnText={'Filtrar'} BtnIcon={MdOutlineFilterList} />

                    <div className="admin-row">
                        <div className="admin-col-4 admin-card">
                            <div className="admin-card-content admin-p-20">
                                <div className="admin-card-body admin-p-0">
                                    <div className="admin-row">
                                        <div className={`admin-col admin-p-0 admin-mt-0`}>
                                            <h5 className="admin-card-title">Entrada: KZ</h5>
                                        </div>

                                        <div className="admin-col-auto">

                                        </div>
                                    </div>
                                    <span className="admin-h3 admin-mt-1 admin-mb-3">1.000.000,00</span>
                                    <div className="admin-mb-0">
                                        <span className="admin-text-success"> <i
                                            className="admin-mdi admin-mdi-arrow-bottom-right"></i>
                                            +3.65% </span>
                                        <span className="admin-text-muted">Desde a última semana</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="admin-col-4 admin-card">
                            <div className="admin-card-content admin-p-20">
                                <div className="admin-card-body admin-p-0">
                                    <div className="admin-row">
                                        <div className={`admin-col admin-p-0 admin-mt-0`}>
                                            <h5 className="admin-card-title">Saída: KZ</h5>
                                        </div>

                                        <div className="admin-col-auto">

                                        </div>
                                    </div>
                                    <span className="admin-h3 admin-mt-1 admin-mb-3">600.000,00</span>
                                    <div className="admin-mb-0">
                                        <span className="admin-text-danger"> <i
                                            className="admin-mdi admin-mdi-arrow-bottom-right"></i>
                                            -3.65% </span>
                                        <span className="admin-text-muted">Desde a última semana</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="admin-col-4 admin-card">
                            <div className="admin-card-content admin-p-20">
                                <div className="admin-card-body admin-p-0">
                                    <div className="admin-row">
                                        <div className={`admin-col admin-p-0 admin-mt-0`}>
                                            <h5 className="admin-card-title">Total: KZ</h5>
                                        </div>

                                        <div className="admin-col-auto">

                                        </div>
                                    </div>
                                    <span className="admin-h3 admin-mt-1 admin-mb-3">400.000,00</span>
                                    <div className="admin-mb-0">
                                        <span className="admin-text-danger"> <i
                                            className="admin-mdi admin-mdi-arrow-bottom-right"></i>
                                            -3.65% </span>
                                        <span className="admin-text-muted">Desde a última semana</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="admin-col-12">
                            <div className="admin-col-12 admin-d-flex">
                                <div className="admin-card admin-flex-fill admin-bg-fff" style={{ padding: '2.2rem' }}>
                                    <form onSubmit={handleSubmit}>
                                        <div className="admin-d-flex admin-justify-content-between">
                                            <div style={{ width: '30%' }}>
                                                <label className='admin-form-label admin-d-block' htmlFor="startContract">
                                                    Descrição
                                                </label>
                                                <input
                                                    type="text"
                                                    className="admin-form-control admin-d-inline-block admin-mb-3 admin-m-mine"
                                                    id="startContract"
                                                    name="startContract"
                                                    placeholder='Descrição'
                                                    value={descricao}
                                                    onChange={e => setDescricao(e.target.value)}
                                                />
                                            </div>
                                            <div style={{ width: '30%' }}>
                                                <label className='admin-form-label admin-d-block' htmlFor="endContract">
                                                    Valor
                                                </label>
                                                <input
                                                    type="text"
                                                    className="admin-form-control admin-d-inline-block admin-mb-3 admin-m-mine"
                                                    id="endContract"
                                                    name="endContract"
                                                    placeholder='Valor'
                                                    value={valor}
                                                    onChange={e => setValor(e.target.value)}
                                                />
                                            </div>
                                            <div style={{ width: '19%' }}>
                                                <label className='admin-form-label admin-d-block' htmlFor="endContract">
                                                    Tipo
                                                </label>
                                                <select id="salario" className="admin-form-select admin-mb-3" value={tipo} onChange={e => setTipo(e.target.value)}>
                                                    <option value="Saída">Entrada</option>
                                                    <option value="Entrada">Saída</option>
                                                </select>
                                            </div>
                                            <div style={{ width: '19%', marginTop: '3.4%' }}>
                                                <button type="submit" className="admin-btn admin-main-btn admin-form-control">
                                                    Adicionar
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="admin-col-12 admin-d-flex">
                                <div className="admin-card admin-flex-fill admin-bg-fff">
                                    <table className="admin-table admin-table-hover admin-my-0">
                                        <thead>
                                            <tr>
                                                <th className="admin-d-none admin-d-xl-table-cell" style={{ paddingLeft: '1.2rem' }}>Descrição</th>
                                                <th className="admin-d-none admin-d-xl-table-cell" style={{ paddingLeft: 0 }}>Valor</th>
                                                <th className="admin-d-none admin-d-xl-table-cell" style={{ paddingLeft: 0 }}>
                                                    Tipo
                                                </th>
                                                <th className="admin-d-none admin-d-md-table-cell" style={{ paddingLeft: 0 }}>
                                                    Eliminar
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td style={{ paddingLeft: '1.2rem' }}>Salário</td>
                                                <td className="admin-d-none admin-d-xl-table-cell">300.00,00 kz</td>
                                                <td>
                                                    <span className="admin-badge admin-bg-danger">Saída</span>
                                                </td>
                                                <td className="admin-d-none admin-d-md-table-cell" >
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

                </div>
            </div>
        </main>
    )
}

export default Financas