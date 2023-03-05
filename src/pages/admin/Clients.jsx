import { Link } from 'react-router-dom'
import { IoMdAddCircleOutline } from 'react-icons/io'

import clientIMG from '../../assets/admin/img/icons/client-02.jpeg'

import PageTitle from '../../components/admin/PageTitle'

import './Clients.css'

import Index from "./Index"

const Clients = () => {
    return (
        <Index>
            <main className="admin-content">
                <div className="admin-container-fluid admin-p-0">
                    <div className="admin-row">
                        <PageTitle title={'Novo Cliente'} btnText={'Adicionar Cliente'} BtnIcon={IoMdAddCircleOutline} link={true} path={"/admin/novo-cliente"} />

                        <div className="admin-col-12 admin-d-flex">
                            <div className="admin-row">
                                <div className="admin-container-flui">
                                    <div className="admin-col-12">
                                        <div className="admin-row">
                                            <div className="admin-card admin-card-client admin-px-2 admin-col-12 admin-col-md-4 admin-col-lg-3 admin-min-card">
                                                <div className="admin-card-content">
                                                    <img
                                                        className="admin-card-img-top admin-card-img-client"
                                                        src={clientIMG}
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

export default Clients