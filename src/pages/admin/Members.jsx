import { Link } from 'react-router-dom'

import { MdOutlinePersonAddAlt1 } from 'react-icons/md'

import memberIMG from '../../assets/admin/img/avatars/avatar-2.jpg'

import Index from "./Index"
import PageTitle from '../../components/admin/PageTitle'


const Members = () => {
    return (
        <Index>
            <main className="admin-content">
                <div className="admin-container-fluid admin-p-0">
                    <div className="admin-row">
                        <PageTitle title={'Membros da Empresa'} btnText={'Adicionar Membro'} BtnIcon={MdOutlinePersonAddAlt1} link={true} path={"/admin/novo-membro"} />

                        <div className="admin-col-12 admin-d-flex admin-my-5 admin-menu-list">
                            <a href='#' className="active admin-btn admin-btn-nav admin-mx-3">Todos</a>
                            <a href='#' className="admin-btn admin-btn-nav admin-mx-3">Solicitados</a>
                            <a href='#' className="admin-btn admin-btn-nav admin-mx-3">Finalisados</a>
                            <a href='#' className="admin-btn admin-btn-nav admin-mx-3">Em Progresso</a>
                            <a href='#' className="admin-btn admin-btn-nav admin-mx-3">Cancelados</a>
                        </div>
                        <div className="admin-col-12 admin-d-flex">
                            <div className="admin-row">
                                <div className="admin-container-flui">
                                    <div className="admin-col-12">
                                        <div className="admin-row">
                                            <div className="admin-card admin-card-member admin-px-2 admin-col-12 admin-col-md-4 admin-col-lg-3 admin-min-card">
                                                <div className="admin-card-content">
                                                    <img
                                                        className="admin-card-img-top admin-card-img-member"
                                                        src={memberIMG}
                                                        alt="Unsplash"
                                                        width="276"
                                                        height="276"
                                                    />
                                                    <div className="admin-card-header">
                                                        <h5 className="admin-card-title admin-mb-0">Milly dos Snatos</h5>
                                                    </div>
                                                    <div className="admin-card-body">
                                                        <p className="admin-card-text">Sócio Majoritário</p>
                                                        <Link to="/admin/perfil">
                                                            <button className="admin-btn admin-main-btn admin-form-control">
                                                                Ver mais
                                                            </button>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </Index>
    )
}

export default Members