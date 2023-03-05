import {BsFilterLeft, BsBell} from 'react-icons/bs'
import {BiSearch} from 'react-icons/bi'

import avatar from '../../assets/admin/img/avatars/user-no-photo.png'

import './MainBar.css'

const MainBar = () => {
    return (
        <nav className="admin-navbar admin-navbar-expand admin-navbar-light admin-navbar-bg admin-d-flex">
            <div>
                <a href="#" className="admin-sidebar-toggle admin-js-sidebar-toggle">
                    <BsFilterLeft />
                </a>
            </div>
            <div className="admin-search">
                <form action="">
                    <input
                        type="search"
                        id="search"
                        name="search"
                        className="admin-form-control admin-d-inline-block"
                        placeholder="Pesquisar funcionário"
                    />
                    <button
                        type="submit"
                        id="btn-search"
                        className="admin-btn admin-btn-input admin-button-select"
                    >
                        <BiSearch />
                    </button>
                </form>
            </div>
            <div className="admin-navbar-collapse admin-collapse">
                <ul className="admin-navbar-nav admin-navbar-align admin-mb-0">
                    <li className="admin-nav-item admin-dropdown">
                        <a
                            className="admin-nav-icon admin-dropdown-toggle"
                            href="#"
                            id="alertsDropdown"
                            data-bs-toggle="dropdown"
                        >
                            <div className="admin-position-relative admin-notification">
                                <BsBell />
                                <span className="admin-indicator">4</span>
                            </div>
                        </a>
                        <div
                            className="admin-dropdown-menu admin-dropdown-menu-lg admin-dropdown-menu-end admin-py-0"
                            aria-labelledby="alertsDropdown"
                        >
                            <div className="admin-dropdown-menu-header">4 Novas Notificações</div>
                            <div className="admin-list-group">
                                <a href="#" className="admin-list-group-item">
                                    <div className="admin-row admin-g-0 admin-align-items-center">
                                        <div className="admin-col-2">
                                            <i className="admin-text-danger" data-feather="alert-circle" />
                                        </div>
                                        <div className="admin-col-10">
                                            <div className="admin-text-dark">Update completed</div>
                                            <div className="admin-text-muted admin-small admin-mt-1">
                                                Restart server 12 to complete the update.
                                            </div>
                                            <div className="admin-text-muted admin-small admin-mt-1">30m ago</div>
                                        </div>
                                    </div>
                                </a>
                                <a href="#" className="admin-list-group-item">
                                    <div className="admin-row admin-g-0 admin-align-items-center">
                                        <div className="admin-col-2">
                                            <i className="admin-text-warning" data-feather="bell" />
                                        </div>
                                        <div className="admin-col-10">
                                            <div className="admin-text-dark">Lorem ipsum</div>
                                            <div className="admin-text-muted admin-small admin-mt-1">
                                                Aliquam ex eros, imperdiet vulputate hendrerit et.
                                            </div>
                                            <div className="admin-text-muted admin-small admin-mt-1">2h ago</div>
                                        </div>
                                    </div>
                                </a>
                                <a href="#" className="admin-list-group-item">
                                    <div className="admin-row admin-g-0 admin-align-items-center">
                                        <div className="admin-col-2">
                                            <i className="admin-text-primary" data-feather="home" />
                                        </div>
                                        <div className="admin-col-10">
                                            <div className="admin-text-dark">Login from 192.186.1.8</div>
                                            <div className="admin-text-muted admin-small admin-mt-1">5h ago</div>
                                        </div>
                                    </div>
                                </a>
                                <a href="#" className="admin-list-group-item">
                                    <div className="admin-row admin-g-0 admin-align-items-center">
                                        <div className="admin-col-2">
                                            <i className="admin-text-success" data-feather="user-plus" />
                                        </div>
                                        <div className="admin-col-10">
                                            <div className="admin-text-dark">New connection</div>
                                            <div className="admin-text-muted admin-small admin-mt-1">
                                                Christina accepted your request.
                                            </div>
                                            <div className="admin-text-muted admin-small admin-mt-1">14h ago</div>
                                        </div>
                                    </div>
                                </a>
                            </div>
                            <div className="admin-dropdown-menu-footer">
                                <a href="#" className="admin-text-muted">
                                    Mais Notificações
                                </a>
                            </div>
                        </div>
                    </li>
                    <li className="admin-nav-item admin-dropdown">
                        <a
                            className="admin-nav-icon admin-dropdown-toggle admin-d-inline-block admin-d-sm-none"
                            href="#"
                            data-bs-toggle="dropdown"
                        >
                            <i className="admin-align-middle" data-feather="settings" />
                        </a>
                        <a
                            className="admin-nav-link admin-dropdown-toggle admin-d-none admin-d-sm-inline-block"
                            href="#"
                            data-bs-toggle="dropdown"
                        >
                            <img
                                src={avatar}
                                className="admin-avatar admin-img-fluid admin-rounded admin-me-1"
                                alt=""
                            />{" "}
                            <span className="admin-text-dark">Milicrisney dos Santos</span>
                        </a>
                        <div className="admin-dropdown-menu admin-dropdown-menu-end">
                            <a className="admin-dropdown-item" href="pages-profile.html">
                                <i className="admin-align-middle admin-me-1" data-feather="user" /> Perfil
                            </a>
                            <a className="admin-dropdown-item" href="#">
                                <i className="admin-align-middle admin-me-1" data-feather="pie-chart" />{" "}
                                Analytics
                            </a>
                            <div className="admin-dropdown-divider" />
                            <a className="admin-dropdown-item" href="index.html">
                                <i className="admin-align-middle admin-me-1" data-feather="settings" />{" "}
                                Settings &amp; Privacy
                            </a>
                            <a className="admin-dropdown-item" href="#">
                                <i className="admin-align-middle admin-me-1" data-feather="help-circle" />{" "}
                                Centro de Ajuda
                            </a>
                            <div className="admin-dropdown-divider" />
                            <a className="admin-dropdown-item" href="#">
                                Terminar Sessão
                            </a>
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default MainBar