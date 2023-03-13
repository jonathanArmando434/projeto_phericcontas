import { MdOutlineFilterList, MdDoneOutline } from 'react-icons/md'
import { BiTrash } from 'react-icons/bi'
import { FiLoader } from 'react-icons/fi'
import { CgClipboard } from 'react-icons/cg'
import './Dashboard.css'

import Index from "./Index"
import PageTitle from '../../components/admin/PageTitle'
import TaskIndicator from '../../components/admin/ TaskIndicator'
import ChartLine from '../../components/admin/ChartColumn'
import ChartPie from '../../components/admin/ChartPie'
import DashboardRH from '../../components/admin/DashboardRH'
import DashboardMember from '../../components/admin/DashboardMember'

const Dashboard = () => {
    return (
        <Index>
            <main className="admin-dashboard admin-content">
                <div className="admin-container-fluid admin-p-0">
                    <div className="admin-row">
                        <PageTitle title={'Informações de Recurso Humanos'} />
                        <DashboardRH />
                    </div>
                </div>
            </main>
        </Index>
    )
}

export default Dashboard