import { Link } from "react-router-dom"
import { AiOutlineDashboard } from 'react-icons/ai'
import { CgClipboard } from 'react-icons/cg'
import { MdOutlineGroup, MdOutlineSupervisedUserCircle } from 'react-icons/md'
import { FaRegHandshake } from 'react-icons/fa'
import { HiOutlineDocumentReport } from 'react-icons/hi'
import {GiMoneyStack} from 'react-icons/gi'

import './SideBar.css'

const SideBar = () => {
    return (
        <>
            <div className="admin-sidebar-none"></div>
            <nav id="sidebar" className="admin-sidebar admin-js-sidebar">
                <div className="admin-sidebar-content admin-js-simplebar">
                    <Link to="/admin" className="admin-sidebar-brand">
                            <span className="admin-align-middle">PHERICCONTAS</span>
                    </Link>
                    <ul className="admin-sidebar-nav">
                        <li className="admin-sidebar-item" >
                            <Link to="/admin" className="admin-sidebar-link">
                                    <AiOutlineDashboard />
                                    <span className="admin-align-middle">Painel</span>
                            </Link>
                        </li>
                        <li className="admin-sidebar-item">
                            <Link to="/admin/tarefas" className="admin-sidebar-link">
                                    <CgClipboard />
                                    <span className="admin-align-middle">Tarefas</span>
                            </Link>
                        </li>
                        <li className="admin-sidebar-item">
                            <Link to="/admin/membros" className="admin-sidebar-link">
                                    <MdOutlineGroup />
                                    <span className="admin-align-middle">Membros</span>
                            </Link>
                        </li>
                        <li className="admin-sidebar-item">
                            <Link to="/admin/clientes" className="admin-sidebar-link">
                                    <FaRegHandshake />
                                    <span className="admin-align-middle">Clientes</span>
                            </Link>
                        </li>
                        <li className="admin-sidebar-item">
                            <Link to="/admin/relatorios" className="admin-sidebar-link">
                                    <HiOutlineDocumentReport />
                                    <span className="admin-align-middle">Relatórios</span>
                            </Link>
                        </li>
                        <li className="admin-sidebar-item">
                            <Link to="/admin/clientes" className="admin-sidebar-link">
                                    <MdOutlineSupervisedUserCircle />
                                    <span className="admin-align-middle">Controle de RH</span>
                            </Link>
                        </li>
                        <li className="admin-sidebar-item">
                            <Link to="/admin/relatorios" className="admin-sidebar-link">
                                    <GiMoneyStack />
                                    <span className="admin-align-middle">Controle de Finanças</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    )
}

export default SideBar