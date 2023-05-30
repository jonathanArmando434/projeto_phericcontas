import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { IoMdAddCircleOutline } from 'react-icons/io'
import loginZustand from '../../zustand/login'
import searchZustand from '../../zustand/search'
import api from '../../axios/api'

import clientIMG from '../../assets/admin/img/icons/client-02.jpeg'

import PageTitle from '../../components/admin/PageTitle'

import './Clients.css'

const Clients = () => {
    const apiUrl = import.meta.env.VITE_API_URL
    
    const [clients, setClients] = useState([])
    const [title, setTitle] = useState('Nossos cliente')

    const location = useLocation()
    const url = location.pathname

    const navigate = useNavigate()

    const { loading, changeLoading } = loginZustand(state => state)
    const { seachContent, result, ok, cleanSearch } = searchZustand(state => state)

    let isSearch = false

    const getClients = async () => {
        const res = await api.get('/cliente')
        const dados = res.data

        setClients(dados)
    }

    useEffect(() => {
        if(url === '/admin/clientes') getClients()
        else if(!ok) navigate('/admin/clientes')
        else{
            setClients(result)
            setTitle(`${result.length} resultado (s) para "${seachContent}"`)
            isSearch = true
            cleanSearch()
        }
    }, [])

    return (
        <main className="admin-content">
            <div className="admin-container-fluid admin-p-0">
                <div className="admin-row">
                    <PageTitle title={title} btnText={!isSearch && 'Adicionar Cliente'} BtnIcon={!isSearch && IoMdAddCircleOutline} link={!isSearch ? true : false} path={!isSearch && "/admin/cliente/cadastrar"} />

                    <div className="admin-col-12">
                        <div className="admin-row">
                            {
                                clients.map(client => (
                                    <div key={client._id} className="admin-card admin-card-client admin-col-12 admin-col-md-4 admin-col-lg-3 admin-min-card">
                                        <div className="admin-card-content">
                                            <img
                                                className="admin-card-img-top admin-card-img-client"
                                                src={`${apiUrl}/${client.foto_url}` || clientIMG}
                                                alt={client.nome}
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
    )
}

export default Clients