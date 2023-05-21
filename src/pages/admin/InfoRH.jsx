import { MdOutlineFilterList, MdDoneOutline } from 'react-icons/md'
import { BiTrash } from 'react-icons/bi'
import { FiLoader } from 'react-icons/fi'
import { CgClipboard } from 'react-icons/cg'
import './Dashboard.css'

import PageTitle from '../../components/admin/PageTitle'
import TaskIndicator from '../../components/admin/ TaskIndicator'
import ChartLine from '../../components/admin/ChartColumn'
import ChartPie from '../../components/admin/ChartPie'
import DashboardRH from '../../components/admin/DashboardRH'

const Dashboard = () => {
    return (
        <main className="admin-dashboard admin-content">
            <div className="admin-container-fluid admin-p-0">
                <div className="admin-row">
                    <PageTitle title={'Informações de Recursos Humanos'} />
                    <DashboardRH />
                </div>
            </div>
        </main>
    )
}

export default Dashboard