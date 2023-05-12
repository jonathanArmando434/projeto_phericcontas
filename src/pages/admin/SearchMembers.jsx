import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { MdOutlinePersonAddAlt1 } from 'react-icons/md'
import api from '../../axios/api'
import loginZustand from '../../zustand/login'
import searchZustand from '../../zustand/search'

import userNoPhoto from '/src/assets/admin/img/avatars/user-no-photo.png'

import PageTitle from '../../components/admin/PageTitle'
import Loading from '../../components/Loading'


const Members = () => {
    const [active, setActive] = useState('all')
    const location = useLocation()
    const url = location.pathname

    const navigate = useNavigate()

    const { changeLoading } = loginZustand(state => state)
    const { searchContent, result, ok, cleanSearch } = searchZustand(state => state)

    const [title, setTitle] = useState(`${result.length === 0 ? 'Nenhum' : result.length} resultado (s) para "${searchContent}"`)

    useEffect(() => {
        if (!ok) navigate('/admin/membros')
        else {
            setTitle(`${result.length === 0 ? 'Nenhum' : result.length} resultado (s) para "${searchContent}"`)
            cleanSearch()
        }
    }, [result])

    return (
        <main className="admin-content">
            <div className="admin-container-fluid admin-p-0">
                <div className="admin-row">
                    <PageTitle title={title} />

                    <div className="admin-col-12 admin-d-flex admin-my-5 admin-menu-list">
                        <a onClick={() => setActive('all')} className={active === 'all' ? "admin-btn admin-btn-nav admin-mx-3 active" : "admin-btn admin-btn-nav admin-mx-3"} >Todos</a>
                        <a onClick={() => setActive('pca')} className={active === 'pca' ? "admin-btn admin-btn-nav admin-mx-3 active" : "admin-btn admin-btn-nav admin-mx-3"}>PCA</a>
                        <a onClick={() => setActive('gerente')} className={active === 'gerente' ? "admin-btn admin-btn-nav admin-mx-3 active" : "admin-btn admin-btn-nav admin-mx-3"}>gerente</a>
                        <a onClick={() => setActive('contabilista-senior')} className={active === 'contabilista-senior' ? "admin-btn admin-btn-nav admin-mx-3 active" : "admin-btn admin-btn-nav admin-mx-3"}>Contabilista Senior</a>
                        <a onClick={() => setActive('assistente-de-contabilidade')} className={active === 'assistente-de-contabilidade' ? "admin-btn admin-btn-nav admin-mx-3 active" : "admin-btn admin-btn-nav admin-mx-3"}>Assistente de contabilidade</a>
                        <a onClick={() => setActive('estagiario')} className={active === 'estagiario' ? "admin-btn admin-btn-nav admin-mx-3 active" : "admin-btn admin-btn-nav admin-mx-3"}>estagiário</a>
                    </div>
                    <div className="admin-col-12">
                        <div className="admin-row">
                            {
                                result.map(member => {
                                    if (active === 'all') return (
                                        <div key={member._id} className="admin-card admin-card-member admin-col-12 admin-col-md-4 admin-col-lg-3 admin-min-card">
                                            <div className="admin-card-content">
                                                <img
                                                    className="admin-card-img-top admin-card-img-member"
                                                    // src={member.foto_url || userNoPhoto}
                                                    src={userNoPhoto}
                                                    alt={member.nome}
                                                    width="276"
                                                    height="276"
                                                />
                                                <div className="admin-card-header">
                                                    <h5 className="admin-card-title admin-mb-0">{member.nome}</h5>
                                                </div>
                                                <div className="admin-card-body">
                                                    <p className="admin-card-text">{member.cargo}</p>
                                                    <Link to={`/admin/info/membro/${member._id}`}>
                                                        <button className="admin-btn admin-main-btn admin-form-control">
                                                            Ver mais
                                                        </button>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    )

                                    else if (active === 'pca' && member.cargo === 'PCA') return (
                                        <div key={member._id} className="admin-card admin-card-member admin-col-12 admin-col-md-4 admin-col-lg-3 admin-min-card">
                                            <div className="admin-card-content">
                                                <img
                                                    className="admin-card-img-top admin-card-img-member"
                                                    // src={member.foto_url || userNoPhoto}
                                                    src={userNoPhoto}
                                                    alt={member.nome}
                                                    width="276"
                                                    height="276"
                                                />
                                                <div className="admin-card-header">
                                                    <h5 className="admin-card-title admin-mb-0">{member.nome}</h5>
                                                </div>
                                                <div className="admin-card-body">
                                                    <p className="admin-card-text">{member.cargo}</p>
                                                    <Link to={`/admin/info/membro/${member._id}`}>
                                                        <button className="admin-btn admin-main-btn admin-form-control">
                                                            Ver mais
                                                        </button>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    )

                                    else if (active === 'gerente' && member.cargo === 'Gerente') return (
                                        <div key={member._id} className="admin-card admin-card-member admin-col-12 admin-col-md-4 admin-col-lg-3 admin-min-card">
                                            <div className="admin-card-content">
                                                <img
                                                    className="admin-card-img-top admin-card-img-member"
                                                    // src={member.foto_url || userNoPhoto}
                                                    src={userNoPhoto}
                                                    alt={member.nome}
                                                    width="276"
                                                    height="276"
                                                />
                                                <div className="admin-card-header">
                                                    <h5 className="admin-card-title admin-mb-0">{member.nome}</h5>
                                                </div>
                                                <div className="admin-card-body">
                                                    <p className="admin-card-text">{member.cargo}</p>
                                                    <Link to={`/admin/info/membro/${member._id}`}>
                                                        <button className="admin-btn admin-main-btn admin-form-control">
                                                            Ver mais
                                                        </button>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    )

                                    else if (active === 'contabilista-senior' && member.cargo === "Contabilista senior") return (
                                        <div key={member._id} className="admin-card admin-card-member admin-col-12 admin-col-md-4 admin-col-lg-3 admin-min-card">
                                            <div className="admin-card-content">
                                                <img
                                                    className="admin-card-img-top admin-card-img-member"
                                                    // src={member.foto_url || userNoPhoto}
                                                    src={userNoPhoto}
                                                    alt={member.nome}
                                                    width="276"
                                                    height="276"
                                                />
                                                <div className="admin-card-header">
                                                    <h5 className="admin-card-title admin-mb-0">{member.nome}</h5>
                                                </div>
                                                <div className="admin-card-body">
                                                    <p className="admin-card-text">{member.cargo}</p>
                                                    <Link to={`/admin/info/membro/${member._id}`}>
                                                        <button className="admin-btn admin-main-btn admin-form-control">
                                                            Ver mais
                                                        </button>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    )

                                    else if (active === 'assistente-de-contabilidade' && member.cargo === "Assistente de contabilidade") return (
                                        <div key={member._id} className="admin-card admin-card-member admin-col-12 admin-col-md-4 admin-col-lg-3 admin-min-card">
                                            <div className="admin-card-content">
                                                <img
                                                    className="admin-card-img-top admin-card-img-member"
                                                    // src={member.foto_url || userNoPhoto}
                                                    src={userNoPhoto}
                                                    alt={member.nome}
                                                    width="276"
                                                    height="276"
                                                />
                                                <div className="admin-card-header">
                                                    <h5 className="admin-card-title admin-mb-0">{member.nome}</h5>
                                                </div>
                                                <div className="admin-card-body">
                                                    <p className="admin-card-text">{member.cargo}</p>
                                                    <Link to={`/admin/info/membro/${member._id}`}>
                                                        <button className="admin-btn admin-main-btn admin-form-control">
                                                            Ver mais
                                                        </button>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    )

                                    else if (active === 'estagiario' && member.cargo === 'Estagiário') return (
                                        <div key={member._id} className="admin-card admin-card-member admin-col-12 admin-col-md-4 admin-col-lg-3 admin-min-card">
                                            <div className="admin-card-content">
                                                <img
                                                    className="admin-card-img-top admin-card-img-member"
                                                    // src={member.foto_url || userNoPhoto}
                                                    src={userNoPhoto}
                                                    alt={member.nome}
                                                    width="276"
                                                    height="276"
                                                />
                                                <div className="admin-card-header">
                                                    <h5 className="admin-card-title admin-mb-0">{member.nome}</h5>
                                                </div>
                                                <div className="admin-card-body">
                                                    <p className="admin-card-text">{member.cargo}</p>
                                                    <Link to={`/admin/info/membro/${member._id}`}>
                                                        <button className="admin-btn admin-main-btn admin-form-control">
                                                            Ver mais
                                                        </button>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Members