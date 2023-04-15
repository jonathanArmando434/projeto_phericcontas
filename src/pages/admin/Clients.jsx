import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import loginZustand from '../../zustand/login'
import api from '../../axios/api'
import { IoMdAddCircleOutline } from 'react-icons/io'

import clientIMG from '../../assets/admin/img/icons/client-02.jpeg'

import PageTitle from '../../components/admin/PageTitle'

import './Clients.css'

import Index from "./Index"

const Clients = () => {
    const [clients, setClients] = useState([])

    const { loading, changeLoading } = loginZustand(state => state)

    const getClients = async (api_url) => {
        changeLoading()

        const res = await api.get(api_url)
        const dados = res.data

        // if (dados.foto_url) setHasPhoto(dados.foto_url)

        setClients(dados)

        changeLoading()
    }

    useEffect(() => {
        const api_url = import.meta.env.VITE_API_URL_CLIENTE
        getClients(api_url)
    }, [])

    return (
        <Index>
            <main className="admin-content">
                <div className="admin-container-fluid admin-p-0">
                    <div className="admin-row">
                        <PageTitle title={'Novo Cliente'} btnText={'Adicionar Cliente'} BtnIcon={IoMdAddCircleOutline} link={true} path={"/admin/cliente/cadastrar"} />

                        <div className="admin-col-12">
                            <div className="admin-row">
                                {
                                    clients.map(client => (
                                        <div key={client._id} className="admin-card admin-card-client admin-col-12 admin-col-md-4 admin-col-lg-3 admin-min-card">
                                            <div className="admin-card-content">
                                                <img
                                                    className="admin-card-img-top admin-card-img-client"
                                                    src={clientIMG}
                                                    alt="Unsplash"
                                                    max-width="276"
                                                    height="138"
                                                />
                                                <div className="admin-card-header">
                                                    <h5 className="admin-card-title admin-mb-0">{client.nome}</h5>
                                                </div>
                                                <div className="admin-card-body">
                                                    <p className="admin-card-text">{client.area_negocio}</p>
                                                    <Link to={`/admin/info/cliente/${client._id}`}>
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
}

export default Clients