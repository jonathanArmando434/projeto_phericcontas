import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { BiEdit } from 'react-icons/bi'
import { MdOutlinePerson } from 'react-icons/md'
import { AiOutlineCloseSquare, AiOutlineCheckSquare } from 'react-icons/ai'
import api from '../../axios/api'
import loginZustand from '../../zustand/login'

import logo from '/src/assets/images/logo_phericcontas.jpeg'

import CardIndicatorThree from './CardIndicatorThree'
import ChartColumnDesempenho from './ChartColumnDesempenho'

const DashboardClient = ({ id }) => {
    const [client, setClient] = useState({})
    const [contractClient, setContractClient] = useState({})
    const [contractClientBackup, setContractClientBackup] = useState({})
    const [hasPhoto, setHasPhoto] = useState(logo)
    const [status, setStatus] = useState('')
    const [diasRestantes, setDiasRestantes] = useState(0)
    const [message, setMessage] = useState('')
    const [threethBtn, setThreethBtn] = useState('Cancelar contrato')
    const [threethBtnIcon, setThreethBtnIcon] = useState(<AiOutlineCloseSquare />)
    const [value, setValue] = useState({
        inTime: {
            qtd: 14212,
            percent: -3.65
        },
        outTime: {
            qtd: 14212,
            percent: -3.65
        },
        total: {
            qtd: 14212,
            percent: 100
        }
    })

    const { changeLoading } = loginZustand(state => state)

    const handleCancel = async () => {
        try {
            const contract = {
                data_inicio: contractClientBackup.data_inicio.toString().split('T')[0],
                data_fim: contractClientBackup.data_fim.toString().split('T')[0],
                status: false
            }
            const res = await api.patch(`/contrato/${id}`, contract)
            if (res.data.result) {
                setMessage(`Contrato cancelado`)
                const api_url_contract = import.meta.env.VITE_API_URL_CONTRACT
                setContractClient(api_url_contract + '/' + id)
                setStatus('Cancelado')
                setThreethBtn('Renovar contrato')
                setThreethBtnIcon(<AiOutlineCheckSquare />)
            }
        } catch (error) {
            alert('Houve um erro, tente novamente!')
        }
    }

    const handleRecancel = async () => {
        try {
            const contract = {
                data_inicio: contractClientBackup.data_inicio.toString().split('T')[0],
                data_fim: contractClientBackup.data_fim.toString().split('T')[0],
                status: true
            }
            const res = await api.patch(`/contrato/${id}`, contract)
            if (res.data.result) {
                setMessage(`Contrato renovado`)
                const api_url_contract = import.meta.env.VITE_API_URL_CONTRACT
                await getContractClient(api_url_contract + '/' + id)
                setThreethBtn('Cancelar contrato')
                setThreethBtnIcon(<AiOutlineCloseSquare />)
            }
        } catch (error) {
            alert('Houve um erro, tente novamente!')
        }
    }

    const getClient = async (api_url) => {
        const res = await api.get(api_url)
        const dados = res.data

        // if (dados.foto_url) setHasPhoto(dados.foto_url)

        setClient(dados)
    }

    const getContractClient = async (api_url) => {
        const res = await api.get(api_url)
        const dado = res.data

        setContractClientBackup(dado)

        const data_inicio = new Date(dado.data_inicio)
        const data_fim = new Date(dado.data_fim)

        if (!dado.status) {
            setMessage(`Contrato cancelado`)
            setStatus('Cancelado')
            setThreethBtn('Renovar Contrato')
            setThreethBtnIcon(<AiOutlineCheckSquare />)
        }
        else setStatus((data_fim > new Date() ? 'Ativo' : 'Inativo'))

        const diferenca = Math.floor(((data_fim).getTime() - (new Date()).getTime()) / (1000 * 60 * 60 * 24))
        if (diferenca > 0) setDiasRestantes(diferenca)

        setContractClient({
            data_inicio: data_inicio.toLocaleDateString(),
            data_fim: data_fim.toLocaleDateString(),
            status: dado.status
        })
    }

    useEffect(() => {
        changeLoading()
        getClient('/cliente/' + id)
        getContractClient('/contrato/' + id)
        changeLoading()
    }, [])

    return (

        <div className="admin-row">
            <CardIndicatorThree title={'Tarefas feitas no prazo'} value={value.inTime} />
            <CardIndicatorThree title={'Tarefas feitas com atraso'} value={value.outTime} />
            <CardIndicatorThree title={'Total'} value={value.total} />

            <div className="admin-col-12">
                <div className="admin-row">
                    <div className="admin-col-4 admin-card admin-d-flex admin-flex-fill" style={{
                        paddingTop: '1.5rem',
                        marginRight: '1.2rem',
                        boxShadow: '0 0 0.875rem 0 rgba(33, 37, 41, .05)',
                        wordWrap: 'break-word',
                        backgroundClip: 'border-box',
                        backgroundColor: '#fff',
                        borderRadius: '.5rem',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '.1rem solid rgba(0, 0, 0, .1)',
                    }}>
                        <div style={{height: '10%'}} className="card-body text-center">
                            {
                                message && <div className={contractClient.status && status ? 'admin-msg-success' : 'admin-msg-danger'}>
                                    {message}
                                </div>
                            }
                            <img src={hasPhoto} alt="Logo do cliente" className="admin-mb-2 admin-card-img-client" width="248" height="248" />
                            <h5 className="admin-card-title admin-mt-4">{client.nome || 'Nome Completo'}</h5>
                            <div className="admin-text-muted admin-mb-4">{client.area_negocio || 'Área de Negócio'}</div>

                            <div style={{ marginTop: '.5rem' }}>
                                <Link to={`/admin/cliente/editar/${id}`} className="admin-btn admin-me-2 admin-main-btn"><BiEdit /> Editar</Link>
                                <a className="admin-btn admin-main-btn admin-me-2" onClick={(threethBtn === 'Cancelar contrato' ? handleCancel : handleRecancel)}>{threethBtnIcon} {threethBtn}</a>
                                <Link to="" className="admin-btn admin-main-btn" href="#"><MdOutlinePerson /> Ver Dados</Link>
                            </div>
                        </div>
                    </div>

                    <div style={{ paddingLeft: 0 }} className="admin-col-7 admin-card admin-flex-fill">
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
                                        <td style={{ paddingLeft: '1.2rem' }} className="admin-d-none admin-d-xl-table-cell">{contractClient.data_inicio || 'dd/mm/aaaa'}</td>
                                        <td className="admin-d-none admin-d-xl-table-cell">{contractClient.data_fim || 'dd/mm/aaaa'}</td>
                                        <td>
                                            <span className={
                                                (status === 'Ativo'
                                                    ? "admin-badge admin-status-success"
                                                    : "admin-badge admin-status-danger"
                                                )}>
                                                {status || 'status'}
                                            </span>
                                        </td>
                                        <td className="admin-d-none admin-d-md-table-cell">{diasRestantes}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div style={{ height: '48%' }} className="admin-card-content admin-chart">
                            <ChartColumnDesempenho title={'Relação'} />
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default DashboardClient