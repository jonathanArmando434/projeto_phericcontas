import { Outlet } from 'react-router-dom'
import { useRef } from 'react'

import './Index.css'
import './Index.2.0.css'

import SideBar from '../../components/admin/SideBar'
import Footer from '../../components/admin/Footer'
import MainBar from '/src/components/admin/MainBar'
import Loading from '../../components/Loading'
import loginZustand from '../../zustand/login'

const Index = () => {
    const arrowUp = useRef(null)
    return (
        <div className="admin" ref={arrowUp}>
            <div className="admin-wrapper">
                <SideBar />
                <div className="admin-main">
                    <MainBar />

                    <Outlet />

                    <Footer arrowUp={arrowUp} />
                </div>
            </div>

        </div>
    )
}

export default Index


