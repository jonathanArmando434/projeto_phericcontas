import { Link } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { MdOutlineFilterList, MdOutlinePersonSearch, MdOutlineCameraAlt } from 'react-icons/md'
import { BiEdit } from 'react-icons/bi'
import { AiOutlineCloseSquare, AiOutlineCheckSquare } from 'react-icons/ai'
import api from '../../axios/api'
import loginZustand from '../../zustand/login'

import './Dashboard.css'

import userNoPhoto from '/src/assets/admin/img/avatars/user-no-photo.png'

import PageTitle from '../../components/admin/PageTitle'
import TaskIndicator from '../../components/admin/ TaskIndicator'
import ChartColumnDesempenho from '../../components/admin/ChartColumnDesempenho'
import MinLoading from '../../components/admin/MinLoading'
import AdminModalUpdatePhoto from '/src/components/admin/AdminModalUpdatePhoto'

const Dashboard = () => {
    const apiUrl = import.meta.env.VITE_API_URL

    const [member, setMember] = useState({})
    const [contractMember, setContractMember] = useState({})
    const [contractMemberBackup, setContractMemberBackup] = useState({})
    const [hasPhoto, setHasPhoto] = useState(userNoPhoto)
    const [status, setStatus] = useState('')
    const [diasRestantes, setDiasRestantes] = useState(0)
    const [message, setMessage] = useState('')
    const [threethBtn, setThreethBtn] = useState('Demitir')
    const [threethBtnIcon, setThreethBtnIcon] = useState(<AiOutlineCloseSquare />)
    const [finishedOnTime, setFinishedOnTime] = useState({})
    const [finishedWithDelay, setFinishedWithDelay] = useState({})
    const [total, setTotal] = useState({})
    const [monthlyPerformance, setMonthlyPerformance] = useState([])
    const [year, setYear] = useState(new Date().getUTCFullYear())
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(true)

    const { id } = useParams()

    const inputFileRef = useRef(null)

    const getDadosAboutReport = async () => {
        try {
            const res = await api.get(`/tarefa/annual-report-associate/${id}/${year}`)
            const dados = res.data
            setFinishedOnTime(dados.finishedOnTime)
            setFinishedWithDelay(dados.finishedWithDelay)
            setTotal(dados.total)
            setMonthlyPerformance(dados.monthlyPerformance)
        } catch (error) {
            console.log(error)
            alert('Houve um erro, tente novamente!')
        }
    }

    const handleFilter = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            getDadosAboutReport()
        } finally {
            setLoading(false)
        }
    }

    const handleDismiss = async () => {
        try {
            setLoading(true)
            const contract = {
                data_inicio: contractMemberBackup.data_inicio.toString().split('T')[0],
                data_fim: contractMemberBackup.data_fim.toString().split('T')[0],
                status: false
            }
            const res = await api.patch(`/contrato/${id}`, contract)
            if (res.data.result) {
                setMessage(`${member.nome} está demitido (a)`)
                const api_url_contract = import.meta.env.VITE_API_URL_CONTRACT
                await getContractMember(api_url_contract + '/' + id)
                setStatus('Cancelado')
                setThreethBtn('Readmitir')
                setThreethBtnIcon(<AiOutlineCheckSquare />)
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const handleAdmitir = async () => {
        try {
            setLoading(true)
            const contract = {
                data_inicio: contractMemberBackup.data_inicio.toString().split('T')[0],
                data_fim: contractMemberBackup.data_fim.toString().split('T')[0],
                status: true
            }
            const res = await api.patch(`/contrato/${id}`, contract)
            if (res.data.result) {
                setMessage(`${member.nome} está readmitido (a)`)
                const api_url_contract = import.meta.env.VITE_API_URL_CONTRACT
                await getContractMember(api_url_contract + '/' + id)
                setThreethBtn('Demitir')
                setThreethBtnIcon(<AiOutlineCloseSquare />)
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const getMember = async () => {
        const res = await api.get('/colaborador/' + id)
        const dados = res.data

        setMember(dados)
    }

    const getContractMember = async (api_url) => {
        const res = await api.get(api_url)
        const dado = res.data

        setContractMemberBackup(dado)

        const data_inicio = new Date(dado.data_inicio)
        const data_fim = new Date(dado.data_fim)

        if (!dado.status) {
            setMessage(`Demitido (a)`)
            setStatus('Cancelado')
            setThreethBtn('Readmitir')
            setThreethBtnIcon(<AiOutlineCheckSquare />)
        }
        else setStatus((data_fim > new Date() ? 'Ativo' : 'Inativo'))

        const diferenca = Math.floor(((data_fim).getTime() - (new Date()).getTime()) / (1000 * 60 * 60 * 24))
        if (diferenca > 0) setDiasRestantes(diferenca)

        setContractMember({
            data_inicio: data_inicio.toLocaleDateString(),
            data_fim: data_fim.toLocaleDateString(),
            status: dado.status
        })
    }

    useEffect(() => {
        try {
            const api_url_member = import.meta.env.VITE_API_URL_MEMBERS
            const api_url_contract = import.meta.env.VITE_API_URL_CONTRACT
            getMember(api_url_member + '/' + id)
            getContractMember(api_url_contract + '/' + id)
            getDadosAboutReport()
        } finally {
            setLoading(false)
        }
    }, [])

    return (
        <main className="admin-dashboard admin-content">
            <div className="admin-container-fluid admin-p-0">
                <div className="admin-row">
                    <PageTitle
                        title={'Informações do colaborador'}
                        BtnIcon={MdOutlineFilterList}
                        handleSunmit={handleFilter}
                        year={year}
                        setYear={setYear}
                    />

                    {loading ? <MinLoading /> : (
                        <>
                            <div className="admin-row admin-mt-4">
                                <TaskIndicator
                                    title={'Total de tarefas'}
                                    about={total}
                                    col={4}
                                />

                                <TaskIndicator
                                    title={'Tarefas feitas no prazo'}
                                    about={finishedOnTime}
                                    col={4}
                                />

                                <TaskIndicator
                                    title={'Tarefas feitas com atrazo'}
                                    about={finishedWithDelay}
                                    col={4}
                                />

                                <div className="admin-col-12">
                                    <div className="admin-row">
                                        <div className="admin-col-4 admin-card admin-d-flex admin-flex-fill" style={{
                                            alignItems: 'center',
                                            paddingTop: '1.5rem',
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
                                                {
                                                    message && <div className={contractMember.status && status ? 'admin-msg-success' : 'admin-msg-danger'}>
                                                        {message}
                                                    </div>
                                                }
                                                <div className="admin-image-container">
                                                    <img
                                                        ref={inputFileRef}
                                                        src={member.foto_url ? `${apiUrl}/${member.foto_url}` : userNoPhoto}
                                                        alt={member.nome}
                                                        className="admin-rounded-circle admin-mb-2 admin-no-photo"
                                                        width="248"
                                                        height="248"
                                                    />
                                                    <a onClick={() => setOpen(!open)} className="admin-update-photo-btn"><MdOutlineCameraAlt /></a>
                                                </div>
                                                <h5 className="admin-card-title admin-mt-4">{member.nome || 'Nome Completo'}</h5>
                                                <div className="admin-text-muted admin-mb-4">{member.cargo || 'Cargo'}</div>

                                                <div>
                                                    <Link to={`/admin/membro/editar/${id}`} className="admin-btn admin-me-2 admin-main-btn"><BiEdit /> Editar</Link>
                                                    <Link to={`/admin/perfil/${id}`} className="admin-btn admin-me-2 admin-main-btn" href="#"><MdOutlinePersonSearch /> Ver Perfil</Link>
                                                    <a className="admin-btn admin-main-btn" onClick={(threethBtn === 'Demitir' ? handleDismiss : handleAdmitir)}>{threethBtnIcon} {threethBtn}</a>
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
                                                            <td style={{ paddingLeft: '1.2rem' }} className="admin-d-none admin-d-xl-table-cell">{contractMember.data_inicio || 'dd/mm/aaaa'}</td>
                                                            <td className="admin-d-none admin-d-xl-table-cell">{contractMember.data_fim || 'dd/mm/aaaa'}</td>
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
                                                <ChartColumnDesempenho title={'Desempenho anual'} data={monthlyPerformance} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div >

                            <AdminModalUpdatePhoto
                                open={open}
                                setOpen={setOpen}
                                id={id}
                                getAssociateUpdated={getMember}
                            />
                        </>
                    )}
                </div>
            </div>
        </main>
    )
}

export default Dashboard