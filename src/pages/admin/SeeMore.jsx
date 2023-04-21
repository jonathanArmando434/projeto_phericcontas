import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

import './Dashboard.css'

import PageTitle from '../../components/admin/PageTitle'
import DashboardMember from '../../components/admin/DashboardMember'
import DashboardClient from '../../components/admin/DashboardClient'

const Dashboard = () => {
    const [title, setTitle] = useState('Informações do colaborador')

    const { id } = useParams()
    const { about } = useParams()

    useEffect(() => {
        if (about !== 'membro') setTitle('Informações do cliente')
    }, [])

    return (
            <main className="admin-dashboard admin-content">
                <div className="admin-container-fluid admin-p-0">
                    <div className="admin-row">
                        <PageTitle title={title} />
                        {(
                            about === 'membro' ?
                            <DashboardMember id={id} /> :
                            <DashboardClient id={id} />
                        )}
                    </div>
                </div>
            </main>
    )
}

export default Dashboard