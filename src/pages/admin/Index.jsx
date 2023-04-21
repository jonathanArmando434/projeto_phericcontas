import { Outlet } from 'react-router-dom'

import './Index.css'
import './Index.2.0.css'

import SideBar from '../../components/admin/SideBar'
import Footer from '../../components/admin/Footer'
import MainBar from '/src/components/admin/MainBar'

const Index = () => {
    return (
        <div className="admin">
            <div className="admin-wrapper">
                <SideBar />
                <div className="admin-main">
                    <MainBar />

                    <Outlet />

                    <Footer />
                </div>
            </div>

        </div>
    )
}

export default Index


