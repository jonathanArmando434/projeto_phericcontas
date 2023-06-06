import { useEffect, useState } from 'react'
import api from '../../axios/api'
import loginZustand from '../../zustand/login'

import { MdOutlineFilterList } from 'react-icons/md'
import './Dashboard.css'

import PageTitle from '../../components/admin/PageTitle'
import TaskIndicator from '../../components/admin/ TaskIndicator'
import ChartColumn from '../../components/admin/ChartColumn'
import ChartPie from '../../components/admin/ChartPie'
import MinLoading from '../../components/admin/MinLoading'

const Dashboard = () => {
    const [year, setYear] = useState(new Date().getUTCFullYear())
    const [finished, setFinished] = useState({})
    const [canceled, setCanceled] = useState({})
    const [inProgress, setInProgress] = useState({})
    const [total, setTotal] = useState({})
    const [qntServices, setQntServices] = useState([])
    const [monthlyEarnings, setMonthlyEarnings] = useState([])
    const [stopLoading, setStopLoading] = useState(false)

    const { loading, changeLoading } = loginZustand(state => state)

    const getDados = async () => {
        try {
            const res = await api.get(`/tarefa/AnnualReport/${year}`)
            const dados = res.data
            setFinished(dados.finished)
            setCanceled(dados.canceled)
            setInProgress(dados.inProgress)
            setTotal(dados.total)
            setQntServices(dados.qntServices)
            setMonthlyEarnings(dados.monthlyEarnings)
        } catch (error) {
            console.log(error)
            alert('Houve um erro, tente novamente!')
        } 
    }

    const handleSunmit = async (e) => {
        e.preventDefault()
        try {
            changeLoading()
            getDados()
        } finally {
            changeLoading()
        }
    }

    useEffect(() => {
        try {
            changeLoading()
            getDados()
        } finally {
            changeLoading()
        }
    }, [])

    return (
        <main className="admin-dashboard admin-content">
            <div className="admin-container-fluid admin-p-0">
                <div className="admin-row">
                    <PageTitle
                        title={'Painel de análise'}
                        BtnIcon={MdOutlineFilterList}
                        handleSunmit={handleSunmit}
                        year={year}
                        setYear={setYear}
                    />

                    {loading ? <MinLoading /> : (
                        <div className="admin-row admin-mt-4">
                            <TaskIndicator
                                title={'Tarefas finalizadas'}
                                about={finished}
                                col={3}
                            />

                            <TaskIndicator
                                title={'Tarefas canceladas'}
                                about={canceled}
                                col={3}
                            />

                            <TaskIndicator
                                title={'Tarefas em progresso'}
                                about={inProgress}
                                col={3}
                            />

                            <TaskIndicator
                                title={'Total'}
                                about={total}
                                col={3}
                            />

                            <div className="admin-col-12">
                                <div className="admin-row">
                                    <div className="admin-col-6 admin-card admin-flex-fill" style={{ padding: 'auto' }}>
                                        <div className="admin-card-content admin-chart">
                                            <ChartPie series={qntServices} />
                                        </div>
                                    </div>

                                    <div className="admin-col-6 admin-card admin-flex-fill">
                                        <div className="admin-card-content admin-chart">
                                            <ChartColumn data={monthlyEarnings} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </main>
    )
}

export default Dashboard