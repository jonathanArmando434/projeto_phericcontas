import { useEffect, useState, useRef } from 'react'
import { MdOutlineFilterList, MdDoneOutline } from 'react-icons/md'
import api from '../../axios/api'

import './Dashboard.css'

import PageTitle from '../../components/admin/PageTitle'
import TaskIndicator from '../../components/admin/ TaskIndicator'

import ChartPieAgeGroup from '../../components/admin/ChartPieAgeGroup'
import ChartColumnTurnover from '../../components/admin/ChartColumnTurnover'
import ChartColumnAddRemove from '../../components/admin/ChartColumnaddRemove'
import ChartColumnCompanyTime from '../../components/admin/ChartColumnCompanyTime'
import ChartBarEscolaridade from '../../components/admin/ChartBarEscolaridade'

const Dashboard = () => {
    const [year, setYear] = useState(new Date().getUTCFullYear())
    const [total, setTotal] = useState({})
    const [male, setMale] = useState({})
    const [female, setFemale] = useState({})
    const [ageRange, setAgeRange] = useState([])
    const [academicLevel, setAcademicLevel] = useState([])
    const [companyTime, setCompanyTime] = useState([])
    const [monthlyTurnovel, setMonthlyTurnovel] = useState([])
    const [monthlyAdmissionRate, setMonthlyAdmissionRate] = useState([])
    const [monthlyDemissionRate, setMonthlyDemissionRate] = useState([])
    const [yearlyTurnovel, setYearlyTurnovel] = useState(0)

    const yearRef = useRef(null)

    const getDados = async () => {
        try {
            const res = await api.get(`/colaborador/annual-report/${year}`)
            const dados = res.data
            setTotal(dados.total)
            setMale(dados.male)
            setFemale(dados.female)
            setAgeRange(dados.ageRange)
            setAcademicLevel(dados.academicLevel)
            setCompanyTime(dados.companyTime)
            setMonthlyTurnovel(dados.monthlyTurnovel)
            setMonthlyAdmissionRate(dados.monthlyAdmissionRate)
            setMonthlyDemissionRate(dados.monthlyDemissionRate)
            setYearlyTurnovel(dados.yearlyTurnovel)
        } catch (error) {
            console.log(error)
            alert('Houve um erro, tente novamente!')
        }
    }

    const handleSunmit = async (e) => {
        e.preventDefault()
        getDados()
    }

    useEffect(() => {
        getDados()
        yearRef.current.focus()
        yearRef.current.select()
    }, [])

    return (
        <main className="admin-dashboard admin-content">
            <div className="admin-container-fluid admin-p-0">
                <div className="admin-row">
                    <PageTitle title={'Informações de Recursos Humanos'} />

                    <div className="admin-row">
                        <TaskIndicator
                            title={'Colaboradores ativos'}
                            about={total}
                            aboutPercent={'dos colaboradores'}
                            col={4}
                        />

                        <TaskIndicator
                            title={'Masculino'}
                            about={male}
                            aboutPercent={'dos colaboradores'}
                            col={4}
                        />

                        <TaskIndicator
                            title={'Feminino'}
                            about={female}
                            aboutPercent={'dos colaboradores'}
                            col={4}
                        />

                        <div className="admin-col-12">
                            <div className="admin-row">
                                <div className="admin-col-5 admin-card admin-flex-fill" style={{ padding: 'auto' }}>
                                    <div className="admin-card-content admin-chart">
                                        <ChartPieAgeGroup data={ageRange} />
                                    </div>
                                </div>

                                <div className="admin-col-7 admin-card admin-flex-fill">
                                    <div className="admin-card-content admin-chart">
                                        <div className="admin-row" style={{ height: '50%' }}>
                                            <div className="admin-col-2 admin-d-flex" style={{ flexDirection: 'column' }}>
                                                <form onSubmit={handleSunmit} style={{ width: '100%' }} >
                                                    <div style={{ width: '100%' }}>
                                                        <input
                                                            type="text"
                                                            className="admin-form-control admin-d-inline-block admin-mb-3 admin-m-mine"
                                                            id="startContract"
                                                            name="startContract"
                                                            placeholder='Ano'
                                                            minLength={4}
                                                            maxLength={4}
                                                            value={year}
                                                            onChange={(e) => setYear(e.target.value)}
                                                            ref={yearRef}
                                                        />
                                                    </div>
                                                    <button type='submit' className="admin-dropdown-item admin-btn admin-main-btn admin-form-control admin-text-center">
                                                        <MdOutlineFilterList style={{ margin: 0 }} /> Filtrar
                                                    </button>
                                                </form>
                                                <div style={{ width: '100%' }}>
                                                    <label
                                                        className='admin-form-label admin-d-block'
                                                        style={{ marginTop: '1.6rem', marginBottom: 0 }}
                                                    >
                                                        Total
                                                    </label>
                                                    <div
                                                        className={
                                                            ((yearlyTurnovel > 50)
                                                                ? "admin-status-success"
                                                                : (yearlyTurnovel < 50)
                                                                    ? "admin-status-danger"
                                                                    : 'admin-status-info'
                                                            )}

                                                        style={{
                                                            paddingTop: '.48rem',
                                                            paddingBottom: '.48rem',
                                                            paddingLeft: '1.36rem',
                                                            paddingRight: '1.36rem',
                                                            borderRadius: '.5rem'
                                                        }}
                                                    >
                                                        {yearlyTurnovel}%
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="admin-col-10">
                                                <ChartColumnTurnover data={monthlyTurnovel} />
                                            </div>
                                        </div>
                                        <div className="admin-row" style={{ height: '48%', marginTop: '2%' }}>
                                            <ChartColumnAddRemove dataAdmission={monthlyAdmissionRate} dataDemission={monthlyDemissionRate} />
                                        </div>
                                    </div>
                                </div>

                                <div className="admin-col-12">
                                    <div className="admin-row">
                                        <div className="admin-col-7 admin-card admin-flex-fill" style={{ padding: 'auto' }}>
                                            <div style={{ height: '25rem', padding: '1rem' }} className="admin-card-content">
                                                <ChartBarEscolaridade data={academicLevel} />
                                            </div>
                                        </div>

                                        <div className="admin-col-5 admin-card admin-flex-fill">
                                            <div style={{ height: '25rem', padding: '1rem' }} className="admin-card-content">
                                                <ChartColumnCompanyTime data={companyTime} />
                                            </div>
                                        </div>
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