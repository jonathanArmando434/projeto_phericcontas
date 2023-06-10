import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { BsBell } from 'react-icons/bs'
import { BiSearch, BiUserCircle } from 'react-icons/bi'
import { MdOutlineLogout } from 'react-icons/md'
import loginZustand from '../../zustand/login'
import searchZustand from '../../zustand/search'
import api from '../../axios/api'

import avatar from '../../assets/admin/img/avatars/user-no-photo.png'

import './MainBar.css'

const MainBar = () => {
    const apiUrl = import.meta.env.VITE_API_URL

    const [showUser, setShowUser] = useState('')
    const [showNotification, setShowNotification] = useState('')
    const [displayed, setDisplayed] = useState(false)
    const [about, setAbout] = useState('')
    const [search, setSearch] = useState('')
    const [member, setMember] = useState({})

    const location = useLocation()
    const url = location.pathname

    const navigate = useNavigate()

    const { userLogado, handleLogout } = loginZustand(state => state)
    const { handleSearchColaborador, handleSearchCliente } = searchZustand(state => state)

    const id = userLogado.id_colaborador

    const getMember = async () => {
        const res = await api.get('/colaborador/' + id)
        const dados = res.data
        setMember(dados)
        console
    }

    const handleSearch = async (e) => {
        e.preventDefault()

        //verificando se a string é vazia, se contem apenas espaços em branco, se possui caracteres especias  
        if (
            (search.trim().length === 0) ||
            (/^[^\w\s]+$/.test(search))
        ) return

        if (url === '/admin/membros' || url.startsWith('/admin/membros/pesquisar')) {
            await handleSearchColaborador(search)
            if (url === '/admin/membros') navigate('/admin/membros/pesquisar/' + search)
        }
        else if (url === '/admin/clientes' || url.startsWith('/admin/clientes/pesquisar')) {
            await handleSearchCliente(search)
            navigate('/admin/clientes/pesquisar/' + search)
        }

        setSearch('')
    }

    const handleClick = (e) => {
        if (e.target.id === "user" || e.target.id === "user-img") setShowUser('admin-show')
        else setShowUser('')

    }

    useEffect(() => {
        if (url === '/admin/membros' || url.startsWith('/admin/membros/pesquisar/')) {
            setDisplayed(true)
            setAbout('Pesquisar colaborador')
        }
        else if (url === '/admin/clientes' || url.startsWith('/admin/clientes/pesquisar/')) {
            setDisplayed(true)
            setAbout('Pesquisar cliente')
        }
        else setDisplayed(false)
    }, [url])

    useEffect(() => {
        getMember()

        document.addEventListener("click", handleClick);
        return () => {
            document.removeEventListener("click", handleClick);
        };
    }, []);

    return (
        <nav className="admin-navbar admin-navbar-expand admin-navbar-light admin-navbar-bg admin-d-flex" style={!displayed ? { justifyContent: 'end' } : {}}>

            <div className={displayed ? "admin-search" : 'admin-d-none'}>
                <form onSubmit={handleSearch}>
                    <input
                        type="search"
                        id="search"
                        name="search"
                        className="admin-form-control admin-d-inline-block"
                        placeholder={about}
                        value={search}
                        onChange={e => setSearch(e.target.value)}
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
                    <li style={{ marginRight: '2rem', display: 'none' }} className="admin-nav-item admin-dropdown">
                        <a
                            className="admin-nav-icon admin-dropdown-toggle"
                            id="alertsDropdown"
                            data-bs-toggle="dropdown"
                        >
                            <div className="admin-position-relative admin-notification">
                                <BsBell />
                                <span className="admin-indicator">4</span>
                            </div>
                        </a>
                        <div
                            style={{ left: '-285%' }}
                            className={`admin-dropdown-menu admin-dropdown-menu-lg admin-dropdown-menu-end admin-py-0 ${showNotification}`}
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
                            className="admin-nav-link admin-dropdown-toggle admin-d-none admin-d-sm-inline-block"
                            data-bs-toggle="dropdown"
                            id='user'
                        >
                            <img
                                src={member.foto_url ? `${apiUrl}/${member.foto_url}` : avatar} 
                                className="admin-avatar admin-img-fluid admin-rounded admin-me-1"
                                alt="Usuário"
                                id='user-img'
                            />
                        </a>
                        <div style={{ left: '-155%' }} className={`admin-dropdown-menu admin-dropdown-menu-end ${showUser}`}>
                            <Link to={'/admin/perfil'} className="admin-dropdown-item">
                                <BiUserCircle />
                                <span className="admin-ms-2">Perfil</span>
                            </Link>
                            <div className="admin-dropdown-divider" />
                            <a onClick={handleLogout} className="admin-dropdown-item">
                                <MdOutlineLogout />
                                <span className='admin-ms-2'>Terminar Sessão</span>
                            </a>
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default MainBar