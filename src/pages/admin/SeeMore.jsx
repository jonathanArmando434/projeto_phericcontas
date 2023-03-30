import { useParams } from 'react-router-dom'

import './Dashboard.css'

import Index from "./Index"
import PageTitle from '../../components/admin/PageTitle'
import DashboardMember from '../../components/admin/DashboardMember'

const Dashboard = () => {
    const { id } = useParams()

    return (
        <Index>
            <main className="admin-dashboard admin-content">
                <div className="admin-container-fluid admin-p-0">
                    <div className="admin-row">
                        <PageTitle title={'Informações do Membro'} />
                        <DashboardMember id={id} />
                    </div>
                </div>
            </main>
        </Index>
    )
}

export default Dashboard