import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { MdOutlinePersonAddAlt1 } from 'react-icons/md'
import api from '../../axios/api'
import loginZustand from '../../zustand/login'

import userNoPhoto from '/src/assets/admin/img/avatars/user-no-photo.png'

import Index from "./Index"
import PageTitle from '../../components/admin/PageTitle'
import Loading from '../../components/Loading'


const Members = () => {
    const [active, setActive] = useState('all')
    const [members, setMembers] = useState([])
    const [hasPhoto, setHasPhoto] = useState(userNoPhoto)

    const { loading, changeLoading } = loginZustand(state => state)

    const getMembers = async (api_url) => {
        changeLoading()

        const res = await api.get(api_url)
        const dados = res.data

        if (dados.foto_url) setHasPhoto(dados.foto_url)

        const auxDados = []

        dados.forEach(value => { if (value.nome !== 'Phericcontas') auxDados.unshift(value) })

        setMembers(auxDados)

        changeLoading()
    }

    useEffect(() => {
        const api_url = import.meta.env.VITE_API_URL_MEMBERS
        getMembers(api_url)
    }, [])

    return (loading ? <Loading /> :
        (
            <Index>
                <main className="admin-content">
                    <div className="admin-container-fluid admin-p-0">
                        <div className="admin-row">
                            <PageTitle title={'Colaboradores da empresa'} btnText={'Adicionar colaborador'} BtnIcon={MdOutlinePersonAddAlt1} link={true} path={"/admin/membro/cadastrar"} />

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
                                        members.map(member => (
                                            <div key={member._id} className="admin-card admin-card-member admin-col-12 admin-col-md-4 admin-col-lg-3 admin-min-card">
                                                <div className="admin-card-content">
                                                    <img
                                                        className="admin-card-img-top admin-card-img-member"
                                                        src={hasPhoto}
                                                        alt="Unsplash"
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
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </Index>
        )
    )
}

export default Members