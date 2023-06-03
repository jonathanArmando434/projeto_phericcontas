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
    const location = useLocation()
    const url = location.pathname

    const navigate = useNavigate()

    const { loading, changeLoading } = loginZustand(state => state)
    const { searchContent, result, ok, cleanSearch } = searchZustand(state => state)

    const [title, setTitle] = useState(`${result.length === 0 ? 'Nenhum' : result.length} resultado (s) para "${searchContent}"`)

    useEffect(() => {
        if(!ok) navigate('/admin/clientes')
        else{
            setTitle(`${result.length === 0 ? 'Nenhum' : result.length} resultado (s) para "${searchContent}"`)
            cleanSearch()
        }
    }, [result])

    return (
        <main className="admin-content">
            <div className="admin-container-fluid admin-p-0">
                <div className="admin-row">
                    <PageTitle title={title}  />

                    <div style={{ marginTop: '2.5rem' }} className="admin-col-12">
                        <div className="admin-row">
                            {
                                result.map(client => (
                                    <div key={client._id} className="admin-card admin-card-client admin-col-12 admin-col-md-4 admin-col-lg-3 admin-min-card">
                                        <div className="admin-card-content">
                                            <img
                                                className="admin-card-img-top admin-card-img-client"
                                                src={clientIMG}
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