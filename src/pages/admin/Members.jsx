import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { MdOutlinePersonAddAlt1 } from 'react-icons/md'
import api from '../../axios/api'
import loginZustand from '../../zustand/login'
import searchZustand from '../../zustand/search'

import userNoPhoto from '/src/assets/admin/img/avatars/user-no-photo.png'

import PageTitle from '../../components/admin/PageTitle'
import MinLoading from '../../components/admin/MinLoading'


const Members = () => {

    const apiUrl = import.meta.env.VITE_API_URL
    const [active, setActive] = useState('all')
    const [members, setMembers] = useState([])
    const [title, setTitle] = useState('Colaboradores da empresa')

    const location = useLocation()
    const url = location.pathname

    const navigate = useNavigate()

    const [ loading, setLoading ] = useState(true)
    const { searchContent, result, ok, cleanSearch } = searchZustand(state => state)

    const { query } = useParams()

    let isSearch = false

    const getMembers = async () => {
        const res = await api.get('/colaborador')
        const dados = res.data

        const auxDados = dados.filter(value => value.nome !== 'Phericcontas')

        setMembers(auxDados)
    }

    useEffect(() => {
        try {
            if (url === '/admin/membros' || query) getMembers()
            else if (!ok) navigate('/admin/membros')
            else {
                setMembers(result)
                setTitle(`${result.length} resultado (s) para "${searchContent}"`)
                isSearch = true
                cleanSearch()
            }
        } finally {
            setLoading(false)
        }
    }, [members])

    return (
        <main className="admin-content">
            <div className="admin-container-fluid admin-p-0">
                <div className="admin-row">
                    <PageTitle title={title} btnText={!isSearch && 'Adicionar colaborador'} BtnIcon={!isSearch && MdOutlinePersonAddAlt1} link={!isSearch ? true : false} path={!isSearch && "/admin/membro/cadastrar"} />

                    {loading ? <MinLoading /> : (
                        <>
                            <div className="admin-col-12 admin-d-flex admin-my-5 admin-menu-list">
                                <a onClick={() => setActive('all')} className={active === 'all' ? "admin-btn admin-btn-nav admin-mx-3 active" : "admin-btn admin-btn-nav admin-mx-3"} >Todos</a>
                                <a onClick={() => setActive('ativo')} className={active === 'ativo' ? "admin-btn admin-btn-nav admin-mx-3 active" : "admin-btn admin-btn-nav admin-mx-3"} >Ativo</a>
                                <a onClick={() => setActive('pca')} className={active === 'pca' ? "admin-btn admin-btn-nav admin-mx-3 active" : "admin-btn admin-btn-nav admin-mx-3"}>PCA</a>
                                <a onClick={() => setActive('gerente')} className={active === 'gerente' ? "admin-btn admin-btn-nav admin-mx-3 active" : "admin-btn admin-btn-nav admin-mx-3"}>gerente</a>
                                <a onClick={() => setActive('contabilista-senior')} className={active === 'contabilista-senior' ? "admin-btn admin-btn-nav admin-mx-3 active" : "admin-btn admin-btn-nav admin-mx-3"}>Contabilista Senior</a>
                                <a onClick={() => setActive('assistente-de-contabilidade')} className={active === 'assistente-de-contabilidade' ? "admin-btn admin-btn-nav admin-mx-3 active" : "admin-btn admin-btn-nav admin-mx-3"}>Assistente de contabilidade</a>
                                <a onClick={() => setActive('estagiario')} className={active === 'estagiario' ? "admin-btn admin-btn-nav admin-mx-3 active" : "admin-btn admin-btn-nav admin-mx-3"}>estagiário</a>
                            </div>
                            <div className="admin-col-12">
                                <div className="admin-row">
                                    {
                                        members.map(member => {
                                            if (active === 'all') return (
                                                <div key={member._id} className="admin-card admin-card-member admin-col-12 admin-col-md-4 admin-col-lg-3 admin-min-card">
                                                    <div className="admin-card-content">
                                                        <img
                                                            className="admin-card-img-top admin-card-img-member"
                                                            src={member.foto_url ? `${apiUrl}/${member.foto_url}` : userNoPhoto}
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
                                                            src={`${apiUrl}/${member.foto_url}` || userNoPhoto}
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
                                                            src={`${apiUrl}/${member.foto_url}` || userNoPhoto}
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
                                                            src={`${apiUrl}/${member.foto_url}` || userNoPhoto}
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
                                                            src={`${apiUrl}/${member.foto_url}` || userNoPhoto}
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
                                                            src={member.foto_url ? `${apiUrl}/${member.foto_url}` : userNoPhoto}
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
                        </>
                    )}
                </div>
            </div>
        </main>
    )
}

export default Members