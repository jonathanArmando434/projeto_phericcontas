import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { MdOutlineFilterList } from 'react-icons/md'
import api from '../../axios/api'

import './Dashboard.css'

import PageTitle from '../../components/admin/PageTitle'
import DashboardMember from '../../components/admin/DashboardMember'
import DashboardClient from '../../components/admin/DashboardClient'

const Dashboard = () => {
    const [title, setTitle] = useState('Informações do colaborador')
    const [year, setYear] = useState(new Date().getUTCFullYear())
    const [data, setData] = useState({})

    const { id } = useParams()
    const { about } = useParams()

    const getDados = async () => {
        try {
            const res = await api.get(`/tarefa/annual-report-associate/${id}/${year}`)
            const dados = res.data
            setData(dados)
            console.log('Dados recebidos:', dados);
            console.log('Valor atualizado de data:', data);
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
        if (about !== 'membro') setTitle('Informações do cliente')
    }, [])

    return (
        <main className="admin-dashboard admin-content">
            <div className="admin-container-fluid admin-p-0">
                <div className="admin-row">
                    <PageTitle
                        title={title}
                        BtnIcon={MdOutlineFilterList}
                        handleSunmit={handleSunmit}
                        year={year}
                        setYear={setYear}
                    />

                    {(
                        about === 'membro' ?
                            <DashboardMember id={id} data={data} /> :
                            <DashboardClient id={id} />
                    )}
                </div>
            </div>
        </main>
    )
}

export default Dashboard